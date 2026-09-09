-- Visitor cards: the guestbook stops being a list of names and becomes a
-- drawer of issued library cards. Colour, hat and signature are chosen during
-- onboarding; all three are nullable so the rows written before this migration
-- still render.
alter table guestbook add column if not exists color     text;
alter table guestbook add column if not exists hat       text;
-- Normalised polylines, [[[x,y],...],...] with x and y in 0..1, so a signature
-- drawn on a phone renders at any size. Not an image: this is a few hundred
-- bytes and needs no object store.
alter table guestbook add column if not exists signature jsonb;
