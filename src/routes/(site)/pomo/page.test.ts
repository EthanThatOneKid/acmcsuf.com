import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('pomo page has expected h1', async ({ page }) => {
  await page.goto('/pomo');

  const textContext = await page.locator('h1').textContent();
  expect(textContext).toContain('Pomodomo Timer');
});
