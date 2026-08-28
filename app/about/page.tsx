import type { Metadata } from "next";
import {
  Briefcase,
  Clock,
  GitCommit,
  ArrowUpRight,
  GraduationCap,
  Lightning,
  Translate,
  UsersThree,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import { EDUCATION, EXPERIENCE, LANGUAGES, NUMBERS, PERSON, SKILL_GROUPS } from "../data/portfolio";
import { ACCENT_TEXT, GlyphTile, Heading, Surface, type Tint } from "../components/ui";
import { Reveal } from "../components/motion";
import { BrandMark, CompanyLogo, Flag, Mark, Monogram } from "../components/marks";
import { PageTitle } from "../components/section-header";

export const metadata: Metadata = {
  title: "About",
  description: PERSON.answerBlock,
  alternates: { canonical: "https://sennebels.com/about" },
};

const STATS: { icon: typeof UsersThree; tint: Tint }[] = [
  { icon: UsersThree, tint: "blue" },
  { icon: Lightning, tint: "yellow" },
  { icon: GitCommit, tint: "blue" },
  { icon: Clock, tint: "green" },
];

export default function About() {
  return (
    <main className="mx-auto flex w-full max-w-[1280px] flex-col px-6 pb-24 pt-28 md:px-12 lg:px-16">
      <PageTitle
        title="About"
        lede="Six years of it, in the order it happened."
      />

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
            <Heading icon={Briefcase} tint="blue">
              Experience
            </Heading>
          </div>
          {EXPERIENCE.map((e) => {
            const mark = e.logo ? (
              <CompanyLogo src={e.logo} name={e.org} mono={e.logoMono} />
            ) : e.slug ? (
              <span className="grid size-[29px] shrink-0 place-items-center text-ink">
                <BrandMark slug={e.slug} size={24} />
              </span>
            ) : (
              <Monogram name={e.org} tint={e.tint} size={29} />
            );

            const body = (
              <>
                {mark}
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="truncate text-body font-medium leading-[1.35]">{e.role}</p>
                  <p className="flex items-center gap-1 text-callout text-ink-3">
                    {e.org}
                    {e.href && <ArrowUpRight size={12} weight="bold" aria-hidden />}
                  </p>
                </div>
                <p className="shrink-0 text-callout tabular-nums text-ink-3">{e.dates}</p>
              </>
            );

            // The whole row is the target, which is both the iOS list pattern
            // and the only way a 29pt mark and one line of copy clear 44pt.
            const cls =
              "flex min-h-tap items-center gap-3 rounded-tile px-4 py-[11px] transition-colors duration-200 odd:bg-raised hover:bg-raised";

            return e.href ? (
              <a
                key={e.role + e.org}
                href={e.href}
                target="_blank"
                rel="noreferrer"
                className={`${cls} group/row`}
              >
                {body}
              </a>
            ) : (
              <div key={e.role + e.org} className={cls}>
                {body}
              </div>
            );
          })}
        </section>

        <div className="flex flex-col gap-10">
          <section className="flex flex-col gap-3">
            <Heading icon={GraduationCap} tint="yellow">
              Education
            </Heading>
            <p className="text-body">{EDUCATION.degree}</p>
            <p className="text-callout text-ink-3">{EDUCATION.detail}</p>
          </section>
          <section className="flex flex-col gap-3">
            <Heading icon={Translate} tint="green">
              Languages
            </Heading>
            <ul className="flex flex-col gap-2.5">
              {LANGUAGES.map((l) => (
                <li key={l.code} className="flex items-center gap-2.5 text-body text-ink-2">
                  <Flag code={l.code} />
                  {l.label}
                  <span className="text-callout text-ink-3">{l.level}</span>
                </li>
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
        <dl className="flex flex-col gap-2">
          {SKILL_GROUPS.map((g) => (
            <div
              key={g.label}
              className="flex flex-col gap-3 rounded-panel px-4 py-4 odd:bg-raised sm:flex-row sm:items-center sm:gap-8"
            >
              <dt className="shrink-0 text-callout font-semibold sm:w-28">{g.label}</dt>
              <dd className="flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span
                    key={g.label + it.name}
                    className="flex items-center gap-2 rounded-full bg-paper px-3 py-1.5 text-callout text-ink-2"
                  >
                    <Mark name={it.name} slug={it.slug} tint={g.tint} size={14} />
                    {it.name}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
