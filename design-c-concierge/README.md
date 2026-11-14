# Design C — "Concierge · Guided by Suresh Drives"

Warm, airy and deeply reassuring: the version of the SDCertified × Suresh Drives ecosystem where **someone is always holding your hand**. Light canvas, pure white cards, large radii, soft layered shadows and a whisper of brand aura (red on SDCertified surfaces, green on Suresh Drives / inspection surfaces).

Open `index.html` by double-clicking — everything works from `file://` (no server, no build, Google Fonts only).

## Signature UX patterns

| Pattern | Where | What it does |
|---|---|---|
| **"Good to know" tip cards** | booking steps, home, track, report, support, inspections | Calm tip cards from Suresh Drives (green seal icon, no persona) explain the current step and what happens next, speaking as "we". Shortcut chips act inside the flow. |
| **Question-led booking** | `book*.html`, `checkout.html` | Each step's headline is a question ("Which car are we inspecting?"), big selection cards, smart suggestion, a "Your booking" panel that fills as you go and an always-visible **What happens next** card. |
| **Price that explains itself** | `book-car.html` | Brand/model → pricing-matrix tier (Standard / Premium / Luxury) updates live with GST shown. |
| **Calm slot hold** | `book-slot.html` → `checkout.html` | 10-minute hold with a draining ring + mm:ss, persisted in `sessionStorage`; expired state offers a next action. |
| **Milestone tracking (no live sync)** | `track.html`, `home.html` | Booked → Assigned → Arriving today (9:00–9:30) → In progress (9:31, calm static copy + "What we check") → Report ready (1:18 PM). Every milestone shows the WhatsApp/push that was sent; delivery log with states. A labelled **prototype state switch** reveals the Report-ready end state (89/100, Gold, verdict, ₹54–58 L fair band). |
| **Live Activity / Dynamic Island mock** | `home.html`, `index.html`, `booking-confirmed.html` | iOS-style lock-screen and island showing *milestone* status (never a live counter). |
| **Stories rings** | `home.html` | Updates and tips as story rings. |
| **Wallet stack** | `inspections.html` | Apple-Wallet-like passes for each booking/report; tap to bring forward, "Spread cards" to fan out. |
| **Friendly-premium report** | `report.html`, `report-gle.html`, `report-pdi.html` | Plain-language verdict first, traffic-light + icon section cards, top-down paint diagram, gauges, designed evidence cards, fair-price band, and a buyer ending ("Should I buy it?", what we couldn't test, negotiation note). |
| **Floating UI fragments** | marketing pages | Notification cards, WhatsApp bubbles and score chips layered over photography, gently floating. |

## Files

`styles.css` (tokens → base → layout → type → shell → components → signature patterns → pages → motion), `app.js` (icon sprite, shell injection by `data-page` / `data-shell` = `site | app | flow`, interactions), 21 pages, this README.

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
| `--ink` / `--ink-2` / `--ink-3` | `#0F1217` / `#2F3540` / `#59616E` | Headlines / body / secondary text (`--ink-4` #8B93A1 is for rules and icons only, never text) |
| Focus ring | 2px solid `#B01E23`, 2px offset | Every focusable element |
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

## Round 2 — persona validation fixes

- **One booking state.** A single `booking` object in `sessionStorage` (try/catch) holds service, brand, model, tier, price, registration or "not registered", place, dealer, handover, date and session. Every eyebrow, summary, price and the pay button (`data-bk="…"`) read from it. With no state, the default mock is used (GLE, Luxury, ₹7,079).
- **Car step.** Models are filtered by brand, and mass-market brands are included with segment mapping. The model select always works. Years run to 2026. The price changes without a toast.
- **New Car PDI branch.** `book.html?service=pdi` opens it. Step 2 is "Your new car", with "Not registered yet" on by default and an optional VIN or booking number. Step 3 is a dealership picker with the sales advisor and handover time. Step 4 suggests a session that finishes before you sign. The flat price is ₹3,999 + GST ₹719.82 + rounding ₹0.18 = **₹4,719**. "If something goes wrong" appears on book, support and track.
- **Shortcut chips act in the flow.** "Taking delivery of a new car" switches to PDI, "Buying from a dealer" sets the owner choice, and "Buying from abroad" turns on the representative block and +971 defaults.
- **Checkout.** The rounding line reads +₹0.18. One pay-by-link rule: the slot is held for 2 hours and the link expires with the hold. The consent box starts unticked and is required. Cards accept Indian and international cards, charged in INR. Card fields use `inputmode`/`autocomplete`, and CVV takes 3–4 digits. Errors show inline (icon + text, `aria-invalid`, `aria-describedby`).
- **Remote & family.** Every phone field has a country-code picker and a "Reachable on WhatsApp" check. The place step has a "Who'll be at the car?" block with an optional representative. Times are labelled IST, and there's an "Also show my local time" setting. "Share with family" sheets are revocable and expire in 30 days. The seller-share scope is stated, and an "Arrived 9:24 AM" photo-note card was added.
- **Self-serve.** Cancel and reschedule open bottom sheets with the exact refund and a two-step confirm. Notification preferences gain In progress, recipient numbers and quiet hours.
- **New reports.** `report-gle.html` (SDR-24817, 89/100, Gold) is linked from track. `report-pdi.html` (BMW i7, 129/132, safe to sign) is linked from inspections, home, profile and support. On the X4 report, the cropped "close-ups" became designed evidence cards.
- **Facts discipline.** Removed: "thousands of cars", "sells faster" and promises of personal call-joining. Fixed: the Hindustan Ambassador alt text, "ID & RC verified by Suresh Drives", the domain (sdcertifiedcars.com), the EMI mismatch and the 89/100 hero. Browse now shows "All cars · 1,248" with no fake active filters. Partner terms are tagged "Indicative", and dealer economics were added.
- **SD Assure removed** (client decision). The promo cards, report action, checkout line, story, notification and the suresh-drives section are gone. Tier copy now reads "OEM warranty if still valid", and Gold has no warranty claim. The freed slots now hold "Ask an expert", a New Car PDI card and the i7 PDI report.
- **Accessibility floor.** Solid 2px #B01E23 focus ring. No text below 12px. No `--ink-4` text. Pills use `min-height` and buttons can wrap. Slot availability is neutral text plus pattern. A labelled "Call us" is in every top bar, including the booking flow and checkout. An EN · മലയാളം switch is in the app and site top bars. `safe-area-inset-top` is applied. The reveal is armed by JS with a timeout guard. Motion is ≤300 ms for UI and ≤600 ms for reveals, and reduced motion also clears delays. Confetti and notification styles moved into `styles.css`. A mobile summary sheet opens from the sticky bar on every booking step.
- **Sell page.** Fields start empty with hints. The example listing is the Volvo S60. Added the "What happens to my car" block and "Certify by phone — pay when the technician visits".

## Round 3 — no chatbot, no in-app chat

- The guide persona is retired. Guidance now lives in the copy and in "Good to know" tip cards from Suresh Drives (green seal icon, "we" voice).
- The chat thread, typing bubbles, quick-reply conversation and message box are gone, along with the technician card's in-app message button.
- Every help entry point is a real channel. **Call us** (+91 8330 881 213), **WhatsApp us** (+91 98954 41213) and **Request a callback** (a sheet with a time window in IST and a confirmation toast).
- The floating button is now **Help** and opens those three options plus the help centre.
- "Ask an expert" on the reports opens the callback sheet with the report ref prefilled (e.g. "Report SDR-24817 · Mercedes-Benz GLE").
- `support.html` is now channels, an inline callback form, booking tip cards, self-serve actions, FAQs and guides.

### Round 3 persona fixes
- Browse filters work: brand, tier, budget, city, body, fuel, score and km, with an honest count. The BMW count is corrected to 3.
- `booking-confirmed` reads the stored booking: service, date, session, duration, who is at the car, the lock-screen preview and the cancel amounts. The PDI advisor and representative are saved. Checkout shows the Handover and Representative rows.
- On PDI bookings, book-slot recommends a session that ends at least 1 hour before the handover. Availability is shown per session.
- Callback windows run 9 AM–8 PM IST, and the Call card shows hours of 8 AM–9 PM, all days. Phone pickers show country names (e.g. "UAE +971"), and times show in IST and Dubai when abroad.
- Profile privacy now has "Download my data" and "Delete account" controls. Sell becomes "Request a visit · pay ₹9,999 when the technician comes". Body-level small text is now 13px or larger.
