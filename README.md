# MoveEase

A marketplace for house-moving transportation services built with Next.js 14, TypeScript, Supabase, TanStack Query, and Zustand.

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Supabase**

   - Create a project at [supabase.com](https://supabase.com).
   - In **SQL Editor**, run the migration: `supabase/migrations/001_create_listings.sql`.
   - In **Storage**, create a bucket named `vehicles` and set it to **Public** (or use the policies from the migration comments).
   - Copy `.env.example` to `.env.local` and set:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Run the app**

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000). Use **Post a vehicle** to add a listing (Supabase Auth required for upload and create).

## Tech stack

- **Framework:** Next.js 14 (App Router) + TypeScript  
- **Backend/Auth:** Supabase (Auth, Postgres, Storage)  
- **Server state:** TanStack Query  
- **Client state:** Zustand  
- **UI:** Tailwind CSS, Shadcn-style components, Lucide React  

## Project structure

- `src/app/` – App Router pages (landing, post)
- `src/components/` – UI (listings, providers)
- `src/hooks/` – React Query hooks for listings
- `src/lib/` – Supabase client, utils
- `src/services/` – Supabase listing and upload logic
- `src/store/` – Zustand filter store
- `src/types/` – Listing and shared types
