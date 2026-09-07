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

const SLOPE_ALERT_SVG = `
<svg viewBox="0 0 120 80" role="img" aria-labelledby="slopeAlertTitle">
  <title id="slopeAlertTitle">斜面の傾斜計が異常な変位を検知したことを示すアイコン。</title>
  <circle cx="60" cy="28" r="13" fill="none" stroke="#3aa0ff" stroke-width="3" />
  <circle cx="60" cy="28" r="4.5" fill="#3aa0ff" />
  <path d="M60 41 L60 58" stroke="#3aa0ff" stroke-width="3" />
  <path d="M45 58 L75 58" stroke="#6fc3ff" stroke-width="3" />
  <path d="M38 16 Q60 0 82 16" stroke="#ff8a3d" stroke-width="2.4" fill="none" stroke-dasharray="4 4" />
</svg>`;

const RIVER_ALERT_SVG = `
<svg viewBox="0 0 120 80" role="img" aria-labelledby="riverAlertTitle">
  <title id="riverAlertTitle">河川の水位計が急激な水位上昇を検知したことを示すアイコン。</title>
  <rect x="54" y="14" width="12" height="50" rx="2" fill="none" stroke="#3aa0ff" stroke-width="3" />
  <rect x="54" y="40" width="12" height="24" fill="#3aa0ff" opacity="0.5" />
  <path d="M45 64 L75 64" stroke="#6fc3ff" stroke-width="3" />
  <path d="M38 16 Q60 0 82 16" stroke="#ff8a3d" stroke-width="2.4" fill="none" stroke-dasharray="4 4" />
</svg>`;

const ROAD_ALERT_SVG = `
<svg viewBox="0 0 120 80" role="img" aria-labelledby="roadAlertTitle">
  <title id="roadAlertTitle">市街地の道路に陥没が発生したことを示すアイコン。</title>
  <rect x="20" y="50" width="80" height="8" fill="#6fc3ff" opacity="0.4" />
  <ellipse cx="60" cy="54" rx="14" ry="7" fill="#0c1830" stroke="#3aa0ff" stroke-width="2" />
  <path d="M38 16 Q60 0 82 16" stroke="#ff8a3d" stroke-width="2.4" fill="none" stroke-dasharray="4 4" />
</svg>`;

const ALERT_ICON_BY_VARIANT = {
  slope: SLOPE_ALERT_SVG,
  river: RIVER_ALERT_SVG,
  road: ROAD_ALERT_SVG,
};

function pickRandomScenario(scenarios) {
  return scenarios[Math.floor(Math.random() * scenarios.length)];
}

export function renderStage3Think({ grade, onComplete }) {
  const data = content.stage3;
  const scenario = pickRandomScenario(data.scenarios);
  const container = document.createElement('section');
  container.className = 'screen screen-stage';

  // 学年別の判断深度（v0.2 5章）：1年は確認必須の情報カード枚数を減らし、
  // 4年はクロージング文をより踏み込んだ内容にする。2〜3年・未選択（3年相当が既定）は
  // 現行の標準版のまま。STEP3は正誤をつけない選択式のままにし、入力形式は変えない。
  const tier = depthTierForGrade(grade);
  const requiredCardCount = tier === 'basic' ? data.step2BasicRequiredCount : scenario.infoCards.length;

  let step = 'step1';
  let step1Index = null;
  let step3Index = null;
  let reportIndex = null;
  const viewedState = scenario.infoCards.map(() => false);
  const reportChoices = tier === 'basic' ? data.reportChoices.slice(0, 2) : data.reportChoices;

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
      case 'report':
        return renderReportView({ showClosing: false });
      case 'report-closing':
        return renderReportView({ showClosing: true });
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
    icon.innerHTML = ALERT_ICON_BY_VARIANT[scenario.diagramVariant];
    alertBox.appendChild(icon);

    const text = document.createElement('div');
    text.className = 'alert-text';
    scenario.alertLines.forEach((line) => {
      const p = document.createElement('p');
      p.textContent = line;
      text.appendChild(p);
    });
    alertBox.appendChild(text);

    return alertBox;
  }

  function renderChoiceList({ choices, selectedIndex, disabled, onSelect }) {
    const choiceList = document.createElement('div');
    choiceList.className = 'choice-list';
    choiceList.setAttribute('role', 'group');

    choices.forEach((choiceText, idx) => {
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
        choices: scenario.causeChoices,
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
      progress.textContent = `${viewedCount} / ${scenario.infoCards.length} 枚を確認済み`;

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

    scenario.infoCards.forEach((card, idx) => {
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
    reminder.textContent = `${data.step1AnswerReminderPrefix}${scenario.causeChoices[step1Index]}${data.step1AnswerReminderSuffix}`;
    wrap.appendChild(reminder);

    const questionText = document.createElement('p');
    questionText.className = 'stage-question';
    questionText.textContent = data.step3Question;
    wrap.appendChild(questionText);

    wrap.appendChild(
      renderChoiceList({
        choices: scenario.causeChoices,
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
      closing.textContent = tier === 'advanced' ? data.step3ClosingAdvanced : data.step3Closing;
      wrap.appendChild(closing);

      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'btn btn-primary stage-next-btn';
      nextBtn.textContent = data.step3NextButton;
      nextBtn.addEventListener('click', () => {
        step = 'report';
        update();
      });
      wrap.appendChild(nextBtn);
    }

    return wrap;
  }

  // 「他者への説明」ステップ（spec doc 12.2）。THINKの学習目的（原因を考え、
  // 解決策を導き、他者に説明する）のうち「説明する」を体験させる。選択式のみ
  // （CLAUDE.md 21.4：自由記述はReflectのみで扱う）。
  function renderReportView({ showClosing }) {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner';

    const missionTitle = document.createElement('h2');
    missionTitle.className = 'stage-mission-title';
    missionTitle.textContent = data.missionTitle;
    wrap.appendChild(missionTitle);

    const questionText = document.createElement('p');
    questionText.className = 'stage-question';
    questionText.textContent = data.reportQuestion;
    wrap.appendChild(questionText);

    wrap.appendChild(
      renderChoiceList({
        choices: reportChoices,
        selectedIndex: reportIndex,
        disabled: showClosing,
        onSelect: (idx) => {
          reportIndex = idx;
          step = 'report-closing';
          update();
          focusNextButton();
        },
      })
    );

    if (showClosing) {
      const closing = document.createElement('p');
      closing.className = 'stage-feedback feedback-neutral';
      closing.setAttribute('role', 'status');
      closing.textContent = tier === 'advanced' ? data.reportClosingAdvanced : data.reportClosing;
      wrap.appendChild(closing);

      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'btn btn-primary stage-next-btn';
      nextBtn.textContent = data.reportNextButton;
      nextBtn.addEventListener('click', () => {
        step = 'badge';
        update();
      });
      wrap.appendChild(nextBtn);
    }

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
