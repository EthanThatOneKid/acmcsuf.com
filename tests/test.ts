import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
  await page.goto('/');
  expect(await page.textContent('h1')).toContain('We are the largest computer science community');
});

test('about page has expected h1', async ({ page }) => {
  await page.goto('/about');
  expect(await page.textContent('h1')).toBe('About us');
});

test('error page has expected em', async ({ page }) => {
  await page.goto('/this-page/does-not/exist');
  expect(await page.textContent('em')).toBe('404');
});

test('teams page has expected h1', async ({ page }) => {
  await page.goto('/teams');
  expect(await page.textContent('h1')).toBe('Meet the Teams');
});

test('nodebuds page has expected h1', async ({ page }) => {
  await page.goto('/nodebuds');
  expect(await page.textContent('h1')).toBe('Personalized for your success');
});
