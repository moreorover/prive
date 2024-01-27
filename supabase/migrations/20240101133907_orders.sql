create extension if not exists "uuid-ossp";

-- Create an ENUM type for the 'orderType' column
CREATE TYPE order_type AS ENUM ('hairOrder', 'productOrder');

-- ORDERS
create table public.orders (
  id            uuid not null default uuid_generate_v4(),
  total         decimal(10,2) not null default 0.00,
  completed     boolean not null default false,
  orderType     order_type NOT NULL,
  client        uuid references public.clients,
  created_by    uuid references public.profiles not null,
  updated_by    uuid references public.profiles,
  created_at    timestamp with time zone default now() not null,
  updated_at    timestamp with time zone default now() not null,
  primary key (id)
);
comment on table public.orders is 'Orders.';

-- Row-Level Security and Policies for Profiles
alter table public.orders enable row level security;

-- Policy for SELECT
create policy "Admins can view all orders" on public.orders
for select
using (
    authorize('Admin', auth.uid())
);

-- Policy for INSERT
create policy "Only Admins can create orders" on public.orders
for insert
with check (
    authorize('Admin', auth.uid())
);

-- Policy for UPDATE
create policy "Only Admins can update orders" on public.orders
for update
using (
    authorize('Admin', auth.uid())
);