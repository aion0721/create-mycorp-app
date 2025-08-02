# create-mycorp-app

🛠️ MyCorp の React アプリ開発を簡単に始めるための CLI ツールです。  
テンプレートベースで構成されており、プロジェクトの初期セットアップを秒速で完了できます！

---

## 🚀 Usage

### 1. プロジェクト作成

```bash
yarn create mycorp-app
```

または npm を使う場合：

```bash
npm create mycorp-app
```

### 2. 対話形式でテンプレートの情報を入力

コマンドを実行すると、以下のような質問が表示されます：

- プロジェクト名
- 使用するライブラリ
- 初期ページの構成 など…

入力内容に応じて、自動でプロジェクトが生成されます ✨

---

## 📁 テンプレート構成

以下のようなフォルダ・ファイル構成になります：

```
my-project/
├── public/
├── src/
│   └── index.tsx
├── package.json
├── tsconfig.json
└── ...
```

Chakra UI や Vite、TypeScript などモダンな構成がデフォルトで用意されています。

---

## 🧱 内部構成

この CLI は以下の技術で構成されています：

- [`node-plop`](https://github.com/plopjs/node-plop) - CLI ベースのテンプレートエンジン
- `inquirer` - 対話式プロンプト
- テンプレートディレクトリ：`/templates`

プロジェクト生成時には `plopfile.js` に定義されたルールに従ってテンプレートを展開します。

---

## 🔧 開発者向け

### 開発環境セットアップ

```bash
yarn install
```

### ローカルで CLI をテストする

```bash
node bin/create-mycorp-app.js
```

または：

```bash
yarn create mycorp-app
```

### Semantic Release

本プロジェクトは [`semantic-release`](https://github.com/semantic-release/semantic-release) により自動リリースされます。
GitHub Actions 経由で OIDC による `npm publish` をサポートしています。

---

## 🪪 ライセンス

[MIT](./LICENSE)
