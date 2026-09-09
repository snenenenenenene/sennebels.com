import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { LOGS, type LogEntry } from "../data/logs";
import { DirectionalLink } from "./transition";
import { MICRO } from "./ui";

/**
 * Log prose, with [label](href) turned into links.
 *
 * A log entry is one sentence about a thing, and the thing usually lives at a
 * URL. Anything heavier than this (MDX, a CMS) buys formatting nobody writing
 * a two-line note is going to reach for.
 */
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

export function LogBody({ body, className = "" }: { body: string; className?: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;

  for (const m of body.matchAll(LINK)) {
    if (m.index! > last) parts.push(body.slice(last, m.index));
    parts.push(
      <a
        key={`${m[2]}-${m.index}`}
        href={m[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-ink underline decoration-tone-red/35 decoration-2 underline-offset-[3px] transition-colors duration-200 hover:decoration-tone-red"
      >
        {m[1]}
      </a>,
    );
    last = m.index! + m[0].length;
  }
  if (last < body.length) parts.push(body.slice(last));

  return <p className={className}>{parts}</p>;
}

/** "9 September 2026", from the ISO the data carries. */
export function logDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * The latest entry, at the top of the front page.
 *
 * Inverted on purpose: it is the one element above the work that is about
 * right now rather than about the last six years, and it has to read as a
 * different kind of thing than the cards under it.
 */
export function LatestLog() {
  const latest: LogEntry | undefined = LOGS[0];
  if (!latest) return null;

  return (
    <aside className="squircle flex flex-col gap-4 rounded-card bg-ink p-7 text-paper md:flex-row md:items-start md:gap-10 md:p-9">
      <div className="flex shrink-0 flex-col gap-1">
        <p className={`text-paper/55 ${MICRO}`}>
          Latest log
        </p>
        <time dateTime={latest.date} className={`text-paper/45 ${MICRO} tracking-[0.1em]`}>
          {logDate(latest.date)}
        </time>
      </div>

      <div className="flex flex-col items-start gap-4">
        <LogBody
          body={latest.body}
          className="max-w-[62ch] text-body leading-[1.75] text-paper/85 [&_a]:text-paper [&_a]:decoration-mark-yellow/60 hover:[&_a]:decoration-mark-yellow"
        />
        <DirectionalLink
          href="/now"
          direction="nav-forward"
          className="group/log flex items-center gap-2 text-callout font-medium text-mark-yellow"
        >
          All logs
          <ArrowRight
            size={15}
            weight="bold"
            aria-hidden
            className="transition-transform duration-200 group-hover/log:translate-x-1"
          />
        </DirectionalLink>
      </div>
    </aside>
  );
}
