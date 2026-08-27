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
  EDUCATION,
  EXPERIENCE,
  FEATURED,
  FUN,
  LANGUAGES,
  NUMBERS,
  PERSON,
  SKILLS,
} from "./data/portfolio";
import { ProjectCard, SmallCard } from "./components/ProjectCard";
import { Dock } from "./components/dock";
import { Chip, Glyph, SectionHeader } from "./components/ui";
import { LiftOnHover, Reveal, Rise, Stagger } from "./components/motion";

// Server component on purpose: every claim below ships in the HTML, so search
// engines and answer engines can read it without executing any JavaScript.
export default function Home() {
  return (
    <main id="top" className="mx-auto flex w-full max-w-[1280px] flex-col px-6 pb-28 md:px-12 lg:px-16">
      <Hero />

      {/* Eyebrow budget: 8 sections allows 3. Used here, on About, and nowhere else. */}
      <section id="work" className="pt-24">
        <SectionHeader label="Selected work" aside="five that matter most" />
        {FEATURED.map((project, i) => (
          <Reveal key={project.slug} y={40}>
            <ProjectCard project={project} flipped={i % 2 === 1} />
          </Reveal>
        ))}
      </section>

      <Also />
      <Numbers />
      <About />
      <Skills />
      <Fun />
      <Footer />
      <Dock
        links={{
          resume: PERSON.resume,
          github: PERSON.github,
          linkedin: PERSON.linkedin,
          email: `mailto:${PERSON.email}`,
        }}
      />
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
            <span className="font-display italic leading-[1.15] text-moss">creative</span> software
            engineer.
          </h1>
        </Rise>

        <Rise>
          {/* Rebus: the marks sit inside the sentence, so words and glyphs read as one line. */}
          <p className="max-w-[56ch] text-lede text-ink-2">
            Six years remote-first building web, mobile and AI systems
            <Glyph icon={Terminal} />, a game developer
            <Glyph icon={GameController} /> on the side, and full-time staff to four cats
            <Glyph icon={Cat} />.
          </p>
        </Rise>

        <Rise>
          <p className="sr-only">{PERSON.answerBlock}</p>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2 text-callout">
            <IconLink href={PERSON.resume} label="Resume" icon={FileText} />
            <IconLink href={PERSON.github} label="GitHub" icon={GithubLogo} />
            <IconLink href={PERSON.linkedin} label="LinkedIn" icon={LinkedinLogo} />
            <IconLink href={`mailto:${PERSON.email}`} label="Email" icon={EnvelopeSimple} />
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
}: {
  href: string;
  label: string;
  icon: typeof FileText;
}) {
  return (
    <li>
      <a
        href={href}
        className="flex min-h-[44px] items-center gap-2 text-ink-2 transition-colors hover:text-moss"
      >
        <I size={19} weight="duotone" aria-hidden />
        {label}
      </a>
    </li>
  );
}

function Also() {
  return (
    <section className="flex flex-col gap-12 pt-24">
      <h2 className="max-w-[24ch] text-title1 font-medium">
        Smaller things, still running.
      </h2>
      <div className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {ALSO.map((item, i) => (
          <Reveal key={item.name} delay={(i % 3) * 0.07} y={40}>
            <LiftOnHover>
              <SmallCard {...item} />
            </LiftOnHover>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const STAT_ICONS = [UsersThree, Lightning, GitCommit, Clock];

function Numbers() {
  return (
    <section className="flex flex-col pt-28">
      <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {NUMBERS.map((n, i) => {
          const Ico = STAT_ICONS[i % STAT_ICONS.length];
          return (
          <Reveal key={n.value} delay={i * 0.08}>
            <div className="flex h-full flex-col gap-2.5 rounded-[20px] bg-raised p-6">
              <Ico size={22} weight="duotone" className="text-moss" aria-hidden />
              <dt className="sr-only">{n.label}</dt>
              <dd className="flex flex-col gap-2">
                <span className="font-display text-title1 font-medium text-ink">
                  {n.value}
                </span>
                <span className="max-w-[26ch] text-callout text-ink-3">{n.label}</span>
              </dd>
            </div>
          </Reveal>
          );
        })}
      </dl>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="flex flex-col gap-12 pt-28">
      <SectionHeader label="About" aside="the short version" />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <div className="flex flex-col">
          <h3 className="flex items-center gap-2 pb-4 text-title3 font-medium"><Briefcase size={21} weight="duotone" className="text-moss" aria-hidden />Experience</h3>
              {EXPERIENCE.map((e) => (
            <div
              key={e.role + e.org}
              className="flex flex-col gap-1 rounded-[16px] px-4 py-3.5 odd:bg-raised sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div className="flex flex-col gap-0.5">
                <p className="text-body font-medium">{e.role}</p>
                <p className="text-callout text-ink-3">{e.org}</p>
              </div>
              <p className="shrink-0 text-caption text-ink-3">{e.dates}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h3 className="flex items-center gap-2 text-title3 font-medium"><GraduationCap size={21} weight="duotone" className="text-moss" aria-hidden />Education</h3>
            <p className="text-body">{EDUCATION.degree}</p>
            <p className="text-callout text-ink-3">{EDUCATION.detail}</p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="flex items-center gap-2 text-title3 font-medium"><Translate size={21} weight="duotone" className="text-moss" aria-hidden />Languages</h3>
            <ul className="flex flex-col gap-2 text-body text-ink-2">
              {LANGUAGES.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="flex flex-col gap-6 pt-24">
      <h3 className="flex items-center gap-2 text-title3 font-medium"><Wrench size={21} weight="duotone" className="text-moss" aria-hidden />Skills</h3>
      <ul className="flex flex-wrap gap-2.5">
        {SKILLS.map((s) => (
          <Chip key={s.label} tone={s.ai ? "accent" : "plain"}>
            {s.label}
          </Chip>
        ))}
      </ul>
    </section>
  );
}

function Fun() {
  const glyphs = [Cat, Mountains, GameController, Coffee];
  return (
    <section className="flex flex-col gap-12 pt-28">
      <h2 className="max-w-[26ch] text-title1 font-medium">
        When I am not working
        <Glyph icon={Coffee} />
      </h2>
      <div className="grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2">
        {FUN.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.07} y={40}>
            <div className="flex max-w-[46ch] flex-col gap-3">
              <h3 className="font-display text-title2 font-medium text-ink">
                {f.title}
                <Glyph icon={glyphs[i % glyphs.length]} />
              </h3>
              <p className="text-body text-ink-2">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="flex flex-col gap-12 pb-16 pt-28">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-5">
          <h2 className="max-w-[16ch] font-display text-title1 font-medium italic text-moss">
            Come say hi
            <Glyph icon={Mountains} />
          </h2>
          <p className="max-w-[52ch] text-body text-ink-2">
            Open to contract work, and to full-time roles that can sponsor a move. Currently pointed
            at Vancouver, Edinburgh and San Francisco.
          </p>
          <a
            href={`mailto:${PERSON.email}`}
            className="inline-flex min-h-[44px] w-fit items-center gap-2.5 rounded-full bg-moss px-6 py-3 text-body font-semibold text-paper shadow-[0_10px_26px_-14px_rgba(20,16,12,0.6)] transition-transform duration-200 ease-out active:scale-[0.98]"
          >
            {PERSON.email}
            <ArrowUpRight size={19} weight="bold" aria-hidden />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 text-callout">
          <div className="flex flex-col gap-3">
            <p className="text-caption uppercase tracking-[0.14em] text-ink-3">Elsewhere</p>
            <a href={PERSON.github} className="flex min-h-[44px] items-center text-ink-2 transition-colors hover:text-moss">
              GitHub
            </a>
            <a href={PERSON.linkedin} className="flex min-h-[44px] items-center text-ink-2 transition-colors hover:text-moss">
              LinkedIn
            </a>
            <a href={PERSON.resume} className="flex min-h-[44px] items-center text-ink-2 transition-colors hover:text-moss">
              Resume
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-caption uppercase tracking-[0.14em] text-ink-3">Mine</p>
            {["Transita", "Korf", "Velso", "Ornitho"].map((n) => (
              <span key={n} className="text-ink-2">
                {n}
              </span>
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
