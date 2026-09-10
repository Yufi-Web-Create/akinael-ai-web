# REFERENCE_ANALYSIS

最終更新: 2026-09-10（PHASE 7 Release Candidate監査）

## Research scope

- Project: アキナエルAI公開サイト
- Audience: Web担当者を持たない小規模店舗・地域サービス事業者
- Primary CTA: 無料でAIに相談する
- Brand conditions: 「無料試作→納得後契約」、人の確認を挟む安心感、AI丸出しに見せない
- Research date: 2026-09-10
- Method: 各社公式公開サイトの情報階層、CTA、業種導線、料金・不安解消の置き方を比較。見た目や文言は転用せず、機能する原則だけを抽出した。

## References

| # | Source | Category | Good / relevant | Limitation | Decision |
|---|---|---|---|---|---|
| 1 | https://studio.design/ja | Product / UX | 構築・公開・運用改善を工程で分け、無料開始と専門家相談を並置 | 高機能・企業寄りで、小規模店舗には情報量が多い | ADAPT: 相談→無料試作→確認→契約→改善の順を短く示す |
| 2 | https://goope.jp/ | Audience / Copy | 「パソコンが苦手」「お店」と対象の不安を具体語で先に示す | ホームページ作成に範囲が集中 | ADOPT: HeroでWeb担当者がいない小さなお店・事業者を明示 |
| 3 | https://www.jimdo.com/jp/ | Onboarding / CTA | 簡単・無料という開始障壁の低さを一貫して伝える | DIYを前提とし、丸投げ型の価値とは異なる | AVOID: 顧客自身が編集作業を担う印象 |
| 4 | https://www.canva.com/ja_jp/websites/ | Visual / Product | 目的を素早く理解でき、制作物の幅を視覚で示す | テンプレート感と自己制作前提が強い | ADAPT: 対応範囲は明快にし、カード・装飾の反復は避ける |
| 5 | https://www.wix.com/ | Product / Conversion | 無料開始、機能説明、事業用途がCTAへ連続する | 選択肢が多く、初回訪問では認知負荷が高い | ADOPT: Primary CTAを一本化。AVOID: 機能一覧の過密化 |
| 6 | https://www.squarespace.com/ | Industry / Visual | Beauty、Education、Home Services等、業種ごとに成果と用途の言葉を変える | 英語圏・総合プラットフォームの規模感 | ADOPT: 4業種ページを固有の課題・導線・FAQで分ける |
| 7 | https://www.framer.com/ | Visual / Motion | 強いタイポグラフィと余白で主メッセージを絞る | 動きとプロダクトデモが前面に出やすい | ADAPT: 見出しと余白。AVOID: 不要な派手なモーション |
| 8 | https://webflow.com/ | Architecture / Proof | 制作・運用の全体像と高度な機能を整理して見せる | 専門語と企業向け情報が多い | ADAPT: 制作AIと検査AI、人間承認を平易な工程説明へ変換 |
| 9 | https://carrd.com/ | Layout / Mobile | 1ページで要点とCTAを完結させる軽さ | 複雑な比較や業種固有情報には不足 | ADOPT: Homepageをsingle-pageの主導線にする |
| 10 | https://www.notion.com/product/sites | Product / Copy | 短い情報単位で価値を説明 | 信頼・契約条件説明には薄い | ADAPT: 短い説明単位に料金・承認・試作範囲を補う |
| 11 | https://www.shopify.com/website/builder | Business outcome | 機能ではなく販売・運営目的へ結びつける | EC中心で対象範囲が異なる | ADAPT: 予約・問い合わせ・更新停滞という現場課題から語る |

## Cross-reference findings

### Hero

- 対象、解決対象、最初の行動を同じ画面で理解できることが有効。
- 「小さなお店・事業者」「Web/SNS/文章/画像/調査」「無料相談」を優先し、AI技術説明は後ろへ送る。

### Navigation / CTA

- Homepage内の主要節へ短く移動でき、Primary CTAは無料相談へ統一する。
- 既存顧客向けPortalはPrimary CTAと競合させず、Header/Footerに常設する。

### Typography / layout

- 大きな見出し、十分な余白、短い本文幅は採用する。
- 角丸カード・グラデーション・同じ3列の繰り返しはAIテンプレート感につながるため避ける。
- 罫線と番号で構造を見せ、編集的で落ち着いた紙面感を作る。

### Mobile

- HeaderはPrimary CTAとPortal導線を操作可能な範囲に保つ。
- 料金・業種・工程は1列または読みやすい少数列へ再配置し、desktopの単純縮小にしない。

### Pricing / FAQ / Form

- 無料範囲、契約前確認、追加料金の承認条件をCTA前に明記すると不安を減らせる。
- Formはメール・パスワードの最小構成とし、失敗理由を画面内で伝える。

## Direction synthesis

### ADOPT

- 対象者をHeroで明示
- 無料開始の意味をCTA周辺で説明
- 業種別に言葉を変える
- 料金・工程・FAQを契約前に読める情報順
- 既存顧客向けPortal導線の常設

### ADAPT

- SaaSの機能一覧を、店舗の頼みごとと人間承認の工程へ翻訳
- 高度なビジュアル表現を、深緑・紙色・明朝見出し・罫線による静かなブランドへ変換
- single-pageの速さを維持し、検索意図の深い4業種だけ独立ページ化

### AVOID

- 架空実績・口コミ・成果数値
- 「革新的」「最適化」「可能性」のような汎用AIコピー
- 顧客がツールを自分で操作し続けるDIY印象
- 過度なアニメーション、グラデーション、カードの反復
- 複数の同格CTAで判断を迷わせること

## Differentiation

アキナエルAIはサイト作成ツールではなく、普段の言葉で相談した内容を制作・検査・修正へつなげる運用サービスとして見せる。独自性は「無料試作を先に確認」「制作AIと検査AIを分離」「公開・課金は人間承認」という順序と仕組みに置く。

## Research QA

- [x] 8件以上（11件）
- [x] Audience / UX / Visual / Copy / Industryの複数カテゴリ
- [x] Mobileで優先すべき導線を抽出
- [x] Good / limitationの両方を記録
- [x] ADOPT / ADAPT / AVOID分類済み
- [x] 文言・レイアウトの丸ごと模倣なし
