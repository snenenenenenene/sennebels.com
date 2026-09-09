-- Guestbook. Run once against DATABASE_URL.
create table if not exists guestbook (
  id         bigint generated always as identity primary key,
  name       text        not null check (length(name) between 1 and 40),
  note       text                 check (note is null or length(note) <= 140),
  -- Salted hash of the signer's address, for rate limiting. Never the address.
  visitor    text        not null,
  -- Moderation is one UPDATE, not an admin panel.
  hidden     boolean     not null default false,
  created_at timestamptz not null default now()
);

create index if not exists guestbook_visible_idx on guestbook (created_at desc) where hidden = false;
create index if not exists guestbook_visitor_idx on guestbook (visitor, created_at desc);
