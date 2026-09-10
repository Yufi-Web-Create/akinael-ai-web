# PHASE7_HANDOFF

最終更新: 2026-09-10（ChatGPT Work、Release Candidate監査中）

## CURRENT STATE

- Phase: **PHASE 7 / Akinael Reference Production — IN PROGRESS**
- Goal: **REFERENCE SITE — RELEASE CANDIDATE / PREVIEW READY**
- Source of truth: `Yufi-Web-Create/akinael-ai-web` `main`
- Main baseline: `09e5bad1ab7d571ed051f25b319651ac4cbe32c8`
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
- Web latest full QA / CI: **PENDING**
- Core CORS fix tests: 108/108 PASS（ローカル。PR/CI pending）
- Independent Visual / Copy / Technical / SEO-A11y review: **PENDING**

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

1. Web latest diffへlint / typecheck / unit / build / Playwright E2Eを実行する。
2. CI browser reportで8 viewport、4業種、CTA、register contract、console/page errorを確認する。
3. Visual / Copy / Technical / SEO-A11yの独立レビューを実施し、blocking findingを修正する。
4. Web PRをCI PASS後にmergeし、main SHAを確定する。
5. CoreのCORS error-response fixを別PRでCI・review・mergeし、Render反映後にproduction POST error responseのCORS headerを再確認する。
6. 全Gate PASSなら `REFERENCE SITE — RELEASE CANDIDATE / PREVIEW READY` としてPHASE 7を完了する。
7. Preview hostingとproduction publishはHuman Gate。明示承認なしに外部公開・DNS変更しない。

## HISTORICAL CHECKPOINT

PR #4以前の記録では、branch `phase7/reference-site-build`、commit `6582ea8` / `391dc9b`、CI再実行・Playwright未確認・merge待ちとされていた。これらは2026-09-10時点で解消済みの履歴であり、現在状態・next actionとして使用しない。
