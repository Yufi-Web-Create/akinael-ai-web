# DESIGN_SYSTEM

## Goal
AI生成サイト特有の量産的な見た目を避け、情報の意味・ブランド・読みやすさからレイアウトを決める。

## Principles
- 見た目より情報階層を優先する
- すべてをカード化しない
- 不要な角丸、影、グラデーションを使わない
- セクションごとに同じ3カラムを繰り返さない
- CTAを過剰に配置しない
- 写真・図版は意味がある箇所だけに使う
- mobileはdesktopの縮小版ではなく再設計する

## Layout tokens
- content max width: 1200px
- reading max width: 720px
- desktop gutter: 48px
- tablet gutter: 32px
- mobile gutter: 20px
- desktop section spacing: 112px
- tablet section spacing: 88px
- mobile section spacing: 64px

実装ではCSS Custom Propertiesを使用し、ページごとの独自値乱立を避ける。

## Typography
- 本文は原則16px以上
- mobile本文も16pxを基準とする
- 長文の1行はおおむね45〜75字相当を目安にする
- H1/H2は`clamp()`等で流動化してよい
- 文字サイズだけでなくweight / line-height / spacingで階層を作る

## Responsive verification viewports
- 360 × 800
- 375 × 812
- 390 × 844
- 430 × 932
- 768 × 1024
- 1024 × 768
- 1280 × 800
- 1440 × 900

## Responsive fail conditions
- horizontal scroll
- navigation clipped or unusable
- CTA clipped or unreachable
- unintended text overlap
- headings that become visually dominant beyond reason
- fixed elements hiding content
- images causing layout overflow
- touch targets difficult to operate

## Component rule
共通UIは再利用する。Header、Footer、Button、Section heading、CTAなどでページごとの見た目を勝手に変えない。

## Visual review
UI変更後はスクリーンショットを生成し、Visual Reviewerが以下を判定する。
- hierarchy
- spacing
- alignment
- readability
- responsive composition
- repeated AI-template patterns
- visual consistency

重大なFAILがあればBuilderへ差し戻す。
