# Godwit Cafe — Website

A premium, 3D, scroll-driven marketing site for **Godwit Cafe**, a pure-vegetarian global-fusion
café brand with outlets in **Indore**, **Raipur**, and **Nagpur**. Built around a cinematic 3D hero,
per-city themed landing pages, and live Google reviews.

> _"Food for the modern nomad."_

Made by **AvlysAI**.

---

## Tech stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** with a per-route CSS-variable theme system
- **react-three-fiber v9** + **drei** + **postprocessing** (the 3D hero)
- **GSAP + ScrollTrigger** (2D scroll reveals) · **Lenis** (smooth scroll)
- **Motion** (Framer Motion) for UI / page transitions
- **Google Places API (New)** + **Google Maps Embed API**
- Deploy target: **Vercel**

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in keys (see below)
npm run dev                        # http://localhost:3000
```

The site renders fully **without** any API keys — outlet pages fall back to bundled snapshot data
and themed placeholders until you provide the real values below.

## Routes

| Route      | Purpose                                            |
| ---------- | -------------------------------------------------- |
| `/`        | Brand hub — 3D hero, story, location selector      |
| `/indore`  | Indore outlet (flagship / origin)                  |
| `/raipur`  | Raipur outlet (explorer's table)                   |
| `/nagpur`  | Nagpur outlet (new arrival)                        |
| `/menu`    | Shared menu, filterable by outlet                  |

---

## ✅ TODO — things the owner must provide

These are wired with placeholders/fallbacks so the build runs today. Replace as they arrive.

### Keys & IDs (`.env.local`)
- [ ] `GOOGLE_PLACES_API_KEY` — server-only, "Places API (New)" enabled
- [ ] `NEXT_PUBLIC_MAPS_EMBED_KEY` — Maps Embed API, restricted to your domain
- [ ] `NEXT_PUBLIC_SITE_URL` — production domain (for OG/metadata)
- [ ] **Google Place IDs** for each outlet → `src/lib/outlets.ts` (`mapsPlaceId`)
      _Resolve via a Find Place request from the outlet name + address, or from the
      Google Maps URL / Place ID Finder._

### Confirmed business data (`src/lib/outlets.ts`, marked `// TODO: confirm`)
- [ ] Exact **addresses** (some outlets have conflicting / multiple listings)
- [ ] Exact **opening hours** per outlet
- [ ] **Phone** for Raipur (currently unknown)
- [ ] Exact **lat/lng** per outlet (used for map + LocalBusiness JSON-LD)

### Brand & media assets
- [ ] Brand **logo** (drop into `/public/brand/`, then wire into `BirdMark`/nav)
- [ ] Licensed **food photography** → set `Dish.photo.src` / `gallery[].src` in `src/lib/outlets.ts`
      and drop files under `/public/images/`. Until then themed placeholders render.
- [ ] Per-outlet **OG images** → `/public/og/{home,indore,raipur,nagpur}.jpg`
- [ ] Optional hero **`.glb`** model → `/public/models/donut.glb` (procedural donut renders otherwise)

### Links
- [ ] Real **order/reserve URLs** per outlet (Swiggy Dineout, EazyDiner, Zomato, District,
      magicpin) → `orderLinks` in `src/lib/outlets.ts` (currently `#`)
- [ ] **Instagram** embed approach for `@godwitcafe` (feed/reels)

---

## Project structure

```
src/
  app/            routes, layout, globals.css (theme tokens), api/reviews
  components/     three/ · sections/ · outlet/ · reviews/ · ui/ · nav/ · providers/
  lib/            outlets.ts (content) · themes.ts (colors) · places.ts · seo.ts · motion.ts
  data/           reviews-fallback/  (clearly-marked fallback review JSON)
  hooks/          prefers-reduced-motion · webgl-support · pointer-drag
public/           images/ · models/ · og/ · brand/
```

## Reviews API

- Outlet pages fetch live data server-side (`getPlaceData`, ISR 1h) — the key never reaches the
  client (verified: `GOOGLE_PLACES_API_KEY` is absent from the client bundle).
- A proxy endpoint is also available for client use: `GET /api/reviews/[outlet]` →
  `{ rating, totalRatings, reviews, source: "live" | "fallback", ... }`.

## Performance & accessibility

- **3D is lazy** (`dynamic(ssr:false)`, Suspense), pixel ratio clamped to `[1,2]`, postprocessing
  (bloom/DOF) only on desktop, `AdaptiveDpr` sheds quality under load.
- Outlet pages are **prerendered static + ISR**; the home/menu are static. Fonts use `display:swap`.
- **No-WebGL / reduced-motion** → static SVG hero; all motion respects `prefers-reduced-motion`.
- **WCAG AA**: accent text uses an AA-safe shade (`--accent`) while fills keep the vivid
  `--accent-bright`; skip-link, focus-visible rings, alt text, labelled controls.
- Run Lighthouse against the Vercel preview for the live mobile score (target ≥ 85).

## Deploy (Vercel)

1. Import the repo into Vercel.
2. Add env vars (`GOOGLE_PLACES_API_KEY`, `NEXT_PUBLIC_MAPS_EMBED_KEY`, `NEXT_PUBLIC_SITE_URL`).
3. Deploy — ISR + route handlers work out of the box.

## Notes

- The Google Places API returns a **maximum of 5 reviews** per place — the "Read all on Google"
  link covers the rest. This is a Google platform limit, not a bug.
- The 3D hero falls back to a **static image** when WebGL is unavailable or the visitor prefers
  reduced motion.
