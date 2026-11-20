import { test, expect } from '@playwright/test';

async function correctGroupForCurrentPicture(page) {
  return page.evaluate(async () => {
    const { CHALLENGES } = await import('/src/challenges.js');
    const round = document.querySelector('[data-screen="round"]');
    const emoji = document.querySelector('[data-item]').textContent.trim();
    const challenge = CHALLENGES.find(item => item.id === round.dataset.challenge);
    return challenge.groups.find(group => group.items.includes(emoji)).id;
  });
}

test('a complete round sorts six pictures and offers a different random challenge', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Comença a jugar' }).click();
  const firstChallenge = await page.locator('[data-screen="round"]').getAttribute('data-challenge');
  await expect(page.locator('.upcoming-item')).toHaveCount(5);

  for (let completed = 1; completed <= 6; completed += 1) {
    const groupId = await correctGroupForCurrentPicture(page);
    await page.locator(`[data-target="${groupId}"]`).click();
    if (completed < 6) await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', String(completed));
  }

  await expect(page.locator('[data-screen="result"]')).toBeVisible();
  await expect(page.getByText('5 de 5 estrelles')).toBeVisible();
  await page.getByRole('button', { name: 'Un altre repte' }).click();
  await expect(page.locator('[data-screen="round"]')).not.toHaveAttribute('data-challenge', firstChallenge);
});

test('a wrong group leaves the active picture in place for a retry', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Comença a jugar' }).click();
  const correctGroup = await correctGroupForCurrentPicture(page);
  const wrongGroup = await page.locator('[data-target]').evaluateAll((targets, id) => targets.find(target => target.dataset.target !== id).dataset.target, correctGroup);
  await page.locator(`[data-target="${wrongGroup}"]`).click();
  await expect(page.getByRole('status')).toHaveText('Torna-ho a provar!');
  await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');
  await expect(page.locator('[data-item]')).toBeVisible();
});

test('the INICI button returns to the challenge menu', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Comença a jugar' }).click();

  await page.getByRole('button', { name: 'INICI' }).click();

  await expect(page.getByRole('heading', { name: 'Juguem a classificar!' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Comença a jugar' })).toBeVisible();
  await expect(page.locator('[data-screen="round"]')).toHaveCount(0);
});

test('a picture can be sorted by dragging it to the correct group', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Comença a jugar' }).click();
  const correctGroup = await correctGroupForCurrentPicture(page);

  await page.locator('[data-item]').dragTo(page.locator(`[data-target="${correctGroup}"]`));

  await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1');
  await expect(page.getByRole('status')).toHaveText('Molt bé!');
});

test('one wrong placement reduces the final score to four stars', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Comença a jugar' }).click();

  const firstCorrectGroup = await correctGroupForCurrentPicture(page);
  const firstWrongGroup = await page.locator('[data-target]').evaluateAll(
    (targets, id) => targets.find(target => target.dataset.target !== id).dataset.target,
    firstCorrectGroup,
  );
  await page.locator(`[data-target="${firstWrongGroup}"]`).click();
  await page.locator(`[data-target="${firstCorrectGroup}"]`).click();

  for (let completed = 1; completed < 6; completed += 1) {
    const correctGroup = await correctGroupForCurrentPicture(page);
    await page.locator(`[data-target="${correctGroup}"]`).click();
  }

  await expect(page.locator('[data-screen="result"]')).toBeVisible();
  await expect(page.locator('.result-copy')).toHaveText('4 de 5 estrelles');
  await expect(page.locator('.result-stars')).toHaveAttribute('aria-label', '4 estrelles');
});
