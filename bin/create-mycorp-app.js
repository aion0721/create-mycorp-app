#!/usr/bin/env node
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import nodePlop from "node-plop";

const __dirname = dirname(fileURLToPath(import.meta.url));

// コマンドライン引数から projectName を取得
const [, , projectName] = process.argv;

if (!projectName) {
  console.error(
    "❌ プロジェクト名を指定してね： yarn create mycorp-app <project-name>"
  );
  process.exit(1);
}

const plop = await nodePlop(resolve(__dirname, "../plopfile.js"));
const generator = plop.getGenerator("default");

// プロンプトを飛ばして直接渡す✨
await generator.runActions({ projectName });
