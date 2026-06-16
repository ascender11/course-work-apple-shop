# AGENTS.md

## Project Overview

Vanilla TypeScript SPA (no React/Vue/Angular) for an Apple product shop. Uses Feature-Sliced Design (FSD) architecture. UI is in Russian. Mock backend only — no real server.

## Quick Start

```bash
pnpm install
pnpm run dev:all    # Starts Vite dev server (port 3000) + json-server (port 3001)
```

## Key Commands

| Command | Purpose |
|---------|---------|
| `pnpm run dev:all` | Full dev environment (frontend + mock API) |
| `pnpm run dev` | Vite dev server only (port 3000) |
| `pnpm run server` | json-server only (port 3001, serves `server/db.json`) |
| `pnpm run build` | TypeScript check + Vite build (`tsc && vite build`) |
| `pnpm run lint` | Biome check with auto-fix (`biome check --apply .`) |
| `pnpm run format` | Biome format (`biome format --write .`) |
| `pnpm run check` | Biome CI check (no fixes, fails on errors) |

**Run `pnpm run lint` before committing.** The build (`pnpm run build`) also runs `tsc` which catches type errors.

## Package Manager

Use **pnpm** (v11.1.2). Do not use npm or yarn.

## Linter/Formatter

**Biome** — not ESLint or Prettier. Configured in `biome.json`:
- 2-space indentation, LF line endings
- Single quotes, no semicolons, trailing commas (ES5)
- 120 char line width
- Sorted Tailwind classes enforced (`useSortedClasses: warn`)
- Unused imports/variables are warnings, not errors

## Architecture (FSD Layers)

```
src/
├── app/           # Entry point, router, global styles
├── pages/         # Route-level components (9 pages)
├── widgets/       # Composite UI blocks (header, footer, product-list)
├── features/      # User interactions (add-to-cart, auth, filter, sort, pagination)
├── entities/      # Domain models (product, user, cart)
└── shared/        # Utilities, API layer, reusable UI components, icons
```

**Import order** (enforced by Biome): `@/app` → `@/pages` → `@/widgets` → `@/features` → `@/entities` → `@/shared`.

## Path Alias

`@/` maps to `./src/` — configured in both `tsconfig.json` and `vite.config.ts`.

## API Layer

- Axios instance: `src/shared/api/axios-instance.ts`
- Base URL: `VITE_API_URL` env var (defaults to `http://localhost:3001`)
- Mock data: `server/db.json` (products, users, favorites)
- Seed script: `server/seed.ts` (generates product data)

## Routing

Client-side routing via **Navigo** (`src/app/router/index.ts`). Most routes require auth — unauthenticated users are redirected to `/login`.

| Route | Page | Auth |
|-------|------|:----:|
| `/` | Home | No |
| `/catalog` | Catalog | Yes |
| `/product/:id` | Product detail | Yes |
| `/favorites` | Favorites | Yes |
| `/cart` | Cart | Yes |
| `/profile` | Profile | Yes |
| `/delivery` | Delivery info | No |
| `/login` | Login | No |
| `/register` | Register | No |

## State Management

Custom store objects — no Redux/Zustand/etc:
- `cartStore` from `@/entities/cart`
- `userStore` from `@/entities/user`

## Styling

- **Tailwind CSS v4** via `@tailwindcss/vite` plugin
- Custom CSS files in `src/app/styles/` for component-specific styles
- Google Fonts: Inter and Roboto

## Testing

**No tests exist.** No test framework is configured.

## No CI/CD

No GitHub Actions, Jenkins, or other CI pipeline.

## Gotchas

- The `build` command runs `tsc && vite build` — TypeScript errors will fail the build
- `json-server` watches `server/db.json`, not the root `db.json`
- The app renders pages as HTML strings injected into `#app` — no virtual DOM
- Yandex Maps API is loaded in `index.html` (for the delivery page)
- Biome's `check` command is the CI-equivalent lint check (no auto-fix)
