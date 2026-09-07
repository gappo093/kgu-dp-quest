// KGU DP QUEST - エントリポイント・画面切り替え

import { loadState, saveState, resetState, hasProgress } from './state.js';
import { content } from '../data/content.js';
import { renderGradeSelect } from './grade-select.js';
import { renderSurvey } from './survey.js';
import { renderStage1Know } from './stage1-know.js';
import { renderStage2See } from './stage2-see.js';
import { renderStage3Think } from './stage3-think.js';
import { renderStage4Act } from './stage4-act.js';
import { renderComplete } from './complete.js';
import { renderStatus, renderNextQuest } from './status.js';

const app = document.getElementById('app');
let state = loadState();
// 起動時は常にTOP画面から見せる（4章）。進行状況（resumeScreen）はTOP画面上の
// 「続きから」ボタンからのみ参照し、リロード時に自動で先の画面へは飛ばさない。
let currentScreen = 'top';

function navigateTo(screen) {
  currentScreen = screen;
  if (screen !== 'top') {
    state.resumeScreen = screen;
    saveState(state);
  }
  render();
}

function render() {
  app.innerHTML = '';
  if (currentScreen === 'top') {
    app.appendChild(renderTopScreen());
  } else if (currentScreen === 'grade-select') {
    app.appendChild(
      renderGradeSelect({
        initialGrade: state.grade,
        onComplete: (grade) => {
          state.grade = grade;
          saveState(state);
          navigateTo('pre-survey');
        },
      })
    );
  } else if (currentScreen === 'pre-survey') {
    app.appendChild(
      renderSurvey({
        variant: 'pre',
        initialAnswers: state.preSurvey,
        onSave: (answers) => {
          state.preSurvey = answers;
          saveState(state);
        },
        onComplete: () => {
          navigateTo('stage1-know');
        },
      })
    );
  } else if (currentScreen === 'post-survey') {
    app.appendChild(
      renderSurvey({
        variant: 'post',
        initialAnswers: state.postSurvey,
        previousAnswers: state.preSurvey,
        onSave: (answers) => {
          state.postSurvey = answers;
          saveState(state);
        },
        onComplete: () => {
          navigateTo('status');
        },
      })
    );
  } else if (currentScreen === 'stage1-know') {
    app.appendChild(
      renderStage1Know({
        onComplete: () => {
          state.badges.know = true;
          navigateTo('stage2-see');
        },
      })
    );
  } else if (currentScreen === 'stage2-see') {
    app.appendChild(
      renderStage2See({
        grade: state.grade,
        onComplete: () => {
          state.badges.see = true;
          navigateTo('stage3-think');
        },
      })
    );
  } else if (currentScreen === 'stage3-think') {
    app.appendChild(
      renderStage3Think({
        grade: state.grade,
        onComplete: () => {
          state.badges.think = true;
          navigateTo('stage4-act');
        },
      })
    );
  } else if (currentScreen === 'stage4-act') {
    app.appendChild(
      renderStage4Act({
        grade: state.grade,
        onComplete: () => {
          state.badges.act = true;
          navigateTo('complete');
        },
      })
    );
  } else if (currentScreen === 'complete') {
    app.appendChild(
      renderComplete({
        onComplete: () => {
          navigateTo('post-survey');
        },
      })
    );
  } else if (currentScreen === 'status') {
    app.appendChild(
      renderStatus({
        initialSelfAssessment: state.selfAssessment,
        onSave: (values) => {
          state.selfAssessment = values;
          saveState(state);
        },
        onComplete: () => {
          navigateTo('next-quest');
        },
      })
    );
  } else if (currentScreen === 'next-quest') {
    app.appendChild(
      renderNextQuest({
        initialGrade: state.grade,
        onReview: () => {
          navigateTo('complete');
        },
        onRestart: () => {
          state = resetState();
          navigateTo('grade-select');
        },
      })
    );
  } else {
    app.appendChild(renderComingSoonScreen(currentScreen));
  }
}

function renderTopScreen() {
  const t = content.top;

  const section = document.createElement('section');
  section.className = 'screen screen-top';

  const bg = document.createElement('div');
  bg.className = 'top-bg';
  bg.setAttribute('aria-hidden', 'true');
  section.appendChild(bg);

  const inner = document.createElement('div');
  inner.className = 'top-inner';

  const h1 = document.createElement('h1');
  h1.className = 'top-title';
  h1.textContent = t.title;
  inner.appendChild(h1);

  const subtitle = document.createElement('p');
  subtitle.className = 'top-subtitle';
  subtitle.textContent = t.subtitle;
  inner.appendChild(subtitle);

  const message = document.createElement('div');
  message.className = 'top-message';
  t.introMessage.forEach((line) => {
    const p = document.createElement('p');
    p.textContent = line;
    message.appendChild(p);
  });
  inner.appendChild(message);

  const actions = document.createElement('div');
  actions.className = 'top-actions';

  if (hasProgress(state)) {
    const continueBtn = document.createElement('button');
    continueBtn.type = 'button';
    continueBtn.className = 'btn btn-primary';
    continueBtn.textContent = t.continueButton;
    continueBtn.addEventListener('click', () => {
      navigateTo(state.resumeScreen || 'grade-select');
    });
    actions.appendChild(continueBtn);

    const restartBtn = document.createElement('button');
    restartBtn.type = 'button';
    restartBtn.className = 'btn btn-secondary';
    restartBtn.textContent = t.restartButton;
    restartBtn.addEventListener('click', () => {
      const confirmed = window.confirm(t.restartConfirm);
      if (!confirmed) return;
      state = resetState();
      navigateTo('stage1-know');
    });
    actions.appendChild(restartBtn);
  } else {
    const startBtn = document.createElement('button');
    startBtn.type = 'button';
    startBtn.className = 'btn btn-primary';
    startBtn.textContent = t.startButton;
    startBtn.addEventListener('click', () => {
      navigateTo('grade-select');
    });
    actions.appendChild(startBtn);
  }

  inner.appendChild(actions);
  section.appendChild(inner);
  return section;
}

// 通常は到達しないフォールバック。resumeScreenが不正な値になった場合
// （手動でlocalStorageを書き換えた場合等）に、白画面で止まらないようにする。
function renderComingSoonScreen(screenName) {
  const section = document.createElement('section');
  section.className = 'screen screen-placeholder';

  const inner = document.createElement('div');
  inner.className = 'placeholder-inner';

  const h2 = document.createElement('h2');
  h2.textContent = '予期しない画面です';
  inner.appendChild(h2);

  const p = document.createElement('p');
  p.textContent = `「${screenName}」という画面は見つかりませんでした。お手数ですが、TOPからやり直してください。`;
  inner.appendChild(p);

  const backBtn = document.createElement('button');
  backBtn.type = 'button';
  backBtn.className = 'btn btn-secondary';
  backBtn.textContent = 'TOPにもどる';
  backBtn.addEventListener('click', () => {
    navigateTo('top');
  });
  inner.appendChild(backBtn);

  section.appendChild(inner);
  return section;
}

render();
