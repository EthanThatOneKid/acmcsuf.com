import { expect, test } from '@playwright/test';

test('quiz page has expected h1', async ({ page }) => {
  await page.goto('/quiz');
  expect(await page.textContent('h1')).toBe('ACM TEAM QUIZ');
});
