#!/usr/bin/env node

import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import nodePlop from "node-plop";
import inquirer from "inquirer";

const __dirname = dirname(fileURLToPath(import.meta.url));

let [, , projectName] = process.argv;

if (!projectName) {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "プロジェクト名を入力してね💕",
      default: "mycorp-app",
    },
  ]);
  projectName = answer.projectName;
}

const plop = await nodePlop(resolve(__dirname, "../plopfile.js"));
const generator = plop.getGenerator("default");

await generator.runActions({ projectName });
