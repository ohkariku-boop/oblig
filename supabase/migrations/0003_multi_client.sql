-- Multi-client (workspace) support. Lets one account — e.g. a consultancy —
-- manage several separate clients, each with its own isolated assessment,
-- risk register, policies, and evidence. Run this after 0001 and 0002.
-- Safe to run more than once.

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

alter table public.clients enable row level security;

drop policy if exists "clients: full access to own rows" on public.clients;
create policy "clients: full access to own rows" on public.clients
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Auto-create a default client for every new signup, alongside the
-- existing profile-creation trigger.
create or replace function public.handle_new_user_client()
returns trigger as $$
begin
  insert into public.clients (user_id, name) values (new.id, 'My Organisation');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created_client on auth.users;
create trigger on_auth_user_created_client
  after insert on auth.users
  for each row execute function public.handle_new_user_client();

-- Backfill a default client for every existing user who doesn't have one yet.
insert into public.clients (user_id, name)
select u.id, 'My Organisation'
from auth.users u
where not exists (select 1 from public.clients c where c.user_id = u.id);

-- Assessments: was one row per user. Now one row per client, so a
-- consultancy can hold a separate assessment per engagement.
alter table public.assessments add column if not exists client_id uuid references public.clients(id) on delete cascade;

update public.assessments a
set client_id = (select c.id from public.clients c where c.user_id = a.user_id order by c.created_at asc limit 1)
where a.client_id is null;

alter table public.assessments drop constraint if exists assessments_pkey;
alter table public.assessments alter column client_id set not null;
alter table public.assessments add primary key (client_id);

drop policy if exists "assessments: read own" on public.assessments;
drop policy if exists "assessments: upsert own" on public.assessments;
drop policy if exists "assessments: update own" on public.assessments;
drop policy if exists "assessments: full access to own rows" on public.assessments;
create policy "assessments: full access to own rows" on public.assessments
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Risks, Policies, Evidence, Reports: add client_id and backfill existing
-- rows to each user's default client. RLS stays scoped to user_id
-- (unchanged) — client_id is an additional column the app filters by.
alter table public.risks add column if not exists client_id uuid references public.clients(id) on delete cascade;
update public.risks r set client_id = (select c.id from public.clients c where c.user_id = r.user_id order by c.created_at asc limit 1) where r.client_id is null;

alter table public.policies add column if not exists client_id uuid references public.clients(id) on delete cascade;
update public.policies p set client_id = (select c.id from public.clients c where c.user_id = p.user_id order by c.created_at asc limit 1) where p.client_id is null;

alter table public.evidence add column if not exists client_id uuid references public.clients(id) on delete cascade;
update public.evidence e set client_id = (select c.id from public.clients c where c.user_id = e.user_id order by c.created_at asc limit 1) where e.client_id is null;

alter table public.report_log add column if not exists client_id uuid references public.clients(id) on delete cascade;
update public.report_log rl set client_id = (select c.id from public.clients c where c.user_id = rl.user_id order by c.created_at asc limit 1) where rl.client_id is null;
