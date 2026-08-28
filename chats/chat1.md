# Argentoscientific.com UI redesign

_Started 2026-08-13 19:49 UTC_

---

## User

Make UI mockups for a revised argentoscientific.com homepage. follow the guidance from claude in the attached files.

## Assistant



## Assistant

I'll read the attached documents first.

_[tool: read_file]_

_[tool: run_script]_

_[tool: list_files]_

_[tool: copy_files]_

_[tool: run_script]_

_[tool: read_file]_

_[tool: ask_user]_

I read all three docs — personas, findings, and the Phase 1–2 recommendations. Waiting on your answers on scope, viewport, and social-proof treatment before I build.

## User

Answered — scope: Homepage only — 3 directions to choose from; viewport: Desktop only; social_proof: Greyed placeholder logo row ("Logo — pending approval"); hero_copy: "Stop packing columns. Get back to the real science."; imagery: Yes, I can drop images in later — use placeholders; interactivity: Nav dropdowns, Spec table (live HTML), Quote form, Sticky CTA on scroll; tone: Warmer, human

## Assistant

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

_[tool: copy_starter_component]_

_[tool: dc_write]_

_[tool: grep]_

_[tool: show_html]_

_[tool: ready_for_verification]_

Three homepage directions, all Broadsheet, desktop 1440×920 scrolling frames on a pan/zoom canvas:

- **1a The front page** — thick/thin rule head with dateline rail, misregistered-plate headline, editorial three-column product intro, swap program with the six spec facts, full HTML bed-height table.
- **1b Two doors** — persona routing above the fold (Columns / Solvent Safety panels, own CTAs), proof band, swap "how it works", full product range incl. VertiRack™ and SeptaCaps™, dual-line quote form.
- **1c The spec sheet** — plate numerals (1 wk / 30+ / 3–50 mm), a working column-volume calculator above the fold, full table, resin coverage grid, Solvent Sentry™ in plain language.

Working: nav dropdowns, live spec table, volume calculator, quote forms (submit → confirmation), sticky bottom CTA. Photo slots are drag-and-drop — drop images in and they print as CMYK plates. Tweaks panel switches social proof (logo row / anonymized claim / both), pricing framing, and the sticky bar. Logo rows are deliberately greyed "pending approval" per the Adrian blocker.

## User

Found issues — fixing…

## Assistant

_[tool: run_script]_

_[tool: ready_for_verification]_

Placeholder captions are legible now — the separation filter is off while the slots are empty, and 1a's caption sits below the figure instead of under the dot screen. Dropped photos still get the newsprint dot treatment; say the word and I'll re-enable the full four-plate separation once real images are in.

