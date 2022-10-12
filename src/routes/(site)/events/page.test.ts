import { expect, test } from '@playwright/test';

test('events page has expected h2', async ({ page }) => {
  await page.goto('/events');
  expect(await page.textContent('h2')).toBe('Curated events for growth and success');
});
