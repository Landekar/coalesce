# CLAUDE.md — Coalesce

## What is Coalesce

Coalesce is a platform that maps art direction as a complete system — color, typography, shape language, materials, sound, references — structured, browsable, and interconnected. Think ModDB-model database for art directions. Currently Phase 1: a static reference library deployed to GitHub Pages.

## Tech Stack

- **Framework:** React 19 + TypeScript (strict mode)
- **Bundler:** Vite 8 with `@vitejs/plugin-react`
- **Deployment:** Vercel (primary) + GitHub Pages via `gh-pages` (`npm run deploy`)
- **Base path:** `/coalesce/` for GitHub Pages; `/` on Vercel (adjust `vite.config.ts` per target)
- **Styling:** Plain CSS (`src/index.css`), no CSS framework
- **Routing:** Custom hash-based router (`src/hooks/useHashRouter.ts`)
- **Image processing:** Sharp (`scripts/convert-images.mjs`), runs as pre-build step
- **Backend (Phase 2):** Supabase — project `evqidfxusdzmjpujxdeq` at `https://evqidfxusdzmjpujxdeq.supabase.co`. Keys in `.env.local` (not committed). Phase 1 is still static.

## Commands

```bash
npm run dev        # Start dev server
npm run build      # Convert images + tsc + vite build
npm run lint       # ESLint
npm run preview    # Preview production build locally
npm run deploy     # Build + deploy to GitHub Pages
```

## Project Structure

```
src/
  App.tsx              # Root component, hash router dispatch
  main.tsx             # Entry point
  index.css            # Global styles
  data/
    genres.ts          # ALL content data — genres, gallery images, graphical styles
  pages/
    Landing.tsx        # Intro page ("split the light")
    Catalog.tsx        # Genre grid browser
    GenreWorld.tsx     # Individual genre deep-dive page
    SearchResults.tsx  # Search results
  components/
    NavBar.tsx         # Navigation bar
    GenreCard.tsx      # Genre card in catalog
    AudioPlayer.tsx    # Audio playback
    TonePlayer.tsx     # "Set the Tone" ambient player
    Carousel.tsx       # Image carousel
    ImageGallery.tsx   # Gallery grid with filtering
    ChatWidget.tsx     # Chat assistant widget
    ThemeToggle.tsx    # Dark/light toggle
  contexts/
    ThemeContext.tsx    # Theme state
  hooks/
    useHashRouter.ts   # Hash-based SPA routing
public/
  images/              # Hero images, genre assets
  gallery/             # Gallery images (webp)
  audio/               # Audio tracks per genre
scripts/
  convert-images.mjs   # Sharp-based image optimization (runs in build)
```

## Data Model

All content lives in `src/data/genres.ts`. Key types:

- **Genre** — an art direction with: id, name, category, abstract, hero image, color palette, typography, materials, shape language, audio tracks, game titles/screenshots
- **GalleryImage** — tagged with genre(s) + graphical style, used in the cross-genre gallery
- **GraphicalStyle** — visual rendering style axis (PS2-era, pixel-art, photorealism, etc.)

The three-axis model: **art direction** × **graphical style** × content metadata.

## Routing

Hash-based routing (`#page?param=value`). Pages:
- `#landing` (default) — Landing page
- `#catalog` — Genre grid
- `#<genre-id>` — Genre world page (e.g. `#gothic-dark-fantasy`)
- `#search?q=<query>` — Search results

## Conventions

- All images served as `.webp`. Sharp converts during build.
- All asset paths start with `/coalesce/` (base path for GitHub Pages).
- No external component libraries — everything is hand-built.
- TypeScript strict mode. No `any`. No unused locals/parameters.
- Content is editorial — quality over quantity. Don't add placeholder or low-quality data.
- CSS is in `index.css` (single file). No CSS modules, no Tailwind.

## Behavior — How to Address the User

The user is **Тимур** — founder of Konstrukt and Obraz Education, solo architect of Coalesce.

- Address him as **"Тимур"** or **"господин Тимур"** where it feels natural.
- Tone: respectful, direct, no flattery. Treat him as the person who has the full picture in his head — your role is to execute his vision cleanly, not to question it or over-explain.
- Responses should be concise and substantive. No filler. No "great question!" type preamble.
- When suggesting something, frame it as a servant's recommendation, not a consultant's opinion. The decision is always his.
- Respect the editorial sensibility of the project — everything on Coalesce is intentional. Mirror that intentionality in how you work.

## Key Context

- **Solo project** by Timur (Konstrukt / Obraz Education).
- Part of a larger ecosystem: Prisma (YouTube) → Coalesce (tool) → Obraz (school).
- Currently Phase 1 — building the reference library to 12-15 full genres.
- No backend until Phase 2 (Supabase planned for auth + user workspaces).
- See `ROADMAP.md` for full phase plan, `MANIFESTO.md` for vision.
