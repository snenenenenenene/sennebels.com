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
    select id, name, note, created_at
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

export async function addEntry(name: string, note: string | null, hash: string) {
  const sql = db();
  await sql`
    insert into guestbook (name, note, visitor)
    values (${name}, ${note}, ${hash})
  `;
}
