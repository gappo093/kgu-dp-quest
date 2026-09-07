// KGU DP QUEST - MY DP STATUS（11章）
//
// STAGE1〜4の途中経過とは異なり、自己評価（selfAssessment）は
// state.js（localStorage）に永続化する対象。このモジュールは値の読み書き自体は
// 行わず、初期値を受け取り・変更を onSave 経由でmain.js側のstateに反映してもらう
// （state/saveStateの所有者はmain.jsに一本化し、他ステージと責務の持ち方を揃える）。

import { content } from '../data/content.js';

export function renderStatus({ initialSelfAssessment, onSave, onComplete }) {
  const data = content.status;
  const container = document.createElement('section');
  container.className = 'screen screen-stage';

  let step = 'form';
  const answers = { ...initialSelfAssessment };

  function update() {
    container.innerHTML = '';
    container.appendChild(step === 'form' ? renderFormView() : renderResultsView());
  }

  function focusNextButton() {
    const nextBtn = container.querySelector('.stage-next-btn');
    if (nextBtn) nextBtn.focus();
  }

  function renderFormView() {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner status-form-inner';

    const title = document.createElement('h2');
    title.className = 'stage-mission-title';
    title.textContent = data.formTitle;
    wrap.appendChild(title);

    const intro = document.createElement('p');
    intro.className = 'stage-question';
    intro.textContent = data.formIntro;
    wrap.appendChild(intro);

    const guideBox = document.createElement('div');
    guideBox.className = 'guide-box';

    const guideTitle = document.createElement('p');
    guideTitle.className = 'guide-title';
    guideTitle.textContent = data.guideTitle;
    guideBox.appendChild(guideTitle);

    const guideList = document.createElement('div');
    guideList.className = 'guide-list';
    data.guide.forEach((g) => {
      const row = document.createElement('p');
      row.className = 'guide-row';
      row.textContent = `${g.value} — ${g.text}`;
      guideList.appendChild(row);
    });
    guideBox.appendChild(guideList);
    wrap.appendChild(guideBox);

    const list = document.createElement('div');
    list.className = 'assessment-list';

    data.items.forEach((item) => {
      const row = document.createElement('fieldset');
      row.className = 'assessment-row';

      const legend = document.createElement('legend');
      legend.className = 'assessment-legend';
      legend.textContent = `${item.name}：${item.label}`;
      row.appendChild(legend);

      const scale = document.createElement('div');
      scale.className = 'scale-buttons';
      for (let v = data.scaleMin; v <= data.scaleMax; v += 1) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'scale-btn';
        btn.textContent = String(v);
        btn.setAttribute('aria-pressed', String(answers[item.key] === v));
        if (answers[item.key] === v) btn.classList.add('scale-btn-selected');
        btn.addEventListener('click', () => {
          answers[item.key] = v;
          update();
        });
        scale.appendChild(btn);
      }
      row.appendChild(scale);
      list.appendChild(row);
    });
    wrap.appendChild(list);

    const allAnswered = data.items.every((item) => answers[item.key] != null);
    if (allAnswered) {
      const submitBtn = document.createElement('button');
      submitBtn.type = 'button';
      submitBtn.className = 'btn btn-primary stage-next-btn';
      submitBtn.textContent = data.submitButton;
      submitBtn.addEventListener('click', () => {
        onSave({ ...answers });
        step = 'results';
        update();
        focusNextButton();
      });
      wrap.appendChild(submitBtn);
    }

    return wrap;
  }

  function renderResultsView() {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner';

    const title = document.createElement('h2');
    title.className = 'stage-mission-title';
    title.textContent = data.resultsTitle;
    wrap.appendChild(title);

    const bars = document.createElement('div');
    bars.className = 'level-bar-list';
    data.items.forEach((item) => {
      const value = answers[item.key];
      const level = value * 2;

      const row = document.createElement('div');
      row.className = 'level-bar-row';

      const label = document.createElement('span');
      label.className = 'level-bar-label';
      label.textContent = item.name;
      row.appendChild(label);

      const track = document.createElement('span');
      track.className = 'level-bar-track';
      track.setAttribute('role', 'img');
      track.setAttribute('aria-label', `${item.name} レベル${level} / 10`);
      const fill = document.createElement('span');
      fill.className = 'level-bar-fill';
      fill.style.width = `${(level / 10) * 100}%`;
      track.appendChild(fill);
      row.appendChild(track);

      const levelText = document.createElement('span');
      levelText.className = 'level-bar-value';
      levelText.textContent = `${data.levelPrefix}${level}`;
      row.appendChild(levelText);

      bars.appendChild(row);
    });
    wrap.appendChild(bars);

    const disclaimer = document.createElement('p');
    disclaimer.className = 'status-disclaimer';
    disclaimer.textContent = data.disclaimer;
    wrap.appendChild(disclaimer);

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

// KGU DP QUEST - YOUR NEXT QUEST（12章）
//
// QUEST全体の最後の画面。学年は送信・保存せず、その場の表示切り替えにのみ使う
// （state.jsのスキーマには一切影響しない）。オープンキャンパス参加者・保護者・
// 教職員など学年を持たない利用者もいる（2章）ため、学年未選択でも終了できるようにする。
export function renderNextQuest({ initialGrade, onFinish }) {
  const data = content.nextQuest;
  const container = document.createElement('section');
  container.className = 'screen screen-stage';

  let selectedGrade = initialGrade ?? null;

  function update() {
    container.innerHTML = '';
    container.appendChild(renderView());
  }

  function renderView() {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner next-quest-inner';

    const title = document.createElement('h2');
    title.className = 'stage-mission-title';
    title.textContent = data.endTitle;
    wrap.appendChild(title);

    const intro = document.createElement('p');
    intro.className = 'stage-question';
    intro.textContent = data.intro;
    wrap.appendChild(intro);

    const gradeLabel = document.createElement('label');
    gradeLabel.className = 'grade-select-label';
    gradeLabel.textContent = data.gradeLabel;
    gradeLabel.setAttribute('for', 'grade-select');

    const select = document.createElement('select');
    select.id = 'grade-select';
    select.className = 'grade-select';

    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.textContent = data.gradePlaceholder;
    if (selectedGrade === null) placeholderOption.selected = true;
    select.appendChild(placeholderOption);

    data.gradeOptions.forEach((opt) => {
      const option = document.createElement('option');
      option.value = String(opt.value);
      option.textContent = opt.label;
      if (selectedGrade === opt.value) option.selected = true;
      select.appendChild(option);
    });

    select.addEventListener('change', (event) => {
      const raw = event.target.value;
      selectedGrade = raw === '' ? null : Number(raw);
      update();
      const mapLabel = container.querySelector('.course-map-label');
      if (mapLabel) mapLabel.focus();
    });

    wrap.appendChild(gradeLabel);
    wrap.appendChild(select);

    if (selectedGrade !== null) {
      wrap.appendChild(renderCourseMap(selectedGrade));
    }

    const actions = document.createElement('div');
    actions.className = 'top-actions';

    const finishBtn = document.createElement('button');
    finishBtn.type = 'button';
    finishBtn.className = 'btn btn-primary';
    finishBtn.textContent = data.finishButton;
    finishBtn.addEventListener('click', onFinish);
    actions.appendChild(finishBtn);

    wrap.appendChild(actions);

    return wrap;
  }

  function renderCourseMap(grade) {
    const box = document.createElement('div');
    box.className = 'course-map';

    const courseLabel = document.createElement('p');
    courseLabel.className = 'course-map-label';
    courseLabel.textContent = data.courseLabel;
    courseLabel.setAttribute('tabindex', '-1');
    box.appendChild(courseLabel);

    const past = data.subjectGroups.filter((g) => g.maxYear < grade);
    const upcoming = data.subjectGroups.filter((g) => g.maxYear >= grade);

    if (past.length > 0) {
      box.appendChild(renderSubjectSection(data.pastSectionTitle, past, 'subject-section-past'));
    }
    if (upcoming.length > 0) {
      box.appendChild(renderSubjectSection(data.upcomingSectionTitle, upcoming, 'subject-section-upcoming'));
    }

    const note = document.createElement('p');
    note.className = 'course-map-note';
    note.textContent = data.futureNote;
    box.appendChild(note);

    return box;
  }

  function renderSubjectSection(sectionTitle, groups, modifierClass) {
    const section = document.createElement('div');
    section.className = `subject-section ${modifierClass}`;

    const heading = document.createElement('p');
    heading.className = 'subject-section-title';
    heading.textContent = sectionTitle;
    section.appendChild(heading);

    const list = document.createElement('div');
    list.className = 'subject-list';
    groups.forEach((group) => {
      const item = document.createElement('div');
      item.className = 'subject-item';

      const name = document.createElement('p');
      name.className = 'subject-name';
      name.textContent = `${group.subjects}（${group.yearLabel}）`;
      item.appendChild(name);

      const dp = document.createElement('p');
      dp.className = 'subject-dp';
      dp.textContent = `→ ${group.dpFocus}`;
      item.appendChild(dp);

      list.appendChild(item);
    });
    section.appendChild(list);

    return section;
  }

  update();
  return container;
}
