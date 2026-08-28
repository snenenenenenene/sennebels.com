import type { Metadata } from "next";
import { Cat, Coffee, GameController, Mountains } from "@phosphor-icons/react/dist/ssr";
import { ASIDE, FUN, PERSON } from "../data/portfolio";
import { GlyphTile, Surface, type Tint } from "../components/ui";
import { Reveal } from "../components/motion";
import { SectionHeader } from "../components/section-header";

export const metadata: Metadata = {
  title: "Fun",
  description:
    "Four cats, a dog, mountains that are nowhere near Belgium, games played and built, and coffee. What Senne Bels does when he is not working.",
  alternates: { canonical: "https://sennebels.com/fun" },
};

const ICONS: { icon: typeof Cat; tint: Tint }[] = [
  { icon: Cat, tint: "pink" },
  { icon: Mountains, tint: "teal" },
  { icon: GameController, tint: "indigo" },
  { icon: Coffee, tint: "orange" },
];

export default function Fun() {
  return (
    <main className="mx-auto flex w-full max-w-[1280px] flex-col px-6 pb-28 pt-24 md:px-12 lg:px-16">
      <SectionHeader as="h1" label="When I am not working" aside="which is more than it should be" />

      <div className="mt-8 flex max-w-[62ch] flex-col gap-4">
        {ASIDE.map((line) => (
          <p key={line.slice(0, 24)} className="text-lede text-ink-2">
            {line}
          </p>
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
                <p className="text-body text-ink-2">{f.body}</p>
              </Surface>
            </Reveal>
          );
        })}
      </div>

      <p className="pt-16 text-callout text-ink-3">
        Say hello at{" "}
        <a href={`mailto:${PERSON.email}`} className="inline-flex min-h-tap items-center font-medium text-moss">
          {PERSON.email}
        </a>
        .
      </p>
    </main>
  );
}
