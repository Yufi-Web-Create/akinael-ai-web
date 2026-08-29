# ARCHITECTURE

## Stack
- Next.js 16.3.x App Router
- React 19.2.x
- TypeScript strict mode
- CSS Custom Properties + component-scoped/global CSS
- Vitest for unit tests
- Playwright for browser/E2E/responsive tests
- GitHub Actions for CI

## Principles
- Server Componentsを基本とし、client componentは必要な箇所だけに限定する
- 依存ライブラリを安易に増やさない
- UIライブラリによるテンプレート感を避け、必要な機能のみ導入する
- 事業情報は可能な限り単一データソースに寄せる
- 料金・FAQ・ナビゲーションなど複数ページで使う情報をコピペしない
- route / component / content / domain logicを分離する

## Directory direction
- `src/app`: routes and layouts
- `src/components`: reusable UI
- `src/lib`: site config and pure logic
- `src/content`: structured site content when needed
- `tests/unit`: pure/unit tests
- `tests/e2e`: browser tests

## Runtime safety
- 公開サイトにsecretを含めない
- 外部APIは必要になるまで導入しない
- フォーム等を追加するときはserver-side validationを必須とする
- エラー時に内部例外やsecretをユーザーへ表示しない

## Quality command
`npm run qa` がローカルの標準完成ゲート。

実行順:
1. ESLint
2. TypeScript
3. Unit tests
4. Production build
5. Playwright E2E / responsive verification

## Deployment
本番公開先は後から選択可能。特定ホスティングへ強く依存する実装を避ける。
Preview/StagingでQA PASSした成果物のみ本番公開候補とする。
