import Link from "next/link";
import {
  ALSO,
  EDUCATION,
  EXPERIENCE,
  FEATURED,
  FUN,
  FUN_INTRO,
  LANGUAGES,
  NUMBERS,
  PERSON,
  SKILLS,
} from "./data/portfolio";
import { ProjectCard, SmallCard } from "./components/ProjectCard";
import { Chip, SectionHeader, TintPanel } from "./components/ui";

// Server component on purpose: every claim below ships in the HTML, so search
// engines and answer engines can read it without executing any JavaScript.
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-col bg-paper font-sans text-ink">
      <Nav />
      <Hero />

      <Section>
        <SectionHeader label="Selected work" aside="five that matter most" />
      </Section>
      <div className="flex flex-col gap-[26px] px-6 md:px-[72px]">
        {FEATURED.map((project, i) => (
          <ProjectCard key={project.slug} project={project} flipped={i % 2 === 1} />
        ))}
      </div>

      <Section className="pt-[66px]">
        <SectionHeader label="Also built" aside="smaller, still real, still running" />
      </Section>
      <ul className="flex flex-wrap gap-5 px-6 md:px-[72px]">
        {ALSO.map((item) => (
          <li key={item.name} className="contents">
            <SmallCard {...item} />
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-[26px] px-6 pt-14 lg:flex-row md:px-[72px]">
        {NUMBERS.map((n) => (
          <TintPanel
            key={n.value}
            tint={n.tint}
            title={n.value}
            body={n.label}
            titleClass="font-display text-[46px] font-semibold leading-[50px] -tracking-[0.03em] text-ink"
          />
        ))}
      </div>

      <About />
      <Skills />
      <Fun />
      <Footer />
    </main>
  );
}

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={`px-6 py-7 md:px-[72px] ${className}`}>
      {children}
    </div>
  );
}

function Nav() {
  return (
    <nav className="flex items-center justify-between gap-8 px-6 pt-6 md:px-[72px]">
      <Link href="/" aria-label="Senne Bels, home">
        <span className="flex size-11 items-center justify-center rounded-[14px] bg-tint-mint">
          <CatMark />
        </span>
      </Link>
      <div className="flex items-center gap-5 text-base font-medium md:gap-7">
        <a href="#work">work</a>
        <a href="#about">about</a>
        <a
          href={`mailto:${PERSON.email}`}
          className="rounded-full bg-moss px-5 py-[11px] text-[15px] font-semibold text-[#F4FAF3]"
        >
          let&rsquo;s talk
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header
      id="work"
      className="flex flex-col items-start justify-between gap-10 px-6 pb-16 pt-[78px] xl:flex-row xl:items-center xl:gap-16 md:px-[72px]"
    >
      <div className="flex w-full flex-col gap-[26px] xl:w-[720px] xl:shrink-0">
        <h1 className="flex flex-wrap items-baseline gap-x-3.5 text-[40px] font-medium leading-tight -tracking-[0.02em] md:text-[52px] md:leading-[64px]">
          <span>Hi there! I&rsquo;m</span>
          <span className="font-display font-semibold italic -tracking-[0.025em] text-moss md:text-[56px]">
            {PERSON.name}.
          </span>
        </h1>

        <p className="max-w-[620px] text-lg leading-8 text-ink-2 md:text-[21px] md:leading-[34px]">
          {PERSON.tagline}
        </p>

        {/* Self-contained passage, deliberately quotable by answer engines. */}
        <p className="sr-only">{PERSON.answerBlock}</p>

        <ul className="flex items-center gap-3">
          <IconLink href={PERSON.resume} label="Resume">
            <path d="M5 2.5h8l4 4v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z" />
            <path d="M13 2.5v4h4M7.5 12h7M7.5 15.5h7" />
          </IconLink>
          <IconLink href={PERSON.linkedin} label="LinkedIn">
            <path d="M2.5 2.5h17v17h-17z" />
            <path d="M6.5 9.5v6M6.5 6.4v.1M10.5 15.5v-6M14.5 15.5v-3.2a2.3 2.3 0 0 0-4-1.4" />
          </IconLink>
          <IconLink href={PERSON.github} label="GitHub">
            <path d="M7.5 18c-3.5.9-3.5-1.9-4.8-2.4M16.5 19v-3.1a2.7 2.7 0 0 0-.7-2c2.4-.3 4.9-1.2 4.9-5.4a4.2 4.2 0 0 0-1.1-2.9 3.9 3.9 0 0 0-.1-2.9s-.9-.3-3 1.1a10.5 10.5 0 0 0-5.6 0C8.8 2.4 7.9 2.7 7.9 2.7a3.9 3.9 0 0 0-.1 2.9 4.2 4.2 0 0 0-1.1 3c0 4.1 2.5 5 4.9 5.3a2.7 2.7 0 0 0-.7 2V19" />
          </IconLink>
          <IconLink href={`mailto:${PERSON.email}`} label="Email">
            <path d="M2 4.5h18v13H2z" />
            <path d="M3 6l8 5.5L19 6" />
          </IconLink>
        </ul>
      </div>

      <div className="flex size-[290px] shrink-0 items-center justify-center rounded-[36px] bg-tint-mint">
        <Avatar />
      </div>
    </header>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        aria-label={label}
        className="flex size-12 items-center justify-center rounded-[15px] bg-[#E9EFE6]"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          stroke="#2E6B48"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          {children}
        </svg>
      </a>
    </li>
  );
}

function About() {
  return (
    <>
      <Section id="about" className="pt-[78px]">
        <SectionHeader label="About me" aside="the short version" />
      </Section>
      <div className="flex flex-col gap-[26px] px-6 lg:flex-row lg:items-start md:px-[72px]">
        <div className="flex w-full flex-col gap-[22px] rounded-[30px] bg-white p-8 lg:w-[58%] lg:shrink-0 md:p-10">
          <h3 className="text-[22px] font-bold -tracking-[0.01em]">Experience</h3>
          <ul className="flex flex-col gap-[22px]">
            {EXPERIENCE.map((e) => (
              <li key={e.role + e.org} className="flex items-baseline justify-between gap-5">
                <div className="flex flex-col gap-0.5 md:w-[400px] md:shrink-0">
                  <p className="text-[17px] font-semibold">{e.role}</p>
                  <p className="text-[15px] text-[#7C716B]">{e.org}</p>
                </div>
                <p className="shrink-0 text-sm font-medium text-ink-3">{e.dates}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-1 flex-col gap-[26px]">
          <div className="flex flex-col gap-3.5 rounded-[30px] bg-tint-mint p-8">
            <h3 className="text-[22px] font-bold -tracking-[0.01em]">Education</h3>
            <p className="text-[17px] font-semibold">{EDUCATION.degree}</p>
            <p className="text-[15px] leading-6 text-[#4C5B49]">{EDUCATION.detail}</p>
          </div>
          <div className="flex flex-col gap-3.5 rounded-[30px] bg-tint-butter p-8">
            <h3 className="text-[22px] font-bold -tracking-[0.01em]">Languages</h3>
            <ul className="flex flex-col gap-[7px] text-base text-[#6B6047]">
              {LANGUAGES.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

function Skills() {
  return (
    <div className="flex flex-col gap-5 px-6 pt-14 md:px-[72px]">
      <h3 className="text-[22px] font-bold -tracking-[0.01em]">Skills</h3>
      <ul className="flex flex-wrap gap-2.5">
        {SKILLS.map((s) => (
          <Chip key={s.label} tone={s.ai ? "ai" : "plain"}>
            {s.label}
          </Chip>
        ))}
        <Chip tone="muted">+ more</Chip>
      </ul>
    </div>
  );
}

function Fun() {
  return (
    <div className="flex flex-col gap-[26px] px-6 pt-[70px] md:px-[72px]">
      <SectionHeader label="When I'm not working" aside="which is rarer than it should be" />
      <p className="max-w-[900px] text-lg leading-8 text-ink-2 md:text-xl md:leading-[33px]">
        {FUN_INTRO}
      </p>
      <div className="flex flex-col gap-5 lg:flex-row">
        {FUN.map((f) => (
          <TintPanel key={f.title} tint={f.tint} title={f.title} body={f.body} />
        ))}
      </div>
    </div>
  );
}

function Footer() {
  const columns = [
    { title: "Around here", links: [["Work", "#work"], ["About", "#about"]] },
    {
      title: "Elsewhere",
      links: [
        ["GitHub", PERSON.github],
        ["LinkedIn", PERSON.linkedin],
        ["Resume", PERSON.resume],
      ],
    },
  ];

  return (
    <footer className="flex flex-col gap-11 px-6 pb-14 pt-[76px] md:px-[72px]">
      <div className="flex flex-col items-start justify-between gap-10 flex-wrap lg:flex-row lg:gap-14">
        <div className="flex w-full flex-col gap-4 lg:w-[430px] lg:shrink-0">
          <p className="font-display text-[40px] font-semibold italic leading-[46px] -tracking-[0.025em] text-moss">
            Come say hi.
          </p>
          <p className="text-[17px] leading-7 text-ink-2">
            Open to contract work, and to full-time roles that can sponsor a move. Currently pointed
            at Vancouver, Edinburgh and San Francisco.
          </p>
          <a href={`mailto:${PERSON.email}`} className="text-[19px] font-bold">
            {PERSON.email}
          </a>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="flex w-[170px] shrink-0 flex-col gap-3">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#A09189]">
              {col.title}
            </p>
            {col.links.map(([label, href]) => (
              <a key={label} href={href} className="text-base text-ink-2">
                {label}
              </a>
            ))}
          </div>
        ))}

        <div className="flex w-[190px] shrink-0 flex-col gap-3">
          <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#A09189]">
            Things I made
          </p>
          {["Transita", "Korf", "Velso", "Ornitho"].map((name) => (
            <span key={name} className="text-base text-ink-2">
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-3 border-t border-hairline pt-[26px] md:flex-row md:items-center">
        <p className="text-[15px] text-ink-3">
          &copy; 2026 {PERSON.name} &middot; {PERSON.locality}, Belgium
        </p>
        <p className="font-display text-base italic text-ink-3">
          Made on too much coffee, with four cats actively in the way.
        </p>
      </div>
    </footer>
  );
}

function CatMark() {
  return (
    <svg width="26" height="22" viewBox="0 0 26 22" fill="none" aria-hidden>
      <path d="M5 9 L5 3 L9.5 6.5 L15.5 6.5 L20 3 L20 9" fill="#2E6B48" />
      <rect x="4" y="8" width="17" height="12" rx="4" fill="#2E6B48" />
      <circle cx="9.5" cy="13.5" r="1.7" fill="#EAF3E6" />
      <circle cx="15.5" cy="13.5" r="1.7" fill="#EAF3E6" />
    </svg>
  );
}

/** The 404 face from the previous site, redrawn as flat art so it ships in the HTML. */
function Avatar() {
  return (
    <svg width="176" height="176" viewBox="0 0 176 176" fill="none" role="img" aria-label="Senne Bels">
      <circle cx="88" cy="92" r="62" fill="#F9F8F5" stroke="#1E1515" strokeWidth="4" />
      <path d="M30 74 q10 -46 58 -46 q48 0 58 46" fill="#3B302A" />
      <path d="M30 74 q22 -14 58 -14 q36 0 58 14" fill="#3B302A" />
      <text x="88" y="82" fontFamily="monospace" fontSize="22" fontWeight="700" fill="#1E1515" textAnchor="middle">
        404
      </text>
      <circle cx="52" cy="118" r="8" fill="#E8A08A" opacity="0.55" />
      <circle cx="124" cy="118" r="8" fill="#E8A08A" opacity="0.55" />
      <circle cx="66" cy="104" r="5.5" fill="#1E1515" />
      <circle cx="110" cy="104" r="5.5" fill="#1E1515" />
      <path d="M74 126 q14 12 28 0" stroke="#1E1515" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}
