import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('teams page has expected h1', async ({ page }) => {
  await page.goto('/teams');
  expect(await page.textContent('h1')).toBe('Meet the Teams');
});
