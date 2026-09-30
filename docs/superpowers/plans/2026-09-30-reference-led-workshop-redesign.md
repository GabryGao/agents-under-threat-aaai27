# Reference-led Workshop Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the public workshop page so it closely follows the lightweight academic visual grammar of the user-selected Agents in the Wild reference while preserving proposal facts and tentative status.

**Architecture:** Keep the existing one-page Vinext application and proposal data module. Replace the page composition and stylesheet, retain only the tested menu state behavior, then publish a new version of the existing public Site.

**Tech Stack:** Vinext, React 19, TypeScript, CSS, Node test runner, oxlint, OpenAI Sites

**Spec:** `docs/superpowers/specs/2026-09-30-reference-led-workshop-redesign.md`

## Global Constraints

- Treat `app/workshop-data.mjs` as the factual source of truth.
- The page must say “Proposed Workshop at AAAI-27”; all dates, schedule items, invited speakers, organizers, advisers, and submission policy remain tentative.
- Do not invent acceptance, submission, registration, sponsor, talk, venue-hall, social-profile, phone, or postal-address claims.
- Match the reference site's white navigation, full-width photographic hero, centered white event text, narrow reading column, conventional lists/tables, and portrait people grids.
- Remove the current navy/cyan campaign system, threat-map treatment, numbered cards, and reveal animations.
- Preserve the current Site project, public audience, and public URL.

## Review Focus

- At 390–440px, the title, email address, schedule table, and people grid must not create horizontal overflow; Task 3 adds source contracts and browser checks.
- With JavaScript unavailable, all workshop content must remain visible and navigable; Task 2 removes reveal initialization and tests SSR-visible markup.
- The collapsed mobile menu must not expose focusable links and Escape must restore focus; Task 2 preserves and tests the existing behavior.
- Initials fallbacks must remain readable when organizer portraits are unavailable; Task 3 tests fallback markup and inspects it visually.
- The redesign must not imply AAAI acceptance despite matching an accepted-workshop reference; Tasks 1 and 4 verify proposal wording in source and production HTML.

---

### Task 1: Lock the reference-led page contract

**Files:**
- Modify: `tests/markup.test.mjs`

**Interfaces:**
- Consumes: proposal records exported by `app/workshop-data.mjs`
- Produces: source-contract tests that define the new page structure and reject the discarded visual system

- [ ] **Step 1: Replace old visual assertions with failing reference-led assertions**

Add tests asserting `id="news"`, semantic `<table>`, morning/afternoon schedule group labels, people portrait/fallback markup, a centered reading shell, mobile overflow protections, and absence of `data-reveal`, `--color-cyan`, `threat-map`, and numbered topic/schedule card classes.

- [ ] **Step 2: Run the focused test to verify failure**

Run: `/Users/fara./.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/markup.test.mjs`

Expected: FAIL because the current page still uses the dark campaign structure and has no News section or schedule table.

- [ ] **Step 3: Commit the failing contract**

Run: `git add tests/markup.test.mjs && git commit -m "test: define reference-led workshop layout"`

### Task 2: Recompose the page as an academic workshop site

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/workshop-behavior.mjs`
- Modify: `tests/behavior.test.mjs`

**Interfaces:**
- Consumes: `workshop`, `cfpTopics`, `importantDates`, `schedule`, `speakers`, `organizers`, `advisers`, and `submissionPolicy` from `app/workshop-data.mjs`; `nextMenuState(currentOpen, action)` from `app/workshop-behavior.mjs`
- Produces: the complete semantic one-page structure and accessible mobile navigation

- [ ] **Step 1: Write the failing behavior test for the simplified interaction model**

Assert that `nextMenuState` retains toggle/close behavior while reveal-related exports are absent.

- [ ] **Step 2: Run behavior and markup tests to verify failure**

Run: `/Users/fara./.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/behavior.test.mjs tests/markup.test.mjs`

Expected: FAIL on the reveal export and reference-led page contract.

- [ ] **Step 3: Replace `app/page.tsx` with the approved section order**

Build white navigation, photographic hero, News/status, About, Call for Papers, Important Dates, Submission Guidelines, Tentative Schedule, Invited Speakers, Workshop Organizers, Advisory Board, and Contact. Render schedule rows in a two-column semantic table. Render speaker and organizer people cells through one local `PersonCard` component with initials fallback and explicit tentative labels.

- [ ] **Step 4: Simplify `app/workshop-behavior.mjs`**

Keep only `nextMenuState(currentOpen, action)`. Remove `shouldAnimate` and `initRevealEffects`; the new page has no entrance-animation dependency.

- [ ] **Step 5: Run tests to verify the semantic composition passes**

Run: `/Users/fara./.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/behavior.test.mjs tests/content.test.mjs tests/markup.test.mjs`

Expected: all tests PASS.

- [ ] **Step 6: Commit the page recomposition**

Run: `git add app/page.tsx app/workshop-behavior.mjs tests/behavior.test.mjs && git commit -m "feat: recompose workshop as academic event page"`

### Task 3: Replace the visual system and verify responsive fidelity

**Files:**
- Modify: `app/globals.css`
- Modify: `tests/markup.test.mjs`

**Interfaces:**
- Consumes: semantic class names introduced by Task 2
- Produces: reference-led responsive styling for desktop and mobile

- [ ] **Step 1: Add failing responsive style assertions**

Assert a white navigation surface, a hero image height within the approved range, a centered reading column no wider than 880px, semantic table responsive rules, a portrait grid, visible `:focus-visible`, `scroll-margin-top`, and no dark-field/cyan design tokens.

- [ ] **Step 2: Run the markup test to verify failure**

Run: `/Users/fara./.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/markup.test.mjs`

Expected: FAIL against the current navy/cyan stylesheet.

- [ ] **Step 3: Replace `app/globals.css` with the reference-led responsive system**

Implement a white/gray/blue palette, conventional sans typography, 64–72px navigation, responsive photo hero, 760–880px reading column, ruled headings, plain lists, two-column schedule table, circular people portraits/placeholders, and mobile menu. Add 900px and 640px breakpoints that prevent table, email, and grid overflow.

- [ ] **Step 4: Start the local preview and hand off the first complete visual direction**

Run: `/usr/bin/env PATH=/Users/fara./.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/fara./.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:/usr/bin:/bin pnpm run dev -- --host 127.0.0.1 --port 4173`

Expected: local page serves successfully and visibly resembles the reference in the first viewport.

- [ ] **Step 5: Capture and inspect one batched desktop/mobile comparison round**

Use the in-app browser to inspect the reference and local page at desktop and 390px widths. Confirm title wrapping, hero proportions, reading-column rhythm, schedule width, email wrapping, menu behavior, and people fallbacks. Apply one batched correction pass only.

- [ ] **Step 6: Run the full verification suite**

Run: `/Users/fara./.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/behavior.test.mjs tests/content.test.mjs tests/markup.test.mjs`

Run: `/usr/bin/env PATH=/Users/fara./.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/fara./.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:/usr/bin:/bin pnpm exec oxlint app`

Run: `/usr/bin/env PATH=/Users/fara./.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/fara./.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback:/usr/bin:/bin pnpm run build`

Expected: tests, app lint, and production build all PASS.

- [ ] **Step 7: Commit the visual replacement**

Run: `git add app/globals.css tests/markup.test.mjs && git commit -m "feat: match reference workshop visual system"`

### Task 4: Document and publish the approved redesign

**Files:**
- Modify: `DESIGN.md`
- Modify: `.impeccable/design.json`
- Preserve: `.openai/hosting.json`

**Interfaces:**
- Consumes: the verified page and CSS from Tasks 2–3
- Produces: updated design documentation and a new public Sites version at the existing URL

- [ ] **Step 1: Replace discarded design documentation**

Document the new academic visual system: white navigation, photographic hero, restrained blue links, narrow reading column, conventional tables, and portrait grid. Remove references to the adversarial field manual, midnight/cyan palette, numbered cards, and reveal motion.

- [ ] **Step 2: Commit the design documentation**

Run: `git add DESIGN.md .impeccable/design.json && git commit -m "docs: record academic workshop design system"`

- [ ] **Step 3: Run final clean-tree verification**

Run all Node tests, `pnpm exec oxlint app`, `pnpm run build`, `git diff --check`, and `git status --short`.

Expected: all commands PASS and the worktree is clean.

- [ ] **Step 4: Obtain a fresh Sites source credential and run the existing-site workflow**

Use project ID `appgprj_6abbe20e8e948191b58485a83f3b251a`, push the exact verified commit, package the matching build archive, save a new version, and deploy it without changing the public audience.

- [ ] **Step 5: Verify production**

Poll the deployment to success. Confirm the public HTML contains the title, “Proposed Workshop at AAAI-27,” News, CFP, Important Dates, schedule table, people sections, contact email, and hero asset; confirm HTTP 200 for the page, hero, and favicon.

- [ ] **Step 6: Open the same public Site tab and report the result**

Reuse the existing in-app browser Site tab. Report the public URL and any remaining portrait limitation without exposing hosting internals.
