import readline from "node:readline";
import chalk from "chalk";
import { printBanner } from "./banner.js";
import { commands } from "./commands/index.js";

const EXIT_WORDS = new Set(["exit", "quit"]);


export async function startRepl() {
  await printBanner();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: chalk.magenta("chip> "),
  });

  rl.prompt();

  async function processLine(line) {
    const input = line.trim();

    if (!input) {
      rl.prompt();
      return;
    }

    if (EXIT_WORDS.has(input.toLowerCase())) {
      rl.close();
      return;
    }

    const [word, ...args] = input.split(/\s+/);
    const handler = commands[word];

    if (!handler) {
      console.log(chalk.red(`unknown command: ${word}`));
      console.log(chalk.gray('type "help" to see what I can do.'));
    } else {
      try {
        await handler(args);
      } catch (err) {
        console.log(chalk.red(`error running "${word}": ${err.message}`));
      }
    }

    rl.prompt();
  }

  let queue = Promise.resolve();
  rl.on("line", (line) => {
    queue = queue.then(() => processLine(line));
  });

  rl.on("close", () => {
    console.log(chalk.cyan("\nsee you, Chirag."));
    process.exit(0);
  });
}
