import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 2,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    actionTimeout: 0,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "Chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 15'],
      },
    },
  ],

  webServer: {
    command: "npm run preview",
    port: 4173,
  },
};

export default config;
