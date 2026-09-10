# DESIGN_DIRECTION

最終更新: 2026-09-10（Research QA反映）

## Concept

小さな店舗の相談を落ち着いて受け止め、制作・確認へ整理していく「商いの編集室」。AIプロダクトの派手さではなく、話しやすさ、判断しやすさ、勝手に進まない安心感を視覚化する。

## Visual character

- Calm
- Editorial
- Human
- Clear
- Warm

## What the design must communicate

1. 小規模店舗・地域事業者のためのサービスである
2. 専門操作ではなく、相談から依頼できる
3. 無料試作と人間承認があり、急かされず判断できる

## Layout direction

- 情報密度: 1セクション1目的。説明は短い段落と定義リストへ分ける
- 余白: desktop 72〜112px、mobile 64〜72pxを基準
- Section rhythm: paper → rule → paper、料金のみ深緑bandで判断点を作る
- Grid: desktop 2列または料金4列、mobile 1列。業種導線だけ2列へ展開
- Card usage: 角丸カードを反復せず、罫線・番号・余白で構造化

## Typography direction

- 見出し: 明朝系で、商い・編集・人の判断を感じる落ち着き
- 本文: ゴシック系で16px以上、長い説明も読みやすくする
- 文字サイズ: H1/H2はclamp、本文は縮めない
- 英字: eyebrowとplan名など補助ラベルだけに使い、本文を英語化しない

## Imagery direction

- 現段階は写真に依存せず、実在しない店舗・顧客の印象を作らない
- 将来使用する場合は実在店舗の許可済み写真、手仕事・空間・営業風景を優先
- AI生成画像はデモであることが明確で、特定顧客の実績に見えない場合のみ
- 避ける: 人型ロボット、発光する脳、青紫グラデーション、架空の成功事例写真

## Color direction

- Primary: 深緑。信頼、落ち着き、商いの継続
- Accent: 珊瑚色。必要な箇所だけの温度
- Background: 生成りの紙色。画面の冷たさを抑える
- Avoid: AI SaaSに多い寒色ネオン、過剰なグラデーション、低コントラスト文字

## Motion direction

- Use: hover/focusの短い状態変化のみ
- Avoid: parallax、autoplay carousel、scroll-jacking、CTAを急かす動き
- prefers-reduced-motionを尊重する

## Mobile direction

- Logo、無料相談CTA、Portal導線を操作可能に保つ
- desktop navは隠しても、ページ内主要情報は縦スクロールで順番に到達可能にする
- 料金4列、業種2列は1列へ再配置
- 見出し改行とbutton幅をviewport内へ収め、本文16pxを維持
- horizontal overflow、固定要素による隠れ、狭すぎるtouch targetを許容しない

## Reference mapping

- Hero: グーペの対象者明示、Studio/Framerの強い情報階層を、明朝と余白へ変換
- Navigation: Carrdのsingle-page到達性をhomepage anchorへ採用
- CTA: Jimdo/Wix/Squarespaceの無料開始を、カード不要・試作確認までの具体条件付きで採用
- Typography: Framer/Studioの強弱を採用し、装飾と動きは抑制
- Mobile: single-column優先、Primary CTAと既存顧客Portalを保持

## ADOPT

- 5秒で対象・サービス・行動を理解できるHero
- 業種別の固有語
- 料金・FAQ・登録を同一導線内に置く
- 余白と短い本文幅

## ADAPT

- SaaSの機能カードを、罫線と番号の編集的な一覧へ変更
- 「無料」を安売りでなく、納得後契約の手順として説明
- 業種別landingを4つの実際の更新課題に絞る

## AVOID

- 青紫ネオン、巨大な3D AI、グラデーション、過剰な角丸
- 同じカードgridの連続
- 架空実績・口コミ・顧客ロゴ
- desktopを縮めただけのmobile
- CTAの過剰反復と不明瞭な文言

## Distinctive element

生成りの紙面、深緑、明朝見出し、細い罫線、工程番号を組み合わせ、「AIツール」よりも相談と制作を整理する編集室として見せる。Heroの相談例は架空実績ではなく、入力方法を理解するための例示として明確に扱う。

## Approval condition

- [x] 11件のReference Analysisを根拠にしている
- [x] 1サイトの模倣ではない
- [x] Project Specと整合
- [x] Mobile方向を明示
- [x] AVOIDを明示
