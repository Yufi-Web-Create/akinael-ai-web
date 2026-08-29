# REVIEW_PIPELINE

## Roles
- Research Strategist: 案件条件・市場・競合・UXの調査範囲を決める
- Design Researcher: Design / Visual / UX Referenceを収集・分析する
- Copy Researcher: 顧客言語・競合言語・検索意図・不安を分析する
- Direction Editor: ResearchをDesign Direction / Copy Directionへ統合する
- Builder: 実装担当
- Visual Reviewer: レイアウト・レスポンシブ・見た目の整合性
- Copy Reviewer: 日本語・説明・CTA・事実性
- Technical Reviewer: build・runtime・構造・安全性
- SEO/A11y Reviewer: 検索・構造・アクセシビリティ

## Separation rule
- Researcherは本実装を行わない。
- BuilderはResearchを省略してDesign / Copyを即興で決めない。
- Builderが自分だけで最終合格判定をしない。
- ReviewerはBuilderの自己説明ではなく、Source of truth・実画面・テスト結果を根拠に判定する。

## Flow
1. Project Spec確認
2. Research Strategistが調査条件を定義
3. Design Research
4. Copy Research
5. Research QA
6. Direction Editorが `DESIGN_DIRECTION.md` / `COPY_DIRECTION.md` を確定
7. `DESIGN_SYSTEM.md` / `COPY_GUIDE.md`へ具体化
8. Builderが実装
9. `npm run qa`
10. Browser screenshots生成
11. Visual Review
12. Copy Review
13. Technical Review
14. SEO/A11y Review
15. FAILをBuilderへ返却
16. Builderが修正
17. `npm run qa`を再実行
18. 必要ならDirection・Systemへ学びを戻す
19. 重大FAILがなくなるまで反復
20. 人間レビューへ提出

## Research Gate
Design / Copyに影響する制作では、以下が未完了ならBuilder開始不可。
- `docs/research/REFERENCE_ANALYSIS.md`
- `docs/research/COPY_RESEARCH.md`
- `docs/DESIGN_DIRECTION.md`
- `docs/COPY_DIRECTION.md`

純粋なbug fix、security fix、既存仕様どおりの小規模technical fixはResearch Gate対象外にできる。

## Research review response format
- Status: PASS / FAIL
- Coverage: 調査件数・カテゴリ
- Missing evidence: 足りない調査
- Bias: 同業偏重、Awwwards偏重などの偏り
- Synthesis quality: Referenceの理由がDirectionへ変換されているか
- Originality risk: 模倣リスク

## Production review response format
Reviewerは以下の形式で返す。

- Status: PASS / FAIL
- Severity: critical / major / minor
- Location: page / section / viewport / file
- Problem: 何が問題か
- Expected: どうあるべきか
- Evidence: screenshot / error / rule / source of truth

曖昧な「もっと良くできる」「少し気になる」だけでFAILにしない。
修正可能な根拠を添える。

## Learning loop
人間レビューまたは顧客レビューで再発防止可能な指摘が出た場合、その場の修正だけで終わらせない。
以下のどこへ戻すべきか判定する。
- `RESEARCH_STANDARD.md`
- `DESIGN_DIRECTION.md`
- `COPY_DIRECTION.md`
- `DESIGN_SYSTEM.md`
- `COPY_GUIDE.md`
- `QA.md`
- automated tests
- `LEARNINGS.md`

同じ種類の問題を次案件で繰り返さないことを優先する。
