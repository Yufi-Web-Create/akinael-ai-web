# DESIGN_DIRECTION_V2

PHASE 8.5 / Public Site Design Finalization. Supersedes the visual/IA parts of `DESIGN_DIRECTION.md` for this rebuild; copy/QA process docs (`COPY_GUIDE.md`, `QA.md`, `RELEASE_GATE.md`) remain in force.

## Why redesign, not refresh

External review (Gemini + Claude, summarized in the owner's brief) converged on the same diagnosis: the current site reads as a competent generic "AI SaaS landing page" — tiny English eyebrow labels, a 3/4-item card grid repeated in every section, poetic copy that never says what the customer actually gets, no visible sample of the actual deliverable. This is a template problem, not a bug list. Fixing it means changing the information architecture and visual language, not swapping colors.

## Grounding: what this product actually is

Akinael AI turns a shop owner's spoken/typed request into real marketing collateral — a website, an Instagram caption, a flyer headline — for a physical neighborhood shop (hair salon, café, cram school, home-repair contractor). The existing logomark already encodes this correctly: a shop awning (天幕) canopy, a chat bubble, a confirmation checkmark. That mark is the one asset already speaking the right language — this redesign extends it instead of replacing it.

**Signature device**: the awning's scalloped valance edge becomes a recurring structural motif (`.awning-edge`, a CSS `mask-image` radial-gradient repeat, not an SVG) used at section transitions instead of flat hairlines — evoking a 商店街 (shopping street) awning rather than a SaaS dashboard. Used only where a paper section meets a colored band (2 transitions on the homepage), not everywhere.

## Token system

Extends the existing tokens (already reasonably placed — warm ivory + deep green + terracotta) rather than discarding them.

- `--paper` `#F7F1E4` — washi-paper ivory (was `#faf9f5`, too cool/gray)
- `--ink` `#1C2B26` — sumi-ink charcoal-green (was `#20332e`, deepened slightly)
- `--noren` `#164E4A` / `--noren-deep` `#0F332F` — the shop-curtain green, unchanged (already correct)
- `--kaki` `#DD6B45` — persimmon-dye accent (was `#e8785f`, richened)
- `--line` `#E4DAC4` — warm hairline (was cool gray-tan `#d9d3c2`)

Display face: **Shippori Mincho** (Google Fonts, weight 700/800 only, headlines only) — a literary Japanese serif with real character, replacing the generic Yu Mincho/Hiragino system stack. Body stays system gothic (already good, zero payload cost) — one new webfont, not two, for discipline.

## Anti-patterns being removed

- Eyebrow-label-on-every-section → used only where it aids scanning (industry tags, plan names), not as decoration
- Repeated 2/3/4-column card grid → each section gets a distinct layout (strip, split, horizontal scroll, asymmetric tiles, stepper)
- Flat hairline dividers on every section → awning-scallop at key transitions, plain elsewhere
- No visible sample of the deliverable → new Before/After showcase with CSS-built mockup cards (browser-chrome mini site, phone-frame Instagram post, flyer card) per industry, explicitly labeled as example/mockup
- Poetic copy carrying the whole page → one emotive line in the Hero only; everything else states what the customer gets, plainly

## Information architecture (new)

Header → Hero (with awning-scallop bottom edge) → Reassurance strip (3 concrete facts, single row not cards) → Interactive Transformation demo (industry picker → static example output, explicitly labeled as example) → Before/After Showcase (doubles as the "proof" section — no fabricated numbers) → Industry tiles (asymmetric, alternating) → How it works (horizontal stepper) → Pricing (recommendation guidance row + the real 4-plan table, unchanged figures) → Why trust Akinael (plain list, concrete) → FAQ → Final CTA (noren-green band) → Footer.

## Constraints carried over unchanged

No new OpenAI/paid API calls — the Interactive Demo is static, pre-authored per-industry content swapped client-side, explicitly labeled as an example, never presented as live generation. No auth/API contract changes. No fabricated testimonials, review counts, or outcome numbers. No legal/business facts invented. Astro static-first, no SPA conversion, no heavy new UI library. WCAG 2.2 AA target maintained. `prefers-reduced-motion` respected everywhere motion is added.
