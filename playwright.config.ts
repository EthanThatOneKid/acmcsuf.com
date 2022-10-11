import type {
  PlaywrightTestConfig,
  PlaywrightTestOptions,
  PlaywrightWorkerOptions,
  Project,
} from '@playwright/test';

const config: PlaywrightTestConfig = {
  projects: projectsFromMatrix({
    viewport: {
      Mobile: { width: 375, height: 667 },
      Tablet: { width: 768, height: 1024 },
      Desktop: { width: 1920, height: 1080 },
    },
    colorScheme: { Light: 'light', Dark: 'dark' },
  }),
  use: {
    serviceWorkers: 'block',
  },
  webServer: {
    command: 'npm run build && npm run preview',
    port: 4173,
  },
};

export default config;

function projectsFromMatrix<
  TestArgs = PlaywrightTestOptions,
  WorkerArgs = PlaywrightWorkerOptions
>(matrix: {
  [o in keyof Partial<PlaywrightTestOptions>]: { [name: string]: PlaywrightTestOptions[o] };
}): Project<TestArgs, WorkerArgs>[] {
  return Object.entries(matrix).reduce(
    (projects: Project<TestArgs, WorkerArgs>[], [name, values]) =>
      Object.entries(values).reduce(
        (projects, [value, config]) => [
          ...projects,
          {
            name: `${name} - ${value}`,
            use: {
              ...config,
            },
          },
        ],
        projects
      ),
    []
  );
}
