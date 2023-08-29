import { PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
	webServer: {
		command: "npm run build && npm run preview",
		port: 4173,
		reuseExistingServer: true
	},
	testDir: "tests",
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	snapshotDir: "./snapshots",
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] }
		}
	]
	// reporter: [["html", { open: "never" }], ["dot"]]
	// globalSetup: resolve("./tests/globalSetup.ts"),
	// globalTeardown: resolve("./tests/globalSetup.ts")
};

export default config;
