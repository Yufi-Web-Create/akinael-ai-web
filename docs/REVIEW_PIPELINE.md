# REVIEW_PIPELINE

## Purpose
この工程は人間承認の段階分けではなく、AI内部の品質保証パイプラインである。
各工程の完了ごとに停止せず、**DEPLOY READY**まで自律的に進む。

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
- Release Reviewer: デプロイ直前の総合確認

## Separation rule
- Researcherは本実装を行わない。
- BuilderはResearchを省略してDesign / Copyを即興で決めない。
- Builderが自分だけで最終合格判定をしない。
- ReviewerはBuilderの自己説明ではなく、Source of truth・実画面・テスト結果を根拠に判定する。
- ReviewerのFAILは人間への作業返却ではなく、Builderへの自動差し戻しである。

## Autonomous flow
1. Project Spec確認
2. Research Strategistが調査条件を定義
3. Design Research
4. Copy Research
5. Research QA
6. 不足があればResearcherが追加調査
7. Direction Editorが `DESIGN_DIRECTION.md` / `COPY_DIRECTION.md` を確定
8. `DESIGN_SYSTEM.md` / `COPY_GUIDE.md`へ具体化
9. Builderが実装
10. `npm run qa`
11. Browser screenshots生成
12. Visual Review
13. Copy Review
14. Technical Review
15. SEO/A11y Review
16. FAILをBuilderへ返却
17. Builderが修正
18. `npm run qa`と該当Reviewを再実行
19. 必要ならResearch・Direction・System・Testsへ学びを戻す
20. 重大FAILがなくなるまで反復
21. Release Reviewerが `RELEASE_GATE.md` を確認
22. Release GateのFAILを該当担当へ自動差し戻し
23. 修正・再QA・再Review
24. 全条件PASSで `DEPLOY READY`
25. 人間へ最終報告
26. 実デプロイは明示承認があるまで実行しない

## No-pause rule
以下は停止・確認理由にしない。

- Research完了
- Design Direction / Copy Direction確定
- デザイン案が複数考えられる
- 初回実装完了
- QA FAIL
- Reviewer FAIL
- 通常のレスポンシブ調整
- 通常のコピー改善
- 通常の技術選択やリファクタリング

Source of truthとResearchから最適案を選び、理由を記録して次へ進む。

## Human escalation
人間へ確認するのは以下だけ。

- 本番デプロイ / DNS / 本番ドメイン切替
- 新規課金や有料外部サービスの契約
- 不明な法務・会社・料金・実績等の事業事実
- 重大な仕様矛盾で事業判断が必要
- credential / secret / 権限が不足し先へ進めない
- 本番データ削除など不可逆操作

## Research Gate
Design / Copyに影響する制作では、以下が未完了ならBuilder開始不可。ただしResearcherが自律的に完成させ、そのまま次工程へ進む。

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

## Completion report
人間への報告は原則として途中経過ではなく、DEPLOY READY到達時にまとめる。

- Status: DEPLOY READY / BLOCKED
- 実装済み範囲
- Research summary
- QA結果
- Reviewer結果
- デプロイに必要な環境変数・外部設定
- 既知のminor issue
- 人間判断が必要な項目
- 本番デプロイ時に行う操作

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
