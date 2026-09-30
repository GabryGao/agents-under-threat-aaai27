# Reference-led workshop website redesign

Date: 2026-09-30

## Objective

Replace the current dark, security-campaign visual world with a high-similarity adaptation of the user-selected reference site, [Agents in the Wild Workshop](https://agentwild-workshop.github.io/neurips2026/). The result should read immediately as the same class of lightweight academic workshop website while retaining only the factual content of “LLM Agents Under Threat in Cyberspace.”

Success means that a visitor comparing the two sites—especially on a phone—recognizes the same layout grammar: a restrained white navigation bar, a full-width photographic hero with centered white event information, a narrow white reading column, simple typographic section headings, conventional lists and tables, and portrait-based people grids. The current oversized editorial type, cyan-on-navy palette, threat-map graphics, dark section fields, numbered cards, and campaign-style calls to action must not survive the redesign.

## Source authority

- The Overleaf proposal remains the authority for workshop title, subject matter, dates, program, speakers, organizers, advisers, submission policy, and contact details.
- The reference website is the authority for visual language, page rhythm, responsive behavior, section treatment, and information density.
- The workshop is not confirmed. The page must say “Proposed Workshop at AAAI-27,” and all dates, program assignments, speaker participation, committee roles, and policies remain visibly tentative.
- Do not invent an acceptance claim, submission portal, sponsor, talk title, social profile, venue hall, phone number, or postal address.

## Visual direction

### Overall character

The surface is a clean academic event page rather than a branded security microsite. Use a predominantly white canvas, medium-gray text, a single dark-blue link/accent color, and one Montréal photograph. The impression should be calm, credible, readable, and maintained by researchers.

### Navigation

- White bar, approximately 64–72px high, with a subtle bottom rule.
- Workshop short name at left in a medium-weight sans serif.
- A small “About” link and compact hamburger at right, matching the reference hierarchy.
- The menu opens as a plain white list of anchor links; no dark drawer or button styling.
- Preserve keyboard focus, Escape-to-close, focus return, and a skip link.

### Hero

- A full-width Montréal panorama directly below navigation.
- Target height: roughly 500px on mobile and 520–620px on desktop, preserving a similar visual proportion to the reference.
- Use a restrained dark image overlay only for text legibility.
- Center the title, conference line, tentative date, Montréal location, and contact email in white.
- The title should occupy about three balanced lines on mobile; use conventional bold sans typography, not the present ultra-tight display treatment.
- “Proposed Workshop at AAAI-27” must be prominent enough to prevent any implication of acceptance.
- Keep the photo credit unobtrusive but visible.

### Reading column and sections

- Use one centered content column, approximately 760–880px wide, with generous white margins.
- Section headings use conventional academic-page sizing and a light divider, like the reference.
- Prefer paragraphs, bullet lists, definition-style policy blocks, and real tables over cards.
- Preserve all proposal-derived information, but remove marketing copy that is not needed to understand the workshop.
- The page order is: News/status, About, Call for Papers, Important Dates, Submission Guidelines, Tentative Schedule, Invited Speakers, Workshop Organizers, Advisory Board, Contact.
- The News/status section contains one factual update: the AAAI-27 workshop proposal is under review and details remain tentative.

### Dates, policy, and schedule

- Important dates are a simple list with bold labels and readable values.
- Submission policy is prose plus compact bullets, close to the reference site's guidelines section.
- The schedule uses a semantic two-column table with time and activity. Split into morning and afternoon only if this improves scanning.
- No numbered tiles, mono status rails, or dark program panel.

### People

- Speakers and organizers use a responsive portrait grid that follows the reference: circular or softly rounded portrait, name below, affiliation beneath, and concise role/status text.
- Until authenticated Overleaf portraits can be exported, use restrained circular initials placeholders in the same dimensions. Do not use dark poster-style cards.
- Adviser entries may use a denser text grid because the proposal does not provide portraits.
- Every invited speaker and committee role remains labeled tentative.

## Responsive behavior

- Mobile is a first-class target because the user viewed both sites in a narrow in-app browser.
- At approximately 390–440px, the navigation, hero title wrapping, hero metadata, table widths, email address, and people grid must remain fully visible without horizontal scrolling.
- Desktop uses the same visual grammar rather than a separate editorial composition.
- Tables may stack or reduce padding on narrow screens, but labels and values must remain associated.

## Motion and interaction

- Remove the current large reveal treatment and active-section instrumentation.
- Use no entrance animation by default. If any hover transition remains, keep it subtle and respect reduced motion.
- Anchor navigation should scroll to sections without obscuring headings.
- All controls and links need visible keyboard focus.

## Files and implementation boundaries

- Rebuild the surface primarily in `site/app/page.tsx` and `site/app/globals.css`.
- Reuse `site/app/workshop-data.mjs` as the factual source of truth.
- Simplify or remove `site/app/workshop-behavior.mjs` only where behavior is no longer needed; retain tested menu state logic.
- Replace `site/DESIGN.md` and `.impeccable/design.json` after the approved implementation so they describe the new academic visual system rather than the discarded field-manual system.
- Keep the existing Sites project and public URL; publish this as a new version of the same site.

## Verification

- Update source-contract tests to assert the new section order, simple-table schedule, explicit proposal status, accessible menu behavior, and removal of the old visual signatures.
- Run all Node tests, app lint, and production build.
- Inspect both the reference and rebuilt page at mobile width in the same browser, plus desktop and 390px responsive captures.
- Perform one batched visual correction pass, then a final confirmation capture.
- Verify the public deployment, key content, hero asset, favicon, and absence of horizontal overflow.

## Non-goals

- Pixel-for-pixel copying of the reference site's text, branding, or proprietary assets.
- Adding a CMS, registration flow, submission portal, analytics, or sponsor section.
- Rewriting proposal facts or implying confirmation by AAAI-27.
- Retaining the current dark cyber-security identity for the sake of continuity.
