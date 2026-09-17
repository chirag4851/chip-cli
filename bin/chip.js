#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { startRepl } from "../src/repl.js";

const packageJson = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url))
);

if (process.argv.includes("--version") || process.argv.includes("-v")) {
  console.log(packageJson.version);
  process.exit(0);
}

await startRepl();