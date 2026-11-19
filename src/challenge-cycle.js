export function createChallengeCycle(challenges, random = Math.random) {
  if (challenges.length === 0) throw new Error('At least one challenge is required.');
  let remaining = [];
  let previousId = null;

  function refill() {
    remaining = [...challenges];
    for (let index = remaining.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(random() * (index + 1));
      [remaining[index], remaining[swapIndex]] = [remaining[swapIndex], remaining[index]];
    }
    if (remaining.length > 1 && remaining[0].id === previousId) {
      const alternativeIndex = remaining.findIndex(challenge => challenge.id !== previousId);
      [remaining[0], remaining[alternativeIndex]] = [remaining[alternativeIndex], remaining[0]];
    }
  }

  return {
    next() {
      if (remaining.length === 0) refill();
      const challenge = remaining.shift();
      previousId = challenge.id;
      return challenge;
    },
  };
}

export function shuffle(items, random = Math.random) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}
