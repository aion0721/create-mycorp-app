export default function (plop) {
  plop.setGenerator("default", {
    description: "Vite + React + TS な社内テンプレ作成✨",
    // ← プロンプトは省略！引数で受けるから
    prompts: [],
    actions: [
      {
        type: "addMany",
        destination: "{{projectName}}/",
        templateFiles: "templates/**",
        base: "templates",
      },
    ],
  });
}
