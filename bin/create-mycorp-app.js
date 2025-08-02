#!/usr/bin/env node
import { fileURLToPath } from "url";
import { dirname, resolve, isAbsolute } from "path";
import nodePlop from "node-plop";
import inquirer from "inquirer";
import { mkdirSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

(async () => {
  // --- 1) プロジェクト名 -----------------
  let [, , projectName] = process.argv;
  if (!projectName) {
    ({ projectName } = await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "プロジェクト名を入力してね💕",
        default: "mycorp-app",
      },
    ]));
  }

  // 2-A) まず --template オプションを解析
  let templateArg;
  process.argv.forEach((arg, i, arr) => {
    if (arg.startsWith("--template=")) {
      templateArg = arg.split("=")[1];
    } else if (arg === "--template" || arg === "-t") {
      templateArg = arr[i + 1]; // 例: --template react
    }
  });

  // 2-B) なければ Inquirer で聞く
  const { template } = templateArg
    ? { template: templateArg }
    : await inquirer.prompt([
        {
          type: "list",
          name: "template",
          message: "テンプレートタイプはどっち？✨",
          choices: [
            { name: "React (JavaScript)", value: "react" },
            { name: "React (TypeScript)", value: "react-ts" },
          ],
          default: "react-ts",
        },
      ]);

  // --- 3) 生成先パス ----------------------
  const targetDir = isAbsolute(projectName)
    ? projectName
    : resolve(process.cwd(), projectName);

  mkdirSync(targetDir, { recursive: true }); // 安全に作っておく

  // --- 4) Plop 起動 & 実行 ---------------
  const plopfilePath = resolve(__dirname, "../plopfile.js");
  const plop = await nodePlop(plopfilePath, { destBasePath: targetDir });
  const generator = plop.getGenerator(template); // ← ここがポイント！
  await generator.runActions({ projectName });

  console.log("✅ プロジェクトが作成されました🎉:", targetDir);
})();
