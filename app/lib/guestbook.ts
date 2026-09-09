import { neon } from "@neondatabase/serverless";
import { createHash } from "node:crypto";
import { NAME_MAX, NOTE_MAX } from "./guestbook-limits";

export { NAME_MAX, NOTE_MAX };

/**
 * The guestbook's data layer. One table, no ORM: this is three queries, and
 * a schema definition language would be more code than the queries it
 * generates.
 */
export type Entry = {
  id: number;
  name: string;
  note: string | null;
  color: string | null;
  hat: string | null;
  signature: unknown;
  created_at: string;
};

/** One signature per visitor per day. Enough for a guestbook, hostile to a script. */
const COOLDOWN_HOURS = 24;

function db() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

/**
 * Visitors are rate-limited by address, but the address is never stored.
 * A salted hash answers "has this person signed today" and nothing else,
 * which is the only question the table needs to ask.
 */
export function visitorHash(ip: string) {
  return createHash("sha256")
    .update(`${ip}:${process.env.GUESTBOOK_SALT ?? "sennebels"}`)
    .digest("hex");
}

export async function listEntries(limit = 200): Promise<Entry[]> {
  const sql = db();
  return (await sql`
    select id, name, note, color, hat, signature, created_at
    from guestbook
    where hidden = false
    order by created_at desc
    limit ${limit}
  `) as Entry[];
}

export async function countEntries(): Promise<number> {
  const sql = db();
  const rows = (await sql`select count(*)::int as n from guestbook where hidden = false`) as {
    n: number;
  }[];
  return rows[0]?.n ?? 0;
}

export async function hasSignedRecently(hash: string): Promise<boolean> {
  const sql = db();
  const rows = (await sql`
    select 1
    from guestbook
    where visitor = ${hash}
      and created_at > now() - make_interval(hours => ${COOLDOWN_HOURS})
    limit 1
  `) as unknown[];
  return rows.length > 0;
}

export async function addEntry(card: {
  name: string;
  note: string | null;
  color: string;
  hat: string;
  signature: unknown;
  hash: string;
}) {
  const sql = db();
  await sql`
    insert into guestbook (name, note, color, hat, signature, visitor)
    values (${card.name}, ${card.note}, ${card.color}, ${card.hat},
            ${card.signature ? JSON.stringify(card.signature) : null}, ${card.hash})
  `;
}

/**
 * The numbers behind the gallery. One pass over the table rather than five
 * round trips: the whole point of a stats panel is that it is cheap enough to
 * render on every page load.
 */
export type Stats = {
  total: number;
  signed: number;
  colors: { color: string; n: number }[];
  hats: { hat: string; n: number }[];
  days: { day: string; n: number }[];
  latest: string | null;
};

export async function stats(): Promise<Stats> {
  const sql = db();
  const [totals, colors, hats, days] = await Promise.all([
    sql`select count(*)::int total,
               count(signature)::int signed,
               max(created_at) latest
        from guestbook where hidden = false`,
    sql`select coalesce(color, 'unknown') color, count(*)::int n
        from guestbook where hidden = false group by color order by n desc`,
    sql`select coalesce(hat, 'none') hat, count(*)::int n
        from guestbook where hidden = false and coalesce(hat, 'none') <> 'none'
        group by hat order by n desc`,
    // Aliased `d`, not `day`: Postgres reads a bare `day` in GROUP BY as the
    // interval unit keyword and refuses the statement.
    sql`select to_char(created_at, 'YYYY-MM-DD') d, count(*)::int n
        from guestbook
        where hidden = false and created_at > now() - make_interval(days => 90)
        group by d order by d`,
  ]);
  const t = (totals as { total: number; signed: number; latest: string | null }[])[0];
  return {
    total: t?.total ?? 0,
    signed: t?.signed ?? 0,
    latest: t?.latest ?? null,
    colors: colors as Stats["colors"],
    hats: hats as Stats["hats"],
    days: (days as { d: string; n: number }[]).map((r) => ({ day: r.d, n: r.n })),
  };
}
