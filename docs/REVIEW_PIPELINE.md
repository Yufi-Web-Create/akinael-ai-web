# REVIEW_PIPELINE

## Roles
- Builder: 実装担当
- Visual Reviewer: レイアウト・レスポンシブ・見た目の整合性
- Copy Reviewer: 日本語・説明・CTA・事実性
- Technical Reviewer: build・runtime・構造・安全性
- SEO/A11y Reviewer: 検索・構造・アクセシビリティ

## Rule
Builderが自分だけで最終合格判定をしない。

## Flow
1. Builderが実装
2. `npm run qa`
3. Browser screenshots生成
4. Visual Review
5. Copy Review
6. Technical Review
7. SEO/A11y Review
8. FAILをBuilderへ返却
9. Builderが修正
10. `npm run qa`を再実行
11. 重大FAILがなくなるまで反復
12. 人間レビューへ提出

## Review response format
Reviewerは以下の形式で返す。

- Status: PASS / FAIL
- Severity: critical / major / minor
- Location: page / section / viewport / file
- Problem: 何が問題か
- Expected: どうあるべきか
- Evidence: screenshot / error / rule / source of truth

曖昧な「もっと良くできる」「少し気になる」だけでFAILにしない。
修正可能な根拠を添える。
