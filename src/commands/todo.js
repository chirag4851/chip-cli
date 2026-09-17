import chalk from "chalk";
import { readStore, writeStore } from "../storage.js";

const STORE_NAME = "todos.json";

async function loadTodos() {
  return readStore(STORE_NAME, []);
}

async function saveTodos(todos) {
  await writeStore(STORE_NAME, todos);
}

function printTodos(todos) {
  if (todos.length === 0) {
    console.log(chalk.gray("  (no todos — add one with: todo add <text>)"));
    return;
  }
  todos.forEach((t) => {
    const box = t.done ? chalk.green("[x]") : chalk.yellow("[ ]");
    const text = t.done ? chalk.strikethrough(t.text) : t.text;
    console.log(`  ${box} ${chalk.dim(`#${t.id}`)} ${text}`);
  });
}


export async function todoCommand(args) {
  const [sub, ...rest] = args;
  const todos = await loadTodos();

  switch (sub) {
    case "add": {
      const text = rest.join(" ").trim();
      if (!text) {
        console.log(chalk.red("usage: todo add <text>"));
        return;
      }
      const nextId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
      todos.push({ id: nextId, text, done: false });
      await saveTodos(todos);
      console.log(chalk.green(`added #${nextId}: ${text}`));
      return;
    }

    case "done": {
      const id = Number(rest[0]);
      const todo = todos.find((t) => t.id === id);
      if (!todo) {
        console.log(chalk.red(`no todo with id #${rest[0]}`));
        return;
      }
      todo.done = true;
      await saveTodos(todos);
      console.log(chalk.green(`marked #${id} done`));
      return;
    }

    case "rm":
    case "remove": {
      const id = Number(rest[0]);
      const index = todos.findIndex((t) => t.id === id);
      if (index === -1) {
        console.log(chalk.red(`no todo with id #${rest[0]}`));
        return;
      }
      const [removed] = todos.splice(index, 1);
      await saveTodos(todos);
      console.log(chalk.green(`removed #${id}: ${removed.text}`));
      return;
    }

    case "list":
    case undefined:
      printTodos(todos);
      return;

    default:
      console.log(chalk.red(`unknown todo subcommand: ${sub}`));
      console.log(chalk.gray("usage: todo [add <text> | list | done <id> | rm <id>]"));
  }
}
