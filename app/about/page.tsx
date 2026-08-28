import type { Metadata } from "next";
import {
  Briefcase,
  Clock,
  GitCommit,
  GraduationCap,
  Lightning,
  Translate,
  UsersThree,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import { EDUCATION, EXPERIENCE, LANGUAGES, NUMBERS, PERSON, SKILL_GROUPS } from "../data/portfolio";
import { ACCENT_TEXT, GlyphTile, Heading, Surface, type Tint } from "../components/ui";
import { Reveal } from "../components/motion";
import { SectionHeader } from "../components/section-header";

export const metadata: Metadata = {
  title: "About",
  description: PERSON.answerBlock,
  alternates: { canonical: "https://sennebels.com/about" },
};

const STATS: { icon: typeof UsersThree; tint: Tint }[] = [
  { icon: UsersThree, tint: "blue" },
  { icon: Lightning, tint: "orange" },
  { icon: GitCommit, tint: "indigo" },
  { icon: Clock, tint: "teal" },
];

export default function About() {
  return (
    <main className="mx-auto flex w-full max-w-[1280px] flex-col px-6 pb-24 pt-28 md:px-12 lg:px-16">
      <SectionHeader as="h1" label="About" aside="the short version" />

      <p className="mt-8 max-w-[62ch] text-lede text-ink-2">{PERSON.answerBlock}</p>

      <section className="pt-16">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {NUMBERS.map((n, i) => {
            const st = STATS[i % STATS.length];
            return (
              <Reveal key={n.value} delay={i * 0.07}>
                {/* dt then dd, in that order, because that is what a definition
                    list means. Column-reverse puts the numeral on top visually
                    without the label being announced twice. */}
                <Surface className="squircle flex h-full flex-col-reverse justify-end gap-2 p-6">
                  <dt className="max-w-[24ch] text-callout text-ink-3">{n.label}</dt>
                  <dd className={`font-display text-title1 font-medium ${ACCENT_TEXT[st.tint]}`}>
                    {n.value}
                  </dd>
                  <GlyphTile icon={st.icon} tint={st.tint} />
                </Surface>
              </Reveal>
            );
          })}
        </dl>
      </section>

      <div className="grid grid-cols-1 gap-12 pt-20 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <section className="flex flex-col">
          <div className="pb-4">
            <Heading icon={Briefcase} tint="indigo">
              Experience
            </Heading>
          </div>
          {EXPERIENCE.map((e) => (
            <div
              key={e.role + e.org}
              className="flex flex-col gap-1 rounded-tile px-4 py-3.5 transition-colors duration-200 odd:bg-raised hover:bg-raised sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div className="flex flex-col gap-0.5">
                <p className="text-body font-medium">{e.role}</p>
                <p className="text-callout text-ink-3">{e.org}</p>
              </div>
              <p className="shrink-0 text-caption text-ink-3">{e.dates}</p>
            </div>
          ))}
        </section>

        <div className="flex flex-col gap-10">
          <section className="flex flex-col gap-3">
            <Heading icon={GraduationCap} tint="orange">
              Education
            </Heading>
            <p className="text-body">{EDUCATION.degree}</p>
            <p className="text-callout text-ink-3">{EDUCATION.detail}</p>
          </section>
          <section className="flex flex-col gap-3">
            <Heading icon={Translate} tint="teal">
              Languages
            </Heading>
            <ul className="flex flex-col gap-2 text-body text-ink-2">
              {LANGUAGES.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Grouped, not thirty loose chips. Same keywords, a fifth of the space. */}
      <section className="flex flex-col gap-5 pt-20">
        <Heading icon={Wrench} tint="blue">
          Skills
        </Heading>
        <dl className="flex flex-col">
          {SKILL_GROUPS.map((g) => (
            <div
              key={g.label}
              className="flex flex-col gap-1 rounded-tile px-4 py-3.5 odd:bg-raised sm:flex-row sm:gap-8"
            >
              <dt className="shrink-0 text-callout font-semibold sm:w-32">{g.label}</dt>
              <dd className="text-callout text-ink-2">{g.items}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
