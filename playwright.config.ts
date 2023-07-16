import {defineConfig, devices} from '@playwright/test';
import * as path from "path";

require('dotenv').config();

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

export const STORAGE_STATE = path.join(__dirname, 'playwright/.auth/user.json');

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://www.saucedemo.com/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  timeout: 10000,

  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 10000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'API Tests',
      testMatch: '**/tests/apiTests/*',
      use: {
        baseURL: 'http://localhost:5002',
        extraHTTPHeaders: {
          // We set this header per GitHub guidelines.
          //  'Accept': 'application/vnd.github.v3+json',
          // Add authorization token to all requests.
          // Assuming personal access token available in the environment.
          // 'Authorization': `token ${process.env.API_TOKEN}`,
        }
      },
      retries: 0
    },
    // {
    //   name: 'setup',
    //   testMatch: '**/*.setup.ts',
    // },
    {
      name: 'logged in chromium',
      use: { ...devices['Desktop Chrome'] },
      // use: {
      //   storageState: STORAGE_STATE
      // },
      testMatch: '**/*.loggedin.spec.ts',
      // dependencies: ['setup'],
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    //   testMatch: 'tests/fixtureTest.spec.ts'
    // },
    //
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    //   dependencies: ['tests.setup'],
    //   use: {
    //     storageState: STORAGE_STATE,
    //   },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ..devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
