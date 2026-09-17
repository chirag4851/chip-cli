import chalk from "chalk";
import os from "node:os";

function formatBytes(bytes) {
  const gb = bytes / 1024 ** 3;
  return `${gb.toFixed(2)} GB`;
}

function formatUptime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
}

/**
 * Prints a snapshot of current system performance: CPU load, memory
 * usage, and uptime. Pure read of node:os — no external calls.
 */
export function metricsCommand() {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const usedPct = ((usedMem / totalMem) * 100).toFixed(1);
  const [load1, load5, load15] = os.loadavg();
  const cpus = os.cpus();

  console.log(chalk.bold("  system metrics"));
  console.log(`  cpu cores     ${cpus.length} (${cpus[0]?.model ?? "unknown"})`);
  console.log(`  load avg      ${load1.toFixed(2)}, ${load5.toFixed(2)}, ${load15.toFixed(2)}  (1m, 5m, 15m)`);
  console.log(`  memory        ${formatBytes(usedMem)} / ${formatBytes(totalMem)}  (${usedPct}%)`);
  console.log(`  uptime        ${formatUptime(os.uptime())}`);
}
