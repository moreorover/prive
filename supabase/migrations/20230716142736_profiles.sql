-- PROFILES
create table public.profiles(
    id uuid     unique references auth.users on delete cascade,
    full_name   text,
    created_at  timestamp with time zone default now() not null,
    updated_at  timestamp with time zone default now() not null,
    primary key (id)
);

-- Row-Level Security and Policies for Profiles
alter table public.profiles enable row level security;

-- Trigger to handle new users for Profiles
create or replace function public.handle_new_user()
    returns trigger
    as $$
begin
    insert into public.profiles(id, full_name)
        values(new.id, new.raw_user_meta_data ->> 'full_name');
    return new;
end;
$$
language plpgsql security definer;

create trigger on_auth_user_created
    after insert on auth.users for each row
    execute procedure public.handle_new_user();
