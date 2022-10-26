import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('nodebuds page has expected h1', async ({ page }) => {
  await page.goto('/nodebuds');
  expect(await page.textContent('h1')).toBe('Personalized for your success');
});
