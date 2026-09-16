# PHASE7_HANDOFF

最終更新: 2026-09-16（production publish後）

## CURRENT STATE

- Phase: **PHASE 7 / Akinael Reference Production — COMPLETE / PRODUCTION LIVE**
- Source of truth: `Yufi-Web-Create/akinael-ai-web` `main`
- Production public site: `https://akinael-ai.com/`
- Render Static Site: `akinael-ai-web` (`https://akinael-ai-web.onrender.com`)
- Public-site production commit at publish: `b9399cb4306c853ede8704912a83408e72d22d6f`
- Public-site redesign PR #9: **MERGED**
- SEO hardening PR #10: **MERGED**
- Production domain `akinael-ai.com`: Render **Verified / Certificate Issued**
- `www.akinael-ai.com`: Render側に追加済み、2026-09-16時点では **Waiting for DNS**
- Owner browser smoke check after cutover: **問題なし**

## PRODUCTION ROUTING

`akinael-ai.com` のルートはRender Static Site `akinael-ai-web` が担当する。
Core / Portal / Adminは既存Web Service `akinael-ai` (`https://misesapo-ai.onrender.com`) を維持し、Static SiteのRedirects/Rewritesで以下をCoreへ転送する。

- `/api/*`
- `/portal/*`
- `/admin/*`
- `/legal`
- `/payment/*`
- `/mypage`

`/portal` と `/admin` は末尾スラッシュ付きURLへredirectする。

この構成により、公開サイトをStatic Siteで配信しながら既存Core API / Customer Portal / Adminを同一custom domain配下で維持する。

## IMPLEMENTED PUBLIC SITE

- Astro + TypeScript、static output
- Homepage
- 業種別4ページ: beauty / restaurant / school / home-service
- 新規顧客CTA / register flow
- Customer Portalログイン導線
- Content Collectionによる業種別コンテンツ
- responsive matrix 360 / 375 / 390 / 430 / 768 / 1024 / 1280 / 1440px
- self-hosted fonts
- production build / Render Static Site auto deploy

## SEO / DISCOVERABILITY

公開前・公開時点で以下を実装済み。

- unique title / meta description
- canonical URL
- `lang="ja"`
- sitemap (`/sitemap-index.xml`)
- robots.txt
- robots meta (`index,follow`, large image preview許可)
- Open Graph metadata
- large-image OGP (`/assets/screenshots/public-home.png`)
- Twitter large-image card
- Organization JSON-LD
- Service JSON-LD
- FAQPage JSON-LD
- industry page BreadcrumbList JSON-LD
- image / form accessibility metadata
- SEO専用Playwright regression test

PR #10のQuality Gateはlint / typecheck / unit / build / Playwrightを含めPASS後にmergeした。

## OWNER DECISIONS

- Homepage primary CTA: `AIに相談してみる`
- 新規顧客は既存register flowを利用し、成功後`/portal/`へ移動する。
- 既存顧客は`/portal/`へ直接案内する。
- Homepage single-page + 4業種ページのハイブリッド構成を維持する。
- 公式公開サイトのsource repoは本repo。Core repoはAPI / Worker / Portal / Adminを担当する。
- Astro static-firstを維持し、React SPAへ置き換えない。
- 未確定の法人格、正式運営者情報、所在地、実績等をSEO目的で捏造しない。
- 2026-09-16、オーナーがproduction publishを明示承認し、Render custom domain cutoverを実施した。

## PRODUCTION PUBLISH — 2026-09-16

1. Public-site PR #9をmainへmerge。
2. SEO auditを実施し、PR #10でmetadata / OGP / Breadcrumb / Service schema / regression testを追加。
3. PR #10 Quality Gate PASS後にmainへmerge。
4. Render Static Site `akinael-ai-web` を作成。
5. latest main `b9399cb4306c853ede8704912a83408e72d22d6f` のbuildがLiveになることを確認。
6. Static SiteへCore route rewritesを設定。
7. custom domain `akinael-ai.com` を旧Core Web ServiceからStatic Siteへ付け替え。
8. Renderで `Verified / Certificate Issued` を確認。
9. オーナー環境の実ブラウザで公開後表示を確認し「問題なさそう」と確認済み。

## REMAINING POST-LAUNCH TASKS

### 1. `www` DNS

`www.akinael-ai.com` はrootへredirectする設定がRender側にあるが、DNSは未検証。
DNS providerで `www` を `akinael-ai-web.onrender.com` へ向けるCNAMEにする。
Render公式ガイドに従い、競合する古い`www` CNAME/redirect recordや不要なAAAA recordがある場合は整理する。
Render側で `www.akinael-ai.com` がVerified / Certificate Issuedになるまで確認する。

### 2. Search Console / indexing

production URLが安定したら以下を実施する。

- Google Search Console property確認/登録
- `https://akinael-ai.com/sitemap-index.xml` 送信
- Homepage / 4 industry pagesのURL Inspection
- indexing状態確認
- crawl / canonical error確認

### 3. Post-launch SEO operations

データが蓄積後、以下を実測ベースで改善する。

- search queries
- impressions / clicks / CTR
- ranking pages
- Core Web Vitals
- organic conversion to register / consultation
- industry page performance

### 4. Legal / operator information

正式運営者名、所在地、連絡先、正式な利用規約・プライバシーポリシー・特商法表記など、未確定の事業・法務情報は別Human Gateとして残る。
公開サイトでは未確定事項を断定しない。

## DO NOT BREAK

- `akinael-ai.com` の `/api/*`, `/portal/*`, `/admin/*` rewriteを削除しない。
- Core repo / Worker / Supabase Authを公開サイト側へ複製しない。
- Portal/Adminを検索index対象にしない。
- production secretを公開site repoへ保存しない。
- 未確定の法人・実績・法務情報をSEO目的で生成しない。

## EXACT NEXT ACTION

1. `www.akinael-ai.com` のDNSを完成させる。
2. RenderでwwwのVerified / Certificate Issuedを確認する。
3. Search Consoleでsitemapと主要URLのindexing確認を開始する。
4. 公開後データが蓄積したら検索クエリ / Core Web Vitals / CTA conversionを基準に改善する。

## HISTORICAL NOTE

2026-09-10時点ではRelease Candidate / Preview Readyで、production publish / DNS切替がHuman Gateとして残っていた。このGateは2026-09-16にオーナーの明示承認を得て解除され、本番公開まで完了した。
