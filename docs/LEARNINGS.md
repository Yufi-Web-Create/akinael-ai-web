# LEARNINGS

このファイルは、人間レビューで発見された問題を「その案件だけの修正」で終わらせず、次回から自動的に避けるための学習台帳。

## Rule
人間から修正が入ったら以下を記録する。
- 何が問題だったか
- なぜAI QAで検出できなかったか
- 案件固有か、共通問題か
- 共通問題なら、どのルール・テスト・参考例へ昇格したか

## Current learnings

### L-001 Responsiveを自己申告にしない
- Problem: AIが「レスポンシブ対応済み」と判断しても実画面で崩れることがある。
- System change: 8 viewportのPlaywrightテストを必須化。

### L-002 コピー品質をBuilder自身だけで判定しない
- Problem: 生成した本人は抽象的な文章を自然と判定しやすい。
- System change: COPY_GUIDEと独立Copy Reviewを必須化。

### L-003 完成の定義をコード生成にしない
- Problem: build前、ブラウザ確認前でもAIが作業完了と報告することがある。
- System change: `npm run qa`とReview GateをCompletion Definitionへ組み込む。
