create extension if not exists "uuid-ossp";

-- HAIR
create table public.products (
  id            uuid not null default uuid_generate_v4(),
  supplier      uuid references public.clients,
  title         text not null,
  description   text null,
  upc           text null,
  price         numeric(10,2) not null default 0,
  rrp           numeric(10,2) not null default 0,
  stock         integer not null default 0,
  created_by    uuid references public.profiles not null,
  updated_by    uuid references public.profiles,
  deleted_by    uuid references public.profiles,
  created_at    timestamp with time zone default now() not null,
  updated_at    timestamp with time zone default now() not null,
  deleted_at    timestamp with time zone default now() not null,
  primary key (id)
);
comment on table public.products is 'Table to hold records on products stock.';

-- Row-Level Security and Policies for Profiles
alter table public.products enable row level security;

-- Policy for SELECT
create policy "Admins can view all products" on public.products
for select
using (
    authorize('Admin', auth.uid())
);

-- Policy for INSERT
create policy "Only Admins can create products" on public.products
for insert
with check (
    authorize('Admin', auth.uid())
);

-- Policy for UPDATE
create policy "Only Admins can update products" on public.products
for update
using (
    authorize('Admin', auth.uid())
);


create table public.products_order (
  products_id uuid references public.products not null,
  order_id uuid references public.orders not null,
  PRIMARY KEY (products_id, order_id)
);
comment on table public.products_order is 'Table to hold records on products orders.';

-- Row-Level Security and Policies for Profiles
alter table public.products_order enable row level security;

-- Policy for SELECT
create policy "Admins can view all products_order" on public.products_order
for select
using (
    authorize('Admin', auth.uid())
);

-- Policy for INSERT
create policy "Only Admins can create products_order" on public.products_order
for insert
with check (
    authorize('Admin', auth.uid())
);

-- Policy for UPDATE
create policy "Only Admins can update products_order" on public.products_order
for update
using (
    authorize('Admin', auth.uid())
);
