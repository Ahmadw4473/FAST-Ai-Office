create extension if not exists pgcrypto;

create table if not exists public.chats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'New chat',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid not null references public.chats(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

alter table public.chats enable row level security;
alter table public.messages enable row level security;

create policy "Users can read own chats"
on public.chats for select
using (auth.uid() = user_id);

create policy "Users can create own chats"
on public.chats for insert
with check (auth.uid() = user_id);

create policy "Users can update own chats"
on public.chats for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own chats"
on public.chats for delete
using (auth.uid() = user_id);

create policy "Users can read messages from own chats"
on public.messages for select
using (
  exists (
    select 1 from public.chats
    where chats.id = messages.chat_id
    and chats.user_id = auth.uid()
  )
);

create policy "Users can create messages in own chats"
on public.messages for insert
with check (
  exists (
    select 1 from public.chats
    where chats.id = messages.chat_id
    and chats.user_id = auth.uid()
  )
);

create policy "Users can delete messages from own chats"
on public.messages for delete
using (
  exists (
    select 1 from public.chats
    where chats.id = messages.chat_id
    and chats.user_id = auth.uid()
  )
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists chats_set_updated_at on public.chats;
create trigger chats_set_updated_at
before update on public.chats
for each row execute function public.set_updated_at();

create index if not exists chats_user_updated_idx on public.chats(user_id, updated_at desc);
create index if not exists messages_chat_created_idx on public.messages(chat_id, created_at asc);
