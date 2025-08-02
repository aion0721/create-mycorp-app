import { resolve } from "path";
import { existsSync, rmSync, readFileSync } from "fs";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { execaNode } from "execa";
import { mkdirSync } from "fs"; // ← 追加

const CLI_PATH = resolve("bin", "create-mycorp-app.js");
const TEST_OUTPUT_DIR = resolve("test-output");
const TEST_PROJECT_NAME = "my-test-app";
const PROJECT_PATH = resolve(TEST_OUTPUT_DIR, TEST_PROJECT_NAME);

describe("create-mycorp-app CLI", () => {
  beforeEach(() => {
    // ★ test-output ディレクトリを必ず作成
    mkdirSync(TEST_OUTPUT_DIR, { recursive: true });

    if (existsSync(PROJECT_PATH)) {
      rmSync(PROJECT_PATH, { recursive: true, force: true });
    }
  });

  afterEach(() => {
    if (existsSync(PROJECT_PATH))
      rmSync(PROJECT_PATH, { recursive: true, force: true });
  });

  it("should generate project with react-ts template", async () => {
    // execaNode は “実行中の Node バイナリ” を確実に呼び出してくれる
    const { stdout } = await execaNode(CLI_PATH, [TEST_PROJECT_NAME], {
      cwd: TEST_OUTPUT_DIR,
    });

    expect(stdout).toContain("✅ プロジェクトが作成されました🎉");

    const pkgPath = resolve(PROJECT_PATH, "package.json");
    expect(existsSync(pkgPath)).toBe(true);

    const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
    expect(pkg.name).toBe(TEST_PROJECT_NAME);
  });
});
