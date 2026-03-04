# VARI

Vari is a career exploration web app. It helps users explore:

- tech industries
- role paths
- learning steps
- job demand signals
- salary snapshots

The app has two parts:

- `client/` (React + Vite frontend)
- `server/` (Express + MongoDB backend)

## Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, Zustand
- Backend: Node.js, Express, TypeScript, Mongoose
- Database: MongoDB
- Auth: JWT

## Project Structure

- `client/` frontend app
- `server/` backend API and data seeding
- `README.md` this file (whole project)
- `client/README.md` frontend-only guide

## Before You Start

Install:

- Node.js 20+
- npm
- MongoDB (Atlas or local)

## Quick Start (Local Development)

1. Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

2. Create env files

`server/.env`

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
PORT=5000
CLIENT_URL=http://localhost:5173
```

`client/.env`

```env
VITE_API_URL=http://localhost:5000
```

3. Seed the database (one-time or whenever you want to reset sample data)

```bash
cd server
npm run seed
```

4. Start backend (terminal 1)

```bash
cd server
npm run dev
```

5. Start frontend (terminal 2)

```bash
cd client
npm run dev
```

6. Open the app

- `http://localhost:5173`

## Main Features

- Interactive map of industries, districts, and roles
- Inspector panel with learning path and resources
- Jobs panel with live-ish demand numbers
- Salary panel with SCB-based data when available
- Search for industries and roles
- Account login/register
- Save pins (role, industry, learning-step) in "My Pins"

## Backend API Overview

- `GET /api/map` industries + roles for map rendering
- `GET /api/roles/:slug` role details
- `GET /api/search?q=...` search endpoint
- `GET /api/salaries/:slug` salary data for role
- `GET /api/jobs/:roleSlug` job count data
- `POST /api/auth/register` create account
- `POST /api/auth/login` sign in
- `GET /api/me` current user
- `GET /api/me/pins` get saved pins
- `POST /api/me/pins` create pin
- `PATCH /api/me/pins/:id` update notes
- `DELETE /api/me/pins/:id` delete pin

## Scripts

Server (`server/package.json`):

- `npm run dev` start backend with auto-reload
- `npm run build` compile TypeScript
- `npm run start` run compiled backend from `dist`
- `npm run seed` seed industries and roles

Client (`client/package.json`):

- `npm run dev` start Vite dev server
- `npm run build` type-check and build production files
- `npm run preview` preview production build locally
- `npm run lint` run ESLint

## Troubleshooting

- Map is empty: run `npm run seed` in `server/`, then refresh the browser.
- Frontend cannot call backend: check `client/.env` has `VITE_API_URL=http://localhost:5000`.
- CORS error: make sure `CLIENT_URL` in `server/.env` matches your frontend URL.
- Auth fails unexpectedly: check `JWT_SECRET` in `server/.env`, then restart the backend.

## Notes

- Do not commit real secrets to git.
- If a `.env` with real credentials was committed before, rotate those secrets.
