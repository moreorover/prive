create extension if not exists "uuid-ossp";

create table public.stock(
  id uuid unique default uuid_generate_v4(),
  purchased_at date,
  length_cm integer default 0 not null,
  colour text,
  description text,
  weight_expected_grams integer default 0 not null,
  weight_received_grams integer default 0 not null,
  code text,
  created_by uuid references profiles,
  updated_by uuid references profiles,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  primary key (id)
);

alter table public.stock enable row level security;

create policy "Allow any authenticated user to insert row" on stock
  for insert to authenticated 
    with check (true);

create policy "Allow any authenticated user to select row" on stock
  for select to authenticated 
    using (true);

create policy "Allow any authenticated user to update row" on stock
  for update to authenticated 
    using (true);

create policy "Allow any authenticated user to delete row" on stock
  for delete to authenticated 
    using (true);