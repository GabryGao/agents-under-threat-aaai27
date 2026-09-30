---
name: Agents Under Threat
description: A restrained, reference-led academic workshop website for a proposed AAAI-27 event.
colors:
  paper: "#ffffff"
  text: "#4b4b4b"
  heading: "#3f3f3f"
  link: "#356a99"
  rule: "#ececec"
  soft: "#f7f8fa"
typography:
  sans: "Arial, Helvetica, sans-serif"
layout:
  reading-width: "880px"
  navigation-height: "72px"
  hero-height: "clamp(520px, 52vw, 620px)"
  desktop-breakpoint: "900px"
  mobile-breakpoint: "640px"
---

# Design System: Agents Under Threat

## North star

**The familiar academic workshop page.** The site deliberately follows the visual grammar of the supplied AgentWild workshop reference: a quiet white navigation bar, a full-width city photograph, centered white event metadata, and a single-column reading flow beneath it. The design should feel credible, calm, and immediately scannable to researchers.

## Visual rules

- Keep the page background white and body copy charcoal; use blue only for links.
- Constrain long-form sections to an `880px` reading column with generous vertical spacing.
- Separate sections with light gray rules and compact, conventional headings.
- Use a semantic table for the schedule and simple ruled rows for dates and guidance.
- Present speakers, organizers, and advisers in centered portrait grids. Until approved portraits are available, use circular initials with accessible labels.
- Preserve the proposal status in the hero and label every unconfirmed date or program item as tentative.
- Use no gradients, decorative glow, card shadows, entry animation, or security-dashboard motifs.

## Navigation and hero

The desktop navigation is a `72px` white bar with the workshop name at left and section links at right. At `900px` and below, keep the About shortcut and expose the remaining links through an accessible menu. The hero uses the Montréal photograph with a dark overlay, a compact proposal-status label, a large centered title, date, place, format, and contact address.

## Typography

Use Arial/Helvetica/system sans throughout. The hero title is bold and responsive; section headings are conventional medium-weight academic headings. Body copy stays at least `16px` with a comfortable `1.7` line height. Avoid display fonts and all-caps metadata except for the short proposal-status label.

## Responsive behavior

At `900px`, switch to the compact menu, reduce hero type, and allow people grids to collapse. At `640px`, use a single-column reading flow, a roughly `500px` hero, horizontally scrollable schedule containment without page overflow, wrapped email addresses, and smaller circular portraits. All controls retain visible focus, and reduced-motion users receive no transitions.
