// KGU DP QUEST - QUEST COMPLETE + DP解説（9〜10章）
//
// 「体験が先、DPという名前は後」の順番を壊さないよう、3ステップに分けて表示する。
//   1. badges : 4バッジ＋QUEST COMPLETE!（DP・Diploma Policyの語は一切出さない）
//   2. reveal : 「実は…Diploma Policy（DP）です」の開示文のみ
//   3. table  : KNOW→DP1〜ACT→DP4の対応表
// ステップ間には必ず学生の能動的なクリックを挟み、「明かされる」感覚を保つ。
//
// 途中のステップ（badges/reveal/table）はモジュール内ローカル変数のみで保持し、
// state.js（localStorage）には保存しない（画面に入り直すと常にbadgesから）。

import { content } from '../data/content.js';

const BADGE_ORDER = ['know', 'see', 'think', 'act'];
const BADGE_LETTERS = { know: 'K', see: 'S', think: 'T', act: 'A' };

export function renderComplete({ onComplete }) {
  const data = content.complete;
  const container = document.createElement('section');
  container.className = 'screen screen-stage';

  let step = 'badges';

  function update() {
    container.innerHTML = '';
    container.appendChild(renderStep());
  }

  function focusNextButton() {
    const nextBtn = container.querySelector('.stage-next-btn');
    if (nextBtn) nextBtn.focus();
  }

  function goToStep(next) {
    step = next;
    update();
    focusNextButton();
  }

  function renderStep() {
    switch (step) {
      case 'badges':
        return renderBadgesView();
      case 'reveal':
        return renderRevealView();
      case 'table':
        return renderTableView();
      default:
        return document.createElement('div');
    }
  }

  function renderBadgesView() {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner badge-inner complete-badges-inner';

    const row = document.createElement('div');
    row.className = 'complete-badge-row';
    BADGE_ORDER.forEach((key) => {
      const item = document.createElement('div');
      item.className = 'complete-badge-item';

      const icon = document.createElement('div');
      icon.className = `badge-icon badge-${key}`;
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = BADGE_LETTERS[key];
      item.appendChild(icon);

      const label = document.createElement('p');
      label.className = 'badge-label';
      label.textContent = data.badgeNames[key];
      item.appendChild(label);

      row.appendChild(item);
    });
    wrap.appendChild(row);

    const title = document.createElement('h2');
    title.className = 'badge-title complete-title';
    title.textContent = data.badgeScreenTitle;
    wrap.appendChild(title);

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'btn btn-primary stage-next-btn';
    nextBtn.textContent = data.nextButton;
    nextBtn.addEventListener('click', () => goToStep('reveal'));
    wrap.appendChild(nextBtn);

    return wrap;
  }

  function renderRevealView() {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner reveal-inner';

    const text = document.createElement('div');
    text.className = 'reveal-text';
    data.revealLines.forEach((line) => {
      const p = document.createElement('p');
      p.textContent = line;
      text.appendChild(p);
    });
    wrap.appendChild(text);

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'btn btn-primary stage-next-btn';
    nextBtn.textContent = data.nextButton;
    nextBtn.addEventListener('click', () => goToStep('table'));
    wrap.appendChild(nextBtn);

    return wrap;
  }

  function renderTableView() {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner';

    const intro = document.createElement('p');
    intro.className = 'stage-question';
    intro.textContent = data.dpTableIntro;
    wrap.appendChild(intro);

    const table = document.createElement('div');
    table.className = 'dp-mapping-list';
    data.dpMapping.forEach((row) => {
      const item = document.createElement('div');
      item.className = 'dp-mapping-row';

      const from = document.createElement('span');
      from.className = 'dp-mapping-from';
      from.textContent = row.from;

      const arrow = document.createElement('span');
      arrow.className = 'dp-mapping-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '→';

      const to = document.createElement('span');
      to.className = 'dp-mapping-to';
      to.textContent = row.to;

      item.append(from, arrow, to);
      table.appendChild(item);
    });
    wrap.appendChild(table);

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'btn btn-primary stage-next-btn';
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
