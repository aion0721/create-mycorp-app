#!/usr/bin/env node

import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import nodePlop from "node-plop";
import inquirer from "inquirer";

const __dirname = dirname(fileURLToPath(import.meta.url));

(async () => {
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

  // ★ プロジェクトの絶対パスを作る！
  const targetDir = resolve(process.cwd(), projectName);

  const plop = await nodePlop(resolve(__dirname, "../plopfile.js"), {
    destBasePath: targetDir, // ← これがポイント！
  });
  const generator = plop.getGenerator("default");

  const result = await generator.runActions({ projectName });

  console.log("✅ プロジェクトが作成されました🎉:", targetDir);
})();
