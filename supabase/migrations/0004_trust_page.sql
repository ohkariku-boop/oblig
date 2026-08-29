-- Run this after 0003 in the Supabase SQL Editor.
-- Safe to run more than once.
--
-- Trust Page: a public, no-login-required page a client can share with a
-- bank/sales prospect showing their live readiness score. Sharing is
-- off by default per client — an owner must explicitly enable it.
--
-- Security design: anonymous visitors NEVER get direct table access.
-- They can only call get_trust_page(token), a SECURITY DEFINER function
-- that returns just the client's name and raw assessment answers (no
-- risks, policies, or evidence) for a client with sharing enabled and a
-- matching token — never a browsable list of every shared client, and
-- never anything beyond what the owner opted into sharing. Score
-- computation itself stays in the frontend, reusing the exact same
-- TypeScript logic the authenticated app already uses (assessment.ts),
-- rather than duplicating that logic a second time in SQL where it
-- could quietly drift out of sync.

alter table public.clients add column if not exists public_token uuid not null default gen_random_uuid();
alter table public.clients add column if not exists public_share_enabled boolean not null default false;

create or replace function public.get_trust_page(share_token uuid)
returns table (
  client_name text,
  answers jsonb,
  updated_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
  select c.name, coalesce(a.answers, '{}'::jsonb), a.updated_at
  from public.clients c
  left join public.assessments a on a.client_id = c.id
  where c.public_token = share_token and c.public_share_enabled = true
  limit 1;
end;
$$;

revoke all on function public.get_trust_page(uuid) from public;
grant execute on function public.get_trust_page(uuid) to anon, authenticated;
