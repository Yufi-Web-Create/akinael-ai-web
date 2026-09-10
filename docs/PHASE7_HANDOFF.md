# PHASE7_HANDOFF

最終更新: 2026-09-10（ChatGPT Work、Release Candidate完成）

## CURRENT STATE

- Phase: **PHASE 7 / Akinael Reference Production — COMPLETE**
- Result: **REFERENCE SITE — RELEASE CANDIDATE / PREVIEW READY**
- Source of truth: `Yufi-Web-Create/akinael-ai-web` `main`
- Main baseline before RC audit: `09e5bad1ab7d571ed051f25b319651ac4cbe32c8`
- RC PR: #5（Quality Gate PASS後にmerge）
- PR #4: **MERGED**
- Quality Gate Run `34191984013`: **PASS**
- `package.json`の`qa`はlint / typecheck / unit / build / Playwright E2Eを実行する。main CI PASSによりE2Eは完了済み。
- Historical branch `phase7/reference-site-build`は保持するが、merge済みのためsource of truthには使用しない。
- Production publish / DNS切替: **未実行（Human Gate）**

## IMPLEMENTED

- Astro + TypeScript、`output: "static"`
- Homepageと4業種ページ: beauty / restaurant / school / home-service
- 登録CTA、Customer Portal導線
- Content Collectionによる業種別コンテンツ
- SEO metadata、canonical、sitemap、robots、Organization / Service / FAQ JSON-LD
- Core API `/api/v2/auth/register`接続（`PUBLIC_CORE_ORIGIN`、既定値`https://akinael-ai.com`）
- responsive matrix 360 / 375 / 390 / 430 / 768 / 1024 / 1280 / 1440px

## OWNER DECISIONS

- Homepage CTA: 新規顧客は既存register flowを維持し、成功後`/portal/`へ。既存顧客は`/portal/`へ直接案内。
- Page structure: homepage single-page + 4業種ページのハイブリッド。一般仕様の`/service`等を独立ページとして重複実装しない。
- 公式サイトrepoは本repo。Core repoはAPI / Worker / Portal / Adminを担当。
- Astro static-firstを維持し、React SPA化しない。
- 未確定の法人格、正式運営者、対応地域、実績を捏造しない。
- Production publish / DNS切替は明示承認まで行わない。

## RELEASE CANDIDATE AUDIT — 2026-09-10

### Confirmed baseline

- PR #4 / main CIはPlaywrightを含めPASS。旧「CI再実行中」「E2E未確認」「PR #4 merge待ち」は解消済み。
- Homepage、4業種ページ、内部anchor、Portal導線、static build構成を確認。
- Core production preflight: `OPTIONS /api/v2/auth/register` = 204、allow-origin / POST / content-typeを確認。
- Core production validation request: `POST /api/v2/auth/register` = 400だが、error responseにCORS headerが欠落する契約不整合を発見。Core repoの別branchで修正・回帰testを進行。
- Research/Directionの4文書が未記入templateだったため、既存実装を作り直さず、11件の公式Reference、競合5社、顧客言語、ADOPT/ADAPT/AVOID、Design/Copy Directionを補完。
- Astro 8前に削除予定の`astro:content`経由zod importを`astro/zod`へ更新。
- 登録widgetへ、Coreの既存`/legal#terms`・`/legal#privacy`にある暫定案内の確認欄を追加。未確定文書への法的同意とは表現せず、正式文書の確定をproduction publishのHuman Gateとして維持する。
- skip linkの遷移先`main`をプログラムフォーカス可能にした。
- E2EをCTA、Portal URL、register success contract、metadata/JSON-LD、labels、skip navigationまで拡張。
- CIへPlaywright HTML report（14日保持）を追加し、実ブラウザ証跡を取得可能にした。

### Current verification status

- Web baseline lint: PASS
- Web baseline typecheck: PASS（修正前はdeprecated import hintsのみ）
- Web baseline unit: 2/2 PASS
- Web baseline build: 5 pages PASS
- Web Quality Gate Run `34466164869`: **PASS**（lint / typecheck / unit 3/3 / build / Playwright 18/18）
- Browser evidence artifact: `10147626981`（Playwright report、14日保持）
- Core CORS fix PR #67: Core Quality Run `34465946885` **PASS**、independent review blocking 0、merge commit `0ddb862c569626a791e3f826decd402e55c82bc5`
- Independent Visual / Copy / Technical / SEO-A11y review: 初回blocking 2件を修正し、再レビューblocking 0

## PREVIEW READINESS

- `astro build`の`dist/`は静的hostへそのまま配置可能。
- ローカル`astro preview`とGitHub Actions上のPlaywright browser QAをpreview経路として使用できる。専用の外部preview URLは未設定であり、GitHub Pages / Render等への非production preview deployも明示的な公開先選択までは実行しない。
- Preview buildで`PUBLIC_CORE_ORIGIN`を未指定の場合はproduction Coreへ接続する。previewでregisterを実行するとproduction Auth dataを作るため、QAではrequest interceptionを使い実顧客・production customerを作成しない。
- `customer-token`はorigin scopedであるため、別originのpreviewで登録したtokenはproduction Portalへ引き継がれない。現在のmock E2EはAPI契約と遷移先のみを確認し、認証済みPortal handoffを証明しない。同一originで公開された時点のproduction smoke testが必要。
- `akinael-ai.com`置換、DNS変更、本番公開はHuman Gate。

## HUMAN GATE / BLOCKED FACTS

- 正式運営者名、所在地、連絡先、正式な利用規約・プライバシーポリシー・特商法表記は未確定。Release CandidateではCore `/legal`の「販売開始前に確定」とする正直な暫定表示へリンクするが、正式販売・production publish前に事業/法務判断が必要。
- production publish、DNS、実顧客通知、新規有料契約、payment/refund、production data削除、Secret操作は禁止。

## RETAIN / DO NOT DELETE

- 本repo・Core repoのremote branchを削除しない。
- PHASE 1〜6のE2E / production dataを削除しない。
- 秘密情報、token、credentialをdocs / log / commitへ保存しない。

## EXACT NEXT ACTION

1. オーナーが正式な運営者・法務情報と公開先を確定する（Human Gate）。
2. 必要なら既存契約内のstatic hostへ非production previewを配置し、同origin Auth handoffを含むsmoke testを行う。
3. オーナーが明示承認した場合のみproduction publish / DNS切替を実行する。
4. 公開後に8 viewport、CTA、register、Portal遷移、console/page error、metadata、内部linkをsmoke testする。

## HISTORICAL CHECKPOINT

PR #4以前の記録では、branch `phase7/reference-site-build`、commit `6582ea8` / `391dc9b`、CI再実行・Playwright未確認・merge待ちとされていた。これらは2026-09-10時点で解消済みの履歴であり、現在状態・next actionとして使用しない。
