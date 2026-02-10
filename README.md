Valentine Mini-Games — Frontend-only

This is a small React + Vite starter that shows multiple mini-game packs and reads URL parameters to personalize the experience.

Quick start:

1. Install

```bash
cd valentine-frontend
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Open with URL params:

- `?pack=cute|fun|emotional|full`
- `?to=Name&from=Sender`

Example: `http://localhost:5173/?pack=fun&to=Alice&from=Bob`

Deploy:

- Build: `npm run build`
- Deploy the `dist` folder to Vercel / Netlify — it's a static site.

Files of interest:

- `src/App.tsx` — reads URL params and mounts `PackShell`.
- `src/components/PackShell.tsx` — shows packs and placeholder mini-games.
- `src/components/games/*` — placeholder game components to extend.

You can replace each placeholder game with a full implementation. No backend, DB, or admin required for this template.
