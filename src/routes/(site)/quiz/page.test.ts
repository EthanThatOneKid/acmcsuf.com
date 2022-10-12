import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('quiz page has expected h1', async ({ page }) => {
  await page.goto('/quiz');
  expect(await page.textContent('h1')).toBe('ACM TEAM QUIZ');
});
