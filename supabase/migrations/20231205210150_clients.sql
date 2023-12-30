create extension if not exists "uuid-ossp";

-- CLIENTS
create table public.clients (
  id            uuid not null default uuid_generate_v4(),
  name          text not null,
  email         text,
  phone         text,
  instagram     text,
  created_by    uuid references public.profiles not null,
  updated_by    uuid references public.profiles,
  created_at    timestamp with time zone default now() not null,
  updated_at    timestamp with time zone default now() not null,
  primary key (id)
);
comment on table public.clients is 'Clients.';

-- Row-Level Security and Policies for Profiles
alter table public.clients enable row level security;

-- Policy for SELECT
create policy "Admins can view all clients" on public.clients
for select
using (
    authorize('Admin', auth.uid())
);

-- Policy for INSERT
create policy "Only Admins can create clients" on public.clients
for insert
with check (
    authorize('Admin', auth.uid())
);

-- Policy for UPDATE
create policy "Only Admins can update clients" on public.clients
for update
using (
    authorize('Admin', auth.uid())
);