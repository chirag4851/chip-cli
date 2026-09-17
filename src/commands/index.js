import chalk from "chalk";
import { todoCommand } from "./todo.js";
import { metricsCommand } from "./metrics.js";
import { networkCommand } from "./network.js";

function helpCommand() {
  console.log(chalk.bold("  available commands"));
  console.log("  todo [add <text> | list | done <id> | rm <id>]   manage your todos");
  console.log("  metrics                                          cpu / memory / uptime");
  console.log("  network                                          local network addresses");
  console.log("  help                                              show this list");
  console.log("  exit | quit                                      leave chip-cli");
}


export const commands = {
  todo: todoCommand,
  metrics: async () => metricsCommand(),
  network: async () => networkCommand(),
  help: async () => helpCommand(),
};
