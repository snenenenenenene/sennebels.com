import type { Metadata } from "next";
import { countEntries, listEntries } from "../lib/guestbook";
import { CARD_TINT, MICRO, PINNED, type Tint } from "../components/ui";
import { PageTitle } from "../components/section-header";
import { PageTransition } from "../components/transition";
import { Reveal } from "../components/motion";
import { SignForm } from "./sign-form";

export const metadata: Metadata = {
  title: "Guestbook",
  description:
    "Sign Senne Bels's guestbook. A page of people who passed through, in their own words.",
  alternates: { canonical: "https://sennebels.com/guestbook" },
};

// Entries are written by visitors, so this cannot be baked at build time.
export const dynamic = "force-dynamic";

const TRIO: Tint[] = ["red", "blue", "yellow"];

export default async function Guestbook() {
  // A guestbook whose database is down should still render its page and say
  // so, rather than 500 on a route that is not load-bearing.
  let entries: Awaited<ReturnType<typeof listEntries>> = [];
  let total = 0;
  let broken = false;
  try {
    [entries, total] = await Promise.all([listEntries(), countEntries()]);
  } catch {
    broken = true;
  }

  return (
    <PageTransition>
      <main
        id="main"
        className="mx-auto flex w-full max-w-[1280px] flex-col px-6 pb-24 pt-28 md:px-12 lg:px-16"
      >
        <PageTitle
          title="Guestbook"
          lede="Most of the web is people passing through without leaving a mark. This is the other thing."
        />

        <p className={`mt-5 text-ink-3 ${MICRO}`}>
          {total} {total === 1 ? "signature" : "signatures"}
        </p>

        <div className="mt-12 max-w-[46rem]">
          {broken ? (
            <p className="text-body text-ink-2">
              The guestbook is having a moment. Try again shortly.
            </p>
          ) : (
            <SignForm />
          )}
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((e, i) => (
            <Reveal key={e.id} delay={Math.min(i, 6) * 0.04} className="flex">
              <li
                className={`squircle flex h-full w-full flex-col gap-3 rounded-panel p-6 ${PINNED} ${
                  CARD_TINT[TRIO[i % TRIO.length]]
                }`}
              >
                <p className="font-display text-title3 font-medium text-ink">{e.name}</p>
                {e.note && <p className="text-callout leading-[1.7] text-ink-2">{e.note}</p>}
                <time
                  dateTime={new Date(e.created_at).toISOString()}
                  className={`mt-auto pt-2 text-ink-3 ${MICRO} tracking-[0.1em]`}
                >
                  {new Date(e.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </li>
            </Reveal>
          ))}
        </ul>

        {!broken && entries.length === 0 && (
          <p className="mt-16 text-body text-ink-2">Nobody yet. Be the first.</p>
        )}
      </main>
    </PageTransition>
  );
}
