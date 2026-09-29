---
name: Agents Under Threat
description: An adversarial field map for a proposed AAAI-27 workshop on LLM-agent security.
colors:
  midnight-ink: "#06111b"
  deep-system-blue: "#0d1d2b"
  chalk-paper: "#f3f2ed"
  clean-white: "#fbfcfa"
  oxidized-cyan: "#4fe0d0"
  deep-cyan: "#173f42"
  alert-amber: "#ffbd59"
  mist-panel: "#dce5e2"
typography:
  display:
    fontFamily: "Geist, Arial, Helvetica, sans-serif"
    fontSize: "clamp(3.2rem, 7.3vw, 7.7rem)"
    fontWeight: 640
    lineHeight: 0.88
    letterSpacing: "-0.07em"
  headline:
    fontFamily: "Geist, Arial, Helvetica, sans-serif"
    fontSize: "clamp(2.6rem, 5vw, 5.7rem)"
    fontWeight: 620
    lineHeight: 0.98
    letterSpacing: "-0.055em"
  body:
    fontFamily: "Geist, Arial, Helvetica, sans-serif"
    fontSize: "16px"
    lineHeight: 1.55
  label:
    fontFamily: "Geist Mono, monospace"
    fontSize: "0.72rem"
    fontWeight: 650
    letterSpacing: "0.08em"
rounded:
  control: "10px"
  circle: "50%"
spacing:
  page-inline: "clamp(1.25rem, 4vw, 4.75rem)"
  section-block: "clamp(5rem, 9vw, 9rem)"
  compact: "1rem"
  standard: "2rem"
  generous: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.midnight-ink}"
    textColor: "{colors.clean-white}"
    padding: "0.72rem 0.9rem"
  button-accent:
    backgroundColor: "{colors.oxidized-cyan}"
    textColor: "{colors.midnight-ink}"
    padding: "1.05rem 0.9rem"
  status-chip:
    textColor: "{colors.clean-white}"
    padding: "0.55rem 0.75rem"
---

# Design System: Agents Under Threat

## Overview

**Creative North Star: "The Adversarial Field Manual"**

The system treats an academic workshop page as a live security map: precise, high-contrast, and sober enough for research, with just enough signal color to make attack paths and provisional status impossible to miss. It borrows the clear one-page rhythm of the user-selected workshop reference without becoming a generic conference hero laid over a city photograph.

Density alternates deliberately. Large editorial statements establish the argument, then rule-based rows and compact mono labels carry operational detail. Photography is environmental evidence, not decoration; the cyan path and node language connects inputs, tools, coordination, and defense.

**Key Characteristics:**

- Midnight and chalk surfaces with oxidized cyan as the active signal.
- Editorial-scale headlines paired with terse mono operational labels.
- Fine rules, open grids, and very limited rounding.
- Explicit amber markers for tentative or cautionary states.
- Responsive structures that collapse from four columns to two and then one.

## Colors

The palette is a cold technical field with two rare signals: cyan means active system structure; amber means uncertainty or caution.

### Primary

- **Midnight Ink** (#06111b): hero, CFP, speaker cards, primary actions, and the footer.
- **Oxidized Cyan** (#4fe0d0): attack paths, active emphasis, links within dark fields, and the contact finale.

### Secondary

- **Alert Amber** (#ffbd59): tentative status, focus rings, and terminal nodes.
- **Mist Panel** (#dce5e2): the program section, separating the day plan from paper and people content.

### Neutral

- **Chalk Paper** (#f3f2ed): principal light canvas.
- **Clean White** (#fbfcfa): navigation and high-contrast type on dark fields.
- **Deep System Blue** (#0d1d2b): supporting dark surface.

### Named Rules

**The Signal Economy Rule.** Cyan identifies system structure or the next action; amber is reserved for tentative status, caution, and focus. Neither is decorative fill.

## Typography

**Display Font:** Geist (with Arial and Helvetica fallbacks)  
**Body Font:** Geist (with Arial and Helvetica fallbacks)  
**Label/Mono Font:** Geist Mono (with monospace fallback)

**Character:** Geist keeps the academic voice contemporary and direct. Tight display spacing creates urgency; mono labels make dates, status, roles, and indices read like instrumentation.

### Hierarchy

- **Display** (640, `clamp(3.2rem, 7.3vw, 7.7rem)`, 0.88): hero title only.
- **Headline** (620, `clamp(2.6rem, 5vw, 5.7rem)`, 0.98): major section arguments.
- **Title** (560–600, `clamp(1.25rem, 2.6vw, 2.8rem)`, 1.05–1.15): topics, people, dates, and session labels.
- **Body** (400, 16px minimum, 1.55): explanations, policy, and institutional detail; keep most text near 36–65 characters per line.
- **Label** (650, ~0.7rem, 0.06–0.11em, uppercase): navigation, indices, states, dates, and role metadata.

### Named Rules

**The Two-Register Rule.** Human arguments use the sans display register; system metadata uses mono. Do not introduce a third expressive typeface.

## Layout

The page uses a 1440px maximum field with fluid inline padding (`clamp(1.25rem, 4vw, 4.75rem)`). Major sections have deep vertical breathing room (`clamp(5rem, 9vw, 9rem)`) and are divided by one-pixel rules rather than floating containers.

Desktop sections commonly use a three-part editorial grid: index, argument, context. Detail areas use four columns for dates and people, five columns for schedule rows, and a 1:1.3 split for policy content. At 900px, editorial grids stack and people/date grids become two columns. At 680px, all repeated content becomes one column and schedule rows use a compact three-column pattern without horizontal scrolling.

## Elevation & Depth

The system is flat by default. Depth comes from tonal fields, photo overlays, sticky navigation blur, and line hierarchy; no card shadows are used. Reveal motion moves content only 18px and fades over 500ms, with a complete reduced-motion fallback.

### Named Rules

**The Flat Evidence Rule.** Information sits in the same field and earns hierarchy through scale, tone, and rules—not ornamental shadows.

## Shapes

Most structures are square or line-defined. Circular geometry is reserved for the shield mark, map nodes, numeric waypoints, and the contact icon. Controls may use the project's 10px baseline radius, but large content containers stay unrounded.

## Components

### Buttons

- **Shape:** squared field action; the site currently uses no visible large radius.
- **Primary:** Midnight Ink on Clean White context, with `0.72rem 0.9rem` padding.
- **Accent:** Oxidized Cyan on Midnight Ink, used for the hero's next action.
- **Hover / Focus:** underline growth for navigation; 3px Alert Amber focus outline with 4px offset for every control.

### Chips

- **Style:** transparent, one-pixel boundary, mono uppercase text.
- **State:** a 7px amber node inside the hero status chip signals that the workshop is proposed.

### Cards / Containers

- **Corner Style:** square; circular elements are annotations, not card shells.
- **Background:** cards usually inherit their containing field; speaker cards alone reverse to Midnight Ink.
- **Shadow Strategy:** none; use borders and tonal shifts.
- **Internal Padding:** 1.2–2.25rem depending on density.

### Navigation

The 72px sticky bar is a restrained white instrument rail. Desktop links use mono uppercase labels and a one-pixel active underline. At 900px it becomes a 42px menu control and a full-width stacked sheet. Escape and link activation close the sheet.

### Threat Map

Three research questions share a horizontal line with node markers on desktop, then become ruled stacked rows on smaller screens. The pattern should only represent a causal or security-system relationship, never generic process decoration.

## Do's and Don'ts

### Do:

- **Do** mark every unconfirmed event detail as tentative in both language and visual state.
- **Do** use fine rules and aligned metadata to structure dense academic information.
- **Do** preserve 16px minimum body text, visible focus, and reduced-motion behavior.
- **Do** keep cyan and amber rare enough to retain semantic force.

### Don't:

- **Don't** imply official AAAI-27 acceptance or add a submission destination before one exists.
- **Don't** turn every content group into a rounded floating card.
- **Don't** add gradients, decorative glows, or ambient shadows to simulate polish.
- **Don't** use attack-path lines where no actual dependency or threat relationship exists.

