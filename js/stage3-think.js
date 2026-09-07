// KGU DP QUEST - STAGE3 THINK
//
// 学習目的（7章）：問題発見→仮説→情報収集→分析→判断→説明、という
// 問題解決プロセスを体験させる。STEP1・STEP3はSEEと同様、正誤や誘導を
// 感じさせない中立な選択（neutral選択スタイルのみ）にする。
//
// STEP2は4種類の追加情報をすべて開く（一度でも展開する）までSTEP3に進めない。
// 開く順番は自由。
//
// 途中経過（STEP・選択内容・カード閲覧状況）はモジュール内ローカル変数のみで保持し、
// state.js（localStorage）には保存しない（ステージに入り直すと常にSTEP1から）。

import { content } from '../data/content.js';
import { depthTierForGrade } from './grade-depth.js';

const SENSOR_ALERT_SVG = `
<svg viewBox="0 0 120 80" role="img" aria-labelledby="sensorAlertTitle">
  <title id="sensorAlertTitle">斜面の傾斜計が異常な変位を検知したことを示すアイコン。</title>
  <circle cx="60" cy="28" r="13" fill="none" stroke="#3aa0ff" stroke-width="3" />
  <circle cx="60" cy="28" r="4.5" fill="#3aa0ff" />
  <path d="M60 41 L60 58" stroke="#3aa0ff" stroke-width="3" />
  <path d="M45 58 L75 58" stroke="#6fc3ff" stroke-width="3" />
  <path d="M38 16 Q60 0 82 16" stroke="#ff8a3d" stroke-width="2.4" fill="none" stroke-dasharray="4 4" />
</svg>`;

export function renderStage3Think({ grade, onComplete }) {
  const data = content.stage3;
  const container = document.createElement('section');
  container.className = 'screen screen-stage';

  // 学年別の判断深度（v0.2 5章）：1年は確認必須の情報カード枚数を減らし、
  // 4年は最後に説明を求める。2〜3年・未選択（3年相当が既定）は現行の完全版のまま。
  const tier = depthTierForGrade(grade);
  const requiredCardCount = tier === 'basic' ? data.step2BasicRequiredCount : data.infoCards.length;

  let step = 'step1';
  let step1Index = null;
  let step3Index = null;
  let explainText = '';
  const viewedState = data.infoCards.map(() => false);

  function update() {
    container.innerHTML = '';
    container.appendChild(renderStep());
  }

  function renderStep() {
    switch (step) {
      case 'step1':
        return renderStep1View();
      case 'step2':
        return renderStep2View();
      case 'step3':
        return renderStep3View({ showClosing: false });
      case 'step3-closing':
        return renderStep3View({ showClosing: true });
      case 'explain':
        return renderExplainView();
      case 'badge':
        return renderBadgeView();
      default:
        return document.createElement('div');
    }
  }

  function renderAlert() {
    const alertBox = document.createElement('div');
    alertBox.className = 'alert-box';

    const icon = document.createElement('div');
    icon.className = 'alert-icon';
    icon.innerHTML = SENSOR_ALERT_SVG;
    alertBox.appendChild(icon);

    const text = document.createElement('div');
    text.className = 'alert-text';
    data.alertLines.forEach((line) => {
      const p = document.createElement('p');
      p.textContent = line;
      text.appendChild(p);
    });
    alertBox.appendChild(text);

    return alertBox;
  }

  function renderChoiceList({ selectedIndex, disabled, onSelect }) {
    const choiceList = document.createElement('div');
    choiceList.className = 'choice-list';
    choiceList.setAttribute('role', 'group');

    data.causeChoices.forEach((choiceText, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice-btn';
      const label = String.fromCharCode(65 + idx);
      btn.textContent = `${label}. ${choiceText}`;

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

  function renderStep1View() {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner';

    const missionTitle = document.createElement('h2');
    missionTitle.className = 'stage-mission-title';
    missionTitle.textContent = data.missionTitle;
    wrap.appendChild(missionTitle);

    wrap.appendChild(renderAlert());

    const questionText = document.createElement('p');
    questionText.className = 'stage-question';
    questionText.textContent = data.step1Question;
    wrap.appendChild(questionText);

    const isSelected = step1Index !== null;
    wrap.appendChild(
      renderChoiceList({
        selectedIndex: step1Index,
        disabled: isSelected,
        onSelect: (idx) => {
          step1Index = idx;
          update();
          focusNextButton();
        },
      })
    );

    if (isSelected) {
      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'btn btn-primary stage-next-btn';
      nextBtn.textContent = data.step1NextButton;
      nextBtn.addEventListener('click', () => {
        step = 'step2';
        update();
      });
      wrap.appendChild(nextBtn);
    }

    return wrap;
  }

  function renderStep2View() {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner';

    const missionTitle = document.createElement('h2');
    missionTitle.className = 'stage-mission-title';
    missionTitle.textContent = data.missionTitle;
    wrap.appendChild(missionTitle);

    const lead = document.createElement('p');
    lead.className = 'stage-question';
    lead.textContent = tier === 'basic' ? data.step2LeadBasic : data.step2Lead;
    wrap.appendChild(lead);

    const cardList = document.createElement('div');
    cardList.className = 'info-card-list';

    const progress = document.createElement('p');
    progress.className = 'stage-progress';
    progress.setAttribute('role', 'status');

    const nextBtnSlot = document.createElement('div');

    // カード自体は一度だけ生成し、以後は開閉状態を変えない（再生成すると
    // details.open の再設定がtoggleイベントを再発火させ、無限ループになるため）。
    // トグル時は進捗テキストとボタンだけをその場で差し替える部分更新にする。
    function refreshProgress() {
      const viewedCount = viewedState.filter(Boolean).length;
      progress.textContent = `${viewedCount} / ${data.infoCards.length} 枚を確認済み`;

      nextBtnSlot.innerHTML = '';
      if (viewedCount >= requiredCardCount) {
        const nextBtn = document.createElement('button');
        nextBtn.type = 'button';
        nextBtn.className = 'btn btn-primary';
        nextBtn.textContent = data.step2NextButton;
        nextBtn.addEventListener('click', () => {
          step = 'step3';
          update();
        });
        nextBtnSlot.appendChild(nextBtn);
      }
    }

    data.infoCards.forEach((card, idx) => {
      const details = document.createElement('details');
      details.className = 'info-card';

      const summary = document.createElement('summary');
      summary.className = 'info-card-summary';
      summary.textContent = card.title;
      details.appendChild(summary);

      const body = document.createElement('p');
      body.className = 'info-card-body';
      body.textContent = card.body;
      details.appendChild(body);

      details.addEventListener('toggle', () => {
        if (details.open && !viewedState[idx]) {
          viewedState[idx] = true;
          details.classList.add('info-card-viewed');
          summary.textContent = `${card.title} ✓`;
          refreshProgress();
        }
      });

      cardList.appendChild(details);
    });
    wrap.appendChild(cardList);
    wrap.appendChild(progress);
    wrap.appendChild(nextBtnSlot);

    refreshProgress();

    return wrap;
  }

  function renderStep3View({ showClosing }) {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner';

    const missionTitle = document.createElement('h2');
    missionTitle.className = 'stage-mission-title';
    missionTitle.textContent = data.missionTitle;
    wrap.appendChild(missionTitle);

    const lead = document.createElement('p');
    lead.className = 'stage-round2-lead';
    lead.textContent = data.step3Lead;
    wrap.appendChild(lead);

    const reminder = document.createElement('p');
    reminder.className = 'step-reminder';
    reminder.textContent = `${data.step1AnswerReminderPrefix}${data.causeChoices[step1Index]}${data.step1AnswerReminderSuffix}`;
    wrap.appendChild(reminder);

    const questionText = document.createElement('p');
    questionText.className = 'stage-question';
    questionText.textContent = data.step3Question;
    wrap.appendChild(questionText);

    wrap.appendChild(
      renderChoiceList({
        selectedIndex: step3Index,
        disabled: showClosing,
        onSelect: (idx) => {
          step3Index = idx;
          step = 'step3-closing';
          update();
          focusNextButton();
        },
      })
    );

    if (showClosing) {
      const closing = document.createElement('p');
      closing.className = 'stage-feedback feedback-neutral';
      closing.setAttribute('role', 'status');
      closing.textContent = data.step3Closing;
      wrap.appendChild(closing);

      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'btn btn-primary stage-next-btn';
      nextBtn.textContent = data.step3NextButton;
      nextBtn.addEventListener('click', () => {
        step = tier === 'advanced' ? 'explain' : 'badge';
        update();
      });
      wrap.appendChild(nextBtn);
    }

    return wrap;
  }

  function renderExplainView() {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner';
    const explainData = data.advancedExplain;

    const missionTitle = document.createElement('h2');
    missionTitle.className = 'stage-mission-title';
    missionTitle.textContent = data.missionTitle;
    wrap.appendChild(missionTitle);

    const label = document.createElement('label');
    label.className = 'assessment-legend';
    label.setAttribute('for', 'stage3-explain-text');
    label.textContent = explainData.label;
    wrap.appendChild(label);

    const textarea = document.createElement('textarea');
    textarea.id = 'stage3-explain-text';
    textarea.className = 'survey-textarea';
    textarea.rows = 3;
    textarea.placeholder = explainData.placeholder;
    textarea.value = explainText;
    wrap.appendChild(textarea);

    const btnSlot = document.createElement('div');
    wrap.appendChild(btnSlot);

    function refreshButton() {
      btnSlot.innerHTML = '';
      if (explainText.trim().length > 0) {
        const nextBtn = document.createElement('button');
        nextBtn.type = 'button';
        nextBtn.className = 'btn btn-primary stage-next-btn';
        nextBtn.textContent = explainData.button;
        nextBtn.addEventListener('click', () => {
          step = 'badge';
          update();
        });
        btnSlot.appendChild(nextBtn);
      }
    }

    textarea.addEventListener('input', () => {
      explainText = textarea.value;
      refreshButton();
    });
    refreshButton();

    return wrap;
  }

  function renderBadgeView() {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner badge-inner';

    const badge = document.createElement('div');
    badge.className = 'badge-icon badge-think';
    badge.setAttribute('aria-hidden', 'true');
    badge.textContent = 'T';
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
