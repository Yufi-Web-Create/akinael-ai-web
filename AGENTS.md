# AGENTS.md

このリポジトリは、アキナエルAI公開サイトであると同時に、アキナエルAIのWeb制作方式を検証するReference Projectである。
AIエージェントは「コードを書くこと」ではなく、仕様を満たした公開可能な成果物まで自律的に完成させる。

## Source of truth

作業前に対象に応じて以下を読む。

- 案件仕様: `docs/PROJECT_SPEC.md`
- デザイン基準: `docs/DESIGN_SYSTEM.md`
- コピー基準: `docs/COPY_GUIDE.md`
- 技術構成: `docs/ARCHITECTURE.md`
- QA・完成条件: `docs/QA.md`
- 人間フィードバック蓄積: `docs/LEARNINGS.md`

案件固有仕様は一般ルールより優先する。ただし、セキュリティ、アクセシビリティ、事実性、テスト基準を勝手に弱めてはならない。

## Required workflow

1. 関連するSource of truthを読む。
2. 現在の実装と既存テストを確認する。
3. 今回のAcceptance Criteriaを明確にする。
4. 必要な実装を行う。
5. `npm run qa` を実行する。
6. UI変更時は実ブラウザで360 / 375 / 390 / 430 / 768 / 1024 / 1280 / 1440pxを確認する。
7. FAILした項目は原因を修正し、再検証する。
8. Acceptance CriteriaとQAがPASSするまで反復する。

## Non-negotiable rules

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

完了とは以下をすべて満たす状態である。

- 実装済み
- Acceptance Criteriaを満たす
- `npm run qa` がPASS
- 主要画面を実ブラウザで確認済み
- コピー、Visual、Technicalの独立レビューで重大FAILなし
- 既知の重大問題なし
- 人間判断が必要な項目のみ明示されている

顧客や管理者へ見せるのは、この状態になった成果物のみとする。
