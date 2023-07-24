import type {
  PlaywrightTestConfig,
  PlaywrightTestOptions,
  PlaywrightWorkerOptions,
  Project,
} from '@playwright/test';

const config: PlaywrightTestConfig = {
  projects: projectsFromMatrix<PlaywrightTestOptions>({
    colorScheme: { light: 'light', dark: 'dark' },
    viewport: {
      mobile: { width: 360, height: 640 },
      tablet: { width: 800, height: 1280 },
      desktop: { width: 1920, height: 1080 },
    },
    javaScriptEnabled: {
      jsenabled: true,
      jsdisabled: false,
    },
  }),
  webServer: {
    command: 'npm run build && npm run preview',
    port: 4173,
  },
  reportSlowTests: {
    max: 1000,
    threshold: 100,
  },
  updateSnapshots: 'all',
  testMatch: 'src/routes/**/*.test.ts',
  outputDir: '.playwright_output',
};

/**
 * projectsFromMatrix is a helper function that returns an array of projects
 * based on a matrix of dimensions. Each dimension is an object with a name
 * and a value. The name is used to name the project, and the value is used
 * to set the project's use property.
 *
 * Sample matrix:
 * {
 *   colorScheme: { light: 'light', dark: 'dark' },
 *   viewport: {
 *     mobile: { width: 375, height: 667 },
 *     tablet: { width: 768, height: 1024 },
 *     desktop: { width: 1920, height: 1080 },
 *   },
 *   javaScriptEnabled: {
 *     jsenabled: true,
 *     jsdisabled: false,
 *   },
 * }
 *
 * Expected output given the above sample matrix:
 * [
 *   { name: 'light-mobile-jsenabled', use: { colorScheme: 'light', viewport: { width: 375, height: 667 }, javaScriptEnabled: true } },
 *   { name: 'light-mobile-jsdisabled', use: { colorScheme: 'light', viewport: { width: 375, height: 667 }, javaScriptEnabled: false } },
 *   { name: 'light-tablet-jsenabled', use: { colorScheme: 'light', viewport: { width: 768, height: 1024 }, javaScriptEnabled: true } },
 *   { name: 'light-tablet-jsdisabled', use: { colorScheme: 'light', viewport: { width: 768, height: 1024 }, javaScriptEnabled: false } },
 *   { name: 'light-desktop-jsenabled', use: { colorScheme: 'light', viewport: { width: 1920, height: 1080 }, javaScriptEnabled: true } },
 *   { name: 'light-desktop-jsdisabled', use: { colorScheme: 'light', viewport: { width: 1920, height: 1080 }, javaScriptEnabled: false } },
 *   { name: 'dark-mobile-jsenabled', use: { colorScheme: 'dark', viewport: { width: 375, height: 667 }, javaScriptEnabled: true } },
 *   { name: 'dark-mobile-jsdisabled', use: { colorScheme: 'dark', viewport: { width: 375, height: 667 }, javaScriptEnabled: false } },
 *   { name: 'dark-tablet-jsenabled', use: { colorScheme: 'dark', viewport: { width: 768, height: 1024 }, javaScriptEnabled: true } },
 *   { name: 'dark-tablet-jsdisabled', use: { colorScheme: 'dark', viewport: { width: 768, height: 1024 }, javaScriptEnabled: false } },
 *   { name: 'dark-desktop-jsenabled', use: { colorScheme: 'dark', viewport: { width: 1920, height: 1080 }, javaScriptEnabled: true } },
 *   { name: 'dark-desktop-jsdisabled', use: { colorScheme: 'dark', viewport: { width: 1920, height: 1080 }, javaScriptEnabled: false } },
 * ]
 */
export function projectsFromMatrix<
  TestArgs = PlaywrightTestOptions,
  WorkerArgs = PlaywrightWorkerOptions,
  ProjectArgs = Project<TestArgs, WorkerArgs>['use']
>(matrix: {
  [o in keyof Partial<ProjectArgs>]: { [name: string]: ProjectArgs[o] };
}): Project<TestArgs, WorkerArgs>[] {
  const propNames = Object.keys(matrix);
  const combinations: Project<TestArgs, WorkerArgs>[] = [];

  function addCombination(index: number, name: string, use: Partial<ProjectArgs>) {
    if (index === propNames.length) {
      combinations.push({ name, use: use as unknown as Project<TestArgs, WorkerArgs>['use'] });
      return;
    }

    const propName = propNames[index];
    const propValues = matrix[propName];
    for (const [valueName, value] of Object.entries(propValues)) {
      addCombination(
        index + 1,
        name + (name ? '-' : '') + valueName,
        Object.assign({}, use, { [propName]: value })
      );
    }
  }

  addCombination(0, '', {});
  return combinations;
}

export default config;
