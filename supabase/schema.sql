create extension if not exists pgcrypto;

create table if not exists public.feedback_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  state text not null,
  school_organisation text not null,
  participant_name text not null,
  email text not null,
  role text not null,
  facilitator text not null,
  answers jsonb not null default '{}'::jsonb
);

create table if not exists public.assessment_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  state text not null,
  school_organisation text not null,
  participant_name text not null,
  email text not null,
  role text not null,
  facilitator text not null,
  score integer not null,
  max_score integer not null,
  answers jsonb not null default '{}'::jsonb
);

alter table public.feedback_responses enable row level security;
alter table public.assessment_responses enable row level security;

drop policy if exists "public can submit feedback" on public.feedback_responses;
create policy "public can submit feedback" on public.feedback_responses for insert to anon, authenticated with check (true);
drop policy if exists "public can submit assessments" on public.assessment_responses;
create policy "public can submit assessments" on public.assessment_responses for insert to anon, authenticated with check (true);

revoke select, update, delete on public.feedback_responses from anon, authenticated;
revoke select, update, delete on public.assessment_responses from anon, authenticated;
grant insert on public.feedback_responses to anon, authenticated;
grant insert on public.assessment_responses to anon, authenticated;
