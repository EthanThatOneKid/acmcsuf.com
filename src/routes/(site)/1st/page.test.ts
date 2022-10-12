import { expect, test } from '@playwright/test';

test('first contributions page has expected h1', async ({ page }) => {
  await page.goto('/1st');
  expect(await page.textContent('h1')).toBe('First Contributions');
});
