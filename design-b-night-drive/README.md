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
`styles.css` holds the design tokens, then base, components, pages and motion. `app.js` holds the icon sprite, shell injection (`data-shell="app|site|flow"`, `data-page`, `data-title`, `data-back`, `data-step`) and the interactions. There are 21 pages (the 19 from the brief plus `report-gle.html` and `report-pdi.html`), each with real HTML content.

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
- **Desktop:** a frosted top nav with the SDCertified lock-up and the “by Suresh Drives” endorsement, plus a floating “Help” button that offers Call us, WhatsApp us and Request a callback.
- Site pages (`index`, `suresh-drives`, `partners`) use a transparent marketing header that turns frosted on scroll. On mobile they get a menu drawer.

## Round 2 (persona validation fixes)
Validators found B impressive but cold. This round keeps the dark cinematic look and the gauges, and makes the product warmer, plainer and more accessible.

- **Tone & legibility:**
  - Plain language replaces telemetry jargon (no “dossier”, “SYS ONLINE” or raw DTC strings).
  - Labels are sentence-case sans at 12–13px. JetBrains Mono is only used for numbers, prices, refs and times.
  - Body text is 16px with line-height 1.6 and weight 430. No text is below 12px, diagrams included.
  - The Suresh Drives logo in the nav is 34px tall (44px on desktop).
- **One booking state:**
  - `sessionStorage['sd_booking']` holds service, car, tier, registration, location/dealership, contacts, representative and slot. Every `[data-bk]` summary, price and CTA reads from it.
  - There are no `method="get"` forms.
  - Models are filtered by brand, mass-market brands are included and years go up to 2026.
- **New Car PDI branch:**
  - `book.html?service=pdi` preselects it.
  - Step 2 is “Your new car”, with “Not registered yet” on by default and an optional VIN.
  - Step 3 is a dealership picker with the sales advisor and the handover time.
  - Step 4 recommends a session that ends at least 1 hour before handover.
  - Flat price: ₹3,999 + ₹719.82 GST + rounding ₹0.18 = **₹4,719**.
- **Checkout:**
  - The rounding line reads +₹0.18.
  - One pay-by-link rule: the slot is held for 2 hours.
  - The consent box starts unticked and is required.
  - International cards are accepted, with numeric `inputmode` and `autocomplete` on card fields and a 3–4 digit CVV.
  - Errors appear inline under the field (icon + text, `aria-invalid`, `aria-describedby`).
  - A mobile booking-summary bottom sheet opens from the sticky bar.
- **Remote & family:**
  - Every phone field has a country-code picker and a “Reachable on WhatsApp” check.
  - The “Who’ll be at the car?” block includes an optional representative.
  - Times are labelled IST. A local-time option is available in profile and notifications.
  - “Share with family” is revocable and expires after 30 days.
  - The seller-share scope uses the same copy everywhere.
  - An “Arrived 9:24 AM” photo note gives proof of visit.
  - Call/WhatsApp buttons have text labels at every width, and a labelled “Call us” appears on every mobile screen.
  - The language switch shows **EN · മലയാളം**.
- **Self-serve:**
  - Cancel and reschedule open bottom sheets on the confirmed booking. Cancel shows the exact refund under the policy.
  - Notification preferences now include “In progress”, the recipient for each channel and quiet hours.
- **Reports:**
  - New `report-gle.html` (SDR-24817, 89/100) and `report-pdi.html` (i7, 129/132).
  - Every report ends with a buyer section: “Should I buy it?”, “What we couldn’t test”, a shareable negotiation note and “What’s this?” explainers.
  - Designed evidence cards replace fake close-ups.
- **Facts:**
  - Invented history, hashes and coordinates are removed. The domain is now sdcertifiedcars.com.
  - Listing IDs SD-2401…2416 are unified, and the owner previously named “Suresh R.” is now “Rajesh R.”.
  - The classic car is correctly described as a Hindustan Ambassador.
  - Partner terms are tagged “Indicative” and dashboard numbers “Sample data”. Dealer pricing and a 4-step onboarding are added.
- **SD Assure removed** (client decision): its promo cards, checkout line, report action, footer link, `suresh-drives.html` section and the warranty-eligibility tier claims are gone. The Platinum tier now reads “OEM warranty if still valid”.
- **Accessibility floor:**
  - Small buttons, chips and segments are at least 44px tall, and pills use `min-height`.
  - `safe-area-inset-top` is applied on fixed headers.
  - Animations use transform/opacity only (UI ≤ 300ms, reveals ≤ 600ms), and reduced motion clears delays.
  - Slot availability is shown as text (“Open”, “2 left”, “Full”) with neutral or amber patterns, never green.
- **Sell page:**
  - Fields start empty.
  - A “What happens to my car?” block is added.
  - The example listing is a modest car (Volvo S60, ₹42 L).
  - “Certify by phone — pay when the technician visits”.

## Round 3 — real help channels only (client decision)
There is no chatbot and no in-app chat.
- The support chat thread, the technician card’s Chat button and every message box are removed.
- The “Anjana S.” guide persona is retired; guidance copy now speaks as “we / Suresh Drives”.
- Every help entry point is a real channel:
  - **Call us** (+91 8330 881 213)
  - **WhatsApp us** (+91 98954 41213, wa.me)
  - **Request a callback** — a sheet with a country-code phone field and an IST time window, confirmed by a toast
- The floating button is now **Help**, offering those three options.
- **Ask an expert** opens the callback sheet with the report reference prefilled (e.g. “Report SDR-24817”).

## Theme switch
A labelled **Dark · Light** switch sits in the desktop nav, the site drawer and Profile → Appearance. It links to the same page in `../design-b-night-drive-light/` (Night Drive Light · Daylight Cockpit).

## Persona fixes (round 3)
- Home gains a “Taking delivery of a new car?” tile that links to the PDI flow.
- `report-pdi` now uses SDB-22914 / SDR-22914 and adds a breakdown of the 132 checks, “Book another PDI” and a breadcrumb. `report-gle` gets a breadcrumb.
- At checkout, agreeing to the cancellation policy is required and WhatsApp updates are optional.
- On track, “Change contact” opens an edit sheet. Profile has an edit sheet, and the invoice numbering order is fixed.
- On the PDI path, the share copy refers to “your sales advisor”.
- Country codes show their names. Dubai times appear next to IST when a representative or a +971 number is set.
- Small labels are now at least 13px.
- Unsupported listing facts are removed. Partner claims are tagged “Indicative”.
- Sell explains that buyer requests are relayed through the app.
