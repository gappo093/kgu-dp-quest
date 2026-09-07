// KGU DP QUEST - DP理解度Pre/Postアンケート（v0.2 6章）
//
// Pre（学年選択の直後）とPost（DP開示後）で同じ形式の4問（認知・理解・適用・自己認識）に
// 答えてもらう。Q3「適用」のみ、Preでは正式名称（Know/See/Think/Act）を伏せた言い換えで
// 出題し、Postで初めて正式名称付きの選択肢を出す（体験前にDPの正式名称を明かさないという
// CLAUDE.md 3.2/21.3の原則を守るため）。
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

  const answers = { ...initialAnswers };

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

  let submitBtnSlot;

  function isComplete() {
    return (
      answers.awareness != null &&
      typeof answers.understanding === 'string' &&
      answers.understanding.trim().length > 0 &&
      answers.application != null &&
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
        onSave({ ...answers });
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
    list.appendChild(renderChoiceRow('application', variantData.q3));
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
