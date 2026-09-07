// KGU DP QUEST - 学年別の判断深度（v0.2 5章）
//
// 学年が上がるほど「選択肢の複雑さ」「追加情報の量」「説明の要求」を段階的に
// 組み合わせる（spec v0.2 10章 確認事項4）。学年未選択の利用者（2章の副対象）は
// 3年相当を既定値とする（v0.2 5.3）ため、2〜3年・未選択は同じ'standard'として扱う。
export function depthTierForGrade(grade) {
  if (grade === 1) return 'basic';
  if (grade === 4) return 'advanced';
  return 'standard';
}
