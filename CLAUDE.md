# PawCare Frontend

Pet care reservation website — grooming, haircuts, baths, vaccines for dogs & cats.

## Tech Stack
- Next.js 15 (App Router)
- HeroUI v3 (React component library, compound component API)
- Tailwind CSS v4
- Zustand (auth state)
- Axios (API client)
- Lucide React (icons)

## Project Structure
```
src/
  app/           — Next.js pages (home, services, booking, login, register, my-reservations)
  components/    — Reusable UI (Navbar, Footer, ServiceCard, TimeSlotPicker, etc.)
  hooks/         — useAuth (zustand), useServices, useReservations
  lib/           — api.ts (axios), types.ts, data.ts (fallback service data)
```

## Key Patterns
- HeroUI v3 uses compound components: `Card.Content`, `Card.Footer`, `Card.Header`
- No HeroUIProvider — uses `RouterProvider` + `I18nProvider` from react-aria-components
- No Navbar component in v3 — custom header built with Tailwind
- Auth via localStorage token + zustand store
- Fallback to local data when API unreachable

## Commands
```bash
npm run dev      # Start dev server on :3000
npm run build    # Production build
npm run start    # Start production server
```

## API
Backend at http://localhost:4000/api (Express + Prisma + SQLite)
- /auth — register, login, me
- /services — list/get services
- /pets — CRUD user's pets
- /timeslots — list by date
- /reservations — create, list, cancel

## Pricing
All prices in Thai Baht (THB). Based on real 2026 Thailand market rates.
