import { expect, test } from '@playwright/test';

// test.afterEach(async ({ page }, t) => {
//   const path = t.snapshotPath('screenshot.png');
//   const scrot = await page.screenshot({ path, fullPage: true });
//   await expect(scrot).toMatchSnapshot(path, {
//     threshold: 0.1,
//   });
// });

test('index page has expected h1', async ({ page }, t) => {
  await page.goto('/');
  expect(await page.locator('h1')).toHaveText(
    'We are the largest computer science community at CSUF'
  );
});

test('about page has expected h1', async ({ page }) => {
  await page.goto('/about');
  expect(await page.textContent('h1')).toBe('About us');
});

test('teams page has expected h1', async ({ page }) => {
  await page.goto('/teams');
  expect(await page.textContent('h1')).toBe('Meet the Teams');
});

test('nodebuds page has expected h1', async ({ page }) => {
  await page.goto('/nodebuds');
  expect(await page.textContent('h1')).toBe('Personalized for your success');
});

test('privacy page has expected h1', async ({ page }) => {
  await page.goto('/privacy');
  expect(await page.textContent('h1')).toBe('Privacy Policy');
});

test('quiz page has expected h1', async ({ page }) => {
  await page.goto('/quiz');
  expect(await page.textContent('h1')).toBe('ACM TEAM QUIZ');
});

test('first contributions page has expected h1', async ({ page }) => {
  await page.goto('/1st');
  expect(await page.textContent('h1')).toBe('First Contributions');
});

test('error page has expected em', async ({ page }) => {
  await page.goto('/this-page/does-not/exist');
  expect(await page.textContent('em')).toBe('404');
});
