# Pokemon Masterset Tracker

A lightweight React app for tracking personal Pokemon TCG master sets, currently focused on Prismatic Evolutions.

The app is built as a small personal-use dashboard with static data, local state, Tailwind styling, and GitHub Pages-friendly routing.

## Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router with `HashRouter`
- Framer Motion for small UI animations

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Project Notes

- Read `AGENTS.md` before changing project structure or app behavior.
- Read `DESIGN.md` before making UI changes.
- Keep implementation simple, readable, and easy to deploy to GitHub Pages.

## Deployment

Build output is generated in `dist/` and is intended to stay static-hosting friendly.

This project deploys to GitHub Pages through `.github/workflows/deploy.yml`.
The workflow runs on pushes to `main`, builds the Vite app, uploads `dist/`,
and publishes it with GitHub Pages.

For this repository, the production URL is:

```txt
https://lengweih.github.io/pokemon-masterset-tracker/
```

In GitHub, set `Settings -> Pages -> Build and deployment -> Source` to
`GitHub Actions`.
