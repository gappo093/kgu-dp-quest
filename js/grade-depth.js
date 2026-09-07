// KGU DP QUEST - 学年別の判断深度（v0.2 5章）
//
// 学年が上がるほど「選択肢の数・複雑さ」「提示する情報の量」「フィードバック文の
// 深さ・専門性」を段階的に組み合わせる（spec v0.2 10章 確認事項4）。入力形式（選択式
// →自由記述）は変えない。SEE/THINK/ACTの「選択→視点提示→再選択」という往復構造は
// 全学年共通で、当初advancedで自由記述の説明ステップを追加していたが、フィードバック
// がなく往復構造が失われるという指摘を受けて撤回した。学年未選択の利用者（2章の
// 副対象）は3年相当を既定値とする（v0.2 5.3）ため、2〜3年・未選択は同じ'standard'
// として扱う。
export function depthTierForGrade(grade) {
  if (grade === 1) return 'basic';
  if (grade === 4) return 'advanced';
  return 'standard';
}
