import dotenv from "dotenv";
import path from "path";

/**
 * Tracks whether environment variables have already been loaded.
 * Safe to call multiple times - only loads once.
 */
let envLoaded = false;

/**
 * Loads environment variables from config files only once.
 *
 * Load order:
 * 1. config/.env.<environment> (e.g. .env.qa)
 * 2. config/.env.<ENVIRONMENT> (e.g. .env.QA)
 * 3. .env.local (only when not running in CI)
 */
export function loadEnv(): void {
  // Prevent reloading environment variables.
  if (envLoaded) {
    return;
  }

  envLoaded = true;

  // Default to "qa" when no environment is specified.
  const envName = (process.env.ENV ?? process.env.ENVIRONMENT ?? "qa").toLowerCase();

  // Load environment-specific configuration. (non-sensitive: URLs, timeouts, log levels).
  // These are committed to git and safe to read in any context including CI/Docker.
  dotenv.config({
    path: path.resolve(process.cwd(), `config/.env.${envName}`),
  });

  // Fallback/support for uppercase environment file names.
  dotenv.config({
    path: path.resolve(process.cwd(), `config/.env.${envName.toUpperCase()}`),
  });

  // Load overrides only - secrets must be injected by CI pipeline, not read from file.
  if (process.env.CI !== "true") {
    dotenv.config({
      path: path.resolve(process.cwd(), ".env.local"),
    });
  }
}
