import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('privacy page has expected h1', async ({ page }) => {
  await page.goto('/privacy');
  expect(await page.textContent('h1')).toBe('Privacy Policy for ACM at CSUF');
});
