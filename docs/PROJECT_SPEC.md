# PROJECT_SPEC

## Project
アキナエルAI 公開サイト

## Role
このサイトはアキナエルAIの公開サイトであると同時に、AI Web Production SystemのReference Projectである。

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

## Required pre-production research
正式なDesign / Copy制作前に以下を必須とする。

### Design Research
- 同業・近接業種
- 同客層・同価格感・ブランド温度が近い事例
- 業種外のVisual reference
- Hero / Navigation / CTA / Mobile等のUX reference
- 合計最低8件、推奨12〜20件

### Copy Research
- アキナエルAIの既存事業資料・過去に確定した文言
- 想定顧客が実際に使う困りごとの言葉
- 競合3社以上
- 検索意図・FAQ・契約前の不安
- 競合が多用するgeneric表現

### Research output
- `docs/research/REFERENCE_ANALYSIS.md`
- `docs/research/COPY_RESEARCH.md`
- `docs/DESIGN_DIRECTION.md`
- `docs/COPY_DIRECTION.md`

上記がResearch QAをPASSするまで正式デザイン・正式コピーの本制作へ進まない。

## Prohibited claims
- 架空実績
- 架空顧客
- 架空口コミ
- 根拠のない成果数値
- 順位保証、成果保証、納期保証
- 未確定情報の断定

## Acceptance criteria
- Research QAをPASSしている
- Design Direction / Copy DirectionにReferenceの採用理由が残っている
- 1サイトの模倣ではなく複数Referenceの原則を統合している
- 5秒で「誰向けの何のサービスか」が分かる
- Primary CTAが迷わず見つかる
- 主要情報がスマートフォンでも読みやすい
- 360〜1440pxのQAをPASSする
- コピーが汎用AIサービスのテンプレ文に見えない
- Header / Footer / CTA / Typographyが全ページで統一される
- console error 0
- build / lint / typecheck / unit / E2E PASS
