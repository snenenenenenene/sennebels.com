import type { Metadata } from "next";
import { listEntries, stats as loadStats, type Stats } from "../lib/guestbook";
import { traffic as loadTraffic, type Traffic } from "../lib/traffic";
import { parseSignature, isCardColor, isHat, type CardColor } from "../data/visitor";
import { VisitorCard } from "../components/visitor-card";
import { StatsForNerds } from "../components/stats";
import { MICRO, PINNED, TAP } from "../components/ui";
import { PageTitle } from "../components/section-header";
import { PageTransition } from "../components/transition";
import { DirectionalLink } from "../components/transition";
import { Reveal } from "../components/motion";

export const metadata: Metadata = {
  title: "Visitor gallery",
  description:
    "Everyone who has passed through sennebels.com, as the cards they were issued. Plus what the site's own numbers actually say.",
  alternates: { canonical: "https://sennebels.com/guestbook" },
};

export const dynamic = "force-dynamic";

const FALLBACK: CardColor[] = ["red", "blue", "yellow", "green"];

export default async function Gallery() {
  let entries: Awaited<ReturnType<typeof listEntries>> = [];
  let stats: Stats | null = null;
  let broken = false;
  try {
    [entries, stats] = await Promise.all([listEntries(), loadStats()]);
  } catch {
    broken = true;
  }

  // Traffic is decoration on someone else's API. It must never take the page
  // down with it.
  let traffic: Traffic | null = null;
  try {
    traffic = await loadTraffic();
  } catch {
    traffic = null;
  }

  return (
    <PageTransition>
      <main
        id="main"
        className="mx-auto flex w-full max-w-[1280px] flex-col px-6 pb-24 pt-28 md:px-12 lg:px-16"
      >
        <PageTitle
          title="Visitor gallery"
          lede="Most of the web is people passing through without leaving a mark. This is the other thing."
        />

        <p className={`mt-5 text-ink-3 ${MICRO}`}>
          {stats?.total ?? 0} {stats?.total === 1 ? "card issued" : "cards issued"}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <DirectionalLink
            href="/welcome"
            direction="nav-forward"
            className={`inline-flex items-center rounded-full bg-mark-yellow px-6 py-3 text-body font-semibold text-[#1E1515] shadow-card-hover ${TAP}`}
          >
            Get your card
          </DirectionalLink>
          {broken && (
            <p className="text-body text-ink-2">The gallery is having a moment. Try again shortly.</p>
          )}
        </div>

        {stats && (
          <div className="mt-12">
            <StatsForNerds stats={stats} traffic={traffic} />
          </div>
        )}

        <ul className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((e, i) => (
            <Reveal key={e.id} delay={Math.min(i, 6) * 0.04} className="flex">
              <li className={`flex w-full flex-col gap-3 ${PINNED}`}>
                <VisitorCard
                  name={e.name}
                  color={isCardColor(e.color ?? "") ? (e.color as CardColor) : FALLBACK[i % FALLBACK.length]}
                  hat={isHat(e.hat ?? "") ? (e.hat as never) : "none"}
                  signature={parseSignature(e.signature)}
                  issued={new Date(e.created_at)}
                  serial={e.id}
                />
                {e.note && <p className="px-1 text-callout leading-[1.7] text-ink-2">{e.note}</p>}
              </li>
            </Reveal>
          ))}
        </ul>

        {!broken && entries.length === 0 && (
          <p className="mt-14 text-body text-ink-2">Nobody yet. Be the first.</p>
        )}
      </main>
    </PageTransition>
  );
}
