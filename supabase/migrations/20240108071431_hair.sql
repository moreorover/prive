create extension if not exists "uuid-ossp";

-- HAIR
create table public.hair (
  id            uuid not null default uuid_generate_v4(),
  title         text not null,
  description   text null,
  weight        integer not null,
  length        integer not null,
  price         numeric(10,2) not null default 0,
  deleted       boolean not null default false,
  created_by    uuid references public.profiles not null,
  updated_by    uuid references public.profiles,
  deleted_by    uuid references public.profiles,
  created_at    timestamp with time zone default now() not null,
  updated_at    timestamp with time zone default now() not null,
  deleted_at    timestamp with time zone default now() not null,
  primary key (id)
);
comment on table public.hair is 'Table to hold records on hair stock.';

-- Row-Level Security and Policies for Profiles
alter table public.hair enable row level security;

-- Policy for SELECT
create policy "Admins can view all hair" on public.hair
for select
using (
    authorize('Admin', auth.uid())
);

-- Policy for INSERT
create policy "Only Admins can create hair" on public.hair
for insert
with check (
    authorize('Admin', auth.uid())
);

-- Policy for UPDATE
create policy "Only Admins can update hair" on public.hair
for update
using (
    authorize('Admin', auth.uid())
);


create table public.hair_order (
  hair_id uuid references public.hair not null,
  order_id uuid references public.orders not null,
  PRIMARY KEY (hair_id, order_id)
);
comment on table public.hair_order is 'Table to hold records on hair orders.';

-- Row-Level Security and Policies for Profiles
alter table public.hair_order enable row level security;

-- Policy for SELECT
create policy "Admins can view all hair_order" on public.hair_order
for select
using (
    authorize('Admin', auth.uid())
);

-- Policy for INSERT
create policy "Only Admins can create hair_order" on public.hair_order
for insert
with check (
    authorize('Admin', auth.uid())
);

-- Policy for UPDATE
create policy "Only Admins can update hair_order" on public.hair_order
for update
using (
    authorize('Admin', auth.uid())
);
