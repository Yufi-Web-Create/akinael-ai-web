# AGENTS.md

このリポジトリは、アキナエルAI公開サイトであると同時に、アキナエルAIのWeb制作方式を検証するReference Projectである。
AIエージェントは「コードを書くこと」ではなく、調査・方向性決定・実装・検証・修正までを自律的に遂行し、**デプロイ直前の完成状態（DEPLOY READY）**まで一連の工程を止めずに到達させる。

フェーズは人間承認の区切りではなく、AI内部の作業工程である。通常はフェーズ間で人間へ確認を求めない。

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
- デプロイ前ゲート: `docs/RELEASE_GATE.md`
- 人間フィードバック蓄積: `docs/LEARNINGS.md`

案件固有仕様は一般ルールより優先する。ただし、セキュリティ、アクセシビリティ、事実性、Research QA、テスト基準を勝手に弱めてはならない。

## Autonomous execution principle

依頼を受けたら、原則として以下を一連のタスクとして扱い、途中で停止しない。

`Understand → Research → Direction → Build → QA → Independent Review → Correction Loop → Deploy Readiness`

Research完了、Direction確定、初回実装完了、QA FAIL、Reviewer FAILは停止理由ではない。
次工程または修正工程へ自律的に進む。

通常の技術判断、デザイン判断、コピー編集、リファクタリング、テスト追加、レスポンシブ調整について承認待ちを発生させない。
合理的に解決可能な不明点は、Source of truth・Research・既存実装・業界標準から判断し、判断理由を記録して進める。

## Required workflow

### Phase 1: Understand
1. `PROJECT_SPEC.md` と関連するSource of truthを読む。
2. 現在の実装と既存テストを確認する。
3. 今回のAcceptance Criteriaを明確にする。
4. 次Phaseへ自動的に進む。

### Phase 2: Research — design/copy work requires this phase
5. `RESEARCH_STANDARD.md` に従ってMarket / UX / Design / Copy Researchを行う。
6. `docs/research/REFERENCE_ANALYSIS.md` を最低8件、推奨12〜20件のReferenceで埋める。
7. `docs/research/COPY_RESEARCH.md` を顧客言語・競合3社以上・検索意図・不安の情報で埋める。
8. Referenceから見た目や文言をコピーせず、機能している理由をADOPT / ADAPT / AVOIDへ分類する。
9. Research QAを実施し、不足があれば追加調査してPASSまで修正する。
10. 人間確認を待たずPhase 3へ進む。

### Phase 3: Direction
11. Research結果から `DESIGN_DIRECTION.md` を確定する。
12. Research結果から `COPY_DIRECTION.md` を確定する。
13. Directionを `DESIGN_SYSTEM.md` と `COPY_GUIDE.md` へ具体化する。
14. 複数案が考えられる場合も、PROJECT_SPECとResearchに最も整合する案を自ら選び、理由を記録する。
15. 人間確認を待たずPhase 4へ進む。

Design / Copyに影響する本実装は、Phase 2とPhase 3が完了するまで開始禁止。
既存Directionを変更しない純粋な技術修正はResearchを省略できる。

### Phase 4: Build
16. 必要な実装を完成させる。
17. `npm run qa` を実行する。
18. UI変更時は実ブラウザで360 / 375 / 390 / 430 / 768 / 1024 / 1280 / 1440pxを確認する。
19. FAIL時は停止せず原因を修正し再実行する。

### Phase 5: Independent review and correction
20. Visual / Copy / Technical / SEO-A11yをBuilderとは別のReview contextで評価する。
21. FAILした項目は根拠とExpectedを付けてBuilderへ返す。
22. Builderが修正し、QAとReviewを再実行する。
23. 必要ならResearch / Direction / System / Testsへ学びを戻す。
24. Acceptance CriteriaとQA、ReviewがPASSするまで自律的に反復する。
25. 人間確認を待たずPhase 6へ進む。

### Phase 6: Deploy readiness
26. `docs/RELEASE_GATE.md` の全項目を確認する。
27. production build、全QA、全Reviewer、公開コンテンツ、環境変数要件、外部接続要件を確認する。
28. 未解決項目が合理的に修正可能なら自ら修正し、再検証する。
29. 全条件を満たしたら `DEPLOY READY` として完了報告する。
30. **実際の本番デプロイ、DNS切替、本番ドメイン変更、課金を伴う外部サービス有効化は、人間の明示承認があるまで実行しない。**

## Stop conditions — 人間へ確認してよい場合

途中確認は以下に限定する。

- 実デプロイ、DNS・本番ドメイン切替など不可逆または外部公開を伴う操作
- 新たな有料契約、課金、購入、広告出稿など金銭的コミットメント
- 法務・会社情報・料金・実績など、存在しない事業上の事実が必要
- Source of truth同士が明確に矛盾し、選択によって事業内容が大きく変わる
- 必要なcredential / secret / 外部権限がなく、技術的に先へ進めない
- 本番データ削除・破壊的migrationなど重大な不可逆操作

上記以外の理由で「どちらにしますか」「次へ進めますか」「修正しますか」と逐一確認しない。

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
- QAやReviewのFAILを、人間へ差し戻すことで作業終了しない。AI内部で修正ループを回す。

## Completion definition

Design / Copyを含む案件の通常完了は **DEPLOY READY** であり、以下をすべて満たす状態である。

- Research QA PASS
- `REFERENCE_ANALYSIS.md` / `COPY_RESEARCH.md` 完了
- `DESIGN_DIRECTION.md` / `COPY_DIRECTION.md` 確定
- 実装済み
- Acceptance Criteriaを満たす
- `npm run qa` がPASS
- 主要画面を実ブラウザで確認済み
- Copy / Visual / Technical / SEO-A11yの独立レビューで重大FAILなし
- `RELEASE_GATE.md` PASS
- 既知の重大問題なし
- 人間判断が必要な項目のみ明示されている
- 本番へデプロイ可能だが、まだ本番公開操作は行っていない

顧客や管理者へ見せるのは、この状態になった成果物のみとする。
