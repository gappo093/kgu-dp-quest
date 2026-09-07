// KGU DP QUEST - 学年選択（v0.2 5.3）
//
// TOP画面の直後に配置し、以後Mission内で求める判断の深さの基準にする。
// 学年を持たない利用者（オープンキャンパス参加者・保護者・教職員等、2章の副対象）も
// 「選ばずに進む」で先に進めるようにする。選択結果はstate.gradeとしてlocalStorageに永続化する。

import { content } from '../data/content.js';

export function renderGradeSelect({ initialGrade, onComplete }) {
  const data = content.gradeSelect;
  const container = document.createElement('section');
  container.className = 'screen screen-stage';

  let selected = initialGrade ?? undefined;

  function update() {
    container.innerHTML = '';
    container.appendChild(renderView());
  }

  function renderView() {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner';

    const title = document.createElement('h2');
    title.className = 'stage-mission-title';
    title.textContent = data.title;
    wrap.appendChild(title);

    const intro = document.createElement('div');
    intro.className = 'briefing-box';
    data.intro.forEach((line) => {
      const p = document.createElement('p');
      p.textContent = line;
      intro.appendChild(p);
    });
    wrap.appendChild(intro);

    const choiceList = document.createElement('div');
    choiceList.className = 'choice-list';
    choiceList.setAttribute('role', 'group');
    choiceList.setAttribute('aria-label', data.title);

    data.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice-btn';
      btn.textContent = opt.label;
      if (selected === opt.value) btn.classList.add('choice-selected');
      btn.addEventListener('click', () => {
        selected = opt.value;
        update();
      });
      choiceList.appendChild(btn);
    });

    const skipBtn = document.createElement('button');
    skipBtn.type = 'button';
    skipBtn.className = 'choice-btn';
    skipBtn.textContent = data.skipLabel;
    if (selected === null) skipBtn.classList.add('choice-selected');
    skipBtn.addEventListener('click', () => {
      selected = null;
      update();
    });
    choiceList.appendChild(skipBtn);

    wrap.appendChild(choiceList);

    if (selected !== undefined) {
      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'btn btn-primary stage-next-btn';
      nextBtn.textContent = data.confirmButton;
      nextBtn.addEventListener('click', () => {
        onComplete(selected);
      });
      wrap.appendChild(nextBtn);
    }

    return wrap;
  }

  update();
  return container;
}
