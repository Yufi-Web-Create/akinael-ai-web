# RESEARCH_STANDARD

## Purpose
デザインとコピーの制作前に、案件条件に近い外部事例と実際の顧客言語を調査し、AIの手癖ではなく根拠のある方向性を決める。

Researchは実装工程ではない。Research担当はコードや完成コピーを先に作らない。
ただし、**Researchは人間承認のための停止地点でもない。Research QAをPASSしたら、そのままDirectionへ進む。**

## Required order
1. `PROJECT_SPEC.md` を読む
2. 顧客・業種・目的・ターゲット・CTA・ブランド条件を整理する
3. Market / UX Research
4. Design Reference Research
5. Copy / Language Research
6. 各Referenceを分析する
7. `DESIGN_DIRECTION.md` と `COPY_DIRECTION.md` を確定する
8. その後に `DESIGN_SYSTEM.md` / `COPY_GUIDE.md` を案件向けに更新する
9. Builderへ渡す
10. Builderは人間確認を待たず本実装へ進む

Research完了前に本実装へ進まない。
Research完了後に「この方向で進めますか？」とは確認しない。

## Design research sources
最低8件、推奨12〜20件を調査する。1カテゴリへ偏らせない。

### A. 同業・近接業種
情報構成、信頼形成、予約・問い合わせ導線を確認する。

### B. 同客層・同価格感・同ブランド温度
業種が違っても、客層・距離感・上質さ・親しみやすさが近い事例を確認する。

### C. Visual reference
建築、ホテル、飲食、アパレル、ギャラリー、出版なども含め、狙う世界観に近い事例を確認する。

### D. UX reference
Hero、Navigation、CTA、Pricing、FAQ、Form、Mobileなど機能単位で良い事例を確認する。

## Copy research sources
最低以下を確認する。
- 顧客ヒアリング・既存資料
- 顧客自身が使う言葉
- 競合3社以上
- 検索意図・検索で使われる語彙
- FAQ・よくある不安
- 既存SNSやブランド文章がある場合はその文体
- 実在する口コミ・レビューが利用可能な場合は価値表現の参考として確認

競合コピーをそのまま転用しない。

## Required analysis for every reference
各Referenceについて以下を記録する。
- URL / Source
- Category: Industry / Audience / Visual / UX / Copy
- Why relevant
- Good
- Bad / limitation
- Adopt: そのまま原則として採用する考え方
- Adapt: 案件用に変換して採用する考え方
- Avoid: 採用しない要素

## Core rule
Referenceから見た目や文言をコピーしない。
Referenceから「なぜ機能しているか」という判断理由を抽出し、その原則だけを案件へ適用する。

## Research QA
以下をすべて満たさなければResearch PASSにしない。

### Design
- [ ] 8件以上を調査
- [ ] 同業だけに偏っていない
- [ ] DesktopとMobileの両方を確認
- [ ] Hero / Navigation / CTAを確認
- [ ] 各Referenceに採用理由がある
- [ ] 良い点と悪い点を記録
- [ ] 1サイトを丸ごと模倣していない
- [ ] ADOPT / ADAPT / AVOIDが整理されている

### Copy
- [ ] 顧客資料を確認
- [ ] 顧客自身の言葉を抽出
- [ ] 競合3社以上を確認
- [ ] 業界頻出表現を抽出
- [ ] generic表現を特定
- [ ] 顧客の不安・疑問を抽出
- [ ] 差別化のための言語機会を整理
- [ ] 競合コピーを転用していない

FAILの場合は、追加調査・分析修正をAI内部で行い、PASSするまで再評価する。
通常の調査不足やReference選定について人間へ差し戻さない。

## Completion
Researchの完了成果物は以下。
- `docs/research/REFERENCE_ANALYSIS.md`
- `docs/research/COPY_RESEARCH.md`
- `docs/DESIGN_DIRECTION.md`
- `docs/COPY_DIRECTION.md`

4ファイルが揃い、Research QAをPASSして初めてBuilderが本実装へ進める。
**この遷移は自動で行う。**

## Human escalation
Research中に人間確認が必要なのは、正式な事業事実が不足し、それを推測すると公開情報の虚偽につながる場合のみ。
調査範囲、Reference選定、通常のDesign / Copy判断はAIが行う。
