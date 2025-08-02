// test/create-mycorp-app.test.ts
import { resolve } from "path";
import { existsSync, rmSync, readFileSync, mkdirSync } from "fs";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { execaNode } from "execa";

const CLI_PATH = resolve("bin", "create-mycorp-app.js");
const TEST_OUTPUT_DIR = resolve("test-output");

describe.each(["react", "react-ts"])(
  "create-mycorp-app CLI (%s)",
  (template) => {
    const projectName = `my-${template}-app`;
    const projectPath = resolve(TEST_OUTPUT_DIR, projectName);

    beforeEach(() => {
      // 出力用ディレクトリを必ず用意
      mkdirSync(TEST_OUTPUT_DIR, { recursive: true });
      if (existsSync(projectPath))
        rmSync(projectPath, { recursive: true, force: true });
    });

    afterEach(() => {
      if (existsSync(projectPath))
        rmSync(projectPath, { recursive: true, force: true });
    });

    it(`should generate project with ${template} template`, async () => {
      // CI=true で Inquirer を完全自動化
      const { stdout } = await execaNode(
        CLI_PATH,
        [projectName, "--template", template], // ← ★オプションでテンプレを指名
        { cwd: TEST_OUTPUT_DIR, env: { CI: "true" } }
      );

      expect(stdout).toContain("✅ プロジェクトが作成されました🎉");

      const pkgPath = resolve(projectPath, "package.json");
      expect(existsSync(pkgPath)).toBe(true);

      const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
      expect(pkg.name).toBe(projectName);
    });
  }
);
