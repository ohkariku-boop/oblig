-- Run this after 0004 in the Supabase SQL Editor. Safe to run more than once.
--
-- The Copilot now makes real, paid OpenRouter calls with no protection —
-- the API endpoint is visible to anyone in the browser's network tab,
-- signed in or not. This adds two things: only a signed-in user's own
-- valid session can call it at all (calling the RPC below with an
-- invalid/missing token simply fails, since it relies on auth.uid()),
-- and each user is capped at a sane number of messages per day.

create table if not exists public.copilot_usage (
  user_id uuid not null references auth.users(id) on delete cascade,
  day date not null default current_date,
  count int not null default 0,
  primary key (user_id, day)
);

alter table public.copilot_usage enable row level security;

drop policy if exists "copilot_usage: own row only" on public.copilot_usage;
create policy "copilot_usage: own row only" on public.copilot_usage
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.increment_and_check_copilot_usage(daily_limit int default 40)
returns int
language plpgsql
security definer
set search_path = public
as $$
declare
  current_count int;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  insert into public.copilot_usage (user_id, day, count)
  values (auth.uid(), current_date, 1)
  on conflict (user_id, day) do update set count = copilot_usage.count + 1
  returning count into current_count;

  if current_count > daily_limit then
    raise exception 'RATE_LIMIT: daily AI Copilot limit reached (% messages)', daily_limit;
  end if;

  return current_count;
end;
$$;

revoke all on function public.increment_and_check_copilot_usage(int) from public;
grant execute on function public.increment_and_check_copilot_usage(int) to authenticated;
