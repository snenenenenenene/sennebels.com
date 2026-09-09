/**
 * The log: short, dated notes on what is actually in front of me this week.
 *
 * A "now" page answers what I am doing in general and goes stale quietly. A
 * dated log cannot: an entry from four months ago is visibly from four months
 * ago, so the page either gets written or it admits it has not been.
 *
 * Newest first. `body` takes inline [label](href) links, because half of what
 * is worth saying here points somewhere.
 */
export type LogEntry = {
  /** ISO, so entries sort and a <time> element has something valid to carry. */
  date: string;
  body: string;
};

export const LOGS: LogEntry[] = [
  {
    date: "2026-09-09",
    body: "Rebuilt this site's front page around the work rather than around me: every project card now leads with what it actually did. Also fixed the thing where the whole site scrolled sideways on a phone, which had been true for longer than I would like to admit.",
  },
  {
    date: "2026-09-07",
    body: "[Transita](https://transita.app) is quietly running. Spent the week cutting the alerts that pinged me for every single signup, which is a nice problem to have arrived at and a bad one to keep.",
  },
  {
    date: "2026-09-05",
    body: "[Faultline](https://github.com/snenenenenenene/faultline) had seven maps and ninety-eight boxes, and not one of them was worth walking into. Threw the geometry out and started again: a quarry, a fairground, an office block. Levels should be places.",
  },
  {
    date: "2026-09-04",
    body: "Scritch's landing page was losing people on mobile before they read a word of it. Led with the product instead of the pitch and went after the load time. Launch push is next.",
  },
  {
    date: "2026-08-24",
    body: "Stadiq is in private beta with Antwerp roadworks data. Wrote down the prices a visitor can actually pay, and named only the sources I actually read, which between them removed most of the marketing.",
  },
];
