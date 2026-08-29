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
import { ABOUT_REBUS, EDUCATION, EXPERIENCE, LANGUAGES, NUMBERS, PERSON, SKILL_GROUPS } from "../data/portfolio";
import { ACCENT_TEXT, CARD_TINT, GlyphTile, Heading, PILL_HOVER, ROW_TEXT, RULE_BG, type Tint } from "../components/ui";
import { Reveal } from "../components/motion";
import { RebusText } from "../components/rebus-text";
import { BrandMark, CompanyLogo, Flag, Mark, Monogram } from "../components/marks";
import { PageTitle } from "../components/section-header";
import Link from "next/link";
import { Greeting } from "../components/greeting";

export const metadata: Metadata = {
  title: "About",
  // answerBlock runs to 279 characters, which a result truncates. This is
  // the same claim inside the ~155 that actually renders.
  description:
    "Senne Bels, software engineer in Antwerp. Frontend lead on a platform used by 140,000 people, and six years of web, mobile and AI work behind that.",
  alternates: { canonical: "https://sennebels.com/about" },
};

const TRIO: Tint[] = ["red", "blue", "yellow"];

const STATS: { icon: typeof UsersThree; tint: Tint }[] = [
  { icon: UsersThree, tint: "red" },
  { icon: Lightning, tint: "blue" },
  { icon: GitCommit, tint: "yellow" },
  { icon: Clock, tint: "red" },
];

export default function About() {
  return (
    <main id="main" className="mx-auto flex w-full max-w-[1280px] flex-col px-6 pb-24 pt-28 md:px-12 lg:px-16">
      <PageTitle
        title="About"
        lede="The work, the numbers, and the tools I actually use."
      />

      <RebusText
        text={PERSON.answerBlock}
        marks={ABOUT_REBUS}
        className="mt-8 max-w-[62ch] text-lede leading-[2.2] text-ink-2"
      />

      <section className="pt-16">
        {/* role=list on a plain container: the stats read as term/definition
            pairs, but a <dl> may only nest one <div> deep and the reveal
            wrapper already spends that level. */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {NUMBERS.map((n, i) => {
            const st = STATS[i % STATS.length];
            return (
              <Reveal key={n.value} delay={i * 0.07}>
                {/* dt then dd, in that order, because that is what a definition
                    list means. Column-reverse puts the numeral on top visually
                    without the label being announced twice. */}
                <div
                  className={`squircle group/card flex h-full flex-col-reverse justify-end gap-2 rounded-panel p-6 shadow-none transition-[background-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-card-hover ${CARD_TINT[st.tint]}`}
                >
                  <p className="max-w-[24ch] text-callout text-ink-2">{n.label}</p>
                  <p className={`font-display text-title1 font-medium ${ACCENT_TEXT[st.tint]}`}>
                    {n.value}
                  </p>
                  <GlyphTile icon={st.icon} tint={st.tint} />
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-12 pt-20 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <section className="flex flex-col">
          <div className="pb-4">
            <Heading icon={Briefcase} tint="blue">
              Experience
            </Heading>
          </div>
          {EXPERIENCE.map((e, rowIndex) => {
            const rowTint = TRIO[rowIndex % TRIO.length];
            const mark = e.logo ? (
              <span className="transition-transform duration-300 ease-out group-hover/row:-translate-y-px">
                <CompanyLogo src={e.logo} name={e.org} mono={e.logoMono} />
              </span>
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
                  {e.caseStudy && (
                    <Link
                      href={`/work/${e.caseStudy}`}
                      className="w-fit text-caption text-ink-3 underline decoration-ink-3/30 underline-offset-[3px] transition-colors duration-200 hover:text-ink hover:decoration-ink"
                    >
                      Read the case study
                    </Link>
                  )}
                  <p className={`flex items-center gap-1 text-callout text-ink-3 transition-colors duration-200 ${ROW_TEXT[rowTint]}`}>
                    {/*
                      The rule wipes in from the left on scaleX rather than
                      animating width, so it stays on the compositor. The arrow
                      leaves with it, in the direction it points.
                    */}
                    <span className="relative">
                      {e.org}
                      {e.href && (
                        <span
                          aria-hidden
                          className={`absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover/row:scale-x-100 ${RULE_BG[rowTint]}`}
                        />
                      )}
                    </span>
                    {e.href && (
                      <ArrowUpRight
                        size={12}
                        weight="bold"
                        aria-hidden
                        className="translate-y-px opacity-0 transition-all duration-300 ease-out group-hover/row:translate-x-0.5 group-hover/row:opacity-100"
                      />
                    )}
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
            {/* Three I can use, the rest admired from a distance. */}
            <p className="mt-1 max-w-[34ch] text-callout text-ink-3">
              Plus a standing interest in the ones I cannot read.
            </p>
          </section>
        </div>
      </div>

      <section className="flex flex-col gap-6 pt-20">
        <Heading icon={Translate} tint="yellow">
          Hello, in whichever alphabet
        </Heading>
        <Greeting />
        <p className="max-w-[54ch] text-body leading-[1.9] text-ink-2">
          I would like to be working somewhere other than Belgium. Which country matters less
          to me than the move itself, so I am open to relocating for the right role, wherever
          that turns out to be.
        </p>
      </section>

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
                    className={`flex items-center gap-2 rounded-full bg-paper px-3 py-1.5 text-callout text-ink-2 transition-colors duration-200 ${PILL_HOVER[g.tint]}`}
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
