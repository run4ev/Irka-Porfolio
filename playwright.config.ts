import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: true,
  },
  use: { baseURL: 'http://localhost:4321' },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1200, height: 913 } },
    },
    { name: 'phone', use: { ...devices['iPhone 13'] } },
  ],
});
