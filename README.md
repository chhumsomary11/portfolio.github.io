# AGENTS.md

## Project overview

React + Vite single-page portfolio for Chhumsomary (Mary). Day/dusk theme toggle, Tailwind CSS v4 and the "Lotus & Angkor" pixel-art design (spec in `lotus-portfolio-design/HANDOFF.md`). A single page at `/`. Mini Mary calls `api/chat.js` (Gemini with an OpenRouter fallback). Its system prompt is built from `src/data/cv.json` and `quests.json` (`api/_lib/knowledge.js`), the endpoint is rate-limited per IP, and the scripted answers in `mini-mary-chat.json` are the offline fallback. The site showcases Mary's projects, skills, and provides a contact form (serverless email) and an AI chatbot that answers questions about Mary and her work.

## Key commands

- `npm run dev` — start Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint (flat config, ignores `dist/`)

No test framework or CI workflows are configured.

## Architecture

| Path               | Role                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------- |
| `src/pages/`       | `Index.jsx`: the single page, assembling the sections                                     |
| `src/component/`   | Nav, HeroScene, SpeechBox, AboutStrip, Experience, SelectedWork (+QuestStory/QuestFacts), EducationAwards, Contact, Footer, MiniMary, Reveal (scroll entrances) |
| `src/data/`        | Content as JSON: `cv.json`, `quests.json`, `dialogue.json`, `mini-mary-chat.json`        |
| `src/hooks/`       | `useDusk`, `useMediaQuery`                                                                |
| `src/index.css`    | Theme tokens (`:root` / `[data-theme="dark"]`), pixel-border utilities, all animations    |
| `api/`             | Vercel serverless functions (emailJsAPI.js, chat.js)                                      |
| `public/`          | Static assets (`lotus/` scene, sprites, items; favicons; `files/generalCV.pdf`)           |

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

## Dusk mode

Day is the default. `DuskToggle` sets `data-theme="dark"` on `<html>` and stores `theme` in localStorage; an inline script in `index.html` applies it before first paint. The theme tokens (`--page`, `--ink`, `--band`, ...) live in `src/index.css` under `:root` and `:root[data-theme="dark"]`, and are exposed to Tailwind with `@theme inline` (`bg-page`, `text-ink`, `font-pixel`, ...). `useDusk` lets components (the hero scene) react to the switch.

## Styling

- Tailwind CSS v4 with `@tailwindcss/vite` (no `tailwind.config.js`; config is in `src/index.css`)
- Pixel borders: `pixel-border-4/3/2` and `pixel-card` utilities. No rounded corners.
- Fonts: Pixelify Sans (headings), Inter (body), Space Mono (labels), Kantumruy Pro (Khmer)
- Animations use `steps()` and are disabled under `prefers-reduced-motion`. Scroll entrances use `Reveal` (`ap-rv` / `ap-hop` classes)

## Environment variables

`.env` is gitignored and has never been committed (checked `git log --all -- .env`). Server-side keys used by `api/`: `EMAILJS_PUBLIC_KEY`, `EMAILJS_PRIVATE_KEY`, `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `GEMINI_KEY`, `OPENROUTER_KEY` (optional `GEMINI_MODEL`). Set them in the Vercel dashboard too.

## Import notes

- macOS case-insensitive filesystem can mask case-mismatch bugs in imports
- Page content is data: edit `src/data/*.json`, not the components

## Deployment

Deploy to Vercel (`vercel` is in devDependencies). No `vercel.json` in the repo.
