# ARCHITECTURE

## Stack (2026-09-08 Astro移行)
- Astro 7.x, `output: "static"`（サーバーサイドランタイムなし、全ページ事前生成）
- TypeScript strict mode（`.astro`フロントマターも含む）
- Astro Content Collections（`src/content.config.ts` + `glob` loader）で業種別ページのデータを構造化管理
- CSS Custom Properties + 1枚のグローバルCSS（`src/styles/global.css`）。UIライブラリ・CSSフレームワークは導入しない
- Astro Islandsのみ使用。Reactなどのcomponent runtimeは導入しない（`portal`/`admin`のReact SPAから意図的に独立させる）
- Vitest for unit tests
- Playwright for browser/E2E/responsive tests
- GitHub Actions（`ubuntu-latest`）でCI

以前のNext.js App Router実装は本diffで置き換えた。理由は`docs/PHASE7_HANDOFF.md`参照。

## Principles
- Static-first。動的である必要がない限りhydrationしない
- 依存ライブラリを安易に増やさない
- UIライブラリによるテンプレート感を避け、必要な機能のみ導入する
- 事業情報は可能な限り単一データソースに寄せる（`src/lib/site-config.ts`、`src/content/industries/*.md`）
- 料金・FAQ・ナビゲーションなど複数ページで使う情報をコピペしない
- route / component / content / domain logicを分離する
- Core API（`Yufi-Web-Create/akinael-ai`）への依存は`PUBLIC_CORE_ORIGIN`環境変数（既定値`https://akinael-ai.com`）を通した`fetch`のみ。新しいAuth API・routeを自リポジトリ側に作らない

## Directory direction
- `src/pages`: ルーティング（`index.astro`, `industries/[slug].astro`）
- `src/layouts`: `BaseLayout.astro`（head meta / Header / Footer共通化）
- `src/components`: `Header.astro`, `Footer.astro`, `RegisterWidget.astro`（唯一のクライアントJS island）
- `src/lib`: site config and pure logic
- `src/content/industries`: 業種別ページの構造化データ（frontmatter: challenges / offerings / faq等）。`src/content.config.ts`でzodスキーマ検証
- `src/styles`: グローバルCSS design tokens
- `tests/unit`: pure/unit tests（`site-config`等）
- `tests/e2e`: Playwright（responsive matrix、内部リンク404チェック、register widgetのclient-side validation）

## Runtime safety
- 公開サイトにsecretを含めない
- 外部APIは`PUBLIC_CORE_ORIGIN`経由のCore API（`/api/v2/auth/register`, `/api/v2/auth/login`）のみ。新規APIを増やさない
- クライアント側のフォーム検証（`RegisterWidget.astro`）はUXのためのものであり、実際のバリデーション・認証はCore側（`src/platform-api.mjs`）がserver-sideで行う。このリポジトリ自体はサーバーを持たない静的サイトである
- エラー時に内部例外やsecretをユーザーへ表示しない
- 新規登録成功後は`customer-token`をlocalStorageへ保存し、Core Portal（`${PUBLIC_CORE_ORIGIN}/portal/`）へ遷移する。このキー名はCore Portal（`portal/src/Portal.tsx`）と完全一致させること

## Quality command
`npm run qa` がローカルの標準完成ゲート。

実行順:
1. ESLint（`eslint-plugin-astro` + `typescript-eslint`、`.astro`フロントマターも対象）
2. `astro check`（TypeScript診断）
3. Unit tests (Vitest)
4. Production build (`astro build`)
5. Playwright E2E / responsive verification

既知の制約: ローカル開発サンドボックスがmacOS 13の場合、現行Playwrightのchromiumバイナリがインストール対象外となり`test:e2e`をローカル実行できないことがある。CI（`ubuntu-latest`）では制約がないため、CIの結果を実際のゲートとする。

## Deployment
本番公開先は後から選択可能。特定ホスティングへ強く依存する実装を避ける（`astro build`の静的出力はどの静的ホスティングでも配信可能）。
Preview/StagingでQA PASSした成果物のみ本番公開候補とする。
`akinael-ai.com`へのDNS切替・本番公開はHuman Gate。
