// KGU DP QUEST - 状態管理・localStorage永続化
//
// 進捗はブラウザのlocalStorageにのみ保存する（13章：サーバー不要・個人情報を収集しない）。

const STORAGE_KEY = 'kguDpQuestState';
const STATE_VERSION = 1;

function getDefaultState() {
  return {
    version: STATE_VERSION,
    resumeScreen: null,
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
