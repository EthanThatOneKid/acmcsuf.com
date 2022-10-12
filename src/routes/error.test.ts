import type { TestInfo } from '@playwright/test';
import { expect, test } from '@playwright/test';
import path from 'node:path';

test.describe.configure({ mode: 'parallel' });

test('error page has expected em', async ({ page }) => {
  await page.goto('/this-page/does-not/exist');
  expect(await page.textContent('em')).toBe('404');
});

test('error page matches screenshot', async ({ page }, testInfo) => {
  const { cleanupSnapshot, data } = setupSnapshot(testInfo);

  if (testInfo.project.use.viewport) {
    await page.setViewportSize(testInfo.project.use.viewport);
  }

  if (testInfo.project.use.colorScheme) {
    await page.emulateMedia({
      colorScheme: testInfo.project.use.colorScheme,
    });
  }

  await page.goto('/this-page/does-not/exist');

  expect(await page.screenshot({ fullPage: true, scale: 'css' })).toMatchSnapshot({
    name: `error-${data.projectName}.png`,
    threshold: 0.1,
  });

  cleanupSnapshot();
});

// See:
// https://github.com/microsoft/playwright/issues/14527#issuecomment-1143352769
function setupSnapshot(testInfo: TestInfo) {
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
