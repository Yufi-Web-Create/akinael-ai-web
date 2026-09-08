# PHASE7 Runtime handoff

## Identity and boundary
Reference project: Akinael official marketing website. Repository: Yufi-Web-Create/akinael-ai-web. Branch: work/phase7-reference-site. Draft PR: https://github.com/Yufi-Web-Create/akinael-ai-web/pull/3 .

This is an externally executed reference workflow, not a claim that Core Production Runtime executed these stages. Core akinael-ai was read only; no Runtime, Worker, Portal, database, authentication, secret or deployment changes were made. PHASE6 remains separate.

## Evidence mapping
| Stage | Durable evidence |
| --- | --- |
| Understand | PROJECT_SPEC.md and PHASE7_REFERENCE_SITE.md audit/source hierarchy |
| Research | research/REFERENCE_ANALYSIS.md and research/COPY_RESEARCH.md |
| Direction | DESIGN_DIRECTION.md, COPY_DIRECTION.md, DESIGN_SYSTEM.md, COPY_GUIDE.md |
| Build | src/app, src/components, src/lib/site-config.ts; remote checkpoint d468ecb7498c647d22a6ca670fee6ffcdedef66e |
| QA | PHASE7_QA.md, tests/e2e, Quality Gate workflow and browser evidence artifact |
| Independent Review | PHASE7_QA.md; independent context, findings and correction recorded |
| Candidate | Draft PR #3; publication blocked, no release claim |

Research checkpoint: 00d19ba8fe7e45babd9ec092975dcb5e5009ab87. Build checkpoint: d468ecb7498c647d22a6ca670fee6ffcdedef66e. All remote commits descend from actual main 41c5efbc7aa1c682efe04b28fb7a69047fe436f8. Local bootstrap history is reconstructed and must not be force-pushed over remote history.

## Runtime ingestion after PHASE6
1. Import source brief, research, direction, commit IDs, QA and review records as evidence attachments to a reference project.
2. Preserve observed / inferred / unverified distinctions. Do not transform blocked or partial checks into PASS during import.
3. Record builder and reviewer as separate contexts. Preserve missing-TOP-comparison FAIL, correction, and re-review PASS.
4. Associate the draft PR as the candidate; require latest-commit CI and formal business information before promoting release status.
5. Recheck Portal registration/login integration against PHASE6. Current handoff is the existing https://akinael-ai.com/portal/ login view and its registration toggle; no new auth endpoint.

## Build and deployment preparation
Node 24 (CI), npm ci, npm run qa. Production: npm run build then npm run start. Keep SITE_INDEXABLE=false for previews/candidates. Set SITE_INDEXABLE=true at build time only after all release gates and publication approval; robots and sitemap are generated at build time. No secrets or paid external services required by this frontend. No database migration.

Hosting must support the existing Next.js application. Preserve Core routes /portal/, /admin/ and API ownership when configuring domain routing; do not replace the entire production domain with this app without that integration design. Production host/DNS changes are outside this task. Current canonical domain remains https://akinael-ai.com.

Rollback: restore the previously approved marketing deployment and routing. No data rollback required by this frontend. Do not merge or switch traffic automatically.

After approved publication, smoke-test TLS, all 12 content routes, 404, canonical URLs, robots/sitemap, mobile navigation/FAQ, consultation→Portal login/register, and the retained Core routes. Verify no errors or unintended data submissions.

## Human Gate
Obtain authoritative operator name/address/contact, terms, privacy policy, commerce disclosure, cancellation/refund/provision timing, and advertising percentage tax basis. Confirm any future customer case publication rights. Never invent these facts. Only after content and QA gates pass seek explicit production approval.
