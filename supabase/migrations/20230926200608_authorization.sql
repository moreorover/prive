-- Custom types for permissions
create type public.app_permission as enum ('contacts.create', 'contacts.update', 'contacts.delete', 'profiles.view', 'profiles.update', 'user_roles.view', 'user_roles.create', 'user_roles.delete', 'role_permissions.view', 'role_permissions.create', 'role_permissions.delete');
create type public.app_role as enum ('admin', 'moderator', 'user');

-- ROLE PERMISSIONS
create table public.role_permissions (
  id           bigint generated by default as identity primary key,
  role         app_role not null,
  permission   app_permission not null,
  unique (role, permission)
);

-- USER ROLES (many-to-many relationship between users and roles)
create table public.user_roles (
  user_id uuid references public.profiles(id),
  role app_role not null,
  primary key (user_id, role)
);

-- Grant all permissions to the admin role
insert into public.role_permissions (role, permission)
values
    ('admin', 'contacts.create'),
    ('admin', 'contacts.update'),
    ('admin', 'contacts.delete'),
    ('admin', 'profiles.view'),
    ('admin', 'profiles.update'),
    ('admin', 'user_roles.view'),
    ('admin', 'user_roles.create'),
    ('admin', 'user_roles.delete'),
    ('admin', 'role_permissions.view'),
    ('admin', 'role_permissions.create'),
    ('admin', 'role_permissions.delete');

-- Function for role-based authorization
create function public.authorize(
  requested_permission app_permission,
  user_id uuid
)
returns boolean as $$
declare
  bind_permissions int;
begin
  select count(*)
  from public.role_permissions
  inner join public.user_roles on role_permissions.role = user_roles.role
  where role_permissions.permission = authorize.requested_permission
    and user_roles.user_id = authorize.user_id
  into bind_permissions;
  
  return bind_permissions > 0;
end;
$$ language plpgsql security definer;

-- Extend Policies for Contacts with Roles and Authorization
create policy "Allow User With 'contacts.create' Permission To Create Contacts" on public.contacts for insert with check ( authorize('contacts.create', auth.uid()) );
create policy "Allow User With 'contacts.update' Permission To Update Contacts" on public.contacts for update using ( authorize('contacts.update', auth.uid()) );
create policy "Allow User With 'contacts.delete' Permission To Delete Contacts" on public.contacts for delete using ( authorize('contacts.delete', auth.uid()) );

-- Extend Policies for Profiles with Roles and Authorization
create policy "Allow User With 'profiles.view' Permission To View Profiles" on public.profiles for select using ( authorize('profiles.view', auth.uid()) or (auth.uid() = id) );
create policy "Allow User With 'profiles.update' Permission To Update Profiles" on public.profiles for update using ( authorize('profiles.update', auth.uid()) or (auth.uid() = id) );

-- enable row-level security on the roles table
alter table public.role_permissions enable row level security;

-- policy to allow users with 'roles.view' permission to view roles
create policy "Allow User With 'role_permissions.view' Permission To View Role Permissions" 
on public.role_permissions 
for select 
using ( 
    authorize('role_permissions.view', auth.uid()) 
);

-- policy to allow users with 'role_permissions.create' permission to create role permissions
create policy "Allow User With 'role_permissions.create' Permission To Create Role Permissions" 
on public.role_permissions 
for insert with check
( 
    authorize('role_permissions.create', auth.uid()) 
);

-- policy to allow users with 'roles.delete' permission to delete roles
create policy "Allow User With 'role_permissions.delete' Permission To Delete Role Permissions" 
on public.role_permissions 
for delete 
using ( 
    authorize('role_permissions.delete', auth.uid()) 
);

-- enable row-level security on the roles table
alter table public.user_roles enable row level security;

-- policy to allow users with 'roles.view' permission to view roles
create policy "Allow User With 'user_roles.view' Permission To View User Roles" 
on public.user_roles 
for select 
using ( 
    authorize('user_roles.view', auth.uid()) 
);

-- policy to allow users with 'user_roles.create' permission to create roles
create policy "Allow User With 'user_roles.create' Permission To Create User Roles" 
on public.user_roles 
for insert 
with check
( 
    authorize('user_roles.create', auth.uid()) 
);

-- -- policy to allow users with 'user_roles.delete' permission to delete roles
create policy "Allow User With 'user_roles.delete' Permission To Delete User Roles" 
on public.user_roles 
for delete 
using ( 
    authorize('user_roles.delete', auth.uid()) 
);

-- Function to retrieve all roles from the app_role enum type
create or replace function get_roles()
returns setof text language sql as $$
    select enumlabel 
    from pg_catalog.pg_enum 
    where enumtypid = 'public.app_role'::regtype;
$$;

-- Comment describing the function
comment on function get_roles() is 'Function to fetch all roles defined in the app_role enum. Each role is returned as a text string.';

create or replace function get_roles_and_permissions(user_id uuid)
returns jsonb as $$
declare
    _roles jsonb;
    _permissions jsonb;
begin
    -- Get roles
    select jsonb_agg(distinct r.role::text)
    into _roles
    from public.user_roles r
    where r.user_id = get_roles_and_permissions.user_id;
    
    -- Get permissions
    with role_permissions as (
        select 
            r.role::text as role, 
            jsonb_agg(rp.permission::text) as permissions
        from public.user_roles r 
        join public.role_permissions rp on r.role = rp.role 
        where r.user_id = get_roles_and_permissions.user_id
        group by r.role
    )
    select jsonb_object_agg(role, jsonb_build_object('permissions', permissions))
    into _permissions
    from role_permissions;
    
    -- Return combined JSONB
    return jsonb_build_object(
        'userRoles', _roles,
        'roles', _permissions
    );
end;
$$ language plpgsql;

comment on function get_roles_and_permissions(user_id uuid) is 'Function to fetch all riles and permissions for the user_id'