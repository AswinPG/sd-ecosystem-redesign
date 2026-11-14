# Design C — "Concierge · Guided by Suresh Drives"

Warm, airy and deeply reassuring: the version of the SDCertified × Suresh Drives ecosystem where **someone is always holding your hand**. Light canvas, pure white cards, large radii, soft layered shadows and a whisper of brand aura (red on SDCertified surfaces, green on Suresh Drives / inspection surfaces).

Open `index.html` by double-clicking — everything works from `file://` (no server, no build, Google Fonts only).

## Signature UX patterns

| Pattern | Where | What it does |
|---|---|---|
| **The Guide — Meera** | booking steps, home, track, report, support, inspections | A named Suresh Drives guide (initials "M", green online ring) explains the current step and what happens next in a chat-like bubble, with quick-reply chips. Support is a real chat thread with her. |
| **Question-led booking** | `book*.html`, `checkout.html` | Each step's headline is a question ("Which car are we inspecting?"), big selection cards, smart suggestion, a "Your booking" panel that fills as you go and an always-visible **What happens next** card. |
| **Price that explains itself** | `book-car.html` | Brand/model → pricing-matrix tier (Standard / Premium / Luxury) updates live with GST shown. |
| **Calm slot hold** | `book-slot.html` → `checkout.html` | 10-minute hold with a draining ring + mm:ss, persisted in `sessionStorage`; expired state offers a next action. |
| **Milestone tracking (no live sync)** | `track.html`, `home.html` | Booked → Assigned → Arriving today (9:00–9:30) → In progress (9:31, calm static copy + "What we check") → Report ready (1:18 PM). Every milestone shows the WhatsApp/push that was sent; delivery log with states. A labelled **prototype state switch** reveals the Report-ready end state (89/100, Gold, verdict, ₹54–58 L fair band). |
| **Live Activity / Dynamic Island mock** | `home.html`, `index.html`, `booking-confirmed.html` | iOS-style lock-screen and island showing *milestone* status (never a live counter). |
| **Stories rings** | `home.html` | Updates and tips as story rings. |
| **Wallet stack** | `inspections.html` | Apple-Wallet-like passes for each booking/report; tap to bring forward, "Spread cards" to fan out. |
| **Friendly-premium report** | `report.html` | Plain-language verdict first, traffic-light + icon section cards, top-down car paint diagram, gauges, photo evidence, fair-price band, "Ask Meera about this report". |
| **Floating UI fragments** | marketing pages | Notification cards, WhatsApp bubbles and score chips layered over photography, gently floating. |

## Files

`styles.css` (tokens → base → layout → type → shell → components → signature patterns → pages → motion), `app.js` (icon sprite, shell injection by `data-page` / `data-shell` = `site | app | flow`, interactions), 19 pages, this README.

Shell attributes on `<body>`: `data-page`, `data-shell`, `data-title` (mobile top bar), `data-back`, `data-step` (flow: 1–5 / done), `data-aura` (red | green | dual), `data-brand="sd"` (Suresh Drives lock-up), `data-tabbar="off"`, `data-fab="off"`.

## Tokens (mirror these in Flutter)

| Token | Value | Use |
|---|---|---|
| `--red` | `#E61E2A` | SDCertified primary actions (Book, Buy, Pay, Continue) |
| `--red-press` | `#B01E23` | Hover / pressed, red text on light |
| `--red-tint` | `#F4B4B8` | Disabled primary |
| `--red-soft` | `#FDEEEF` | Soft red surface / focus halo |
| `--green` | `#8CC63F` | Verified fills, rings, dots, seals (never text on light) |
| `--green-press` | `#6FA32F` | Pressed / icon green |
| `--green-tint` | `#CDE7A8` | Borders, quick-reply chips |
| `--green-bg` | `#F1FAE8` | Success surface |
| `--green-text` | `#3E6B1F` | Green text on light (AA) |
| `--canvas` | `#F6F7F9` | App background |
| `--card` | `#FFFFFF` | Cards |
| `--sunk` | `#F0F2F5` | Inset surfaces |
| `--line` | `#E4E7EC` | Borders |
| `--ink` / `--ink-2` / `--ink-3` | `#0F1217` / `#2F3540` / `#59616E` | Headlines / body / secondary |
| `--amber` / `--amber-fill` / `--amber-bg` | `#9A5B00` / `#F5A524` / `#FFF5E5` | Warnings, "worth knowing" |
| `--error` / `--error-bg` | `#C4161C` / `#FDECEC` | Errors (always with icon + text) |
| Tiers | Platinum `#4A5868`, Gold `#8A6412`, Silver `#565E69` on soft metallic gradients | Certification badges |
| Radii | 10 / 14 / 20 / 24 / 28 / 36 / pill | xs → 2xl |
| Shadows | `--sh-1` … `--sh-4`, `--sh-red`, `--sh-green` | Soft, layered |
| Type | Plus Jakarta Sans 400–800 (UI + display, tight tracking), Instrument Serif italic (emotional words) | `clamp()` scale: display 2.6–5.2rem, h1 2–3.25rem, h2 1.6–2.4rem |
| Motion | enter `cubic-bezier(.22,1,.36,1)`, spring `cubic-bezier(.34,1.56,.64,1)` (chips/toggles only), press 120ms scale(.97), standard 180–260ms | `prefers-reduced-motion` respected |

## Notes

- Tracking is milestone-based by client decision: no GPS, ETA countdown, live check counter or streaming findings anywhere.
- No real logos other than the two brand assets; partner marks and store badges are typographic/generic.
- Avatars are initials; maps are illustrated SVG; all images are local `../assets/`.
