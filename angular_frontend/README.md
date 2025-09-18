# Angular Frontend — Personal Notes Manager

Ocean Professional themed Angular 19 app for creating, editing, and managing personal notes with a modern, minimalist UI.

## Quick Start

- Install dependencies: `npm install`
- Start dev server: `npm start` (served at http://localhost:3000 by angular.json)
- Build: `npm run build`
- SSR serve build: `npm run build && npm run serve:ssr:angular`

## Configuration

- API base URL can be provided via environment variable `API_BASE_URL`.
  - Local default is `/api`.
  - For documentation, see `.env.example`. The orchestrator should inject environment variables.

## Features

- Ocean Professional theme: primary #2563EB, secondary #F59E0B, subtle gradients, rounded surfaces, soft shadows.
- Responsive layout with sidebar for folders/tags and main content area for notes.
- Accessible components with semantic roles and focus outlines.
- Reusable components: search bar, note card, empty state.
- REST service scaffolding for notes with Angular HttpClient (create, read, update, delete).
- Routes: welcome, list, create, edit, tag view, folder view.
- SSR-ready configuration.

## Code Structure

- `src/app/core` — models, services, interceptors
- `src/app/shared` — reusable UI components
- `src/app/features` — feature pages (notes list, editor, tags, folders)
- `src/app/app.component.*` — app shell (sidebar, topbar, router-outlet)

## Accessibility

- Focus outlines and ARIA labels included.
- High-contrast friendly colors for badges and chips.

## Notes

- Backend must implement REST endpoints matching the scaffolded service:
  - `GET /api/notes?tag=&folder=&q=`
  - `GET /api/notes/:id`
  - `POST /api/notes`
  - `PATCH /api/notes/:id`
  - `DELETE /api/notes/:id`
