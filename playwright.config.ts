import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60000,
  use: {
    viewport: { width: 1953, height: 1053 },
    deviceScaleFactor: 1,
    launchOptions: {
      args: ["--no-sandbox", "--disable-gpu"],
    },
  },
  projects: [
    {
      name: "screenshot",
      testMatch: "screenshot.spec.ts",
      use: {
        launchOptions: {
          executablePath: "/sessions/intelligent-affectionate-euler/.cache/ms-playwright/chromium-1124/chrome-linux/chrome",
          args: ["--no-sandbox", "--disable-gpu"],
        },
      },
    },
  ],
  webServer: {
    command: "npm run dev",
    port: 5173,
    reuseExistingServer: true,
    timeout: 30000,
  },
});
