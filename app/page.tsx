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
import { Chip, Glyph, Rule, SectionHeader } from "./components/ui";
import { LiftOnHover, Reveal, Rise, Stagger } from "./components/motion";

// Server component on purpose: every claim below ships in the HTML, so search
// engines and answer engines can read it without executing any JavaScript.
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[1280px] flex-col px-6 md:px-12 lg:px-16">
      <Nav />
      <Hero />

      {/* Eyebrow budget: 8 sections allows 3. Used here, on About, and nowhere else. */}
      <section id="work" className="pt-24">
        <SectionHeader label="Selected work" aside="five that matter most" />
        {FEATURED.map((project, i) => (
          <Reveal key={project.slug} y={40}>
            <ProjectCard project={project} flipped={i % 2 === 1} />
          </Reveal>
        ))}
        <Rule />
      </section>

      <Also />
      <Numbers />
      <About />
      <Skills />
      <Fun />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <nav className="flex h-[68px] items-center justify-between gap-8">
      <Link href="/" aria-label="Senne Bels, home" className="flex min-h-[44px] min-w-[44px] items-center">
        <Cat size={26} weight="duotone" className="text-moss" aria-hidden />
      </Link>
      <div className="flex items-center gap-6 text-[15px] md:gap-8">
        <a href="#work" className="flex min-h-[44px] items-center text-ink-2 transition-colors hover:text-ink">
          Work
        </a>
        <a href="#about" className="flex min-h-[44px] items-center text-ink-2 transition-colors hover:text-ink">
          About
        </a>
        <a
          href={`mailto:${PERSON.email}`}
          className="flex min-h-[44px] items-center border-b border-moss/40 font-medium text-moss transition-colors hover:border-moss"
        >
          Get in touch
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="flex flex-col justify-center gap-9 pb-20 pt-20 md:pt-24">
      <Stagger className="flex flex-col gap-9">
        <Rise>
          <h1 className="max-w-[17ch] text-[42px] font-medium leading-[1.06] -tracking-[0.025em] md:text-[68px]">
            {PERSON.name}, a{" "}
            <span className="font-display italic leading-[1.15] text-moss">creative</span> software
            engineer.
          </h1>
        </Rise>

        <Rise>
          {/* Rebus: the marks sit inside the sentence, so words and glyphs read as one line. */}
          <p className="max-w-[56ch] text-[19px] leading-[34px] text-ink-2 md:text-[21px] md:leading-[38px]">
            Six years remote-first building web, mobile and AI systems
            <Glyph icon={Terminal} />, a game developer
            <Glyph icon={GameController} /> on the side, and full-time staff to four cats
            <Glyph icon={Cat} />.
          </p>
        </Rise>

        <Rise>
          <p className="sr-only">{PERSON.answerBlock}</p>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2 text-[15px]">
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
      <h2 className="max-w-[24ch] text-[28px] font-medium leading-[1.15] -tracking-[0.02em] md:text-[34px]">
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

function Numbers() {
  return (
    <section className="flex flex-col pt-28">
      <Rule />
      <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {NUMBERS.map((n, i) => (
          <Reveal key={n.value} delay={i * 0.08}>
            <div className="flex flex-col gap-3 border-b border-hairline py-10 pr-8 lg:border-b-0">
              <dt className="sr-only">{n.label}</dt>
              <dd className="flex flex-col gap-3">
                <span className="font-display text-[46px] font-medium leading-[1.05] -tracking-[0.03em] text-ink">
                  {n.value}
                </span>
                <span className="max-w-[26ch] text-[15px] leading-[25px] text-ink-3">{n.label}</span>
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
      <Rule className="hidden lg:block" />
    </section>
  );
}

function About() {
  return (
    <section id="about" className="flex flex-col gap-12 pt-28">
      <SectionHeader label="About" aside="the short version" />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <div className="flex flex-col">
          <h3 className="pb-6 text-xl font-medium">Experience</h3>
          <Rule />
          {EXPERIENCE.map((e) => (
            <div
              key={e.role + e.org}
              className="flex flex-col gap-1 border-b border-hairline py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div className="flex flex-col gap-0.5">
                <p className="text-[17px] font-medium">{e.role}</p>
                <p className="text-[15px] text-ink-3">{e.org}</p>
              </div>
              <p className="shrink-0 text-[14px] text-ink-3">{e.dates}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-medium">Education</h3>
            <p className="text-[17px]">{EDUCATION.degree}</p>
            <p className="text-[15px] leading-[25px] text-ink-3">{EDUCATION.detail}</p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-medium">Languages</h3>
            <ul className="flex flex-col gap-2 text-[16px] text-ink-2">
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
      <h3 className="text-xl font-medium">Skills</h3>
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
      <h2 className="max-w-[26ch] text-[28px] font-medium leading-[1.15] -tracking-[0.02em] md:text-[34px]">
        When I am not working
        <Glyph icon={Coffee} />
      </h2>
      <div className="grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2">
        {FUN.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.07} y={40}>
            <div className="flex max-w-[46ch] flex-col gap-3">
              <h3 className="font-display text-[26px] font-medium leading-[1.15] text-ink">
                {f.title}
                <Glyph icon={glyphs[i % glyphs.length]} />
              </h3>
              <p className="text-[16px] leading-[27px] text-ink-2">{f.body}</p>
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
      <Rule />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-5">
          <h2 className="max-w-[16ch] font-display text-[38px] font-medium italic leading-[1.15] -tracking-[0.02em] text-moss md:text-[46px]">
            Come say hi
            <Glyph icon={Mountains} />
          </h2>
          <p className="max-w-[52ch] text-[17px] leading-[29px] text-ink-2">
            Open to contract work, and to full-time roles that can sponsor a move. Currently pointed
            at Vancouver, Edinburgh and San Francisco.
          </p>
          <a
            href={`mailto:${PERSON.email}`}
            className="inline-flex min-h-[44px] w-fit items-center gap-2 border-b border-moss/40 pb-1 text-[19px] font-medium text-moss transition-colors hover:border-moss"
          >
            {PERSON.email}
            <ArrowUpRight size={19} weight="bold" aria-hidden />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 text-[15px]">
          <div className="flex flex-col gap-3">
            <p className="text-[13px] uppercase tracking-[0.14em] text-ink-3">Elsewhere</p>
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
            <p className="text-[13px] uppercase tracking-[0.14em] text-ink-3">Mine</p>
            {["Transita", "Korf", "Velso", "Ornitho"].map((n) => (
              <span key={n} className="text-ink-2">
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="text-[14px] text-ink-3">
        &copy; 2026 {PERSON.name}, {PERSON.locality}. Made on too much coffee, with four cats
        actively in the way.
      </p>
    </footer>
  );
}
