create extension if not exists "uuid-ossp";

-- CONTACTS
create table public.contacts (
  id            uuid not null default uuid_generate_v4(),
  name          text,
  phone         text,
  created_by    uuid references public.profiles not null,
  updated_by    uuid references public.profiles,
  deleted_by    uuid references public.profiles,
  created_at    timestamp with time zone default now() not null,
  updated_at    timestamp with time zone default now() not null,
  primary key (id)
);
comment on table public.contacts is 'Contacts created by users.';

-- Row-Level Security and Policies for Contacts
alter table public.contacts enable row level security;
create policy "Allow logged-in read access" on public.contacts for select using ( auth.role() = 'authenticated' );
