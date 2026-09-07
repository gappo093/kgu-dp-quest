// KGU DP QUEST - エンディング画面（spec doc 11.4）
//
// YOUR NEXT QUESTから独立させた、QUEST全体の最終画面。YOUR NEXT QUESTが
// 「これから何を学ぶか」の案内と「体験の締めくくり」を1画面で兼ねていたことで
// 終了地点が学生に伝わらないという指摘を受け、分離した。ボタンは「はじめから」
// のみとする（「QUESTを振り返る」は設けない。振り返りたい場合ははじめから
// 体験し直す想定）。

import { content } from '../data/content.js';

export function renderEnding({ onRestart }) {
  const data = content.ending;
  const container = document.createElement('section');
  container.className = 'screen screen-stage';

  const wrap = document.createElement('div');
  wrap.className = 'stage-inner badge-inner';

  const title = document.createElement('h2');
  title.className = 'badge-title';
  title.textContent = data.title;
  wrap.appendChild(title);

  const message = document.createElement('div');
  message.className = 'badge-explain';
  data.message.forEach((line) => {
    const p = document.createElement('p');
    p.textContent = line;
    message.appendChild(p);
  });
  wrap.appendChild(message);

  const restartBtn = document.createElement('button');
  restartBtn.type = 'button';
  restartBtn.className = 'btn btn-primary';
  restartBtn.textContent = data.restartButton;
  restartBtn.addEventListener('click', () => {
    const confirmed = window.confirm(data.restartConfirm);
    if (!confirmed) return;
    onRestart();
  });
  wrap.appendChild(restartBtn);

  container.appendChild(wrap);
  return container;
}
