-- Run this after 0001_init.sql in the Supabase SQL Editor.
-- Safe to run more than once.

-- Evidence needs a type column (policy/screenshot/contract/audit/
-- certificate/report) to match the app's categorisation, added here
-- since 0001 already ran without it.
alter table public.evidence add column if not exists type text not null default 'policy'
  check (type in ('policy','screenshot','contract','audit','certificate','report'));

-- Error/monitoring log. Insert-only from the app (no read policy for
-- regular users) — Joe reviews these directly in the Supabase table
-- editor or SQL editor, not exposed back to the app's own users.
create table if not exists public.error_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  message text not null,
  stack text,
  path text,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.error_logs enable row level security;

-- Anyone (including anonymous visitors) can insert an error report, but
-- nobody can read them back through the app's anon/authenticated roles.
drop policy if exists "error_logs: anyone can insert" on public.error_logs;
create policy "error_logs: anyone can insert" on public.error_logs
  for insert with check (true);

-- Report generation history, so the Reports page reflects real activity
-- instead of only ever showing static demo cards.
create table if not exists public.report_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  report_type text not null,
  created_at timestamptz not null default now()
);

alter table public.report_log enable row level security;

drop policy if exists "report_log: full access to own rows" on public.report_log;
create policy "report_log: full access to own rows" on public.report_log
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
