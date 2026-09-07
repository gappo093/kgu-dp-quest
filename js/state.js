// KGU DP QUEST - 状態管理・localStorage永続化
//
// 進捗はブラウザのlocalStorageにのみ保存する（13章：サーバー不要・個人情報を収集しない）。

const STORAGE_KEY = 'kguDpQuestState';
const STATE_VERSION = 4;

function getDefaultSurveyAnswers() {
  return {
    awareness: null,
    understanding: '',
    // 「適用」設問（spec doc 6.2改訂）：Know/See/Think/Actそれぞれについて
    // 選択したdpKeyを保持する。値は各設問の選択肢のdpKey（'know'|'see'|'think'|'act'）。
    application: {
      know: null,
      see: null,
      think: null,
      act: null,
    },
    selfAwareness: null,
  };
}

function getDefaultState() {
  return {
    version: STATE_VERSION,
    resumeScreen: null,
    // 学年（1〜4）。オープンキャンパス参加者等、学年を持たない利用者はnullのまま進める（v0.2 5.3）。
    grade: null,
    badges: {
      know: false,
      see: false,
      think: false,
      act: false,
    },
    // Phase 7（MY DP STATUS）で使用。1~5の自己評価値、未回答はnull。
    selfAssessment: {
      know: null,
      see: null,
      think: null,
      act: null,
    },
    // DP理解度Pre/Postアンケート（v0.2 6章）。selfAssessmentと同様、後から見返す価値があるため永続化する。
    preSurvey: getDefaultSurveyAnswers(),
    postSurvey: getDefaultSurveyAnswers(),
    // Reflect（v0.2 3章）の回答。「あなたの振り返り」画面で再表示するため永続化する。
    reflect: {
      selected: [],
      text: '',
    },
  };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== STATE_VERSION) return getDefaultState();
    return { ...getDefaultState(), ...parsed };
  } catch (e) {
    return getDefaultState();
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // プライベートブラウジング等でlocalStorageが使えない場合は、
    // 進捗保存をあきらめてそのまま続行する（機能停止させない）。
  }
}

export function resetState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // 削除に失敗しても致命的ではないため無視する。
  }
  return getDefaultState();
}

export function hasProgress(state) {
  return Boolean(state.resumeScreen) || Object.values(state.badges).some(Boolean);
}
