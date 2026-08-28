import type { Metadata } from "next";
import { ArrowUpRight, Cat, Coffee, FilmSlate, GameController, Guitar, Plant } from "@phosphor-icons/react/dist/ssr";
import { ASIDE, FILM_STATS, FILM_STRIP, FUN, FUN_BRANDS, FUN_REBUS } from "../data/portfolio";
import { ACCENT_TEXT, CARD_TINT, GlyphTile, type Tint } from "../components/ui";
import { Reveal } from "../components/motion";
import { RebusText } from "../components/rebus-text";
import { FilmStrip } from "../components/filmstrip";
import { BrandMark } from "../components/marks";
import { PageTitle } from "../components/section-header";

export const metadata: Metadata = {
  title: "Fun",
  description:
    "Four cats, a dog, mountains nowhere near Belgium, and games. What Senne Bels does when he is not working.",
  alternates: { canonical: "https://sennebels.com/fun" },
};

const TRIO: Tint[] = ["red", "blue", "yellow"];

const ICONS: { icon: typeof Cat; tint: Tint }[] = [
  { icon: Cat, tint: "red" },
  { icon: FilmSlate, tint: "blue" },
  { icon: Guitar, tint: "yellow" },
  { icon: Plant, tint: "red" },
  { icon: GameController, tint: "blue" },
  { icon: Coffee, tint: "yellow" },
];

export default function Fun() {
  return (
    <main className="mx-auto flex w-full max-w-[1280px] flex-col px-6 pb-24 pt-28 md:px-12 lg:px-16">
      <PageTitle title="When I am not working" lede="Which happens more than it should." />

      <div className="mt-8 flex max-w-[62ch] flex-col gap-4">
        {ASIDE.map((line) => (
          <RebusText
            key={line.slice(0, 24)}
            text={line}
            marks={FUN_REBUS}
            className="text-lede leading-[2.2] text-ink-2"
          />
        ))}
      </div>

      {/* Numbers from the Letterboxd export, not estimated. */}
      <dl className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {FILM_STATS.map((f, i) => (
          <div
            key={f.value}
            className={`squircle group/card flex flex-col-reverse justify-end gap-1.5 rounded-panel p-5 shadow-none transition-[background-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-card-hover ${CARD_TINT[TRIO[i % TRIO.length]]}`}
          >
            <dt className="text-callout text-ink-2">{f.label}</dt>
            <dd className={`font-display text-title1 font-medium ${ACCENT_TEXT[TRIO[i % TRIO.length]]}`}>
              {f.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8">
        <FilmStrip films={FILM_STRIP} href="https://letterboxd.com/___mclovin____/" />
      </div>

      <div className="grid grid-cols-1 gap-5 pt-14 md:grid-cols-2">
        {FUN.map((f, i) => {
          const ic = ICONS[i % ICONS.length];
          return (
            <Reveal key={f.title} delay={(i % 2) * 0.07} y={32}>
              <div
                className={`squircle group/card flex h-full flex-col gap-3 rounded-card p-7 shadow-none transition-[background-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-card-hover ${CARD_TINT[ic.tint]}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <GlyphTile icon={ic.icon} tint={ic.tint} />
                  {FUN_BRANDS[f.title] && (
                    <span className="flex items-center gap-2 text-ink-3">
                      {FUN_BRANDS[f.title].map((slug) => (
                        <BrandMark key={slug} slug={slug} size={17} />
                      ))}
                    </span>
                  )}
                </div>
                <h2 className="text-title2 font-medium text-ink">{f.title}</h2>
                <RebusText
                  text={f.body}
                  marks={FUN_REBUS}
                  className="text-body leading-[2.05] text-ink-2"
                />
              </div>
            </Reveal>
          );
        })}
      </div>

    </main>
  );
}
