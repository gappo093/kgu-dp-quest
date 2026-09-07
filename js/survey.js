// KGU DP QUEST - DP理解度Pre/Postアンケート（v0.2 6章、6.2改訂）
//
// Pre（学年選択の直後）とPost（DP開示後）で同じ形式の質問に答えてもらう。
// 「適用」設問のみ他3問（自己申告）と性質が異なる客観的な知識確認で、
// Know/See/Think/Actそれぞれについて1問ずつ計4問を全員・全学年に共通で出題する
// （ランダム抽出はしない）。Preでは正式名称（Know/See/Think/Act）を伏せた言い換えの
// 選択肢を出し、正誤は表示しない（体験前にDPの正式名称を明かさないという
// CLAUDE.md 3.2/21.3の原則を守るため）。Postでは正式名称の選択肢を出し、
// KNOWと同様に選択直後の正誤表示を行う（4つのMissionを終えても理解が曖昧なままでは
// 正しい理解につながらないという判断による、spec doc 6.2改訂）。
//
// Pre/Postの比較は、この画面では行わない。MY DP STATUSの後にある「あなたの振り返り」
// （js/recap.js）で一括して表示する（重複表示を避けるため）。
//
// selfAssessmentと同様、後から見返す価値のある回答のため、保存はmain.js経由で
// state.js（localStorage）に永続化する（この画面自体は読み書きの window を提供するのみ）。

import { content } from '../data/content.js';

export function renderSurvey({ variant, initialAnswers, onSave, onComplete }) {
  const data = content.survey;
  const variantData = data[variant];
  const container = document.createElement('section');
  container.className = 'screen screen-stage';
  const isPost = variant === 'post';

  const answers = {
    ...initialAnswers,
    application: { ...initialAnswers.application },
  };

  function update() {
    container.innerHTML = '';
    container.appendChild(renderFormView());
  }

  function renderChoiceRow(key, questionData) {
    const row = document.createElement('fieldset');
    row.className = 'assessment-row';

    const legend = document.createElement('legend');
    legend.className = 'assessment-legend';
    legend.textContent = questionData.question;
    row.appendChild(legend);

    const choiceList = document.createElement('div');
    choiceList.className = 'choice-list';
    choiceList.setAttribute('role', 'group');
    choiceList.setAttribute('aria-label', questionData.question);

    questionData.choices.forEach((choiceText) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice-btn';
      btn.textContent = choiceText;
      if (answers[key] === choiceText) btn.classList.add('choice-selected');
      btn.addEventListener('click', () => {
        answers[key] = choiceText;
        update();
      });
      choiceList.appendChild(btn);
    });
    row.appendChild(choiceList);

    return row;
  }

  function renderTextRow(key, questionData) {
    const row = document.createElement('fieldset');
    row.className = 'assessment-row';

    const legend = document.createElement('legend');
    legend.className = 'assessment-legend';
    legend.textContent = questionData.question;
    row.appendChild(legend);

    const textarea = document.createElement('textarea');
    textarea.className = 'survey-textarea';
    textarea.rows = 3;
    textarea.placeholder = questionData.placeholder;
    textarea.value = answers[key] || '';
    textarea.setAttribute('aria-label', questionData.question);
    textarea.addEventListener('input', () => {
      answers[key] = textarea.value;
      refreshSubmitButton();
    });
    row.appendChild(textarea);

    return row;
  }

  // 「適用」設問1問分。Postのみ選択直後に正誤を表示し、以後その設問は選び直せない
  // （KNOWの即時フィードバックと同じパターン）。
  function renderApplicationRow(questionData) {
    const row = document.createElement('fieldset');
    row.className = 'assessment-row';
    const questionText = isPost ? questionData.stemPost : questionData.stemPre;

    const legend = document.createElement('legend');
    legend.className = 'assessment-legend';
    legend.textContent = questionText;
    row.appendChild(legend);

    const choices = isPost ? data.common.applicationChoicesPost : data.common.applicationChoicesPre;
    const selectedDpKey = answers.application[questionData.dpKey];
    const locked = isPost && selectedDpKey != null;

    const choiceList = document.createElement('div');
    choiceList.className = 'choice-list';
    choiceList.setAttribute('role', 'group');
    choiceList.setAttribute('aria-label', questionText);

    choices.forEach((choice) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice-btn';
      let text = choice.label;

      if (locked) {
        btn.disabled = true;
        if (choice.dpKey === questionData.dpKey) {
          btn.classList.add('choice-correct');
          text += ' ✓';
        } else if (choice.dpKey === selectedDpKey) {
          btn.classList.add('choice-incorrect');
          text += ' ✗';
        }
      } else if (choice.dpKey === selectedDpKey) {
        btn.classList.add('choice-selected');
      }
      btn.textContent = text;

      btn.addEventListener('click', () => {
        if (locked) return;
        answers.application[questionData.dpKey] = choice.dpKey;
        update();
        refreshSubmitButton();
      });
      choiceList.appendChild(btn);
    });
    row.appendChild(choiceList);

    if (locked) {
      const isCorrect = selectedDpKey === questionData.dpKey;
      const feedback = document.createElement('p');
      feedback.className = `stage-feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
      feedback.setAttribute('role', 'status');
      const correctChoice = choices.find((c) => c.dpKey === questionData.dpKey);
      feedback.textContent = isCorrect
        ? data.common.applicationCorrectFeedback
        : `${data.common.applicationIncorrectFeedbackPrefix}${correctChoice.label}${data.common.applicationIncorrectFeedbackSuffix}`;
      row.appendChild(feedback);
    }

    return row;
  }

  let submitBtnSlot;

  function isComplete() {
    return (
      answers.awareness != null &&
      typeof answers.understanding === 'string' &&
      answers.understanding.trim().length > 0 &&
      ['know', 'see', 'think', 'act'].every((key) => answers.application[key] != null) &&
      answers.selfAwareness != null
    );
  }

  function refreshSubmitButton() {
    submitBtnSlot.innerHTML = '';
    if (isComplete()) {
      const submitBtn = document.createElement('button');
      submitBtn.type = 'button';
      submitBtn.className = 'btn btn-primary stage-next-btn';
      submitBtn.textContent = variantData.button;
      submitBtn.addEventListener('click', () => {
        onSave({ ...answers, application: { ...answers.application } });
        onComplete();
      });
      submitBtnSlot.appendChild(submitBtn);
    }
  }

  function renderFormView() {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner status-form-inner';

    const title = document.createElement('h2');
    title.className = 'stage-mission-title';
    title.textContent = data.title;
    wrap.appendChild(title);

    const intro = document.createElement('div');
    intro.className = 'briefing-box';
    variantData.intro.forEach((line) => {
      const p = document.createElement('p');
      p.textContent = line;
      intro.appendChild(p);
    });
    wrap.appendChild(intro);

    const list = document.createElement('div');
    list.className = 'assessment-list';
    list.appendChild(renderChoiceRow('awareness', data.common.q1));
    list.appendChild(renderTextRow('understanding', data.common.q2));
    data.common.applicationQuestions.forEach((q) => {
      list.appendChild(renderApplicationRow(q));
    });
    list.appendChild(renderChoiceRow('selfAwareness', data.common.q4));
    wrap.appendChild(list);

    submitBtnSlot = document.createElement('div');
    wrap.appendChild(submitBtnSlot);
    refreshSubmitButton();

    return wrap;
  }

  update();
  return container;
}
