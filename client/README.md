# VARI Client

This is the frontend for the VARI project.

It is a React + TypeScript app that shows:

- the interactive career map
- the inspector panel
- auth pages
- saved pins page

## Quick Setup

1. Install dependencies

```bash
npm install
```

2. Create `client/.env`

```env
VITE_API_URL=http://localhost:5000
```

3. Start the dev server

```bash
npm run dev
```

4. Open in browser

- `http://localhost:5173`

Important:

- The backend must also be running (`server/`) or API features will fail.

## Scripts

- `npm run dev` run Vite in development mode
- `npm run build` type-check and build for production
- `npm run preview` preview the production build
- `npm run lint` run ESLint checks

## Main Pages

- `/` home page
- `/map` interactive map
- `/auth` login/register
- `/pins` saved pins
- `/style-guide` local style preview page

## Folder Guide

- `src/pages` route-level pages
- `src/components` reusable UI and map/panel components
- `src/stores` Zustand state management
- `src/lib` API client and shared TypeScript types
- `src/data` local static data helpers
- `src/assets` source static assets imported by code
- `public` static files served directly by Vite

## How Data Flows

- `src/lib/api.ts` contains Axios calls to backend endpoints.
- `src/stores/mapStore.ts` loads and stores map data globally.
- Main app routes are defined in `src/App.tsx`.

## Build Output

- Production files are generated into `client/dist`.
- `dist/assets` contains the hashed JS/CSS bundles created by Vite.

## Common Problems

- "Network Error" in frontend: check backend is running on `http://localhost:5000`.
- Empty map or missing roles: seed backend data with `npm run seed` inside `server/`.
- CORS errors: make sure backend `CLIENT_URL` matches the frontend URL.

## Beginner Notes

- Start by reading `src/App.tsx` to understand routes.
- Then read `src/pages/MapPage.tsx` and `src/components/panels/InspectorPanel.tsx`.
- Use browser DevTools Network tab to inspect API calls while you click around.
