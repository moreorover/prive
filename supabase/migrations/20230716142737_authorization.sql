create table public.user_roles (
    name text primary key,
    description text
);

alter table public.user_roles enable row level security;

-- Inserting roles
insert into user_roles (name, description) values ('Admin', 'Super User of the application');
insert into user_roles (name, description) values ('Moderator', 'Moderator of the application');

create table public.user_roles_mapping (
    user_id uuid references public.profiles(id),
    role_name text references user_roles(name),
    primary key (user_id, role_name)
);

alter table public.user_roles_mapping enable row level security;

-- function for role-based authorization
create function public.authorize(
  target_role_name text,
  user_id uuid
)
returns boolean as $$
declare
  role_count int;
begin
  select count(*)
  from public.user_roles_mapping
  where user_roles_mapping.role_name = authorize.target_role_name
    and user_roles_mapping.user_id = authorize.user_id
  into role_count;
  
  return role_count > 0;
end;
$$ language plpgsql security definer;

create policy "Permit 'Admin' users to access all profiles, while other users can only access their own profile." on public.profiles 
for select to authenticated
using ( 
    authorize('Admin', auth.uid()) 
    or 
    (auth.uid() = id) 
);
create policy "Permit 'Admin' users to update all profiles, while other users can only update their own profile." on public.profiles 
for update to authenticated
using ( 
    authorize('Admin', auth.uid()) 
    or 
    (auth.uid() = id) 
);

-- Policy for SELECT
create policy "Allow only 'Admin' users to view user roles" on public.user_roles 
for select 
using ( 
    auth.role() = 'authenticated'
);

-- Policy for UPDATE
create policy "Allow only 'Admin' users to update user roles" on public.user_roles 
for update 
using ( 
    authorize('Admin', auth.uid()) 
);

-- Policy for INSERT
create policy "Allow only 'Admin' users to insert user roles" on public.user_roles 
for insert 
with check ( 
    authorize('Admin', auth.uid()) 
);

-- Policy for DELETE
create policy "Allow only 'Admin' users to delete user roles" on public.user_roles 
for delete 
using ( 
    authorize('Admin', auth.uid()) 
);

-- Policy for SELECT
create policy "Allow only 'Admin' users to view user roles mappings" on public.user_roles_mapping 
for select 
using ( 
    authorize('Admin', auth.uid()) 
    or 
    (auth.uid() = user_id) 
);

-- Policy for UPDATE
create policy "Allow only 'Admin' users to update user roles mappings" on public.user_roles_mapping 
for update 
using ( 
    authorize('Admin', auth.uid()) 
);

-- Policy for INSERT
create policy "Allow only 'Admin' users to insert user roles mappings" on public.user_roles_mapping 
for insert 
with check ( 
    authorize('Admin', auth.uid()) 
);

-- Policy for DELETE
create policy "Allow only 'Admin' users to delete user roles mappings" on public.user_roles_mapping 
for delete 
using ( 
    authorize('Admin', auth.uid()) 
);
