# Design A — Heritage Ivory · The Assurance Ledger

A quiet-luxury, editorial redesign of the Suresh Drives × SDCertified ecosystem. It is meant to feel like a private bank or watch maison crossed with Apple's calm product UI. The idea is that a ten-year-old inspector's signature is something you can trust. Open `index.html` by double-clicking; everything works over `file://`.

## Concept
- **Warm ivory paper, deep ink, hairline rules.** Dark "night" sections are the contrast moments: the Suresh Drives hero, the inspection status card, the footer and the SD Assure promo.
- **Brand logic:** red (`#E61E2A`) is used only for SDCertified actions and commerce. Green (`#8CC63F`) is used for Suresh Drives verification: seals, passed checks and milestones. Green text on light backgrounds uses `#3E6B1F`.
- **Type:** *Newsreader* is the display serif, with optical sizes and italic accents. *Manrope* is used for UI and body text. Prices and scores use tabular numerals, and serials (SDB-24817, SDR-18842) are set in small caps.

## Signature patterns
| Pattern | Where | Notes |
|---|---|---|
| **"Suresh Drives Verified" guilloche seal** | everywhere trust is claimed | Generated in `app.js` as SVG symbols: `#seal` is the full rosette with text, `#seal-mini` is used at small sizes. Colour comes from `currentColor`. |
| **The Assurance Ledger** | booking flow (book → checkout → confirmed) | A receipt-like "Your booking" ledger with dotted leaders and a perforation. Lines fill in one by one and each new line gets a green pen-stroke. On desktop it is a sticky right column; on mobile it is a bottom sheet opened from the CTA bar. Inputs with `data-sets="key:value"` update `[data-bind=key]`. |
| **Slot hold** | book-slot → checkout | A 10-minute countdown that carries over between pages via `sessionStorage`, with low, expired and "hold again" states. |
| **Stamped seal** | booking-confirmed | A slow stamp-press animation with an ink ring. |
| **Milestone journey** | track, booking-confirmed, inspections, index | A vertical timeline whose rail draws itself, with timestamps in the margin. Each milestone shows the WhatsApp or push message that was sent. |
| **Dossier report** | report | Roman-numeral sections, a top-down paint-depth car diagram, score ring, gauges, photo evidence, inspector signature (drawn on screen) and a fair-price band. |
| **Concierge card** | track | The technician, with credentials and stats, and Call / WhatsApp / Chat buttons. |

## Tracking: milestone-based, no live sync (client decision)
There is no live GPS, map, ETA countdown, live check counter or streaming findings. `track.html` shows Booked → Assigned → Arriving today (9:00–9:30 AM) → In progress (started 9:31 AM, with calm copy and a static "What we check" explainer) → Report ready (1:18 PM).

The page has a clearly labelled **prototype state switch**, "Preview state: In progress · Report ready". It defaults to In progress. Switching to Report ready shows the end reveal: 89/100, Gold, the verdict, the ₹54–58 L fair-price band and **View full report**. The switch is driven by `[data-state-set]` and `[data-state-show]`, and the chosen state is remembered in `sessionStorage`.

## Files
`styles.css` — tokens first, then base, layout, shell, components, page sections, motion and page blocks · `app.js` — sprite, shell injection (`data-shell="site|app|flow"`), interactions · 19 pages: index, home, browse, vehicle, book, book-car, book-location, book-slot, checkout, booking-confirmed, track, inspections, report, sell, notifications, support, profile, suresh-drives, partners.

## Tokens (mirror in Flutter)
| Token | Value | Use |
|---|---|---|
| `--red` / `--red-press` / `--red-tint` | #E61E2A / #B01E23 / #F4B4B8 | Primary actions; red text on light uses `--red-press`; disabled |
| `--green` / `--green-press` / `--green-tint` / `--green-wash` | #8CC63F / #6FA32F / #CDE7A8 / #F1FAE8 | Seals, rings, milestone rail, verified surfaces |
| `--green-ink` / `--green-ink-2` | #3E6B1F / #4F7F23 | Green text on light (AA) |
| `--paper` / `--paper-2` / `--paper-3` / `--card` | #FAF8F4 / #F3EFE7 / #EAE4D8 / #FFFEFB | Page background, sunk surfaces, tracks, cards |
| `--ink` / `--ink-2` / `--ink-3` / `--ink-4` | #141414 / #2A2724 / #5E574E / #8C8478 | Headings / body / secondary / decorative |
| `--rule` / `--rule-2` | #E4DED3 / #D6CDBE | Hairlines |
| `--night` / `--night-2` / `--night-ink` / `--night-muted` | #121212 / #1B1A18 / #F3EFE7 / #ABA498 | Dark contrast sections |
| `--amber`, `--error` | #8A5300, #B42318 | Warnings and errors (never brand colours) |
| Tiers | Platinum #38404A · Gold #7A5A12 · Silver #555B61 | Tier badges (diamond marker + gradient) |
| `--serif` / `--sans` | Newsreader / Manrope | Display / UI |
| Type scale | hero clamp(2.6–6rem) · h1 clamp(2–3.1rem) · h2 clamp(1.6–2.4rem) · body 1rem | `clamp()` everywhere |
| Radius | 4 · 8 · 12 · 18 · 28 · pill | Cards use 18 |
| Spacing | 4-pt scale: 4, 8, 12, 16, 20, 24, 32, 40, 56, 72, 96 | |
| Motion | ease `cubic-bezier(.22,1,.36,1)` · press 120ms scale(.97) · UI 200–240ms · marketing 560ms | `transform`/`opacity` only; respects reduced motion |

## Accessibility & robustness
- Every page has one `h1` and landmarks, plus a skip link.
- Focus is visible on every interactive element, and touch targets are at least 44px.
- Every status shows an icon and text, never colour alone. Toasts and the hold timer use `aria-live`.
- Pages render their full content without JavaScript; the shell and enhancements are added on top.
