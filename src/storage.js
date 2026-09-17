import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

const CONFIG_DIR = join(homedir(), ".chip-cli");

/**
 * Reads a JSON file from chip-cli's config directory (~/.chip-cli/<name>).
 * Returns `fallback` if the file doesn't exist yet.
 */
export async function readStore(name, fallback) {
  const path = join(CONFIG_DIR, name);
  if (!existsSync(path)) return fallback;
  const raw = await readFile(path, "utf-8");
  return raw.trim() ? JSON.parse(raw) : fallback;
}

/**
 * Writes `data` as JSON to chip-cli's config directory, creating the
 * directory on first use.
 */
export async function writeStore(name, data) {
  if (!existsSync(CONFIG_DIR)) {
    await mkdir(CONFIG_DIR, { recursive: true });
  }
  const path = join(CONFIG_DIR, name);
  await writeFile(path, JSON.stringify(data, null, 2), "utf-8");
}
