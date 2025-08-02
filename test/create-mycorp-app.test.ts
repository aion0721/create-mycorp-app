// test/create-mycorp-app.test.ts
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { execa } from "execa";
import { existsSync, rmSync, readFileSync } from "fs";
import { resolve } from "path";

const CLI_PATH = resolve("bin", "create-mycorp-app.js");
const TEST_OUTPUT_DIR = resolve("test-output");
const TEST_PROJECT_NAME = "my-test-app";
const PROJECT_PATH = resolve(TEST_OUTPUT_DIR, TEST_PROJECT_NAME);

describe("create-mycorp-app CLI", () => {
  beforeEach(() => {
    // 過去のテスト結果を掃除✨
    if (existsSync(PROJECT_PATH)) {
      rmSync(PROJECT_PATH, { recursive: true, force: true });
    }
  });

  afterEach(() => {
    // 後片付けもちゃんとね🧼
    if (existsSync(PROJECT_PATH)) {
      rmSync(PROJECT_PATH, { recursive: true, force: true });
    }
  });

  it("should generate project with react-ts template", async () => {
    // CLI実行してテンプレート作らせる💪
    const { stdout } = await execa("node", [CLI_PATH, TEST_PROJECT_NAME], {
      cwd: TEST_OUTPUT_DIR,
    });

    // 成功ログ出てるかな？🧐
    expect(stdout).toContain("✅ プロジェクトが作成されました🎉");

    // ファイルがちゃんとできてるかも確認しとこ💕
    const created = existsSync(resolve(PROJECT_PATH, "package.json"));
    expect(created).toBe(true);

    const pkg = JSON.parse(
      readFileSync(resolve(PROJECT_PATH, "package.json"), "utf8")
    );
    expect(pkg.name).toBe(TEST_PROJECT_NAME);
  });
});
