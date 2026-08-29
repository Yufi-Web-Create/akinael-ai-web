# akinael-ai-web

アキナエルAI公開サイト兼、AI Web Production SystemのReference Projectです。

## Purpose
このリポジトリでは、AIがサイトを「作る」だけでなく、仕様確認・実装・ブラウザQA・修正・再検証まで自律的に行うことを前提とします。

## Setup

```bash
npm install
npx playwright install chromium
npm run dev
```

## Quality gate

```bash
npm run qa
```

`npm run qa` は以下を順番に実行します。

1. ESLint
2. TypeScript typecheck
3. Unit tests
4. Production build
5. Playwright E2E / responsive tests

## Agent source of truth
AIエージェントは実装前に `AGENTS.md` と `docs/` を確認してください。

- `docs/PROJECT_SPEC.md`: 案件仕様
- `docs/DESIGN_SYSTEM.md`: UI・responsive基準
- `docs/COPY_GUIDE.md`: コピー基準
- `docs/ARCHITECTURE.md`: 技術構成
- `docs/QA.md`: 完成条件
- `docs/LEARNINGS.md`: 人間フィードバックからの共通学習

## Current state
現在のTOPはProduction Systemを検証するための最小Reference実装です。
完成サイトではありません。今後、この仕組みを使って正式なページ構成・コピー・デザイン・バックエンド連携を実装し、QA PASS後に公開候補とします。
