import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('wave2 page has expected h1', async ({ page }) => {
  await page.goto('/wave2');
  expect(await page.textContent('h1')).toBe('Wave 2 board applications');
});
