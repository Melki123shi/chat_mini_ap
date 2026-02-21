-- MoveEase: Listings table for house-moving transport marketplace
-- Run this in Supabase SQL Editor or via Supabase CLI

-- Optional: create storage bucket for vehicle images (or create via Dashboard)
-- insert into storage.buckets (id, name, public) values ('vehicles', 'vehicles', true);
-- create policy "Public read" on storage.objects for select using (bucket_id = 'vehicles');
-- create policy "Authenticated upload" on storage.objects for insert with check (bucket_id = 'vehicles' and auth.role() = 'authenticated');

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  image_url text not null,
  location text not null check (location in (
    'Downtown',
    'Uptown',
    'Suburbs',
    'Midtown',
    'Industrial',
    'Rural',
    'Airport',
    'Harbor'
  )),
  phone text not null,
  description text not null,
  vehicle_type text not null check (vehicle_type in ('Truck', 'Van', 'Car')),
  created_at timestamptz not null default now()
);

-- RLS
alter table public.listings enable row level security;

create policy "Anyone can read listings"
  on public.listings for select
  using (true);

create policy "Authenticated users can insert own listing"
  on public.listings for insert
  with check (auth.uid() = user_id);

create policy "Users can update own listing"
  on public.listings for update
  using (auth.uid() = user_id);

create policy "Users can delete own listing"
  on public.listings for delete
  using (auth.uid() = user_id);

-- Optional: index for filtering by location
create index if not exists idx_listings_location on public.listings(location);
create index if not exists idx_listings_created_at on public.listings(created_at desc);
