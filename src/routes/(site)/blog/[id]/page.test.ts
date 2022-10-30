import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('blog post h1 matches page title', async ({ page }) => {
  await page.goto('/blog/272');
  expect(await page.title()).toContain(await page.textContent('h1'));
});
