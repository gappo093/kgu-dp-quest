// KGU DP QUEST - あなたの振り返り（v0.2、MY DP STATUSとYOUR NEXT QUESTの間）
//
// Pre/PostアンケートとReflectの回答を、本人の入力のまま並べて表示する画面。
// AIによる評価・採点は行わない。MY DP STATUSと同様「評価ではなく振り返りのため」の
// 位置づけを明示する。
//
// Reflectの選択肢（content.complete.reflect.options）とcontent.recap.reflectPowersは
// 同じ並び順（Know→See→Think→Actの順）に対応させて、選択されたテキストから力の名前を
// 逆引きする。

import { content } from '../data/content.js';

export function renderRecap({ preSurvey, postSurvey, reflect, onComplete }) {
  const data = content.recap;
  const surveyData = content.survey;
  const container = document.createElement('section');
  container.className = 'screen screen-stage';

  // correctness: undefined（自己申告設問。正誤なし）/ true（適用設問・正解）/
  // false（適用設問・不正解）。適用設問の正誤はこの画面でのみ、Postの回答直後ではなく
  // ここで一括して表示する。
  function renderSurveyCompareRow(questionText, preAnswer, postAnswer, correctness, correctAnswerLabel) {
    const row = document.createElement('div');
    row.className = 'compare-row';

    const q = document.createElement('p');
    q.className = 'compare-question';
    q.textContent = questionText;
    row.appendChild(q);

    const pair = document.createElement('div');
    pair.className = 'compare-pair';

    const pre = document.createElement('p');
    pre.className = 'compare-value compare-value-pre';
    pre.textContent = `${data.preLabel}：${preAnswer || '（未回答）'}`;
    pair.appendChild(pre);

    const post = document.createElement('p');
    let postText = `${data.postLabel}：${postAnswer || '（未回答）'}`;
    if (correctness === true) {
      postText += data.applicationCorrectSuffix;
      post.className = 'compare-value compare-value-post';
    } else if (correctness === false) {
      postText += `${data.applicationIncorrectSuffix}${correctAnswerLabel}${data.applicationIncorrectSuffixEnd}`;
      post.className = 'compare-value compare-value-incorrect';
    } else {
      post.className = 'compare-value compare-value-post';
    }
    post.textContent = postText;
    pair.appendChild(post);

    row.appendChild(pair);
    return row;
  }

  function renderView() {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner';

    const title = document.createElement('h2');
    title.className = 'stage-mission-title';
    title.textContent = data.title;
    wrap.appendChild(title);

    const disclaimer = document.createElement('p');
    disclaimer.className = 'status-disclaimer';
    disclaimer.textContent = data.disclaimer;
    wrap.appendChild(disclaimer);

    const surveyTitle = document.createElement('p');
    surveyTitle.className = 'recap-title';
    surveyTitle.textContent = data.surveySectionTitle;
    wrap.appendChild(surveyTitle);

    const surveyList = document.createElement('div');
    surveyList.className = 'compare-list';
    surveyList.appendChild(
      renderSurveyCompareRow(surveyData.common.q1.question, preSurvey.awareness, postSurvey.awareness)
    );
    surveyList.appendChild(
      renderSurveyCompareRow(surveyData.common.q2.question, preSurvey.understanding, postSurvey.understanding)
    );
    // 「適用」設問はKnow/See/Think/Actの4問。Pre/Postとも選択されたdpKeyから、
    // 各時点で実際に表示されていた選択肢ラベルに変換して表示する。Postの正誤は
    // Postアンケート画面では出さず、ここで一括して表示する。
    const preChoiceLabel = (dpKey) =>
      (surveyData.common.applicationChoicesPre.find((c) => c.dpKey === dpKey) || {}).label;
    const postChoiceLabel = (dpKey) =>
      (surveyData.common.applicationChoicesPost.find((c) => c.dpKey === dpKey) || {}).label;
    surveyData.common.applicationQuestions.forEach((q) => {
      const postAnswerKey = postSurvey.application[q.dpKey];
      const correctness = postAnswerKey == null ? undefined : postAnswerKey === q.dpKey;
      surveyList.appendChild(
        renderSurveyCompareRow(
          q.stemPost,
          preChoiceLabel(preSurvey.application[q.dpKey]),
          postChoiceLabel(postAnswerKey),
          correctness,
          postChoiceLabel(q.dpKey)
        )
      );
    });
    surveyList.appendChild(
      renderSurveyCompareRow(surveyData.common.q4.question, preSurvey.selfAwareness, postSurvey.selfAwareness)
    );
    wrap.appendChild(surveyList);

    const reflectTitle = document.createElement('p');
    reflectTitle.className = 'recap-title';
    reflectTitle.textContent = data.reflectSectionTitle;
    wrap.appendChild(reflectTitle);

    const reflectOptions = content.complete.reflect.options;
    const selected = (reflect && reflect.selected) || [];
    const mappingList = document.createElement('div');
    mappingList.className = 'reflect-mapping-list';
    selected.forEach((text) => {
      const idx = reflectOptions.indexOf(text);
      const power = idx >= 0 ? data.reflectPowers[idx] : null;
      if (!power) return;
      const row = document.createElement('p');
      row.className = 'reflect-mapping-row';
      row.append(`${text} → `);
      const powerSpan = document.createElement('span');
      powerSpan.className = 'reflect-mapping-power';
      powerSpan.textContent = power;
      row.appendChild(powerSpan);
      mappingList.appendChild(row);
    });
    wrap.appendChild(mappingList);

    const reflectText = reflect && reflect.text ? reflect.text.trim() : '';
    if (reflectText.length > 0) {
      const textIntro = document.createElement('p');
      textIntro.className = 'stage-question';
      textIntro.textContent = data.reflectTextIntro;
      wrap.appendChild(textIntro);

      const quoteBox = document.createElement('div');
      quoteBox.className = 'briefing-box';
      const quoteText = document.createElement('p');
      quoteText.textContent = reflectText;
      quoteBox.appendChild(quoteText);
      wrap.appendChild(quoteBox);
    }

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

  container.appendChild(renderView());
  return container;
}
