// KGU DP QUEST - STAGE1 KNOW
//
// 問題文・選択肢・クリア文言は data/content.js を参照するだけにする（13.2）。
// 出題中の途中経過（何問目か・選択済みかどうか）はこのモジュール内のローカル変数のみで保持し、
// state.js（localStorage）には保存しない。ステージに入り直すと常にQ1から始まる。

import { content } from '../data/content.js';

const BRIDGE_DIAGRAM_SVG = `
<svg viewBox="0 0 320 120" role="img" aria-labelledby="bridgeDiagramTitle">
  <title id="bridgeDiagramTitle">橋の模式図。橋脚の上に床版が架かり、その上を車と人が通行している。</title>
  <rect x="0" y="92" width="320" height="4" fill="var(--color-border)" />
  <rect x="20" y="70" width="280" height="10" rx="2" fill="#6fc3ff" />
  <rect x="50" y="80" width="14" height="34" fill="#3aa0ff" />
  <rect x="150" y="80" width="14" height="34" fill="#3aa0ff" />
  <rect x="250" y="80" width="14" height="34" fill="#3aa0ff" />
  <circle cx="120" cy="62" r="7" fill="#ff8a3d" />
  <rect x="112" y="69" width="16" height="8" fill="#ff8a3d" />
  <rect x="190" y="55" width="18" height="15" rx="2" fill="#3ddc97" />
  <circle cx="195" cy="72" r="3.2" fill="#0c1830" />
  <circle cx="205" cy="72" r="3.2" fill="#0c1830" />
</svg>`;

// 5分野から異なる3分野をランダムに選び、各分野のプール（2問）から1問ずつ
// ランダム抽出する（spec doc 12.1）。呼び出すたびに毎回変わり、非永続。
function pickRandomQuestions(questionBank) {
  const categories = Object.keys(questionBank);
  const shuffledCategories = [...categories].sort(() => Math.random() - 0.5);
  const chosenCategories = shuffledCategories.slice(0, 3);
  return chosenCategories.map((category) => {
    const pool = questionBank[category];
    return pool[Math.floor(Math.random() * pool.length)];
  });
}

export function renderStage1Know({ onComplete }) {
  const data = content.stage1;
  let questions = pickRandomQuestions(data.questionBank);
  const container = document.createElement('section');
  container.className = 'screen screen-stage';

  let questionIndex = 0;
  let selectedIndex = null;
  let showFeedback = false;
  let correctCount = 0;
  // 'question' | 'achieved' | 'almost' | 'notAchieved'
  let resultStep = 'question';

  function resetQuiz() {
    // 再挑戦時も分野・設問を選び直し、同じ3問の暗記だけで突破できないようにする。
    questions = pickRandomQuestions(data.questionBank);
    questionIndex = 0;
    selectedIndex = null;
    showFeedback = false;
    correctCount = 0;
    resultStep = 'question';
  }

  function update() {
    container.innerHTML = '';
    container.appendChild(resultStep === 'question' ? renderQuestionView() : renderResultView());
  }

  function renderQuestionView() {
    const q = questions[questionIndex];

    const wrap = document.createElement('div');
    wrap.className = 'stage-inner';

    const progress = document.createElement('p');
    progress.className = 'stage-progress';
    progress.textContent = `Q${questionIndex + 1} / ${questions.length}`;
    wrap.appendChild(progress);

    const missionTitle = document.createElement('h2');
    missionTitle.className = 'stage-mission-title';
    missionTitle.textContent = data.missionTitle;
    wrap.appendChild(missionTitle);

    if (questionIndex === 0) {
      const intro = document.createElement('div');
      intro.className = 'briefing-box';
      data.introLines.forEach((line) => {
        const p = document.createElement('p');
        p.textContent = line;
        intro.appendChild(p);
      });
      wrap.appendChild(intro);
    }

    const diagram = document.createElement('div');
    diagram.className = 'bridge-diagram';
    diagram.innerHTML = BRIDGE_DIAGRAM_SVG;
    wrap.appendChild(diagram);

    const questionText = document.createElement('p');
    questionText.className = 'stage-question';
    questionText.textContent = q.question;
    wrap.appendChild(questionText);

    const choiceList = document.createElement('div');
    choiceList.className = 'choice-list';
    choiceList.setAttribute('role', 'group');
    choiceList.setAttribute('aria-label', q.question);

    q.choices.forEach((choiceText, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice-btn';
      const label = String.fromCharCode(65 + idx);
      let text = `${label}. ${choiceText}`;

      if (showFeedback) {
        btn.disabled = true;
        if (idx === q.correctIndex) {
          btn.classList.add('choice-correct');
          text += ' ✓';
        } else if (idx === selectedIndex) {
          btn.classList.add('choice-incorrect');
          text += ' ✗';
        }
      }
      btn.textContent = text;

      btn.addEventListener('click', () => {
        if (showFeedback) return;
        selectedIndex = idx;
        showFeedback = true;
        if (idx === q.correctIndex) correctCount += 1;
        update();
        const nextBtn = container.querySelector('.stage-next-btn');
        if (nextBtn) nextBtn.focus();
      });
      choiceList.appendChild(btn);
    });
    wrap.appendChild(choiceList);

    if (showFeedback) {
      const isCorrect = selectedIndex === q.correctIndex;
      const feedback = document.createElement('p');
      feedback.className = `stage-feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
      feedback.setAttribute('role', 'status');
      feedback.textContent = isCorrect
        ? data.correctFeedback
        : `${data.incorrectFeedbackPrefix}${q.choices[q.correctIndex]}${data.incorrectFeedbackSuffix}`;
      wrap.appendChild(feedback);

      const isLastQuestion = questionIndex === questions.length - 1;
      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'btn btn-primary stage-next-btn';
      nextBtn.textContent = isLastQuestion ? data.resultButton : data.nextQuestionButton;
      nextBtn.addEventListener('click', () => {
        if (isLastQuestion) {
          if (correctCount === questions.length) {
            resultStep = 'achieved';
          } else if (correctCount === questions.length - 1) {
            resultStep = 'almost';
          } else {
            resultStep = 'notAchieved';
          }
        } else {
          questionIndex += 1;
          selectedIndex = null;
          showFeedback = false;
        }
        update();
      });
      wrap.appendChild(nextBtn);
    }

    return wrap;
  }

  function renderResultView() {
    return resultStep === 'notAchieved' ? renderNotAchievedView() : renderAchievedView();
  }

  function renderAchievedView() {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner badge-inner';

    const badge = document.createElement('div');
    badge.className = 'badge-icon badge-know';
    badge.setAttribute('aria-hidden', 'true');
    badge.textContent = 'K';
    wrap.appendChild(badge);

    const badgeLabel = document.createElement('p');
    badgeLabel.className = 'badge-label';
    badgeLabel.textContent = data.badgeLabel;
    wrap.appendChild(badgeLabel);

    const title = document.createElement('h2');
    title.className = 'badge-title';
    title.textContent = data.badgeTitle;
    wrap.appendChild(title);

    if (resultStep === 'almost') {
      const almost = document.createElement('p');
      almost.className = 'stage-feedback feedback-neutral';
      almost.setAttribute('role', 'status');
      almost.textContent = data.almostMessage;
      wrap.appendChild(almost);
    }

    const explain = document.createElement('div');
    explain.className = 'badge-explain';
    data.badgeExplain.forEach((line) => {
      const p = document.createElement('p');
      p.textContent = line;
      explain.appendChild(p);
    });
    wrap.appendChild(explain);

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'btn btn-primary';
    nextBtn.textContent = data.nextButton;
    nextBtn.addEventListener('click', () => {
      onComplete();
    });
    wrap.appendChild(nextBtn);

    return wrap;
  }

  function renderNotAchievedView() {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner badge-inner';

    const title = document.createElement('h2');
    title.className = 'badge-title';
    title.textContent = data.notAchievedTitle;
    wrap.appendChild(title);

    const explain = document.createElement('div');
    explain.className = 'badge-explain';
    data.notAchievedMessage.forEach((line) => {
      const p = document.createElement('p');
      p.textContent = line;
      explain.appendChild(p);
    });
    wrap.appendChild(explain);

    const retryBtn = document.createElement('button');
    retryBtn.type = 'button';
    retryBtn.className = 'btn btn-primary';
    retryBtn.textContent = data.retryButton;
    retryBtn.addEventListener('click', () => {
      resetQuiz();
      update();
    });
    wrap.appendChild(retryBtn);

    return wrap;
  }

  update();
  return container;
}
