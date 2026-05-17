import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './',
  testMatch: ['e2e/**/*.spec.ts', 'non-functional/**/*.spec.ts'],
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  reporter: [['html', { outputFolder: 'reports/playwright-report' }]],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
