import test from 'node:test';
import assert from 'node:assert/strict';
import { CHALLENGES, getItems } from '../src/challenges.js';
import { createChallengeCycle, shuffle } from '../src/challenge-cycle.js';
import { isCorrectPlacement, starsForFirstTry } from '../src/rules.js';

test('the game has 17 two-group challenges with six sortable pictures each', () => {
  assert.equal(CHALLENGES.length, 17);
  for (const challenge of CHALLENGES) {
    assert.equal(challenge.groups.length, 2, challenge.id);
    assert.ok(challenge.groups.every(group => group.examples.length > 0 && group.cue && group.label), challenge.id);
    assert.ok(challenge.groups.every(group => group.label === group.label.toLocaleUpperCase('ca')), `${challenge.id} category labels should be uppercase`);
    assert.ok(challenge.groups.every(group => group.items.length === 3), challenge.id);
    assert.equal(getItems(challenge).length, 6, challenge.id);
    assert.ok(getItems(challenge).every(item => challenge.groups.some(group => group.id === item.groupId)), challenge.id);
  }
});

test('placement correctness comes from each picture’s configured group', () => {
  for (const challenge of CHALLENGES) {
    for (const item of getItems(challenge)) {
      assert.equal(isCorrectPlacement(item, item.groupId), true);
      assert.equal(isCorrectPlacement(item, challenge.groups.find(group => group.id !== item.groupId).id), false);
    }
  }
});

test('the shuffled challenge cycle visits every rule once before repeating', () => {
  const cycle = createChallengeCycle(CHALLENGES, () => 0.37);
  const firstCycle = Array.from({ length: CHALLENGES.length }, () => cycle.next().id);
  assert.equal(new Set(firstCycle).size, CHALLENGES.length);
  const next = cycle.next().id;
  assert.notEqual(next, firstCycle.at(-1));
});

test('shuffling preserves every picture exactly once', () => {
  const items = getItems(CHALLENGES[0]);
  const mixed = shuffle(items, () => 0.65);
  assert.deepEqual([...mixed].sort((a, b) => a.emoji.localeCompare(b.emoji)), [...items].sort((a, b) => a.emoji.localeCompare(b.emoji)));
});

test('six-item rounds award stars by first-try accuracy with a two-star floor', () => {
  assert.equal(starsForFirstTry(0), 2);
  assert.equal(starsForFirstTry(2), 2);
  assert.equal(starsForFirstTry(3), 3);
  assert.equal(starsForFirstTry(4), 3);
  assert.equal(starsForFirstTry(5), 4);
  assert.equal(starsForFirstTry(6), 5);
});
