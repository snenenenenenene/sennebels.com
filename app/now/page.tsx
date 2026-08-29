import type { Metadata } from "next";
import { Briefcase, Cat, Cube, MapPin } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "../components/motion";
import { LinkedText } from "../components/linked-text";
import { PageTitle } from "../components/section-header";
import { CARD_TINT, GlyphTile, type Tint } from "../components/ui";

export const metadata: Metadata = {
  title: "Now",
  description:
    "What Senne Bels is working on in August 2026: the Tomorrowland app, frontend lead at BeeDee, Outpost, and his own products. Updated monthly.",
  alternates: { canonical: "https://sennebels.com/now" },
};

const UPDATED = "29 August 2026";

const NOW = [
  {
    title: "Work",
    icon: Briefcase,
    tint: "red" as Tint,
    body: "Right now I’m a senior mobile engineer on the Tomorrowland app, frontend lead at BeeDee, and a full-stack engineer with Outpost. Three very different codebases, which is how I like it.",
  },
  {
    title: "My own things",
    icon: Cube,
    tint: "blue" as Tint,
    body: "Transita has paying customers. Korf is on both app stores. Keepr is live, Stadiq is in private beta, and Faultline is the game I’m still building: twelve players, one disaster, and a map that decides who gets out.",
  },
  {
    title: "Where next",
    icon: MapPin,
    tint: "yellow" as Tint,
    body: "Still in Antwerp, though not permanently. I would like the next stretch to be somewhere else entirely, and I am open to roles abroad and to relocating for one.",
  },
  {
    title: "Away from the laptop",
    icon: Cat,
    tint: "red" as Tint,
    body: "Four cats and a dog at home. Guitar most days. Too many films, too many plants, and strategy-game achievement runs that take far too long.",
  },
] as const;

export default function Now() {
  return (
    <main id="main" className="mx-auto flex w-full max-w-[1280px] flex-col px-6 pb-24 pt-28 md:px-12 lg:px-16">
      <PageTitle
        title="What I’m doing now"
        lede="A current snapshot, because a job title is a fairly bad summary of a person."
      />

      <p className="mt-5 text-callout text-ink-3">Last updated {UPDATED}, from Antwerp.</p>

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
        {NOW.map((item, index) => (
          <Reveal key={item.title} delay={(index % 2) * 0.07} className="flex">
            <section
              className={`squircle flex h-full w-full flex-col gap-4 rounded-card p-7 shadow-none transition-[background-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-card-hover ${CARD_TINT[item.tint]}`}
            >
              <GlyphTile icon={item.icon} tint={item.tint} />
              <h2 className="text-title2 font-medium text-ink">{item.title}</h2>
              <LinkedText text={item.body} className="text-body leading-[1.75] text-ink-2" />
            </section>
          </Reveal>
        ))}
      </div>

      <p className="mt-12 max-w-[62ch] text-callout text-ink-3">
        This is a{" "}
        <a
          href="https://nownownow.com/about"
          target="_blank"
          rel="noreferrer"
          className="underline decoration-ink-3/40 underline-offset-4 transition-colors hover:text-tone-blue"
        >
          /now page
        </a>
        . The idea is Derek Sivers’s: say what has your attention now, then keep it honest.
      </p>
    </main>
  );
}
