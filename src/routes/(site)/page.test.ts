import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
  await page.goto('/');

  const h1 = await page.locator('h1');
  const textContext = await h1.textContent();
  expect(textContext).toContain('largest computer science community');
});
