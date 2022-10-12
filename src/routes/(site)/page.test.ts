import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('index page has expected h1', async ({ page }) => {
  await page.goto('/');

  const textContext = await page.locator('h1').textContent();
  expect(textContext).toContain('largest computer science community');
});
