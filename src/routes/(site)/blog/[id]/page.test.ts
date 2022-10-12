import type { TestInfo } from '@playwright/test';
import { expect, test } from '@playwright/test';
import path from 'node:path';

test.describe.configure({ mode: 'parallel' });

// setupSnapshot is a helper that creates handles the necessary boilerplate
// for snapshot testing. It returns a function that can be called after the
// snapshot test has executed.
//
// See:
// https://github.com/microsoft/playwright/issues/14527#issuecomment-1143352769
export function setupSnapshot(testInfo: TestInfo) {
  const snapshotDir = testInfo.snapshotDir;
  const snapshotSuffix = testInfo.snapshotSuffix;
  const projectName = testInfo.project.name;

  testInfo.snapshotDir = path.resolve(snapshotDir, '..', 'screenshots');
  testInfo.snapshotSuffix = '';
  testInfo.project.name = '';

  return {
    data: { projectName },
    cleanupSnapshot() {
      testInfo.snapshotDir = snapshotDir;
      testInfo.snapshotSuffix = snapshotSuffix;
      testInfo.project.name = projectName;
    },
  };
}

test('blog post h1 matches page title', async ({ page }) => {
  await page.goto('/blog/272');
  expect(await page.title()).toContain(await page.textContent('h1'));
});

test('blog post page matches screenshot', async ({ page }, testInfo) => {
  const { cleanupSnapshot, data } = setupSnapshot(testInfo);

  if (testInfo.project.use.viewport) {
    await page.setViewportSize(testInfo.project.use.viewport);
  }

  if (testInfo.project.use.colorScheme) {
    await page.emulateMedia({
      colorScheme: testInfo.project.use.colorScheme,
    });
  }

  await page.goto('/blog/272', { waitUntil: 'networkidle' });
  expect(await page.screenshot({ fullPage: true, scale: 'css' })).toMatchSnapshot({
    name: `page-${data.projectName}.png`,
    threshold: 0.3,
  });

  cleanupSnapshot();
});
