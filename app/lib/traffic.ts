/**
 * Real traffic for this site, from the PostHog project it already reports to.
 *
 * The numbers are small and that is the point: a stats page that only exists
 * once it flatters you is a marketing page. This one prints what happened.
 */
export type Traffic = {
  days: { day: string; views: number; people: number }[];
  views: number;
  people: number;
  top: { path: string; views: number }[];
};

const HOSTS = "'sennebels.com', 'www.sennebels.com'";

async function query(hogql: string): Promise<unknown[][]> {
  const host = process.env.POSTHOG_HOST ?? "https://eu.posthog.com";
  const id = process.env.POSTHOG_PROJECT_ID;
  const key = process.env.POSTHOG_API_KEY;
  if (!id || !key) throw new Error("PostHog is not configured");

  const res = await fetch(`${host}/api/projects/${id}/query/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: { kind: "HogQLQuery", query: hogql } }),
    // An hour is plenty fresh for a page about the last thirty days, and it
    // keeps a refresh-happy visitor off PostHog's rate limit.
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`PostHog said ${res.status}`);
  return (await res.json()).results ?? [];
}

export async function traffic(): Promise<Traffic> {
  const [daily, top] = await Promise.all([
    query(`select toDate(timestamp) d, count() v, count(distinct person_id) p
           from events
           where event = '$pageview' and properties.$host in (${HOSTS})
             and timestamp > now() - interval 30 day
           group by d order by d`),
    query(`select properties.$pathname path, count() v
           from events
           where event = '$pageview' and properties.$host in (${HOSTS})
             and timestamp > now() - interval 30 day
           group by path order by v desc limit 6`),
  ]);

  const days = (daily as [string, number, number][]).map(([day, views, people]) => ({
    day,
    views,
    people,
  }));

  return {
    days,
    views: days.reduce((n, d) => n + d.views, 0),
    // Summing daily uniques would double-count anyone who came twice, so the
    // headline figure is asked for separately rather than derived.
    people: (
      (await query(`select count(distinct person_id) from events
                    where event = '$pageview' and properties.$host in (${HOSTS})
                      and timestamp > now() - interval 30 day`)) as [number][]
    )[0]?.[0] ?? 0,
    top: (top as [string, number][]).map(([path, views]) => ({ path, views })),
  };
}
