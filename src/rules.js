export function isCorrectPlacement(item, groupId) {
  return item.groupId === groupId;
}

export function starsForFirstTry(firstTryCount, totalItems = 6) {
  if (totalItems <= 0) return 2;
  const ratio = firstTryCount / totalItems;
  if (ratio >= 1) return 5;
  if (ratio >= 0.75) return 4;
  if (ratio >= 0.5) return 3;
  return 2;
}
