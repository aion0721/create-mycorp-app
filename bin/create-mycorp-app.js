#!/usr/bin/env node

import { fileURLToPath } from "url";
import { dirname, resolve, isAbsolute } from "path";
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

  // 絶対パスで確実に生成先を解決
  const targetDir = isAbsolute(projectName)
    ? projectName
    : resolve(process.cwd(), projectName);

  const plopfilePath = resolve(__dirname, "../plopfile.js");
  const plop = await nodePlop(plopfilePath, {
    destBasePath: targetDir,
  });

  const generator = plop.getGenerator("default");

  const result = await generator.runActions({ projectName });

  console.log("✅ プロジェクトが作成されました🎉:", targetDir);
})();
