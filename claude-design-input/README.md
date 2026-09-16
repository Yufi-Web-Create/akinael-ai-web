# Claude Design 公開サイト実装入力

2026-09-16にClaude Designで確定したアキナエルAI公開サイト刷新の実装仕様です。

## 読む順番
1. `/AGENTS.md`
2. `/README.md`
3. 現在のAstro構成、CI、Playwright E2E
4. `./public-site/README.md`
5. Core repo `Yufi-Web-Create/akinael-ai` の同名branch `design-input/claude-redesign-20260916` にある `claude-design-input/IMPLEMENTATION_BRIEF.md`

## 対象
公開LPを現在のAstro構成で再実装する。既存SEO/metadata/OG/robots/sitemap/accessibility/E2Eを維持し、CTAは本番Portal導線へ接続する。

## 重要
デザイン仕様はhifi。見た目だけではなく料金切替、スクリーンショットクロスフェード、レスポンシブ、keyboard/focus状態まで実装・検証する。

実装は最新mainから `feature/public-site-redesign` 等の別branchを作って行う。このbranchはデザイン入力の保管用。
