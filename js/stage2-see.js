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

const SHELTER_SVG = `
<svg viewBox="0 0 320 120" role="img" aria-labelledby="shelterDiagramTitle">
  <title id="shelterDiagramTitle">避難所の模式図。建物の中に、体調の悪い人・家族連れ・ペット同伴者・外国人住民を示す4つのアイコンが並んでいる。</title>
  <path d="M10 40 L160 10 L310 40 L310 100 L10 100 Z" fill="none" stroke="var(--color-border)" stroke-width="2" />
  <circle cx="70" cy="70" r="15" fill="#3ddc97" opacity="0.85" />
  <path d="M62 70 L78 70 M70 62 L70 78" stroke="#06121f" stroke-width="2.4" />
  <circle cx="135" cy="70" r="15" fill="#6fc3ff" opacity="0.85" />
  <circle cx="130" cy="65" r="4" fill="#06121f" opacity="0.5" />
  <circle cx="200" cy="70" r="15" fill="#ff8a3d" opacity="0.85" />
  <path d="M193 74 Q200 60 207 74" stroke="#06121f" stroke-width="2.2" fill="none" />
  <circle cx="265" cy="70" r="15" fill="#ffd166" opacity="0.85" />
  <path d="M258 74 Q265 64 272 74 Q265 68 258 74" fill="#06121f" opacity="0.6" />
</svg>`;

const HAZARD_MAP_SVG = `
<svg viewBox="0 0 320 120" role="img" aria-labelledby="hazardMapDiagramTitle">
  <title id="hazardMapDiagramTitle">住宅地のハザードマップ模式図。区画の一部が浸水想定区域として青く着色されている。</title>
  <rect x="20" y="20" width="280" height="80" fill="none" stroke="var(--color-border)" stroke-width="1.5" />
  <line x1="90" y1="20" x2="90" y2="100" stroke="var(--color-border)" stroke-width="1" />
  <line x1="160" y1="20" x2="160" y2="100" stroke="var(--color-border)" stroke-width="1" />
  <line x1="230" y1="20" x2="230" y2="100" stroke="var(--color-border)" stroke-width="1" />
  <line x1="20" y1="60" x2="300" y2="60" stroke="var(--color-border)" stroke-width="1" />
  <rect x="90" y="20" width="70" height="40" fill="#3aa0ff" opacity="0.35" />
  <g fill="#eef3fb" opacity="0.85">
    <rect x="45" y="70" width="16" height="14" /><path d="M43 70 L53 60 L63 70 Z" />
    <rect x="115" y="30" width="16" height="14" /><path d="M113 30 L123 20 L133 30 Z" />
    <rect x="185" y="70" width="16" height="14" /><path d="M183 70 L193 60 L203 70 Z" />
    <rect x="255" y="30" width="16" height="14" /><path d="M253 30 L263 20 L273 30 Z" />
  </g>
</svg>`;

const DIAGRAM_BY_VARIANT = {
  flood: FLOOD_RISK_SVG,
  shelter: SHELTER_SVG,
  hazardMap: HAZARD_MAP_SVG,
};

function pickRandomScenario(scenarios) {
  return scenarios[Math.floor(Math.random() * scenarios.length)];
}

export function renderStage2See({ grade, onComplete }) {
  const data = content.stage2;
  const scenario = pickRandomScenario(data.scenarios);
  const container = document.createElement('section');
  container.className = 'screen screen-stage';

  // 学年別の判断深度（v0.2 5章）：1年は選択肢を絞り、4年はクロージング文をより
  // 踏み込んだ内容にする。2〜3年・未選択（3年相当が既定）は現行の標準版のまま。
  // 往復構造（選択→視点提示→再選択）自体は学年によらず共通で、入力形式は変えない。
  const tier = depthTierForGrade(grade);
  const choices = tier === 'basic' ? scenario.choices.slice(0, 2) : scenario.choices;

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
          question: scenario.question,
          selectedIndex: round1Index,
          showFollowUp: false,
        });
      case 'round1-feedback':
        return renderChoiceView({
          question: scenario.question,
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
    diagram.innerHTML = DIAGRAM_BY_VARIANT[scenario.diagramVariant];
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
    lead.textContent = scenario.introLead;
    wrap.appendChild(lead);

    const factList = document.createElement('ul');
    factList.className = 'scenario-fact-list';
    scenario.scenarioFacts.forEach((fact) => {
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
    name.textContent = scenario.residentCharacterName;
    card.appendChild(name);

    const role = document.createElement('p');
    role.className = 'character-role';
    role.textContent = scenario.residentCharacterRole;
    card.appendChild(role);

    wrap.appendChild(card);

    const dialogue = document.createElement('div');
    dialogue.className = 'dialogue-box';
    scenario.residentDialogue.forEach((line) => {
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
      closing.textContent = tier === 'advanced' ? scenario.round2ClosingAdvanced : scenario.round2Closing;
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
