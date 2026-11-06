# AGENTS.md

## Project overview

React + Vite single-page portfolio for Chhumsomary (Mary). Dark/light theme toggle, Tailwind CSS v4, react-router-dom, and a chatbot powered by Google Gemini with an OpenRouter fallback. Two page routes: `/` (Index) and `/projects` (ProjectShowcase). The site showcases Mary's projects, skills, and provides a contact form (serverless email) and an AI chatbot that answers questions about Mary and her work.

## Key commands

- `npm run dev` — start Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint (flat config, ignores `dist/`)

No test framework or CI workflows are configured.

## Architecture

| Path               | Role                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------- |
| `src/pages/`       | Page-level components (Index, Contact, AboutMe, Education, Experience, ProjectShowcase) |
| `src/component/`   | Reusable components (Nav, Chatbot, MarsBackground, DarkBtn, DownloadResume, Footer)     |
| `src/assets/data/` | Data files (contact_icon.jsx, education.js, experiences.js, projects.js)                |
| `api/`             | Vercel serverless functions (emailJsAPI.js, chat.js)                                    |
| `public/`          | Static assets (images, favicons, files/CV.pdf)                                          |
| `dist/`            | Build output (gitignored)                                                               |

## Serverless functions

The `api/` directory follows Vercel's convention — functions are deployed as serverless endpoints:

- `api/emailJsAPI.js` — sends email via `@emailjs/nodejs` (server-side, not browser SDK)
- `api/chat.js` — AI chatbot. Primary: Google Gemini (`@google/genai`, model `gemini-3.5-flash-lite`, override with `GEMINI_MODEL`). Backup: OpenRouter free models tried in order (list at top of the file). Returns 503 if both fail. Persona and facts live in `api/_lib/knowledge.js`

These require Vercel deployment to work; they do **not** run locally without a Vercel dev server.

**Vercel function gotchas** (learned the hard way):

- **`export default` syntax must be valid ES module** — `export default handler = async (req, res) => {}` is invalid JS and causes "handler not found" on Vercel. Use `const handler = async (req, res) => {}; export default handler;` or `export default async (req, res) => {}`
- **All npm imports must be in `package.json` dependencies** — Vercel installs deps from `package.json` before bundling serverless functions. Unlisted imports fail at runtime even after syntax is fixed
- **OpenRouter baseURL must include `/api/v1`** — The OpenAI SDK appends `/chat/completions` to the base URL, so `https://openrouter.ai` becomes `https://openrouter.ai/chat/completions` (wrong). Use `https://openrouter.ai/api/v1` instead
- **API file name = endpoint path** — Renaming a file in `api/` changes the URL the frontend must call. `api/chat.js` is reachable at `/api/chat`. Keep the frontend fetch path in sync with the serverless function file name
- **Hash scroll on ProjectShowcase** — `ProjectShowcase.jsx` uses `useLocation()` + `useEffect` to watch `location.hash` and `scrollIntoView()` to the matching project section on load

## Dark mode

Uses `class` strategy with localStorage persistence. The `<html>` tag has `data-theme="dark"` by default. Theme is synced across components via `localStorage` and a `storage` event listener in `DarkBtn`. Tailwind's `dark:` prefix applies when the class is present. Custom dark variant defined in `src/index.css` via `@custom-variant`. The `Nav` component hides automatically on `/projects` route (no matching IntersectionObserver sections).

## Styling

- Tailwind CSS v4 with `@tailwindcss/vite` plugin in `vite.config.js`
- Custom theme colors in `tailwind.config.js` and `@theme` block in `src/index.css`
- Fonts: "Fleur De Leah" (display), "Space Mono" (mono), "Inter" (sans)

## Environment variables

`.env` is gitignored and has never been committed (checked `git log --all -- .env`). Server-side keys used by `api/`: `EMAILJS_PUBLIC_KEY`, `EMAILJS_PRIVATE_KEY`, `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `GEMINI_KEY`, `OPENROUTER_KEY` (optional `GEMINI_MODEL`). Set them in the Vercel dashboard too.

## Import notes

- macOS case-insensitive filesystem can mask case-mismatch bugs in imports
- `App.jsx` imports `ProjectsShowcase` from `./pages/ProjectShowcase.jsx` (capital S in filename)
- Nav.jsx uses IntersectionObserver for active-section tracking; `rootMargin: "-30% 0px -30% 0px"` and `reduce` with proper accumulator return
- Nav.jsx also has a route-change sync effect: when `location.pathname` changes to `"/"`, it recalculates active section via distance-to-viewport-center to fix stale highlights after navigating back from `/projects`

## Deployment

Deploy to Vercel (`vercel` is in devDependencies). No `vercel.json` in the repo.
