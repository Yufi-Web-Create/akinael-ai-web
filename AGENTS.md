# AGENTS.md

このリポジトリは、アキナエルAI公開サイトであると同時に、アキナエルAIのWeb制作方式を検証するReference Projectである。
AIエージェントは「コードを書くこと」ではなく、調査・方向性決定・実装・検証までを行い、仕様を満たした公開可能な成果物まで自律的に完成させる。

## Source of truth

作業前に対象に応じて以下を読む。

- 案件仕様: `docs/PROJECT_SPEC.md`
- Research基準: `docs/RESEARCH_STANDARD.md`
- Reference分析: `docs/research/REFERENCE_ANALYSIS.md`
- Copy Research: `docs/research/COPY_RESEARCH.md`
- デザイン方向性: `docs/DESIGN_DIRECTION.md`
- コピー方向性: `docs/COPY_DIRECTION.md`
- デザイン基準: `docs/DESIGN_SYSTEM.md`
- コピー基準: `docs/COPY_GUIDE.md`
- 技術構成: `docs/ARCHITECTURE.md`
- QA・完成条件: `docs/QA.md`
- レビュー工程: `docs/REVIEW_PIPELINE.md`
- 人間フィードバック蓄積: `docs/LEARNINGS.md`

案件固有仕様は一般ルールより優先する。ただし、セキュリティ、アクセシビリティ、事実性、Research QA、テスト基準を勝手に弱めてはならない。

## Required workflow

### Phase 1: Understand
1. `PROJECT_SPEC.md` と関連するSource of truthを読む。
2. 現在の実装と既存テストを確認する。
3. 今回のAcceptance Criteriaを明確にする。

### Phase 2: Research — design/copy work requires this phase
4. `RESEARCH_STANDARD.md` に従ってMarket / UX / Design / Copy Researchを行う。
5. `docs/research/REFERENCE_ANALYSIS.md` を最低8件、推奨12〜20件のReferenceで埋める。
6. `docs/research/COPY_RESEARCH.md` を顧客言語・競合3社以上・検索意図・不安の情報で埋める。
7. Referenceから見た目や文言をコピーせず、機能している理由をADOPT / ADAPT / AVOIDへ分類する。
8. Research QAをPASSさせる。

### Phase 3: Direction
9. Research結果から `DESIGN_DIRECTION.md` を確定する。
10. Research結果から `COPY_DIRECTION.md` を確定する。
11. Directionを `DESIGN_SYSTEM.md` と `COPY_GUIDE.md` へ具体化する。

Design / Copyに影響する本実装は、Phase 2とPhase 3が完了するまで開始禁止。
既存Directionを変更しない純粋な技術修正はResearchを省略できる。

### Phase 4: Build
12. 必要な実装を行う。
13. `npm run qa` を実行する。
14. UI変更時は実ブラウザで360 / 375 / 390 / 430 / 768 / 1024 / 1280 / 1440pxを確認する。

### Phase 5: Independent review and correction
15. Visual / Copy / Technical / SEO-A11yをBuilderとは別のReview contextで評価する。
16. FAILした項目は根拠とExpectedを付けてBuilderへ返す。
17. Builderが修正し、QAとReviewを再実行する。
18. Acceptance CriteriaとQAがPASSするまで反復する。

## Non-negotiable rules

- Design / Copyの本制作をResearch完了前に開始しない。
- Referenceサイトのレイアウト、表現、コピーを丸ごと模倣しない。
- Referenceから借りるのは「なぜ機能しているか」という判断原則である。
- テストを削除、skip、条件緩和してPASS扱いにしない。
- 架空の実績、顧客、口コミ、成果数値、料金、運営情報を作らない。
- 不明情報を自然な文章で補完して事実のように見せない。
- 仕様を実装しやすさのために勝手に変更しない。
- APIキー、secret、個人情報をコード、ログ、公開HTMLへ入れない。
- UIは実ブラウザ確認なしで完了扱いにしない。
- デスクトップだけを基準にしてモバイルを縮小版にしない。
- コピーは別企業へそのまま転用できる抽象文を避ける。
- 問題を発見した場合、合理的に解決可能なら質問せず修正し再検証する。

## Completion definition

Design / Copyを含む案件の完了とは以下をすべて満たす状態である。

- Research QA PASS
- `REFERENCE_ANALYSIS.md` / `COPY_RESEARCH.md` 完了
- `DESIGN_DIRECTION.md` / `COPY_DIRECTION.md` 確定
- 実装済み
- Acceptance Criteriaを満たす
- `npm run qa` がPASS
- 主要画面を実ブラウザで確認済み
- コピー、Visual、Technical、SEO/A11yの独立レビューで重大FAILなし
- 既知の重大問題なし
- 人間判断が必要な項目のみ明示されている

顧客や管理者へ見せるのは、この状態になった成果物のみとする。
