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
PHASE 7のReference Siteは、Astro static buildとしてhomepageと4業種ページを実装済みです。`main`のQuality Gateはlint / typecheck / unit / build / Playwright E2Eを含みます。

現在の目標はproduction publishではなく、Release Candidate / Preview Readyです。本番公開、`akinael-ai.com`の置換、DNS変更はHuman Gateとして、オーナーの明示承認まで実行しません。最新の進行状況と残件は `docs/PHASE7_HANDOFF.md` を参照してください。
