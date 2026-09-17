import chalk from "chalk";
import figlet from "figlet";


export function printBanner() {
  return new Promise((resolve) => {
    figlet("chip-cli", (err, data) => {
      if (err) {
        console.log(chalk.red("Something went wrong with figlet..."));
        console.dir(err);
        resolve();
        return;
      }
      console.log(chalk.cyan(data));
      console.log(chalk.gray("        - for Chirag and his friends!!"));
      console.log(chalk.gray('        type "help" to see what I can do, "exit" to leave.\n'));
      resolve();
    });
  });
}
