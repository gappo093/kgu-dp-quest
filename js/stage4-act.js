// KGU DP QUEST - STAGE4 ACT
//
// data/content.js の stage4.nodes に定義されたグラフを辿るだけの汎用ウォーカー。
// ノードの種類（type）:
//   decision         : 選択肢を選ぶと即座に次のノードへ（正誤なし）
//   blocked          : 単独では進められない場面。「◯◯に相談する」ボタンのみ
//   contact          : NPCと話す場面。次のノードへ進める
//   decision-neutral : SEE/THINK同様、正誤や誘導のない最終判断（住民への説明）
//   badge            : ACT BADGE GET画面
//
// 途中経過（現在のノードID・相談済みNPC）はモジュール内ローカル変数のみで保持し、
// state.js（localStorage）には保存しない（ステージに入り直すと常にphaseA-questionから）。

import { content } from '../data/content.js';
import { depthTierForGrade } from './grade-depth.js';

export function renderStage4Act({ grade, onComplete }) {
  const data = content.stage4;
  const container = document.createElement('section');
  container.className = 'screen screen-stage';

  // 学年別の判断深度（v0.2 5章）：1年はフェーズCの選択肢を絞り、4年はクロージング文を
  // より踏み込んだ内容にする。2〜3年・未選択（3年相当が既定）は現行の標準版のまま。
  // フェーズA・Bの必須NPC相談への収束構造（CLAUDE.md 2.4）自体は学年によらず変更しない。
  const tier = depthTierForGrade(grade);

  let currentNodeId = data.startNode;
  const consulted = new Set();

  // decision-neutral（フェーズC）専用のサブ状態。SEE/THINKと同じ「選択→クロージング」構成。
  let phaseCStep = 'choosing';
  let phaseCIndex = null;

  function goToNode(nodeId) {
    currentNodeId = nodeId;
    const node = data.nodes[nodeId];
    if (node.type === 'contact') {
      consulted.add(node.character);
    }
    update();
    focusNextButton();
  }

  function update() {
    container.innerHTML = '';
    container.appendChild(renderNode());
  }

  function focusNextButton() {
    const nextBtn = container.querySelector('.stage-next-btn');
    if (nextBtn) nextBtn.focus();
  }

  function renderNode() {
    const node = data.nodes[currentNodeId];
    switch (node.type) {
      case 'decision':
        return renderDecisionView(node);
      case 'blocked':
        return renderBlockedView(node);
      case 'contact':
        return renderContactView(node);
      case 'decision-neutral':
        return renderDecisionNeutralView(node);
      case 'badge':
        return renderBadgeView();
      default:
        return document.createElement('div');
    }
  }

  function renderMissionTitle() {
    const h2 = document.createElement('h2');
    h2.className = 'stage-mission-title';
    h2.textContent = data.missionTitle;
    return h2;
  }

  function renderBriefing() {
    const box = document.createElement('div');
    box.className = 'briefing-box';
    data.briefingLines.forEach((line) => {
      const p = document.createElement('p');
      p.textContent = line;
      box.appendChild(p);
    });
    return box;
  }

  function renderChoiceList({ choices, selectedIndex, disabled, onSelect }) {
    const choiceList = document.createElement('div');
    choiceList.className = 'choice-list';
    choiceList.setAttribute('role', 'group');

    choices.forEach((choice, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice-btn';
      const label = String.fromCharCode(65 + idx);
      btn.textContent = `${label}. ${choice.label}`;

      if (idx === selectedIndex) btn.classList.add('choice-selected');
      if (disabled) btn.disabled = true;

      btn.addEventListener('click', () => {
        if (disabled) return;
        onSelect(idx, choice);
      });
      choiceList.appendChild(btn);
    });

    return choiceList;
  }

  function renderDecisionView(node) {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner';
    wrap.appendChild(renderMissionTitle());

    if (currentNodeId === data.startNode) {
      wrap.appendChild(renderBriefing());
    }

    const questionText = document.createElement('p');
    questionText.className = 'stage-question';
    questionText.textContent = node.question;
    wrap.appendChild(questionText);

    wrap.appendChild(
      renderChoiceList({
        choices: node.choices,
        selectedIndex: null,
        disabled: false,
        onSelect: (idx, choice) => {
          goToNode(choice.outcome);
        },
      })
    );

    return wrap;
  }

  function renderBlockedView(node) {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner';
    wrap.appendChild(renderMissionTitle());

    const message = document.createElement('p');
    message.className = 'blocked-box';
    message.setAttribute('role', 'status');
    message.textContent = node.message;
    wrap.appendChild(message);

    const contactBtn = document.createElement('button');
    contactBtn.type = 'button';
    contactBtn.className = 'btn btn-primary stage-next-btn';
    contactBtn.textContent = node.contact.label;
    contactBtn.addEventListener('click', () => {
      goToNode(node.contact.outcome);
    });
    wrap.appendChild(contactBtn);

    return wrap;
  }

  function renderContactView(node) {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner';
    wrap.appendChild(renderMissionTitle());

    const character = data.characters[node.character];

    const card = document.createElement('div');
    card.className = 'character-card';

    const name = document.createElement('p');
    name.className = 'character-name';
    name.textContent = character.name;
    card.appendChild(name);

    const role = document.createElement('p');
    role.className = 'character-role';
    role.textContent = character.role;
    card.appendChild(role);

    wrap.appendChild(card);

    const dialogue = document.createElement('div');
    dialogue.className = 'dialogue-box';
    node.dialogue.forEach((line) => {
      const p = document.createElement('p');
      p.textContent = line;
      dialogue.appendChild(p);
    });
    wrap.appendChild(dialogue);

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'btn btn-primary stage-next-btn';
    nextBtn.textContent = data.contactNextButton;
    nextBtn.addEventListener('click', () => {
      goToNode(node.outcome);
    });
    wrap.appendChild(nextBtn);

    return wrap;
  }

  function renderDecisionNeutralView(node) {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner';
    wrap.appendChild(renderMissionTitle());

    const choices = tier === 'basic' ? node.choices.slice(0, 2) : node.choices;

    const questionText = document.createElement('p');
    questionText.className = 'stage-question';
    questionText.textContent = node.question;
    wrap.appendChild(questionText);

    if (phaseCStep === 'choosing') {
      if (node.optionalContact && !consulted.has(node.optionalContact.character)) {
        const optionalBtn = document.createElement('button');
        optionalBtn.type = 'button';
        optionalBtn.className = 'btn btn-secondary';
        optionalBtn.textContent = node.optionalContact.label;
        optionalBtn.addEventListener('click', () => {
          goToNode(node.optionalContact.targetNodeId);
        });
        wrap.appendChild(optionalBtn);
      }

      wrap.appendChild(
        renderChoiceList({
          choices,
          selectedIndex: null,
          disabled: false,
          onSelect: (idx) => {
            phaseCIndex = idx;
            phaseCStep = 'closing';
            update();
            focusNextButton();
          },
        })
      );
    } else {
      wrap.appendChild(
        renderChoiceList({
          choices,
          selectedIndex: phaseCIndex,
          disabled: true,
          onSelect: () => {},
        })
      );

      const consultedResidents = Boolean(node.optionalContact) && consulted.has(node.optionalContact.character);
      const closing = document.createElement('p');
      closing.className = 'stage-feedback feedback-neutral';
      closing.setAttribute('role', 'status');
      closing.textContent =
        tier === 'advanced'
          ? data.phaseCClosingAdvanced
          : consultedResidents
            ? node.closingConsulted
            : node.closing;
      wrap.appendChild(closing);

      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'btn btn-primary stage-next-btn';
      nextBtn.textContent = data.nextButton;
      nextBtn.addEventListener('click', () => {
        goToNode(node.outcome);
      });
      wrap.appendChild(nextBtn);
    }

    return wrap;
  }

  function renderBadgeView() {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner badge-inner';

    const badge = document.createElement('div');
    badge.className = 'badge-icon badge-act';
    badge.setAttribute('aria-hidden', 'true');
    badge.textContent = 'A';
    wrap.appendChild(badge);

    const badgeLabel = document.createElement('p');
    badgeLabel.className = 'badge-label';
    badgeLabel.textContent = data.badgeLabel;
    wrap.appendChild(badgeLabel);

    const title = document.createElement('h2');
    title.className = 'badge-title';
    title.textContent = data.badgeTitle;
    wrap.appendChild(title);

    const recap = document.createElement('div');
    recap.className = 'recap-box';

    const recapTitle = document.createElement('p');
    recapTitle.className = 'recap-title';
    recapTitle.textContent = data.recapTitle;
    recap.appendChild(recapTitle);

    const recapList = document.createElement('ul');
    recapList.className = 'recap-list';
    consulted.forEach((characterKey) => {
      const li = document.createElement('li');
      li.textContent = data.characters[characterKey].name;
      recapList.appendChild(li);
    });
    recap.appendChild(recapList);
    wrap.appendChild(recap);

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

  update();
  return container;
}
