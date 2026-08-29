# PROJECT_SPEC

## Project
アキナエルAI 公開サイト

## Role
このサイトはアキナエルAIの公開サイトであると同時に、AI Web Production SystemのReference Projectである。

## Execution mode
**Autonomous until DEPLOY READY.**

フェーズ分けはAI内部の品質管理のために行う。各Phaseの完了時に人間確認を待たず、Research → Direction → Production → QA / Review → Correction → Release Gateまで連続して遂行する。

実際の本番デプロイ、DNS・本番ドメイン切替、新規課金を伴う外部サービス有効化のみ、人間の明示承認前に実行しない。

## Primary audience
- Web担当者を持たない小規模店舗・地域サービス事業者
- 集客や更新を代表者自身が兼務している事業者
- SNSや簡易サイトはあるが、小さな改善が止まりやすい事業者

## Primary outcomes
訪問者が短時間で以下を理解できること。
1. アキナエルAIが何をしてくれるサービスか
2. 自分の事業に関係するか
3. 相談から制作・検査・修正までどう進むか
4. AI任せではなく品質検査と人間承認があること
5. 契約前に試せること

## Primary CTA
`無料で相談する`

## Secondary CTA
`サービス詳細を見る`

## Required pages
- `/` TOP
- `/service` サービス詳細
- `/pricing` 料金
- `/faq` FAQ
- `/cases` 事例・デモ
- `/industries/[slug]` 業種別
- `/about` 運営・サービス情報
- 必要な法務ページ

## TOP requirements
- Hero: 誰向け / 何をする / CTAが5秒以内に理解できる
- 課題と解決
- 対応できること
- 一般的な制作会社・DIY・汎用AIとの違い
- 相談→試作→確認→契約→継続改善の流れ
- 業種別導線
- 料金導線
- FAQ抜粋
- 最終CTA

## Product truth
- チャット相談を起点に要件整理・制作・品質検査・修正・継続改善まで進める
- 制作AIと検査AIを分離する
- 公開・課金など重要操作は人間承認を必要とする
- 専門知識がない顧客を前提とする
- 顧客作業を前提としたDIYサービスではない

## Prohibited claims
- 架空実績
- 架空顧客
- 架空口コミ
- 根拠のない成果数値
- 順位保証、成果保証、納期保証
- 未確定情報の断定

## Required autonomous pipeline

### Phase 1 — Research
- 現行実装と事業資料を監査
- Design Reference最低8件、推奨12〜20件
- Copy競合3社以上
- 顧客言語 / 検索意図 / 不安を整理
- ADOPT / ADAPT / AVOIDを整理
- Research QA PASSまで追加調査
- **PASS後は人間確認なしで次Phaseへ進む**

### Phase 2 — Direction
- `DESIGN_DIRECTION.md` 確定
- `COPY_DIRECTION.md` 確定
- `DESIGN_SYSTEM.md` / `COPY_GUIDE.md`へ具体化
- 複数案がある場合はPROJECT_SPECとResearchへの適合度でAIが選定
- **方向性確定後も人間確認なしでProductionへ進む**

### Phase 3 — Production
- 必須ページを完成実装
- 共通Header / Footer / CTA / Design Tokens
- 必要なbackend接続境界
- SEO / A11y
- production build可能な状態まで実装

### Phase 4 — QA / Review / Correction
- `npm run qa`
- 8 viewport実ブラウザQA
- Visual / Copy / Technical / SEO-A11y独立Review
- FAILはAI内部で自動差し戻し
- 修正 → 再QA → 再Review
- 重大FAILがなくなるまで反復
- **FAILを理由に人間へ作業を返さない**

### Phase 5 — Release Gate
- `docs/RELEASE_GATE.md` を全確認
- deploymentに必要な環境変数・外部設定・DNS作業・smoke testを整理
- 修正可能なFAILは自動修正
- 全項目PASSで `DEPLOY READY`
- ここで初めて人間へ最終報告
- 本番公開操作は承認待ち

## Human escalation only
途中停止・質問は以下に限定する。

- 本番デプロイ / DNS / custom domain切替
- 新規課金・契約
- 未提供の法務・会社・料金・実績等の正式情報
- production secret / credential不足
- destructive migration / production data削除
- 重大な事業仕様矛盾

それ以外は合理的判断で進める。

## Acceptance criteria
- Research QA PASS
- Design / Copy Direction確定
- 5秒で「誰向けの何のサービスか」が分かる
- Primary CTAが迷わず見つかる
- 必須ページが完成している
- 主要情報がスマートフォンでも読みやすい
- 360〜1440pxのQAをPASSする
- コピーが汎用AIサービスのテンプレ文に見えない
- Header / Footer / CTA / Typographyが全ページで統一される
- console error 0
- build / lint / typecheck / unit / E2E PASS
- Visual / Copy / Technical / SEO-A11y重大FAILなし
- RELEASE_GATE PASS
- Statusが `DEPLOY READY`
- 本番デプロイはまだ実行していない
