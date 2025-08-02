/// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    watchExclude: ["**/test-output/**"],
    testTimeout: 20_000, // 全体のデフォルトタイムアウトを20秒に変更！
    coverage: {
      reporter: ["text", "lcov"], // ← GitHub Actions 用に lcov があると便利！
      reportsDirectory: "coverage",
    },
  },
});
