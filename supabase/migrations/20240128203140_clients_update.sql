-- migration to add default values and make email, phone, and instagram columns not null in public.clients

-- add new column abbreviation that is goind to be used if user is supplier
alter table public.clients add column abbreviation text default '';
alter table public.clients alter column abbreviation set not null;

-- add default values to the email, phone, and instagram columns
alter table public.clients alter column email set default '';
alter table public.clients alter column phone set default null;
alter table public.clients alter column instagram set default '';

-- update existing rows to set the default values if the columns are currently null
update public.clients set email = '' where email is null;
update public.clients set phone = null where phone is null;
update public.clients set instagram = '' where instagram is null;

-- modify the columns to be not null
alter table public.clients alter column email set not null;
alter table public.clients alter column phone set not null;
alter table public.clients alter column instagram set not null;

-- modify the columns to be by default null
alter table public.clients alter column updated_at drop default;
alter table public.clients alter column updated_at drop not null;
update public.clients set updated_at = null where updated_at is not null;

-- modify the columns to be by default null
alter table public.profiles alter column updated_at drop default;
alter table public.profiles alter column updated_at drop not null;
update public.profiles set updated_at = null where updated_at is not null;