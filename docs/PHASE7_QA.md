# PHASE7 QA and independent review

Date: 2026-09-08. Status: validated draft candidate; publication BLOCKED by official business information. Not DEPLOY READY.

## Automated evidence
Code/build checkpoint: d468ecb7498c647d22a6ca670fee6ffcdedef66e.
GitHub Quality Gate: https://github.com/Yufi-Web-Create/akinael-ai-web/actions/runs/34186483269 — SUCCESS.
Job 101935740087 logs confirmed npm run qa finished successfully, including 17 E2E tests (1.0m). Artifact `playwright-evidence` contains the HTML report, eight full-page TOP screenshots and retained failure traces when applicable; CI retention is 14 days.

| Gate | Result / scope |
| --- | --- |
| Clean npm ci | PASS in CI, lockfile committed |
| Lint | PASS, warning 0 |
| TypeScript | PASS |
| Unit | PASS, 2/2 |
| Production build | PASS; all content routes prerendered |
| E2E | PASS, 17/17 in CI |
| Eight widths | PASS: 360, 375, 390, 430, 768, 1024, 1280, 1440 |
| Content routes | TOP plus all 11 detail routes at all eight widths; status 200, one visible h1, no horizontal overflow, no console/page error |
| Mobile interaction | PASS: menu Escape/focus restoration, pricing navigation/menu close, consultation→start, correct Core Portal URL |
| SEO | Detail canonical URLs and preview noindex checked in browser; title/description boundaries reviewed in code |
| Internal links | Generated HTML route and fragment audit: zero missing targets |
| Scripts | No third-party script resources in generated HTML |

Local npm run qa passed lint/types/unit/build but browser launch was blocked by absent Chromium. `npx playwright install chromium` exhausted downloads with 30-second timeouts. This was not counted as PASS. The unchanged browser gate then executed successfully in GitHub CI, which could install Chromium. Original eight tests were preserved and nine added. Production-server E2E avoids concurrent development-server conflicts with preview.

## Browser and visual evidence
Builder observed desktop TOP at approximately 1363px, embedded 390px and 768px TOP, 390px menu→pricing, and actual FAQ expansion. Independent reviewer used a separate browser tab for desktop TOP, 390/768 TOP, 390 menu/price plans, 768 start steps and Portal CTA. Embedded frames use actual CSS widths, not physical device testing. Eight-width browser automation provides overflow/error and route coverage; it is not a claim that every pixel of every route received manual review.

Desktop screenshot: [phase7-desktop.jpg](evidence/phase7-desktop.jpg).

The FAQ click initially used an exact text locator that excluded the child plus icon; non-exact visible-text targeting then opened the answer successfully. This was a locator issue, not a UI defect.

## Independent reviews and correction
Separate reviewer context: independent_review (Hypatia), not Builder self-approval.

| Review | Result | Evidence and limits |
| --- | --- | --- |
| Creative / Visual | PASS in observed views | Clear serif/sans hierarchy, whitespace, CTA emphasis, wrapping and mobile reflow; no major visual issue |
| Copy / UX | PASS after correction | Initial major FAIL: TOP omitted DIY/general-AI/production-company comparison. Added factual choice explanation and roles link; re-review confirmed resolved |
| Technical | PASS | Server-first content, menu-only client behavior, no API/auth/secrets, known-route restrictions; CI adds console/page-error and navigation checks |
| SEO / A11y | PASS within tested scope | Japanese language, landmarks/h1, skip link, visible focus, details/Escape, reduced motion, unique metadata/canonical, preview noindex. Not a full assistive-technology certification |

Reviewer browser log contained six chrome-extension metadata-send errors, not site-origin errors. Production CI browser listeners recorded no site console/page errors. No full user interview or measured conversion claim is made.

## Performance and tradeoff
Generated TOP references seven first-party JS resources: 575,061 raw bytes / 176,083 gzip bytes in the local production build. This is an asset-size measurement, not network transfer or Lighthouse/Core Web Vitals. No video, animation library, external fonts or third-party scripts. Next framework JS remains; future Astro comparison may reduce it. Current choice retains the established strict build/test stack.

## Release Gate reconciliation
Research/direction, required routes, shared responsive UI, code quality, browser checks, and independent reviews are complete within the scopes above. Environment/build/start, domain routing boundaries, rollback and post-publication smoke checks are in PHASE7_RUNTIME_HANDOFF.md.

Content/publication gates remain BLOCKED: formal operator/address/contact, terms/privacy/commerce disclosure, cancellation/refund/provision timing are absent from the authoritative Core legal page. Advertising percentage tax basis needs an explicit current business confirmation; current homepage states all prices tax-inclusive, while an older snapshot describes the calculation in more detail. Do not infer a new charge formula. Cases intentionally remain consultation examples, not fabricated customer results.

No production deployment, main merge, DNS/domain changes, payment activation, Core edits or notifications. Candidate defaults to noindex. The unresolved facts prevent declaring the overall RELEASE_GATE PASS. Exact next: obtain authoritative legal/contract material and advertising calculation, update affected copy, recheck Portal against PHASE6, rerun QA/review, then request explicit publication approval.
