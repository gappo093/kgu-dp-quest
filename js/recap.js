// KGU DP QUEST - あなたの振り返り（v0.2、MY DP STATUSとYOUR NEXT QUESTの間）
//
// Pre/Post計7問（認知・理解・適用×4・自己認識）とReflectの回答を、1問ずつ
// ページング形式で表示する（spec doc 14章）。一覧でまとめて表示すると、
// 不正解がどれで何が正しいのか埋もれてしまうという指摘を受けて改訂した。
//
// ページ構成（8ページ、Q1→Q7の既存設問順を踏襲）：
//   1. Q1 認知（正誤なし、Pre/Post比較のみ）
//   2. Q2 理解（正誤なし、Pre/Post比較の後に大学公式の定義文を参考として提示）
//   3〜6. Q3〜Q6 適用：Know/See/Think/Actそれぞれ1問（正誤あり）
//   7. Q7 自己認識（正誤なし、Pre/Post比較のみ）
//   8. Reflectの振り返り（選んだ力の対応＋自由記述の引用）
//
// AIによる評価・採点は行わない。MY DP STATUSと同様「評価ではなく振り返りのため」の
// 位置づけを明示する。この画面自体の途中経過（現在ページ）は他ステージ同様、
// 非永続（state.jsには保存しない）。
//
// Reflectの選択肢（content.complete.reflect.options）とcontent.recap.reflectPowersは
// 同じ並び順（Know→See→Think→Actの順）に対応させて、選択されたテキストから力の名前を
// 逆引きする。

import { content } from '../data/content.js';

const TOTAL_PAGES = 8;

export function renderRecap({ preSurvey, postSurvey, reflect, onComplete }) {
  const data = content.recap;
  const surveyData = content.survey;
  const container = document.createElement('section');
  container.className = 'screen screen-stage';

  let pageIndex = 0;

  function update() {
    container.innerHTML = '';
    container.appendChild(renderPage());
  }

  function goNext() {
    pageIndex += 1;
    update();
    focusNextButton();
  }

  function focusNextButton() {
    const btn = container.querySelector('.stage-next-btn');
    if (btn) btn.focus();
  }

  function renderHeader(wrap) {
    const title = document.createElement('h2');
    title.className = 'stage-mission-title';
    title.textContent = data.title;
    wrap.appendChild(title);

    if (pageIndex === 0) {
      const disclaimer = document.createElement('p');
      disclaimer.className = 'status-disclaimer';
      disclaimer.textContent = data.disclaimer;
      wrap.appendChild(disclaimer);
    } else {
      const progress = document.createElement('p');
      progress.className = 'stage-progress';
      progress.textContent = `${pageIndex + 1} / ${TOTAL_PAGES}`;
      wrap.appendChild(progress);
    }
  }

  function renderNextButton(wrap, label, onClick) {
    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'btn btn-primary stage-next-btn';
    nextBtn.textContent = label;
    nextBtn.addEventListener('click', onClick);
    wrap.appendChild(nextBtn);
  }

  // 正誤なしのPre/Post比較（Q1・Q7で使用）。
  function renderComparePair(wrap, preAnswer, postAnswer) {
    const pair = document.createElement('div');
    pair.className = 'compare-pair';

    const pre = document.createElement('p');
    pre.className = 'compare-value compare-value-pre';
    pre.textContent = `${data.preLabel}：${preAnswer || '（未回答）'}`;
    pair.appendChild(pre);

    const post = document.createElement('p');
    post.className = 'compare-value compare-value-post';
    post.textContent = `${data.postLabel}：${postAnswer || '（未回答）'}`;
    pair.appendChild(post);

    wrap.appendChild(pair);
  }

  // 正誤ありのPre/Post比較（Q3〜Q6の適用設問で使用）。
  function renderApplicationComparePair(wrap, preAnswer, postAnswer, correctness, correctAnswerLabel) {
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

    wrap.appendChild(pair);
  }

  function renderQuestionText(wrap, text) {
    const q = document.createElement('p');
    q.className = 'compare-question';
    q.textContent = text;
    wrap.appendChild(q);
  }

  function renderQ1View() {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner';
    renderHeader(wrap);
    renderQuestionText(wrap, surveyData.common.q1.question);
    renderComparePair(wrap, preSurvey.awareness, postSurvey.awareness);
    renderNextButton(wrap, data.nextButton, goNext);
    return wrap;
  }

  function renderQ2View() {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner';
    renderHeader(wrap);
    renderQuestionText(wrap, surveyData.common.q2.question);
    renderComparePair(wrap, preSurvey.understanding, postSurvey.understanding);

    const officialTitle = document.createElement('p');
    officialTitle.className = 'recap-title';
    officialTitle.textContent = data.officialAnswerTitle;
    wrap.appendChild(officialTitle);

    const officialLead = document.createElement('p');
    officialLead.className = 'compare-question';
    officialLead.textContent = data.officialAnswerLead;
    wrap.appendChild(officialLead);

    const officialBox = document.createElement('div');
    officialBox.className = 'briefing-box';
    const officialText = document.createElement('p');
    officialText.textContent = content.complete.dpDefinition;
    officialBox.appendChild(officialText);
    wrap.appendChild(officialBox);

    renderNextButton(wrap, data.nextButton, goNext);
    return wrap;
  }

  function renderApplicationView(appIdx) {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner';
    renderHeader(wrap);

    const q = surveyData.common.applicationQuestions[appIdx];
    renderQuestionText(wrap, q.stemPost);

    const preChoiceLabel = (dpKey) =>
      (surveyData.common.applicationChoicesPre.find((c) => c.dpKey === dpKey) || {}).label;
    const postChoiceLabel = (dpKey) =>
      (surveyData.common.applicationChoicesPost.find((c) => c.dpKey === dpKey) || {}).label;

    const postAnswerKey = postSurvey.application[q.dpKey];
    const correctness = postAnswerKey == null ? undefined : postAnswerKey === q.dpKey;

    renderApplicationComparePair(
      wrap,
      preChoiceLabel(preSurvey.application[q.dpKey]),
      postChoiceLabel(postAnswerKey),
      correctness,
      postChoiceLabel(q.dpKey)
    );

    renderNextButton(wrap, data.nextButton, goNext);
    return wrap;
  }

  function renderQ7View() {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner';
    renderHeader(wrap);
    renderQuestionText(wrap, surveyData.common.q4.question);
    renderComparePair(wrap, preSurvey.selfAwareness, postSurvey.selfAwareness);
    renderNextButton(wrap, data.nextButton, goNext);
    return wrap;
  }

  function renderReflectView() {
    const wrap = document.createElement('div');
    wrap.className = 'stage-inner';
    renderHeader(wrap);

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

    renderNextButton(wrap, data.nextButton, onComplete);
    return wrap;
  }

  function renderPage() {
    switch (pageIndex) {
      case 0:
        return renderQ1View();
      case 1:
        return renderQ2View();
      case 2:
      case 3:
      case 4:
      case 5:
        return renderApplicationView(pageIndex - 2);
      case 6:
        return renderQ7View();
      case 7:
        return renderReflectView();
      default:
        return document.createElement('div');
    }
  }

  update();
  return container;
}
