# Trinos Design Style Guide

> Derived from `docs/Trinos-Platform-Wireframe.html` and `docs/trinos-platform-design.html`.
> This file is the authoritative design reference for all UI work on the platform.

---

## Section 1 — Brand & Voice

**Project:** Trinos · Status Report Platform

**Tagline:** "One report. The right eyes. Every day."

**Personality:** Calm, precise, institutional. The blue tetrahedron mark communicates structure and clarity — three faces representing the three layers of the organisation (employee → team lead → MD). Never loud, never playful. A tool professionals trust, not a product that demands attention.

**Voice principles:**
- Respectful and action-clear. Tell users what to do, not what they did wrong.
- No marketing fluff in UI copy — labels describe function, not aspiration.
- Errors explain what to fix, not just that something failed.
- Time language is explicit: "Due by 6:00 PM today" not "Due soon."
- Status labels are unambiguous: SUBMITTED, DRAFT, MISSING, OVERDUE — not hedged synonyms.

---

## Section 2 — Colour Palette

All colours are defined as CSS custom properties on `:root`.

### Brand Blues

| Variable | Hex | Usage |
|---|---|---|
| `--blue-900` | `#1B3A52` | Sidebar background, deep backgrounds, `--grad-deep` start |
| `--blue-800` | `#234C6B` | Sidebar role-switcher bg, avatar deep variant |
| `--blue-700` | `#2E5878` | Gradient midpoints, blocker icon bg on dark |
| `--blue-600` | `#356A92` | Button hover, icon-box accent, form field focus border |
| `--blue-500` | `#3D7AA8` | **Primary action colour.** Primary buttons, active nav item, unread badges, outgoing message bubbles, links |
| `--blue-400` | `#5B8BB5` | Input focus border, `--grad-tri` start |
| `--blue-300` | `#8DB1CE` | Sidebar secondary text, `.o` in sidebar wordmark |
| `--blue-200` | `#C0D5E6` | Selection highlight background |
| `--blue-100` | `#DCE8F1` | Subtle tinted surfaces |
| `--blue-50` | `#EEF4F9` | Focus ring halo, `.tag-blue` background, icon boxes |

### Silver Neutrals

| Variable | Hex | Usage |
|---|---|---|
| `--silver-700` | `#6B727B` | Icon-box silver text, avatar silver variant |
| `--silver-600` | `#8A9099` | Avatar silver background |
| `--silver-500` | `#9CA2AB` | Empty-state icons |
| `--silver-400` | `#AEB4BC` | Ghost button border on hover, scrollbar thumb hover |
| `--silver-300` | `#C5CAD1` | Scrollbar thumb default, switch off-state |
| `--silver-200` | `#D9DDE2` | Light borders |
| `--silver-100` | `#E8EBEE` | `.ic-silver` background, `--rp-emp` role badge bg |
| `--silver-50` | `#F4F6F8` | Lightest silver tint |

### Ink (Text)

| Variable | Hex | Usage |
|---|---|---|
| `--ink` | `#172430` | Body text, primary content |
| `--ink-2` | `#3A4756` | Labels, secondary headings, ghost button text |
| `--ink-3` | `#6A7686` | Descriptions, captions, muted body text |
| `--ink-4` | `#97A1AD` | Placeholders, timestamps, meta text, hints |

### Paper (Backgrounds)

| Variable | Hex | Usage |
|---|---|---|
| `--paper` | `#FFFFFF` | Card surfaces, input backgrounds, main chat area |
| `--paper-2` | `#F5F7FA` | Page background, sidebar list bg, toolbar bg |
| `--paper-3` | `#EEF1F5` | Nested surfaces, `.tag-gray` bg, `.delta.flat` bg |

### Lines (Borders)

| Variable | Hex | Usage |
|---|---|---|
| `--line` | `#E4E9EE` | Card borders, table row dividers, topbar border |
| `--line-2` | `#D6DDE4` | Input borders (default state) |

### Semantic Colours

| Variable | Hex | Paired bg | Usage |
|---|---|---|---|
| `--ok` | `#2E8B6F` | `--ok-bg` `#E4F2EC` | Success, submitted reports, resolved blockers, online indicator |
| `--warn` | `#C8852A` | `--warn-bg` `#FBF0DF` | Warnings, draft reports, medium-severity blockers |
| `--danger` | `#C0473F` | `--danger-bg` `#FBE9E7` | Errors, missing/overdue reports, open/escalated blockers, required field badges |
| `--purple` | `#7B4A9E` | `--purple-bg` `#EFE7F5` | MD/Super-admin role badges, special highlights |

### Gradients

| Variable | Value | Usage |
|---|---|---|
| `--grad-tri` | `linear-gradient(135deg, #5B8BB5 0%, #3D7AA8 55%, #2E5878 100%)` | Avatar default, progress bar fills, logo left face |
| `--grad-deep` | `linear-gradient(135deg, #1B3A52 0%, #2E5878 55%, #3D7AA8 100%)` | Login panel background |

### Status → Colour Mapping

| Status | Category | Background | Border / Accent | Text |
|---|---|---|---|---|
| SUBMITTED | Report | `--ok-bg` | `--ok` | `--ok` |
| DRAFT | Report | `--warn-bg` | `--warn` | `--warn` |
| MISSING | Report | `--danger-bg` | `--danger` | `--danger` |
| OVERDUE | Report | `--danger-bg` | `--danger` | `--danger` |
| NOT_DUE | Report | `--paper-3` | `--silver-300` | `--ink-3` |
| OPEN | Blocker | `--warn-bg` | `--warn` (left border 3px) | `--warn` |
| ESCALATED | Blocker | `--danger-bg` | `--danger` (left border 3px) | `--danger` |
| RESOLVED | Blocker | `--ok-bg` | `--ok` | `--ok` |
| Submitted (cell) | Compliance grid | `--ok-bg` | — | `--ok` |
| Late/partial | Compliance grid | `--warn-bg` | — | `--warn` |
| Missing | Compliance grid | `--paper-3` | — | `--ink-4` |

---

## Section 3 — Typography

### Font Families

| Role | Family | Weights | Usage |
|---|---|---|---|
| Display | `'Sora'` | 400, 500, 600, 700 | Page H1/H2 headings, card titles, stat values, brand wordmark, avatar initials, date numerals, field number badges |
| Body | `'Hanken Grotesk'` | 400, 500, 600, 700 | All interface body text, labels, buttons, nav items, descriptions |
| Mono | `'JetBrains Mono'` | 400, 600 | Report codes (`RPT-YYYY-NNNN`), timestamps in audit rows, tabular numerics |

**Loading:** Sora and Hanken Grotesk are loaded via Google Fonts. Mirror in Next.js using `next/font/google`. JetBrains Mono should be added to the same Google Fonts import.

```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
```

**Base:** `font-family: 'Hanken Grotesk', system-ui, sans-serif; line-height: 1.55; -webkit-font-smoothing: antialiased`

### Type Scale

| Role | Size | Weight | Family | Notes |
|---|---|---|---|---|
| Page title (topbar) | 21px | 600 | Sora | `letter-spacing: -0.01em` |
| Page heading (`page-head h2`) | 25–26px | 600 | Sora | |
| Card/section title (`card-head h3`) | 15.5–16px | 600 | Sora | |
| Stat value | 29–30px | 700 | Sora | `letter-spacing: -0.02em` |
| Body text | 14–14.5px | 400/500 | Hanken Grotesk | |
| Label (form) | 13px | 600 | Hanken Grotesk | `color: --ink-2` |
| Label uppercase (section) | 10.5–12px | 700 | Hanken Grotesk | `text-transform: uppercase; letter-spacing: .04–.1em` |
| Nav item | 14–14.5px | 500 | Hanken Grotesk | |
| Hint / helper text | 13px | 400 | Hanken Grotesk | `color: --ink-4` |
| Badge / tag | 11.5px | 600 | Hanken Grotesk | |
| Timestamp / meta | 12–12.5px | 400 | Hanken Grotesk / Mono | `font-variant-numeric: tabular-nums` |
| Eyebrow | 13px | 600 | Hanken Grotesk | `text-transform: uppercase; letter-spacing: .08em` |
| Login hero H1 | 42–44px | 700 | Sora | `line-height: 1.08–1.1` |

---

## Section 4 — Components

### 4.1 Buttons

**Base class:** `.btn`
- `display: inline-flex; align-items: center; justify-content: center; gap: 8–9px`
- `border-radius: var(--r-md)` (12px)
- `font-weight: 600; white-space: nowrap`
- `transition: .16s`
- Icons: `17×17px` (default), `15×15px` (sm)

**Variants:**

| Class | Height | Padding | Font size | Background | Text | Border | Shadow |
|---|---|---|---|---|---|---|---|
| `.btn-primary` | 44px | `0 18px` | 14.5px | `--blue-500` | `#fff` | none | `0 4px 12px rgba(61,122,168,.28)` |
| `.btn-primary:hover` | — | — | — | `--blue-600` | — | — | `translateY(-1px)` |
| `.btn-ghost` | 44px | `0 18px` | 14.5px | `--paper` | `--ink-2` | `1.5px solid --line-2` | none |
| `.btn-ghost:hover` | — | — | — | `--paper-2` | — | `--silver-400` | — |
| `.btn-danger` | 44px | `0 18px` | 14.5px | `--danger-bg` | `--danger` | none | none |
| `.btn-sm` | 38px | `0 14px` | 13.5px | — | — | — | `border-radius: --r-sm (8px)` |
| `.btn-tiny` | 32px | `0 11px` | 12.5px | — | — | — | `border-radius: 8px` |

`.btn-block` adds `width: 100%`.

---

### 4.2 Form Fields

**Label:**
- `font-size: 13px; font-weight: 600; color: var(--ink-2); margin-bottom: 7px`

**Input / `.input`:**
- `height: 46px`
- `border: 1.5px solid var(--line-2)`
- `border-radius: var(--r-md)` (12px)
- `padding: 0 14px; font-size: 15px; color: var(--ink); background: var(--paper)`
- `transition: .15s`
- **Focus:** `border-color: var(--blue-400); box-shadow: 0 0 0 4px var(--blue-50)` (4px blue-50 halo)
- **Placeholder:** `color: var(--ink-4)`

**Textarea / `.textarea`:**
- Same border/focus rules as input
- `min-height: 88px; resize: vertical; line-height: 1.6`
- **Error state:** `.textarea.err` → `border-color: var(--danger); box-shadow: 0 0 0 4px var(--danger-bg)`

**Helper text:** `font-size: 13px; color: var(--ink-4)` — below the field

**Inline error message:** `font-size: 12px; font-weight: 600; color: var(--danger)` — shown via `.err-msg.show`

**Field spacing:** `.field { margin-bottom: 16px }`

---

### 4.3 Status Badges (Tags / Pills)

**Base class:** `.tag`
- `display: inline-flex; align-items: center; gap: 5px`
- `font-size: 11.5px; font-weight: 600`
- `padding: 3px 9px; border-radius: 20px`
- `letter-spacing: .01em`
- Icons inside badges: `11×11px`

| Class | Background | Text |
|---|---|---|
| `.tag-ok` | `--ok-bg` (#E4F2EC) | `--ok` (#2E8B6F) |
| `.tag-warn` | `--warn-bg` (#FBF0DF) | `--warn` (#C8852A) |
| `.tag-danger` | `--danger-bg` (#FBE9E7) | `--danger` (#C0473F) |
| `.tag-blue` | `--blue-50` (#EEF4F9) | `--blue-600` (#356A92) |
| `.tag-gray` | `--paper-3` (#EEF1F5) | `--ink-3` (#6A7686) |
| `.tag-purple` | `--purple-bg` (#EFE7F5) | `--purple` (#7B4A9E) |

---

### 4.4 Cards

**Base class:** `.card`
- `background: var(--paper)`
- `border: 1px solid var(--line)`
- `border-radius: var(--r-lg)` (16px)
- `box-shadow: var(--shadow-sm)`

**Card header / `.card-head`:**
- `padding: 17–18px 22px`
- `border-bottom: 1px solid var(--line)`
- Title: `font-size: 15.5–16px; font-weight: 600`
- Subtitle: `font-size: 12.5–13px; color: var(--ink-4)`

**Card body padding:** `.card-pad { padding: 22px }`

**Max-width variants:** `.form-card { max-width: 760–780px }`

---

### 4.5 Avatar

**Base class:** `.avatar`
- `border-radius: 50%` (wireframe) / `border-radius: 11px` (design file — rounded square)
- `background: var(--blue-500)` default (or `var(--grad-tri)` in design file)
- `font-family: 'Sora'; font-weight: 600–700; color: #fff`
- `letter-spacing: .01em`

| Size | Width/Height | Font size | Border radius |
|---|---|---|---|
| Default | 38×38px | 14px | 50% / 11px |
| `.sm` | 32×32px | 12px | 50% / 9px |
| `.lg` | 52×52px | 18px | 50% / 14px |

**Colour variants:** `.avatar.green` → `--ok` · `.avatar.purple` → `--purple` · `.avatar.warn` → `--warn` · `.avatar.silver` → `--silver-600` · `.avatar.deep` → `--blue-800`

---

### 4.6 Sidebar Nav Item

**Sidebar background:** `var(--blue-900)` (#1B3A52)

**Base class:** `.nav-item`
- `display: flex; align-items: center; gap: 12px; padding: 10px 12px`
- `border-radius: var(--r-md)` (12px) / wireframe uses `--r-sm` (8px)
- `font-size: 14–14.5px; font-weight: 500; color: #BCD0E0–#C7D7E4`
- `transition: .13s`

| State | Background | Text | Shadow |
|---|---|---|---|
| Default | transparent | `#BCD0E0` / `#C7D7E4` | none |
| Hover | `rgba(255,255,255,.06–.07)` | `#fff` | none |
| Active | `var(--blue-500)` | `#fff` | `0 4px 12px rgba(61,122,168,.4)` |

**Unread badge** (`.badge` inside `.nav-item`):
- `background: var(--danger); color: #fff`
- `font-size: 11px; font-weight: 700`
- `min-width: 18–19px; height: 18–19px; border-radius: 9–10px`
- When active: `background: rgba(255,255,255,.25–.28)`

**Section label** (`.nav-sec` / `.nav-section`):
- `font-size: 10.5–11px; font-weight: 700; letter-spacing: .07–.1em; text-transform: uppercase`
- `color: #5E7E9A` / `var(--blue-300)` at reduced opacity

---

### 4.7 Report Submission Form

The form is a single `.card.form-card` (max-width 760–780px) with 4 stacked field sections.

Each **form field section** (`.form-field`):
- `padding: 20px 24px; border-bottom: 1px solid var(--line)`

**Field header** (`.ff-head`):
- `.ff-num` — numbered badge: `24×24px`, `border-radius: 7px`, `background: --blue-50`, `color: --blue-600`, `font-family: Sora; font-size: 12px; font-weight: 700`
- `.ttl` — `font-size: 15px; font-weight: 600`
- `.req` badge — `font-size: 10.5–11px; font-weight: 700; color: --danger; background: --danger-bg; padding: 2px 7px; border-radius: 5px`
- `.opt` badge — `font-size: 10.5–11px; font-weight: 600; color: --ink-4; background: --paper-3`

**Hint** (`.ff-hint`): `font-size: 13px; color: --ink-4; margin: 2px 0 11–12px 34px`

**Rich-text toolbar** (`.toolbar`):
- `display: flex; gap: 2px; padding: 5px; background: --paper-2; border: 1px solid --line; border-radius: 9px; width: fit-content; margin: 0 0 8px 34px`
- Button: `30×30px; border-radius: 6px; color: --ink-3`
- Button hover: `background: --paper; color: --ink; box-shadow: --shadow-sm`

**Autosave indicator** (`.save-note`):
- `display: flex; align-items: center; gap: 7px; font-size: 13px; color: --ink-3`
- Icon: `15×15px; color: --ok`

**Form footer** (`.form-foot`):
- `padding: 18px 24px; background: --paper-2; border-top: 1px solid --line`
- `border-radius: 0 0 var(--r-lg) var(--r-lg)`

---

### 4.8 Status Grid Cell (Team Dashboard)

**Day cell** (`.daycell`):
- `width: 30px; height: 30px; border-radius: 8px`
- `font-size: 13px; font-weight: 600–700`
- Centred within a column via `margin: 0 auto`

| Class | Background | Text | Icon |
|---|---|---|---|
| `.dc-ok` | `--ok-bg` | `--ok` | Check icon |
| `.dc-late` | `--warn-bg` | `--warn` | Clock icon |
| `.dc-miss` | `--paper-3` | `--ink-4` | `·` |

**Member row grid:** `grid-template-columns: 1.6–1.7fr repeat(5, 46px) 1fr`

---

## Section 5 — Layout

### App Grid

```
┌─────────────────────────────────────────────┐
│  Sidebar (250px fixed) │ Main content area   │
│  background: --blue-900│ margin-left: 250px  │
└─────────────────────────────────────────────┘
```

- Sidebar: `width: 250px; position: fixed; inset: 0 auto 0 0; z-index: 30`
- Main: `margin-left: 250px; min-height: 100vh; display: flex; flex-direction: column`

### Topbar

- `height: 66px; position: sticky; top: 0; z-index: 20`
- `background: var(--paper)` / `rgba(255,255,255,.85)` with `backdrop-filter: blur(10px)`
- `border-bottom: 1px solid var(--line)`
- `padding: 0 28–30px`
- Contains: breadcrumbs (left), search bar (auto margin-left), notification bell + avatar (right)

**Search bar:**
- `height: 40px; width: 280px`
- `background: --paper-2; border: 1px solid --line; border-radius: --r-md; padding: 0 13–14px`

**Topbar icon buttons:**
- `40×40px; border-radius: --r-md`
- `border: 1px solid --line; background: --paper`
- Notification dot: `8×8px; border-radius: 50%; background: --danger; border: 2px solid --paper`

### Page Content

- `padding: 30px 30px 60px`
- `max-width: 1240–1280px; width: 100%`

### Page Header (`.page-head`)

- `margin-bottom: 24–26px`
- Eyebrow: `font-size: 12.5–13px; font-weight: 600; color: --blue-500; letter-spacing: .04–.05em; text-transform: uppercase`
- H2: `font-size: 25–26px; font-weight: 600`
- Description: `color: --ink-3; font-size: 14.5–15px; max-width: 540–560px`

### Grid System

| Class | Columns | Gap |
|---|---|---|
| `.g-4` | `repeat(4, 1fr)` | 18px |
| `.g-3` | `repeat(3, 1fr)` | 18px |
| `.g-2` | `repeat(2, 1fr)` | 18px |
| `.g-2-1` | `1.55–1.6fr 1fr` | 18px |
| `.g-1-2` | `1fr 1.65–1.7fr` | 18px |

**Breakpoints:** `@media(max-width: 1180px)` collapses 4-col to 2-col; `@media(max-width: 880px)` collapses all to single column and hides sidebar.

### Chat Layout

- `grid-template-columns: 280–288px 1fr`
- `height: calc(100vh - 66px - 60–90px)`
- `border: 1px solid --line; border-radius: --r-lg; overflow: hidden`

---

## Section 6 — Brand Mark

### Tetrahedron SVG

The logo renders three polygon faces with white inner edge lines and a faint outer outline. Use unique gradient IDs per instance to avoid SVG namespace conflicts (the wireframe generates them dynamically via `Math.random()`).

```svg
<svg width="34" height="34" viewBox="0 0 100 100" fill="none" aria-hidden="true">
  <defs>
    <linearGradient id="tri-a" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7DA6C9"/>
      <stop offset="1" stop-color="#3D7AA8"/>
    </linearGradient>
    <linearGradient id="tri-b" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#C9CED5"/>
      <stop offset="1" stop-color="#9AA1AB"/>
    </linearGradient>
    <linearGradient id="tri-c" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#5B8BB5"/>
      <stop offset="1" stop-color="#2E5878"/>
    </linearGradient>
  </defs>
  <!-- Left face: blue gradient -->
  <polygon points="50,8 8,88 50,58" fill="url(#tri-a)"/>
  <!-- Right face: silver gradient -->
  <polygon points="50,8 92,88 50,58" fill="url(#tri-b)"/>
  <!-- Bottom face: deep blue gradient -->
  <polygon points="8,88 92,88 50,58" fill="url(#tri-c)"/>
  <!-- White inner edges (spokes from apex to centre) -->
  <path d="M50,8 L50,58 M8,88 L50,58 M92,88 L50,58"
        stroke="#fff" stroke-width="3.4"
        stroke-linecap="round" stroke-linejoin="round"/>
  <!-- White outer outline at 55% opacity -->
  <polygon points="50,8 8,88 92,88"
           fill="none" stroke="#fff" stroke-width="2.2"
           stroke-linejoin="round" opacity=".55"/>
</svg>
```

**Face breakdown:**
- Left face: `#7DA6C9 → #3D7AA8` (light-to-medium blue, diagonal)
- Right face: `#C9CED5 → #9AA1AB` (light-to-medium silver, diagonal)
- Bottom face: `#5B8BB5 → #2E5878` (medium-to-dark blue, vertical)
- Inner edges: white, `stroke-width: 3.4`, `stroke-linecap: round`
- Outer outline: white at `.55` opacity, `stroke-width: 2.2`

### Wordmark

```html
<div class="tri-wrap">
  <!-- logo SVG here -->
  <span class="tri-word">TRIN<span class="o">O</span>S</span>
</div>
```

**`.tri-word`:** `font-family: 'Sora'; font-weight: 700; letter-spacing: .16em; font-size: 17–18px`

The **O** character uses `color: var(--blue-500)` on dark backgrounds and `color: var(--blue-300)` inside the sidebar / login panel.

---

## Section 7 — Border-Radius Scale

| Variable | Value | Usage |
|---|---|---|
| `--r-sm` | `8px` | Small buttons, nav items, tag badges, input-like small controls |
| `--r-md` | `12px` | Inputs, standard buttons, cards (inner elements), dropdowns |
| `--r-lg` | `16px` | Cards, chat panel, main surface containers |
| `--r-xl` | `22px` | Large modals or hero surfaces (reserved) |

---

## Section 8 — Shadows & Transitions

### Shadow Scale

| Variable | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(23,36,48,.06), 0 1px 3px rgba(23,36,48,.04)` | Cards (default), active nav items, scroll thumb |
| `--shadow-md` | `0 4px 14px rgba(23,36,48,.08), 0 2px 6px rgba(23,36,48,.05)` | Elevated cards, focused inputs (when larger shadow desired) |
| `--shadow-lg` | `0 18px 50px rgba(23,36,48,.16)` | Dropdowns, popover panels, toast notifications |

The shadow base colour is derived from `--ink` (#172430) expressed as an RGB triple (`23,36,48`).

### Transitions

**Default interactive transition:** `.15–.16s` (no easing specified — `ease` implicit)

Toast animation: `.35s cubic-bezier(.2,.8,.3,1)` — spring-like ease-out

Pop/dropdown animation: `.18s ease` — `@keyframes pop { from { opacity:0; transform:translateY(-6px) } to { opacity:1; transform:translateY(0) } }`

Fade animation: `.35s ease` — `@keyframes fade { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }`

---

## Section 9 — Accessibility

- **Contrast:** All foreground/background colour pairs target WCAG AA (4.5:1 for body text, 3:1 for large text). The primary blue (`--blue-500`) on white meets AA for interactive controls.
- **Focus ring:** `box-shadow: 0 0 0 4px var(--blue-50)` on all interactive inputs and textareas. Focus border: `var(--blue-400)`.
- **Status communication:** Status is never conveyed by colour alone. Every status badge includes both an icon and a text label (e.g. "SUBMITTED", "OVERDUE"). Day cells in the team grid include an icon (check / clock) alongside the colour.
- **Touch targets:** Minimum interactive target size is 44×44px (base `.btn` height, icon buttons in topbar, chat send button). `.btn-sm` (38px) and `.btn-tiny` (32px) are used only in low-density admin contexts where adjacent spacing compensates.
- **Keyboard navigation:** Form fields use standard focus order. Sidebar nav items are `button` elements.
- **Screen readers:** The tetrahedron SVG carries `aria-hidden="true"` — the wordmark text provides the accessible name.
- **Reduced motion:** No explicit `prefers-reduced-motion` rules in the wireframe. Implement these when adding animations to production components.

---

## Section 10 — Status Colour Reference Table

### Report Status

| Status | Background var | Background hex | Border/text var | Border/text hex | CSS class |
|---|---|---|---|---|---|
| SUBMITTED | `--ok-bg` | `#E4F2EC` | `--ok` | `#2E8B6F` | `.tag-ok` / `.dc-ok` |
| DRAFT | `--warn-bg` | `#FBF0DF` | `--warn` | `#C8852A` | `.tag-warn` |
| MISSING | `--danger-bg` | `#FBE9E7` | `--danger` | `#C0473F` | `.tag-danger` / `.dc-miss`* |
| OVERDUE | `--danger-bg` | `#FBE9E7` | `--danger` | `#C0473F` | `.tag-danger` |
| NOT_DUE | `--paper-3` | `#EEF1F5` | `--ink-3` | `#6A7686` | `.tag-gray` |

*`.dc-miss` uses `--paper-3` background (lighter) to indicate absence rather than active failure.

### Compliance / Day Cell Status

| Status | Class | Background | Text |
|---|---|---|---|
| Submitted on time | `.dc-ok` | `--ok-bg` (#E4F2EC) | `--ok` (#2E8B6F) |
| Late submission | `.dc-late` | `--warn-bg` (#FBF0DF) | `--warn` (#C8852A) |
| Not submitted / missing | `.dc-miss` | `--paper-3` (#EEF1F5) | `--ink-4` (#97A1AD) |

### Blocker Status

| Status | Left border | Icon bg | Icon text | Tag class |
|---|---|---|---|---|
| OPEN | `--warn` (3px) | `--warn-bg` | `--warn` | `.tag-warn` |
| ESCALATED | `--danger` (3px) | `--danger-bg` | `--danger` | `.tag-danger` |
| RESOLVED | `--ok` (3px) | `--ok-bg` | `--ok` | `.tag-ok` |

### Role Pill Colours (Admin UI)

| Role | Class | Background | Text |
|---|---|---|---|
| EMPLOYEE | `.rp-emp` | `--silver-100` (#E8EBEE) | `--silver-700` (#6B727B) |
| TEAM_LEAD | `.rp-tl` | `--blue-50` (#EEF4F9) | `--blue-600` (#356A92) |
| MD / Super Admin | `.rp-sa` | `--purple-bg` (#EFE7F5) | `--purple` (#7B4A9E) |
| ADMIN | `.rp-adm` | `--warn-bg` (#FBF0DF) | `--warn` (#C8852A) |

---

## Section 11 — Domain ID Conventions

| Entity | Format | Example | Font |
|---|---|---|---|
| Report | `RPT-YYYY-NNNN` | `RPT-2026-0042` | `JetBrains Mono` |

Report codes appear in:
- Report list rows alongside the status badge
- Message thread references (`.msg-ref`)
- Audit log entries
- Export filenames

---

## Section 12 — Animation Tokens

| Name | Duration | Easing | Keyframe |
|---|---|---|---|
| `fadeIn` | `.35s` | `ease` | `opacity:0, translateY(8px) → opacity:1, translateY(0)` |
| `pop` | `.18s` | `ease` | `opacity:0, translateY(-6px) → opacity:1, translateY(0)` |
| `skeleton pulse` | `1.5s` | `ease-in-out` (infinite) | `opacity: .6 → 1 → .6` (implement as `@keyframes pulse`) |
| `spinner` | `0.8s` | `linear` (infinite) | `rotate(0deg) → rotate(360deg)` |
| `toast slide-up` | `.35s` | `cubic-bezier(.2,.8,.3,1)` | `translateY(140px) → translateY(0)` |

Default interactive transition for hover/focus state changes: **`.15s`** (applied via `transition: .15s` on inputs, buttons, and nav items).

> Note: Skeleton pulse and spinner are design-specified tokens not yet implemented in the wireframe prototype. Add `@keyframes pulse` and `@keyframes spin` to the global stylesheet when building loading states.
