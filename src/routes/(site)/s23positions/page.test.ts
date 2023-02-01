import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('s23positions page has expected h1', async ({ page }) => {
  await page.goto('/s23positions');
  expect(await page.textContent('h1')).toBe('Spring 2023 board applications');
});
