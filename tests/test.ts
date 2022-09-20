import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
  await page.goto('/');
  expect(await page.textContent('h1')).toContain('We are the largest computer science community');
});

test('about page has expected h1', async ({ page }) => {
  await page.goto('/about');
  expect(await page.textContent('h1')).toBe('About us');
});
