import { spawnSync } from "node:child_process";

const environment = { ...process.env };
delete environment.npm_config_allow_scripts;
delete environment.NPM_CONFIG_ALLOW_SCRIPTS;

const result = spawnSync("npm", ["audit", "--audit-level=high"], {
    env: environment,
    shell: process.platform === "win32",
    stdio: "inherit",
});

if (result.error) {
    throw result.error;
}

process.exit(result.status ?? 1);
