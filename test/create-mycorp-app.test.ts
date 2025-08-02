// test/create-mycorp-app.test.ts
import { resolve } from "path";
import { existsSync, rmSync, readFileSync } from "fs";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { execa } from "execa";

const CLI_PATH = resolve("bin", "create-mycorp-app.js");
const TEST_OUTPUT_DIR = resolve("test-output");
const TEST_PROJECT_NAME = "my-test-app";
const PROJECT_PATH = resolve(TEST_OUTPUT_DIR, TEST_PROJECT_NAME);

describe("create-mycorp-app CLI", () => {
  beforeEach(() => {
    if (existsSync(PROJECT_PATH))
      rmSync(PROJECT_PATH, { recursive: true, force: true });
  });

  afterEach(() => {
    if (existsSync(PROJECT_PATH))
      rmSync(PROJECT_PATH, { recursive: true, force: true });
  });

  it("should generate project with react-ts template", async () => {
    // ⬇ ここだけ shell:true を付ける
    const { stdout } = await execa("node", [CLI_PATH, TEST_PROJECT_NAME], {
      cwd: TEST_OUTPUT_DIR,
      shell: true,
    });

    expect(stdout).toContain("✅ プロジェクトが作成されました🎉");

    const pkgPath = resolve(PROJECT_PATH, "package.json");
    expect(existsSync(pkgPath)).toBe(true);

    const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
    expect(pkg.name).toBe(TEST_PROJECT_NAME);
  });
});
