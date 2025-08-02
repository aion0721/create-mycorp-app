import { fileURLToPath } from "url";
import { resolve } from "path";
import { existsSync, rmSync, readFileSync } from "fs";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { execa } from "execa";
import which from "which"; // ←💖 これでOK！

const CLI_PATH = resolve("bin", "create-mycorp-app.js");
const TEST_OUTPUT_DIR = resolve("test-output");
const TEST_PROJECT_NAME = "my-test-app";
const PROJECT_PATH = resolve(TEST_OUTPUT_DIR, TEST_PROJECT_NAME);

describe("create-mycorp-app CLI", () => {
  let nodePath: string;

  beforeEach(async () => {
    nodePath = await which("node"); // ← node の絶対パスを取得
    if (existsSync(PROJECT_PATH)) {
      rmSync(PROJECT_PATH, { recursive: true, force: true });
    }
  });

  afterEach(() => {
    if (existsSync(PROJECT_PATH)) {
      rmSync(PROJECT_PATH, { recursive: true, force: true });
    }
  });

  it("should generate project with react-ts template", async () => {
    const { stdout } = await execa(nodePath, [CLI_PATH, TEST_PROJECT_NAME], {
      cwd: TEST_OUTPUT_DIR,
    });

    expect(stdout).toContain("✅ プロジェクトが作成されました🎉");

    const created = existsSync(resolve(PROJECT_PATH, "package.json"));
    expect(created).toBe(true);

    const pkg = JSON.parse(
      readFileSync(resolve(PROJECT_PATH, "package.json"), "utf8")
    );
    expect(pkg.name).toBe(TEST_PROJECT_NAME);
  });
});
