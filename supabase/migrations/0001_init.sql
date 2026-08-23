-- Oblig core schema. Run this in Supabase Dashboard -> SQL Editor.
-- Safe to run more than once — every policy is dropped first if it
-- already exists, so a partial or repeat run won't error out.
-- Every table uses Row Level Security so a signed-in user can only ever
-- read or write their own rows, enforced by the database, not the app.

-- 1. Profile row created automatically when someone signs up
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  company_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles: read own" on public.profiles;
create policy "profiles: read own" on public.profiles
  for select using (auth.uid() = id);
drop policy if exists "profiles: update own" on public.profiles;
create policy "profiles: update own" on public.profiles
  for update using (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Assessment answers (replaces localStorage-only 'oblig_scorecard_v1')
create table if not exists public.assessments (
  user_id uuid primary key references auth.users(id) on delete cascade,
  answers jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.assessments enable row level security;

drop policy if exists "assessments: read own" on public.assessments;
create policy "assessments: read own" on public.assessments
  for select using (auth.uid() = user_id);
drop policy if exists "assessments: upsert own" on public.assessments;
create policy "assessments: upsert own" on public.assessments
  for insert with check (auth.uid() = user_id);
drop policy if exists "assessments: update own" on public.assessments;
create policy "assessments: update own" on public.assessments
  for update using (auth.uid() = user_id);

-- 3. Risk register
create table if not exists public.risks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  category text,
  likelihood int not null default 3 check (likelihood between 1 and 5),
  impact int not null default 3 check (impact between 1 and 5),
  status text not null default 'open' check (status in ('open','mitigating','accepted','closed')),
  owner text,
  review_date date,
  mitigation text,
  market text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.risks enable row level security;

drop policy if exists "risks: full access to own rows" on public.risks;
create policy "risks: full access to own rows" on public.risks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 4. Policies (governance documents)
create table if not exists public.policies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  content text,
  framework_ref text,
  status text not null default 'draft' check (status in ('draft','review','published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.policies enable row level security;

drop policy if exists "policies: full access to own rows" on public.policies;
create policy "policies: full access to own rows" on public.policies
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 5. Evidence library
create table if not exists public.evidence (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  framework_ref text,
  file_note text,
  created_at timestamptz not null default now()
);

alter table public.evidence enable row level security;

drop policy if exists "evidence: full access to own rows" on public.evidence;
create policy "evidence: full access to own rows" on public.evidence
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
