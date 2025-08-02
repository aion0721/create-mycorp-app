export default function (plop) {
  plop.setGenerator("default", {
    description: "社内アプリのViteテンプレを作るよ💫",
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
