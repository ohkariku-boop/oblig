-- Inventory + evidence linking (Phase A0–C foundation).
-- Safe to run more than once.
-- AI systems are the unit of analysis; vendors attach to systems.

-- Vendors
create table if not exists public.vendors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  name text not null,
  products text,
  ai_involvement text not null default 'none'
    check (ai_involvement in ('none','partial','core')),
  data_access text,
  jurisdictions text,
  criticality text not null default 'medium'
    check (criticality in ('low','medium','high','critical')),
  certifications text,
  notes text,
  review_status text not null default 'draft'
    check (review_status in ('draft','in_review','approved')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.vendors enable row level security;

drop policy if exists "vendors: full access to own rows" on public.vendors;
create policy "vendors: full access to own rows" on public.vendors
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists vendors_client_id_idx on public.vendors (client_id);

-- AI systems (unit of analysis)
create table if not exists public.ai_systems (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  name text not null,
  purpose text,
  owner_name text,
  business_unit text,
  jurisdiction text,
  lifecycle_status text not null default 'discovered'
    check (lifecycle_status in ('discovered','pilot','production','retired')),
  risk_level text not null default 'medium'
    check (risk_level in ('low','medium','high','critical')),
  model_name text,
  vendor_id uuid references public.vendors(id) on delete set null,
  data_sources text,
  data_classification text,
  processes_customer_data boolean not null default false,
  human_oversight text,
  is_agent boolean not null default false,
  agent_allowed_actions text,
  agent_approval_required boolean not null default false,
  production boolean not null default false,
  controls_notes text,
  review_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.ai_systems enable row level security;

drop policy if exists "ai_systems: full access to own rows" on public.ai_systems;
create policy "ai_systems: full access to own rows" on public.ai_systems
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists ai_systems_client_id_idx on public.ai_systems (client_id);
create index if not exists ai_systems_vendor_id_idx on public.ai_systems (vendor_id);

-- Evidence linking: control / checklist / system / vendor refs (metadata still OK)
alter table public.evidence add column if not exists control_ref text;
alter table public.evidence add column if not exists checklist_key text;
alter table public.evidence add column if not exists system_id uuid references public.ai_systems(id) on delete set null;
alter table public.evidence add column if not exists vendor_id uuid references public.vendors(id) on delete set null;
alter table public.evidence add column if not exists coverage_status text
  default 'partial'
  check (coverage_status is null or coverage_status in ('none','partial','full'));

-- Optional control tags on systems (comma-separated control ids from trm library)
alter table public.ai_systems add column if not exists control_refs text;
