import type { Metadata } from "next";
import { Cat, Coffee, GameController, Mountains } from "@phosphor-icons/react/dist/ssr";
import { ASIDE, FUN, FUN_REBUS } from "../data/portfolio";
import { GlyphTile, Surface, type Tint } from "../components/ui";
import { Reveal } from "../components/motion";
import { RebusText } from "../components/rebus-text";
import { PageTitle } from "../components/section-header";

export const metadata: Metadata = {
  title: "Fun",
  description:
    "Four cats, a dog, mountains that are nowhere near Belgium, games played and built, and coffee. What Senne Bels does when he is not working.",
  alternates: { canonical: "https://sennebels.com/fun" },
};

const ICONS: { icon: typeof Cat; tint: Tint }[] = [
  { icon: Cat, tint: "red" },
  { icon: Mountains, tint: "blue" },
  { icon: GameController, tint: "yellow" },
  { icon: Coffee, tint: "red" },
];

export default function Fun() {
  return (
    <main className="mx-auto flex w-full max-w-[1280px] flex-col px-6 pb-24 pt-28 md:px-12 lg:px-16">
      <PageTitle title="When I am not working" lede="Which happens more than it should, and most of it ends up feeding the work anyway." />

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

      <div className="grid grid-cols-1 gap-5 pt-14 md:grid-cols-2">
        {FUN.map((f, i) => {
          const ic = ICONS[i % ICONS.length];
          return (
            <Reveal key={f.title} delay={(i % 2) * 0.07} y={32}>
              <Surface className="squircle flex h-full flex-col gap-3 p-7">
                <GlyphTile icon={ic.icon} tint={ic.tint} />
                <h2 className="text-title2 font-medium text-ink">{f.title}</h2>
                <RebusText
                  text={f.body}
                  marks={FUN_REBUS}
                  className="text-body leading-[2.05] text-ink-2"
                />
              </Surface>
            </Reveal>
          );
        })}
      </div>

    </main>
  );
}
