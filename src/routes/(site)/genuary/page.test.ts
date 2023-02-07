import { expect, test } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('genuary page has expected h1', async ({ page }) => {
  await page.goto('/genuary/placekitten');
  expect(await page.textContent('h1')).toBe('Genuary Placekitten');
});
