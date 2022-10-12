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
      mobile: { width: 375, height: 667 },
      tablet: { width: 768, height: 1024 },
      desktop: { width: 1920, height: 1080 },
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

  for (let i = 0; i < propNames.length; i++) {
    const propName = propNames[i] as keyof Partial<ProjectArgs>;
    const dimensionNames = Object.keys(matrix[propName]);

    for (let j = i + 1; j < propNames.length; j++) {
      const propName2 = propNames[j] as keyof Partial<ProjectArgs>;
      const dimensionNames2 = Object.keys(matrix[propName2]);

      for (const dimensionName of dimensionNames) {
        for (const dimensionName2 of dimensionNames2) {
          // TODO: [Recursion] Allow for more than 2 dimensions.
          const name = [dimensionName, dimensionName2].join('-').toLowerCase();
          const data = {
            [propName]: matrix[propName][dimensionName],
            [propName2]: matrix[propName2][dimensionName2],
          };

          combinations.push({
            name,
            use: data as Project<TestArgs, WorkerArgs>['use'],
          });
        }
      }
    }
  }

  return combinations;
}

export default config;
