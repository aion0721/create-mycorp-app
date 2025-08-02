export default function (plop) {
  // --- React (JS) -----------------
  plop.setGenerator("react", {
    description: "React (JavaScript) テンプレ🎨",
    prompts: [], // 追加で聞きたいことがあればここに
    actions: [
      {
        type: "addMany",
        destination: ".",
        base: "templates/react",
        templateFiles: "templates/react/**",
      },
    ],
  });

  // --- React-TS (TypeScript) ------
  plop.setGenerator("react-ts", {
    description: "React (TypeScript) テンプレ💎",
    prompts: [],
    actions: [
      {
        type: "addMany",
        destination: ".",
        base: "templates/react-ts",
        templateFiles: "templates/react-ts/**",
      },
    ],
  });
}
