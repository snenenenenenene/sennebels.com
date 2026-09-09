import type { Stats } from "../lib/guestbook";
import type { Traffic } from "../lib/traffic";
import { CARD_COLORS, HAT_LABELS, isCardColor, isHat } from "../data/visitor";
import { HatMark } from "./hat";
import { MICRO } from "./ui";

/**
 * Stats for nerds. Everything here is measured rather than claimed, which is
 * the only reason to put numbers on a portfolio at all.
 *
 * A <details> rather than a tab or a route: it is an aside, and an aside that
 * costs a page load stops being one.
 */
export function StatsForNerds({ stats, traffic }: { stats: Stats; traffic: Traffic | null }) {
  return (
    <details className="squircle group/stats rounded-card bg-raised shadow-card">
      <summary className={`flex cursor-pointer list-none items-center justify-between gap-4 px-7 py-5 text-ink-2 ${MICRO}`}>
        Stats for nerds
        <span aria-hidden className="text-ink-3 transition-transform duration-200 group-open/stats:rotate-45">
          +
        </span>
      </summary>

      <div className="grid grid-cols-1 gap-8 px-7 pb-8 md:grid-cols-2">
        {traffic && (
          <section className="flex flex-col gap-3 md:col-span-2">
            <h3 className={`text-ink-3 ${MICRO}`}>Visits, last 30 days</h3>
            <Spark points={traffic.days.map((d) => d.views)} />
            <p className="text-callout text-ink-2">
              <strong className="font-medium text-ink">{traffic.views}</strong> views from{" "}
              <strong className="font-medium text-ink">{traffic.people}</strong> people. Small
              numbers, honestly reported.
            </p>
          </section>
        )}

        {traffic && traffic.top.length > 0 && (
          <section className="flex flex-col gap-3">
            <h3 className={`text-ink-3 ${MICRO}`}>Most read</h3>
            <Bars
              rows={traffic.top.map((t) => ({ key: t.path, label: t.path, n: t.views }))}
              tint="var(--sys-blue)"
            />
          </section>
        )}

        <section className="flex flex-col gap-3">
          <h3 className={`text-ink-3 ${MICRO}`}>Card colours</h3>
          {stats.colors.length ? (
            <Bars
              rows={stats.colors.map((c) => ({
                key: c.color,
                label: isCardColor(c.color) ? CARD_COLORS[c.color].label : c.color,
                n: c.n,
                color: isCardColor(c.color) ? CARD_COLORS[c.color].ground : undefined,
              }))}
              tint="var(--sys-red)"
            />
          ) : (
            <p className="text-callout text-ink-3">No cards yet.</p>
          )}
        </section>

        <section className="flex flex-col gap-3">
          <h3 className={`text-ink-3 ${MICRO}`}>Favourite hats</h3>
          {stats.hats.length ? (
            <ul className="flex flex-col gap-2">
              {stats.hats.slice(0, 5).map((h) => (
                <li key={h.hat} className="flex items-center gap-2.5 text-callout text-ink-2">
                  {isHat(h.hat) && <HatMark hat={h.hat} size={22} />}
                  <span>{isHat(h.hat) ? HAT_LABELS[h.hat] : h.hat}</span>
                  <span className={`ml-auto text-ink-3 ${MICRO}`}>{h.n}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-callout text-ink-3">Everyone is bare-headed so far.</p>
          )}
        </section>

        <section className="flex flex-col gap-3">
          <h3 className={`text-ink-3 ${MICRO}`}>Bothered to sign</h3>
          <p className="font-display text-title1 font-medium text-tone-yellow">
            {stats.total ? Math.round((stats.signed / stats.total) * 100) : 0}%
          </p>
          <p className="text-callout text-ink-3">
            {stats.signed} of {stats.total} drew something on the line.
          </p>
        </section>
      </div>
    </details>
  );
}

/** A sparkline. Sized in its own coordinate space and stretched by CSS. */
function Spark({ points }: { points: number[] }) {
  if (points.length < 2) return <p className="text-callout text-ink-3">Not enough days yet.</p>;
  const max = Math.max(...points, 1);
  const step = 100 / (points.length - 1);
  const line = points.map((v, i) => `${i * step},${30 - (v / max) * 28}`).join(" ");
  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-20 w-full" aria-hidden>
      <polygon points={`0,30 ${line} 100,30`} fill="var(--sys-blue)" opacity="0.14" />
      <polyline
        points={line}
        fill="none"
        stroke="var(--sys-blue)"
        strokeWidth="1.4"
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Bars({
  rows,
  tint,
}: {
  rows: { key: string; label: string; n: number; color?: string }[];
  tint: string;
}) {
  const max = Math.max(...rows.map((r) => r.n), 1);
  return (
    <ul className="flex flex-col gap-2.5">
      {rows.map((r) => (
        <li key={r.key} className="flex items-center gap-3">
          <span className="w-[11ch] shrink-0 truncate text-callout text-ink-2" title={r.label}>
            {r.label}
          </span>
          <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-paper">
            <span
              className="block h-full rounded-full"
              style={{ width: `${(r.n / max) * 100}%`, backgroundColor: r.color ?? tint }}
            />
          </span>
          <span className={`w-[4ch] shrink-0 text-right text-ink-3 ${MICRO}`}>{r.n}</span>
        </li>
      ))}
    </ul>
  );
}
