-- Run this in your Supabase SQL editor to create the orders table

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_name text not null,
  customer_email text not null,
  quantity integer not null default 1,
  color_primary text not null,
  color_secondary text,
  stripe_session_id text not null unique,
  stripe_payment_intent text,
  status text not null default 'pending' check (status in ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  shipping_address text not null,
  amount_total integer not null
);

-- Only your service role key can insert/read (called from server-side only)
alter table public.orders enable row level security;

create policy "service role only" on public.orders
  using (false)
  with check (false);
