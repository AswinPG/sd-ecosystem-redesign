# Design A — "Apex · Motorsport Precision"

SDCertified × Suresh Drives, one ecosystem. Open `index.html` (works from `file://`).

## Concept

The design takes its form from the Suresh Drives wordmark: heavy, wide, **italic** letters circled by a **green elliptical orbit**. Everything leans forward. Headlines and numbers are set in Saira at an expanded width (112–125) and italic, buttons and plates are skewed −10°, cards have a ~10° corner cut, and progress is drawn as red **speed stripes**. Pages alternate between a bright white / light-grey canvas and deep **carbon** bands. **SD Red** is the colour for actions; **Suresh Green** only means *checked / verified*. The chequered pattern is saved for the two finish moments: *booking confirmed* and *report ready*.

It is deliberately different from the other concepts:
- Heritage (rejected): serif, ivory, quiet.
- Night Drive: dark-only, gauge telemetry.
- Concierge: soft, rounded, persona-led.

Apex is light and dark split-tone, built on italic type and diagonals, and uses the motorsport-team-site vocabulary (race numbers, grid, laps, sectors) without being cartoonish.

## Signature patterns

| Pattern | Where | Notes |
|---|---|---|
| **The Orbit** | index, track, report-gle, suresh-drives | A top-down car silhouette (`#car-top` sprite symbol) inside an elliptical green orbit with six zone markers: Exterior & paint · Engine room · OBD · Under the car · Interior & electricals · Road test. While the inspection is in progress it is a static explainer only (no live progress). When the report is ready the markers show the zone scores. The orbit line draws in once, in 600 ms or less. |
| **Race-number score** | track, reports, vehicle, cards | A big italic numeral on a skewed carbon plate with a red underline. A green orbit arc (`pathLength=100`, `stroke-dasharray: score 100`) shows the score out of 100. The small `.rn` badge is used on cards. |
| **Grid walk** | booking steps 1–5 | A slanted, numbered strip: 01 SERVICE · 02 CAR · 03 LOCATION · 04 SLOT · 05 PAY. A red speed stripe fills from the previous step's position, and completed steps carry a green tick plate. |
| **Race sheet** | booking steps | The "Your booking" summary on a carbon panel. It is a sticky column on desktop and a bottom sheet on mobile (opened from the sticky CTA bar). Every value comes from the single booking state. |
| **Lap timeline** | track, booking-confirmed | Sectors S1–S5, horizontal on desktop and vertical on mobile. Each sector has an IST timestamp and the WhatsApp or push message that went out. Report ready is the chequered sector. |
| **Prototype state switch** | track | "Preview state: In progress · Report ready". Report ready gives the chequered reveal: 89 · Gold, the verdict, the fair-price band and "View full report", which opens `report-gle.html`. |
| **Evidence cards** | reports | Designed readouts (paint gauge on a mini panel, tyre DOT/tread, scanner screen, odometer) in place of fake close-up photos, each marked "Photo · technician upload on file". |
| **Diagonal heroes** | index, sell, suresh-drives, partners | A full-bleed photo cut by a carbon panel at about 10°, with giant italic type running over the image edge. |

## Shell (`app.js`)

`<body data-page data-shell="site|app|flow" [data-back] [data-step="1–5|done"] [data-theme="green"]>`

`app.js` injects the following:
- the icon sprite;
- a desktop **utility strip** (Call us +91 8330 881 213 · WhatsApp us · Request a callback · EN · മലയാളം);
- the header:
  - site: carbon;
  - app: white, with bell 3 and avatar AM;
  - flow: back button, labelled Call us, and the grid walk;
- the mobile **tab bar**: Home · Buy · red slanted **Book** · Inspections (green dot) · Profile;
- the mobile **CTA bar** on flow pages: summary toggle, Call us, and a clone of the page's `[data-cta-main]`;
- the footer with the endorsement, the callback sheet and the toast region.

A **labelled "Call us"** is visible on every mobile screen. There is no chat and no persona anywhere. Help is Call us, WhatsApp us and Request a callback, and guidance lives in the "What happens next" and "Good to know" copy.

**Booking state:** one `sd_booking` object in `sessionStorage`, wrapped in try/catch. It holds service, brand, model, tier, registration (or "not registered"), location, contacts, representative, date and session. Every `[data-bk="…"]` reads from it. Without stored state the defaults apply: GLE · Luxury · ₹7,079.

| Path | Price | Rounding |
|---|---|---|
| Used car, Luxury (default) | ₹5,999 + ₹1,079.82 = **₹7,079** | +₹0.18 |
| New Car PDI | ₹3,999 + ₹719.82 = **₹4,719** | +₹0.18 |

- **Slot hold:** 10:00 countdown that survives the move from slot to checkout. Pay-by-link holds the slot for **2 hours**.
- **PDI branch:** `book.html?service=pdi`. The car step is "Your new car" with "Not registered yet" ON. The location step is a dealership picker with the handover time. The slot step recommends sessions that finish at least 1 h before handover.

## Tokens (mirror these in Blazor / Flutter)

| Token | Value | Use |
|---|---|---|
| `--white` | `#FFFFFF` | Canvas |
| `--mist` | `#F2F3F5` | App canvas, alternate bands |
| `--mist-2` | `#E7E9ED` | Pressed, tracks, zebra |
| `--line` | `#D9DCE1` | Hairlines (borders only, never text) |
| `--field-line` | `#7D828C` | Form borders (≥3:1) |
| `--carbon` | `#0B0B0C` | Carbon bands, plates, primary dark |
| `--carbon-2` / `-3` | `#151619` / `#202227` | Raised and pressed on carbon |
| `--ink` / `-2` / `-3` | `#0B0B0C` / `#33363D` / `#575C66` | Text on light (≥6:1) |
| `--on-dark` / `-2` / `-3` | `#FFFFFF` / `#D2D5DB` / `#A3A8B1` | Text on carbon (≥8:1) |
| `--red` | `#E61E2A` | SDCertified actions: Book, Pay, Continue, active states, stripes |
| `--red-press` | `#B01E23` | Hover/pressed, red text on white, errors (with icon) |
| `--red-tint` | `#F4B4B8` | Disabled |
| `--red-on-dark` | `#FF4D57` | Red text on carbon |
| `--green` | `#8CC63F` | Verified: orbits, seals, ticks, text on carbon |
| `--green-ink` | `#3E6B1F` | Green text on light |
| `--green-wash` | `#F1FAE8` | Verified chips |
| `--amber` / `--amber-ink` | `#F2A007` / `#8A4B00` | Needs attention: repaints, advisories, "2 left" |
| `--f-display` | Saira (variable `wdth` 100–125, `wght` 500–900, italic) | Headlines, numbers, plates |
| `--f-ui` | Inter 400–700 | Body and UI, tabular numerals |
| `--w-display` / `--w-head` | `122%` / `112%` | Saira width axis |
| `--fs-hero` … `--fs-tiny` | `clamp(2.6rem…7.25rem)` … `0.75rem` | Type scale. The floor is 12 px |
| `--slant` | `-10deg` | Skew for buttons, plates, chips, tabs |
| `--cut` / `--cut-lg` | `16px` / `32px` | Diagonal corner cut on cards and tiles |
| `--ease` | `cubic-bezier(.22,1,.36,1)` | All motion |
| `--t-press` / `--t` / `--t-enter` | `120` / `220` / `380 ms` | Press scale .97, UI, enter (translateX + skew settle) |
| `--bar-h` / `--tab-h` | `60px` / `68px` | Mobile bars, plus `env(safe-area-inset-*)` |

**Motion:**
- Elements enter with a short translateX and skew settle (380 ms or less).
- Speed-stripe fills use `scaleX`. The orbit and score arc draw once, in 600 ms or less.
- Animations use `transform` and `opacity` only, with transition properties always listed. The only exception is the one-time orbit draw, which uses `stroke-dashoffset`.
- `prefers-reduced-motion` turns off all animations, loops and delays.
- Reveal classes are added by JS, so content stays visible without JS.

## Pages (21)

`index` · `home` · `browse` · `vehicle` · `book` → `book-car` → `book-location` → `book-slot` → `checkout` → `booking-confirmed` · `track` · `inspections` · `report` (X4 M, SDR-18842) · `report-gle` (GLE, SDR-24817, end reveal) · `report-pdi` (BMW i7 PDI) · `sell` · `notifications` · `support` · `profile` · `suresh-drives` (green-led) · `partners`

## Round-2 fix list coverage (VALIDATION §1–9)

- **One booking state:** a single state object for the whole flow. Models are filtered by brand, including mass-market brands. Years go up to 2026. The flow is "5 short steps · about 3 minutes". The Creta example is shown wherever prices appear.
- **PDI branch:** the full branch described under the booking state above, plus "If something goes wrong" panels.
- **Checkout:**
  - Rounding is +₹0.18. The consent box starts unticked and shows an inline error.
  - Card fields have input modes and autocomplete, CVV accepts 3–4 digits, and the forex copy is shown.
  - Pay by link holds the slot for 2 hours.
- **Phone fields:** country-code pickers and "Reachable on WhatsApp" everywhere.
- **Booking location step:**
  - A "Who'll be at the car?" block, with a representative, relation chips and what to send them.
  - The seller-share scope is identical everywhere.
- **Times and family:**
  - IST labels throughout.
  - "Also show my local time" in profile and notifications.
  - Share with family: milestones only, or milestones + report; revocable; expires after 30 days.
- **Tracking:**
  - The arrival milestone carries a designed proof-of-visit card.
  - The call button reads "Call Suresh Drives (connects you to Nikhil)".
  - The log shows WhatsApp, then the SMS fallback, with push in parallel.
- **Cancel and reschedule:** cancel is a bottom sheet with the exact refund (₹7,079 full, or ₹3,539.50 within 24 h) and a confirm step. Reschedule is a sheet listing the next free sessions.
- **Reports:**
  - `report-gle` and `report-pdi` use the given data.
  - Every report ends with a buyer section: "Should I buy it?", "What we couldn't test", and a negotiation note to share on WhatsApp.
  - "What's this?" explainers cover OBD, DTC and µm.
  - Evidence cards replace fake close-ups.
- **Facts:**
  - Only facts that can be verified, and the Ambassador caption is corrected.
  - The domain is sdcertifiedcars.com and listing IDs are unified.
  - Partner terms are tagged "Indicative" and the dashboard is tagged "Sample data".
- **Readability and access:**
  - Text is 12 px or larger and meets AA contrast. Focus is visible and touch targets are 44 px or larger.
  - Slot availability is shown as text plus hatching, never green.
  - EN · മലയാളം is in the header and top bar on every page.
- **Sell page:** "What happens to my car", empty fields, the Volvo S60 preview and "Certify by phone — pay when the technician visits".
