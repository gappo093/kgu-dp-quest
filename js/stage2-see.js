// KGU DP QUEST - STAGE2 SEE
//
// 6章の設計方針：選択直後に正解／不正解を出さず、別の視点を提示してから
// もう一度考えさせる（2ラウンド構成）。そのため選択ボタンには「正誤」ではなく
// 「選択中」という中立なスタイルのみを与える。
//
// 途中経過（ラウンド・選択内容）はこのモジュール内のローカル変数のみで保持し、
// state.js（localStorage）には保存しない（ステージに入り直すと常に最初から）。

import { content } from '../data/content.js';
import { depthTierForGrade } from './grade-depth.js';

const FLOOD_RISK_SVG = `
<svg viewBox="0 0 320 120" role="img" aria-labelledby="floodRiskDiagramTitle">
  <title id="floodRiskDiagramTitle">台風接近と河川の水位上昇を示す模式図。雨雲の下で川の水位が高まり、警戒を示す注意マークが表示されている。</title>
  <ellipse cx="100" cy="30" rx="50" ry="18" fill="#6fc3ff" opacity="0.5" />
  <ellipse cx="180" cy="24" rx="40" ry="15" fill="#6fc3ff" opacity="0.4" />
  <path d="M80 50 L74 66" stroke="#3aa0ff" stroke-width="2" />
  <path d="M110 50 L104 66" stroke="#3aa0ff" stroke-width="2" />
  <path d="M140 50 L134 66" stroke="#3aa0ff" stroke-width="2" />
  <path d="M170 46 L164 62" stroke="#3aa0ff" stroke-width="2" />
  <rect x="0" y="90" width="320" height="30" fill="#2e6f9e" />
  <path d="M0 82 Q80 72 160 82 T320 82" stroke="#6fc3ff" stroke-width="3" fill="none" />
  <path d="M255 60 L275 92 L235 92 Z" fill="none" stroke="#ff8a3d" stroke-width="3" stroke-linejoin="round" />
  <rect x="253.5" y="68" width="3" height="7" fill="#ff8a3d" />
  <circle cx="255" cy="80" r="1.6" fill="#ff8a3d" />
</svg>`;

export function renderStage2See({ grade, onComplete }) {
  const data = content.stage2;
  const container = document.createElement('section');
  container.className = 'screen screen-stage';

  // 学年別の判断深度（v0.2 5章）：1年は選択肢を絞り、4年はクロージング文をより
  // 踏み込んだ内容にする。2〜3年・未選択（3年相当が既定）は現行の標準版のまま。
  // 往復構造（選択→視点提示→再選択）自体は学年によらず共通で、入力形式は変えない。
  const tier = depthTierForGrade(grade);
  const choices = tier === 'basic' ? data.choices.slice(0, 2) : data.choices;

  let step = 'intro';
  let round1Index = null;
  let round2Index = null;

  function update() {
    container.innerHTML = '';
    container.appendChild(renderStep());
  }

  function renderStep() {
    switch (step) {
      case 'intro':
        return renderIntroView();
      case 'round1':
        return renderChoiceView({
          question: data.question,
          selectedIndex: round1Index,
          showFollowUp: false,
        });
      case 'round1-feedback':
        return renderChoiceView({
          question: data.question,
          selectedIndex: round1Index,
          showFollowUp: true,
        });
      case 'resident-voice':
        return renderResidentVoiceView();
      case 'round2':
        return renderRound2View({ showClosing: false });
      case 'round2-feedback':
        return renderRound2View({ showClosing: true });
      case 'badge':
        return renderBadgeView();
      default:
        return document.createElement('div');
    }
  }

  function renderDiagram() {
    const diagram = document.createElement('div');
    diagram.className = 'bridge-diagram';
    diagram.innerHTML = FLOOD_RISK_SVG;
    return diagram;
  }

  function renderIntroView() {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner';

    const missionTitle = document.createElement('h2');
    missionTitle.className = 'stage-mission-title';
    missionTitle.textContent = data.missionTitle;
    wrap.appendChild(missionTitle);

    wrap.appendChild(renderDiagram());

    const lead = document.createElement('p');
    lead.className = 'stage-question';
    lead.textContent = data.introLead;
    wrap.appendChild(lead);

    const factList = document.createElement('ul');
    factList.className = 'scenario-fact-list';
    data.scenarioFacts.forEach((fact) => {
      const li = document.createElement('li');
      li.textContent = fact;
      factList.appendChild(li);
    });
    wrap.appendChild(factList);

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'btn btn-primary';
    nextBtn.textContent = data.introButton;
    nextBtn.addEventListener('click', () => {
      step = 'round1';
      update();
    });
    wrap.appendChild(nextBtn);

    return wrap;
  }

  function renderChoiceView({ question, selectedIndex, showFollowUp }) {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner';

    const missionTitle = document.createElement('h2');
    missionTitle.className = 'stage-mission-title';
    missionTitle.textContent = data.missionTitle;
    wrap.appendChild(missionTitle);

    const questionText = document.createElement('p');
    questionText.className = 'stage-question';
    questionText.textContent = question;
    wrap.appendChild(questionText);

    wrap.appendChild(
      renderChoiceList({
        selectedIndex,
        disabled: showFollowUp,
        onSelect: (idx) => {
          round1Index = idx;
          step = 'round1-feedback';
          update();
          focusNextButton();
        },
      })
    );

    if (showFollowUp) {
      const followUp = document.createElement('p');
      followUp.className = 'stage-feedback feedback-neutral';
      followUp.setAttribute('role', 'status');
      followUp.textContent = choices[selectedIndex].followUp;
      wrap.appendChild(followUp);

      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'btn btn-primary stage-next-btn';
      nextBtn.textContent = data.round1NextButton;
      nextBtn.addEventListener('click', () => {
        step = 'resident-voice';
        update();
        focusNextButton();
      });
      wrap.appendChild(nextBtn);
    }

    return wrap;
  }

  function renderResidentVoiceView() {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner';

    const missionTitle = document.createElement('h2');
    missionTitle.className = 'stage-mission-title';
    missionTitle.textContent = data.missionTitle;
    wrap.appendChild(missionTitle);

    const card = document.createElement('div');
    card.className = 'character-card';

    const name = document.createElement('p');
    name.className = 'character-name';
    name.textContent = data.residentCharacterName;
    card.appendChild(name);

    const role = document.createElement('p');
    role.className = 'character-role';
    role.textContent = data.residentCharacterRole;
    card.appendChild(role);

    wrap.appendChild(card);

    const dialogue = document.createElement('div');
    dialogue.className = 'dialogue-box';
    data.residentDialogue.forEach((line) => {
      const p = document.createElement('p');
      p.textContent = line;
      dialogue.appendChild(p);
    });
    wrap.appendChild(dialogue);

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'btn btn-primary stage-next-btn';
    nextBtn.textContent = data.residentNextButton;
    nextBtn.addEventListener('click', () => {
      step = 'round2';
      update();
    });
    wrap.appendChild(nextBtn);

    return wrap;
  }

  function renderRound2View({ showClosing }) {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner';

    const missionTitle = document.createElement('h2');
    missionTitle.className = 'stage-mission-title';
    missionTitle.textContent = data.missionTitle;
    wrap.appendChild(missionTitle);

    const lead = document.createElement('p');
    lead.className = 'stage-round2-lead';
    lead.textContent = data.round2Lead;
    wrap.appendChild(lead);

    const questionText = document.createElement('p');
    questionText.className = 'stage-question';
    questionText.textContent = data.round2Question;
    wrap.appendChild(questionText);

    wrap.appendChild(
      renderChoiceList({
        selectedIndex: round2Index,
        disabled: showClosing,
        onSelect: (idx) => {
          round2Index = idx;
          step = 'round2-feedback';
          update();
          focusNextButton();
        },
      })
    );

    if (showClosing) {
      const closing = document.createElement('p');
      closing.className = 'stage-feedback feedback-neutral';
      closing.setAttribute('role', 'status');
      closing.textContent = tier === 'advanced' ? data.round2ClosingAdvanced : data.round2Closing;
      wrap.appendChild(closing);

      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'btn btn-primary stage-next-btn';
      nextBtn.textContent = data.round2NextButton;
      nextBtn.addEventListener('click', () => {
        step = 'badge';
        update();
      });
      wrap.appendChild(nextBtn);
    }

    return wrap;
  }

  function renderChoiceList({ selectedIndex, disabled, onSelect }) {
    const choiceList = document.createElement('div');
    choiceList.className = 'choice-list';
    choiceList.setAttribute('role', 'group');

    choices.forEach((choice, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice-btn';
      const label = String.fromCharCode(65 + idx);
      btn.textContent = `${label}. ${choice.label}`;

      if (idx === selectedIndex) {
        btn.classList.add('choice-selected');
      }
      if (disabled) {
        btn.disabled = true;
      }

      btn.addEventListener('click', () => {
        if (disabled) return;
        onSelect(idx);
      });
      choiceList.appendChild(btn);
    });

    return choiceList;
  }

  function renderBadgeView() {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner badge-inner';

    const badge = document.createElement('div');
    badge.className = 'badge-icon badge-see';
    badge.setAttribute('aria-hidden', 'true');
    badge.textContent = 'S';
    wrap.appendChild(badge);

    const badgeLabel = document.createElement('p');
    badgeLabel.className = 'badge-label';
    badgeLabel.textContent = data.badgeLabel;
    wrap.appendChild(badgeLabel);

    const title = document.createElement('h2');
    title.className = 'badge-title';
    title.textContent = data.badgeTitle;
    wrap.appendChild(title);

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

  function focusNextButton() {
    const nextBtn = container.querySelector('.stage-next-btn');
    if (nextBtn) nextBtn.focus();
  }

  update();
  return container;
}
