import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('blog page has expected h1', async ({ page }) => {
  await page.goto('/blog');
  expect(await page.textContent('h1')).toBe('README');
});
