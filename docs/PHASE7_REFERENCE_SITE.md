# PHASE 7 / Akinael Reference Production
Status: IN PROGRESS — production not published.
Branch: work/phase7-reference-site. Upstream main snapshot: 41c5efbc7aa1c682efe04b28fb7a69047fe436f8 (2026-08-29). Remote branch created from this exact commit. Local checkout reconstructed from GitHub connector files because direct Git transport did not respond; local bootstrap commit is not upstream history. Remote checkpoint commits will use real upstream parents.

## Current site audit
Web repo: one Next.js 16.3.3 / React19.2.8 / TS6.0.3 TOP. No lockfile, no deploy manifest, no public assets except icon, no detail pages. docs direction/research were blank templates. Existing CTA #contact ends in backend未接続 notice. Footer exposed internal Reference Project terminology. Metadata minimal; no full canonical/OG/sitemap. Unit2 + eight viewport test existed. Quality CI runs on main push/PR; no deployment step found. Existing unrelated branches retained. Latest five main commits update autonomous/research/release policies.
Core read-only: public/index.html, public/legal.html, portal/src/Portal.tsx, docs/website-content-requirements.md, docs/business-concept-summary.md. No Core files changed. Public site browser observed existing full marketing page, rich photos and detailed pricing; registration/login modal both href /mypage. Strengths: explicit free trial, confirmed prices, approval boundary. Problems: many repeated cards and vague hero compared with owner concept; legal page still incomplete. Browser-observed live homepage matches inspected content. Web search could not fetch current domain; browser used for independently requested live UX audit, not retrieval fallback.

## Audience / journey / IA
IT非専門の店舗・地域事業者。TOPで内容把握→service/industryで自分の用途→pricing/FAQで境界確認→startで登録後の操作説明→Core Portal。既存顧客は直接Portalへログイン。
Routes: /, /service/, /pricing/, /faq/, /cases/, /industries/restaurant/, /industries/beauty-salon/, /industries/school/, /industries/local-service/, /about/, /start/, /legal/.
Cases uses consultation examples, never fabricated delivered projects. Legal missing facts tracked; no formal policy invented.

## Frontend architecture decision
Retain Next.js for this iteration. Existing strict TypeScript, ESLint, Vitest and browser suite install and baseline build pass; all current components are server components. Astro is a strong content-first option but would replace a working tested toolchain while formal facts and routes remain unfinished. No auth/backend lives here and no new client libraries are needed. Use pre-rendered routes, ordinary links, native details. Known tradeoff: Next framework JS remains; do not claim zero JS. Later Astro migration can compare emitted bytes without coupling to Core.
Sources: https://docs.astro.build/en/concepts/why-astro/ and https://nextjs.org/docs/app/guides/static-exports .

## Direction / responsive / SEO / A11y
See DESIGN_DIRECTION, COPY_DIRECTION, research evidence. Quiet green/typographic studio. 20/32/48 gutters, 64/88/112 section spacing. 8 widths in QA; mobile nav/CTA natural flow. One h1, unique title/description, canonical, OG, factual metadata, skip link, native keyboard controls and focus, reduced motion. No formal company schema while operator unspecified. No third-party scripts. No new form collecting data.

## Implementation / checkpoints
A Research + Direction. B shared layout + all routes. C QA + separate reviews + fixes. Create draft PR if any required gate remains unresolved. Do not merge/publish.

## Risks and open official information
Core legal.html leaves operator, address, contact, terms, privacy policy, commerce disclosure incomplete. Cancellation/refund/timing and case publication terms not finalized. These are Human Gate publication blockers; no invented facts. Portal currently defaults to login and has a 新規登録はこちら button but no documented register deep link; /start explains it rather than inventing ?register behavior. Recheck integration after Claude's PHASE6 changes.

## Baseline validation
Install succeeded (386 packages). ESLint warning0 PASS, TypeScript PASS, Unit2/2 PASS, production build PASS. Preview initially failed because Next CLI rejects Vite --host/--strictPort. Minimal dev wrapper translates host and omits strictPort; second supervised preview healthy. No stack replacement for preview.

## Production boundary / exact next
Production unchanged. No DNS, deploy, notifications, secrets, database mutations. Complete routes and QA; confirm formal legal material before release. Runtime handoff to preserve Research→Direction→Build→QA→Review→candidate evidence, not evidence of execution through Core Runtime.
