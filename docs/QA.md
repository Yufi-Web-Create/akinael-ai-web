# QA

## Release rule
このリポジトリでは「実装済み」と「完成」を分ける。
顧客・管理者レビューへ出してよいのは、下記の必須GateをPASSした成果物だけ。

## Automated gate
`npm run qa` が成功すること。

必須:
- lint: PASS / warning 0
- typecheck: PASS
- unit tests: PASS
- production build: PASS
- E2E: PASS

## Browser gate
主要公開ページを以下のviewportで確認する。
- 360 × 800
- 375 × 812
- 390 × 844
- 430 × 932
- 768 × 1024
- 1024 × 768
- 1280 × 800
- 1440 × 900

各viewportで必須:
- horizontal overflowなし
- main contentが表示される
- Header / Navigationが操作可能
- CTAが画面外へclipしない
- text overlapなし
- console errorなし

## Visual review gate
Visual Reviewerが最終スクリーンショットを確認する。
FAIL例:
- 情報階層が不明
- 不自然な余白
- 文字が大きすぎる/小さすぎる
- desktopを単純縮小したmobile
- 同じカードパターンの過剰反復
- Header/Footerの不一致
- ブランド意図のない装飾

## Copy review gate
Copy Reviewerが最終画面上の文章を確認する。
FAIL例:
- 汎用AIコピー
- 抽象表現だけでサービス内容が分からない
- 事実でない情報
- 重複説明
- CTAの意味が曖昧
- 日本語として不自然

## Technical review gate
Technical Reviewerが以下を確認する。
- console error
- broken routes / links
- hydration problems
- secret exposure
- unnecessary client components
- validation不足（フォーム/APIが存在する場合）
- 同一データの不整合

## Accessibility / SEO gate
- semantic headings
- keyboard navigation
- visible focus
- form labels when forms exist
- alt text when meaningful images exist
- unique page title / description
- canonical strategy
- index/noindex boundary

## FAIL handling
FAILを見つけたReviewerは「問題の報告」で終了しない。
1. FAIL理由
2. 期待状態
3. 再現場所 / viewport
をBuilderへ返す。
Builderは修正後、該当Gateだけでなく`npm run qa`全体を再実行する。

## Human review
AI QA後、人間が変更を求めた場合はその修正だけで終わらせず、原因を`docs/LEARNINGS.md`へ記録する。
同種の失敗を自動検出できる場合は、テストまたは共通ルールへ昇格する。
