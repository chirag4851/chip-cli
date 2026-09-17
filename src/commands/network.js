import chalk from "chalk";
import os from "node:os";

/**
 * Prints IPv4/IPv6 addresses for every non-internal network interface
 * (Wi-Fi, Ethernet, etc). Skips loopback since that's rarely useful here.
 */
export function networkCommand() {
  const interfaces = os.networkInterfaces();
  const entries = Object.entries(interfaces);

  console.log(chalk.bold("  network interfaces"));

  let found = false;
  for (const [name, addresses] of entries) {
    for (const addr of addresses ?? []) {
      if (addr.internal) continue;
      found = true;
      console.log(
        `  ${chalk.cyan(name.padEnd(10))} ${addr.family.padEnd(6)} ${addr.address}`
      );
    }
  }

  if (!found) {
    console.log(chalk.gray("  no external interfaces found"));
  }
}
