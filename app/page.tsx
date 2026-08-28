import Link from "next/link";
import {
  ArrowUpRight,
  Cat,
  Coffee,
  EnvelopeSimple,
  FileText,
  GameController,
  GithubLogo,
  LinkedinLogo,
  Mountains,
  Terminal,
  UsersThree,
  Lightning,
  GitCommit,
  Clock,
  Briefcase,
  GraduationCap,
  Translate,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import {
  ALSO,
  FEATURED,
  PERSON,
} from "./data/portfolio";
import { ProjectCard, SmallCard } from "./components/ProjectCard";
import { ACCENT_TEXT, Chip, Glyph, GlyphTile, Heading, Surface, TAP, type Tint } from "./components/ui";
import { SectionHeader } from "./components/section-header";
import { LiftOnHover, Reveal, Rise, Stagger } from "./components/motion";

// Server component on purpose: every claim below ships in the HTML, so search
// engines and answer engines can read it without executing any JavaScript.
export default function Home() {
  return (
    <main id="top" className="mx-auto flex w-full max-w-[1280px] flex-col px-6 pb-24 pt-24 md:px-12 lg:px-16">
      <Hero />

      {/* Eyebrow budget: 8 sections allows 3. Used here, on About, and nowhere else. */}
      <section id="work" className="flex flex-col gap-stack pt-24">
        <h2 className="text-title1 font-medium text-ink">Selected work</h2>
        {FEATURED.map((project, i) => (
          <Reveal key={project.slug} y={40}>
            <ProjectCard project={project} flipped={i % 2 === 1} />
          </Reveal>
        ))}
      </section>

      <Also />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <header className="flex flex-col justify-center gap-9 pb-20 pt-20 md:pt-24">
      <Stagger className="flex flex-col gap-9">
        <Rise>
          <h1 className="max-w-[17ch] text-display font-medium">
            {PERSON.name}, a{" "}
            <span className="font-display italic leading-[1.15] text-tone-red">creative</span> software
            engineer.
          </h1>
        </Rise>

        <Rise>
          {/* Rebus: the marks sit inside the sentence, so words and glyphs read as one line. */}
          <p className="max-w-[56ch] text-lede text-ink-2">
            Six years remote-first building web, mobile and AI systems
            <Glyph icon={Terminal} tint="red" />, a game developer
            <Glyph icon={GameController} tint="blue" /> on the side, and full-time staff to four cats
            <Glyph icon={Cat} tint="yellow" />.
          </p>
        </Rise>

        <Rise>
          <p className="sr-only">{PERSON.answerBlock}</p>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2 text-callout">
            <IconLink href={PERSON.resume} label="Resume" icon={FileText} tint="red" />
            <IconLink href={PERSON.github} label="GitHub" icon={GithubLogo} tint="blue" />
            <IconLink href={PERSON.linkedin} label="LinkedIn" icon={LinkedinLogo} tint="yellow" />
            <IconLink href={`mailto:${PERSON.email}`} label="Email" icon={EnvelopeSimple} tint="red" />
          </ul>
        </Rise>
      </Stagger>
    </header>
  );
}

function IconLink({
  href,
  label,
  icon: I,
  tint,
}: {
  href: string;
  label: string;
  icon: typeof FileText;
  tint: Tint;
}) {
  return (
    <li>
      <a href={href} className="flex min-h-tap items-center gap-2 text-ink-2 transition-colors duration-200 hover:text-ink">
        <I size={19} weight="fill" aria-hidden className={ACCENT_TEXT[tint]} />
        {label}
      </a>
    </li>
  );
}

function Also() {
  return (
    <section className="flex flex-col gap-12 pt-24">
      <h2 className="max-w-[24ch] text-title1 font-medium">
        Things I build on my own time.
      </h2>
      <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
        {ALSO.map((item, i) => (
          <Reveal key={item.name} delay={(i % 3) * 0.07} y={40} className="flex">
            <LiftOnHover className="flex w-full">
              <SmallCard {...item} />
            </LiftOnHover>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const STATS: { icon: typeof UsersThree; tint: Tint }[] = [
  { icon: UsersThree, tint: "blue" },
  { icon: Lightning, tint: "yellow" },
  { icon: GitCommit, tint: "blue" },
  { icon: Clock, tint: "green" },
];

const MINE = [
  { label: "Transita", href: "https://transita.app" },
  { label: "Korf", href: "https://korf.app" },
];

const FOOTER_LINK =
  "flex min-h-tap items-center gap-2 text-ink-2 transition-colors duration-200 hover:text-tone-blue";

function Footer() {
  return (
    <footer className="flex flex-col gap-12 pb-16 pt-28">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-5">
          <h2 className="max-w-[16ch] font-display text-title1 font-medium italic text-moss">
            Come say hi
            <Glyph icon={Mountains} tint="yellow" />
          </h2>
          <p className="max-w-[52ch] text-body text-ink-2">
            Open to contract work, and to full-time roles in Canada or the United States that can
            sponsor a move. Currently pointed at Vancouver.
          </p>
          <a
            href={`mailto:${PERSON.email}`}
            className={`inline-flex w-fit items-center gap-2.5 rounded-full bg-mark-yellow px-6 py-3 text-body font-semibold text-[#1E1515] shadow-card-hover ${TAP}`}
          >
            {PERSON.email}
            <ArrowUpRight size={19} weight="bold" aria-hidden />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 text-callout">
          <div className="flex flex-col gap-3">
            <p className="text-caption font-medium text-ink-3">Elsewhere</p>
            {[
              { label: "GitHub", href: PERSON.github, icon: GithubLogo },
              { label: "LinkedIn", href: PERSON.linkedin, icon: LinkedinLogo },
              { label: "Resume", href: PERSON.resume, icon: FileText },
            ].map((l) => (
              <a key={l.label} href={l.href} className={FOOTER_LINK}>
                <l.icon size={17} weight="fill" aria-hidden className="text-ink-3" />
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-caption font-medium text-ink-3">Mine</p>
            {MINE.map((m) => (
              <a key={m.label} href={m.href} target="_blank" rel="noreferrer" className={FOOTER_LINK}>
                <ArrowUpRight size={14} weight="bold" aria-hidden className="text-ink-3" />
                {m.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <p className="text-caption text-ink-3">
        &copy; 2026 {PERSON.name}, {PERSON.locality}. Made on too much coffee, with four cats
        actively in the way.
      </p>
    </footer>
  );
}
