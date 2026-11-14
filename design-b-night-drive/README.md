# Design B — “Night Drive · Mission Control”

A dark, instrument-cluster take on the SDCertified × Suresh Drives ecosystem: a high-performance car’s dashboard at night. Graphite surfaces, hairline borders, frosted panels. **Suresh Green** is the colour of telemetry and verification (gauges, seals, passed checks, milestones). **SD Red** is reserved for commerce (Book, Pay, Buy, List) and gets a soft red glow on hover and focus.

Open `index.html` (public) or `home.html` (signed in) straight from disk. No build step and no server needed. The only external request is Google Fonts.

## Signature UX patterns
| Pattern | Where | Notes |
|---|---|---|
| **Instrument gauges**: 270° arc dial, 28 tick marks, needle sweep on reveal | report, track (report ready), vehicle, home, inspections, index | `.gauge` + `--v` (0–100). Ticks come from the `#g-ticks` sprite symbol. `.amber` marks attention. The number is always printed, so the value never relies on colour. |
| **Car wireframe** (top-down SVG) | report (paint-depth heat map), track (“What we check” explainer) | Panels are coloured green / amber / hatched red, with µm values printed on each panel and a legend. “R” marks a repaint. |
| **Milestone tracking** (no live sync) | track | Booked → Assigned → Arriving today (9:00–9:30 window) → In progress (calm static copy + explainer) → Report ready. Each milestone shows the WhatsApp/push message that was sent and its delivery state. |
| **Prototype state switch** | track | “Preview state: In progress · Report ready”, defaults to In progress. Report ready is the end reveal (89/100 gauge, Gold, verdict, OBD, battery, tyres, fair-price band, View full report). The `#ready` hash opens it directly. |
| **Build sheet** | booking steps 1–5 | A sticky summary that fills in as you go, with Edit links. On mobile it collapses into the sticky bottom CTA summary. |
| **Segment price** | book-car | Picking a model applies Standard / Premium / Luxury and animates the price. GST is always shown. |
| **Slot map** | book-slot | The 30-day grid works like seat selection: each day shows Morning and Afternoon availability as open, few left or full. |
| **10-minute hold ring** | book-slot → checkout | Mono countdown inside a ring, kept in `sessionStorage` (try/catch). Turns amber under 2 min. When it expires, a “Hold again” button appears and Pay is blocked. Screen readers hear milestones, not every second. |
| **System status strip** | track | Mission-control header: booking, car, session, technician, start time, status. |
| **Spec-sheet proof band** | index, suresh-drives, partners | Wide display numerals with mono labels. |

## Files
`styles.css` holds the design tokens, then base, components, pages and motion. `app.js` holds the icon sprite, shell injection (`data-shell="app|site|flow"`, `data-page`, `data-title`, `data-back`, `data-step`) and the interactions. There are 19 pages, each with real HTML content.

## Tokens (mirror in Flutter)
| Token | Value | Use |
|---|---|---|
| `--bg` | `#0A0C0E` | Page base |
| `--s1` / `--s2` / `--s3` | `#12161A` / `#1A1F24` / `#232A31` | Cards / inputs & raised / pressed |
| `--line` / `--line-2` | `rgba(255,255,255,.08)` / `.14` | Hairlines / input borders |
| `--glass` | `rgba(18,22,26,.72)` + blur 18px (fallback `#13171B`) | Frosted panels, bars |
| `--tx` / `--tx-2` / `--mu` | `#F2F4F5` / `#C9CFD4` / `#9AA3AB` | Text: 17.6:1 / 12.3:1 / 7.6:1 on bg |
| `--red` / `--red-press` | `#E61E2A` / `#B01E23` | Primary CTA fill (white text 4.58:1) |
| `--red-text` | `#FF5A63` | Red used as text on dark (6.4:1) |
| `--green` / `--green-press` | `#8CC63F` / `#6FA32F` | Verified, progress, seals, glows (8.1:1 on s2) |
| `--green-ink` | `#0B1405` | Text on green fills |
| `--amber` / `--err` / `--info` | `#F2B33D` / `#FF6B6B` / `#8AB8FF` | Advisory / error / info (always with icon + text) |
| Tiers | platinum / gold / silver metallic gradients, ink `#121417` | Certification badges |
| Fonts | Archivo (variable `wdth` 62–125; display at **125%**, sub-display 112%) · JetBrains Mono (data, refs, timers; tabular numerals) | |
| Type scale | `--fs-hero` clamp(2.35→5.6rem) · `--fs-h1` clamp(1.9→3.4rem) · `--fs-h2` clamp(1.6→2.6rem) · body 16px | |
| Radius | 6 / 10 / 14 / 20 / 28 / pill | |
| Spacing | 4-pt scale (4 … 96) | |
| Motion | enter `cubic-bezier(.22,1,.36,1)` · press 120ms scale(.97) · UI 180ms · med 240ms · reveal 640ms | `transform`/`opacity` only. Gauges sweep with `stroke-dashoffset`. Reduced motion turns off loops and travel. |
| Layout | max 1280px · gutter clamp(16–40px) · nav 56/68px · tab bar 66px + safe area | |

## Shell
- **Mobile (≤767px):** a top bar with the title, back button, help and a bell with a badge of 3, plus a bottom tab bar (Home · Buy · **Book**, a red glowing orb · Inspections with a green status dot · Profile). Booking pages hide the tab bar and use a sticky CTA.
- **Desktop:** a frosted top nav with the SDCertified lock-up and the “by Suresh Drives” endorsement, plus a floating “Talk to a guide” pill.
- Site pages (`index`, `suresh-drives`, `partners`) use a transparent marketing header that turns frosted on scroll. On mobile they get a menu drawer.
