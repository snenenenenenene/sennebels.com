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
import { Chip, GlyphTile, Heading, Rebus, Surface, TAP, type Tint } from "./components/ui";
import { IconLink } from "./components/icon-link";
import { SOCIALS } from "./components/footer";
import { SectionHeader } from "./components/section-header";
import { LiftOnHover, Reveal, Rise, Stagger } from "./components/motion";
import { Phone } from "./components/phone";


// Server component on purpose: every claim below ships in the HTML, so search
// engines and answer engines can read it without executing any JavaScript.
export default function Home() {
  return (
    <main id="main" className="mx-auto flex w-full max-w-[1280px] flex-col px-6 pb-24 pt-24 md:px-12 lg:px-16">
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
    </main>
  );
}

function Hero() {
  return (
    <header className="flex flex-col gap-14 pb-20 pt-20 md:pt-24 lg:flex-row lg:items-center lg:gap-16">
      <Stagger className="flex flex-col gap-9 lg:flex-1">
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
            Six years building{" "}
            <Rebus icon={Terminal} tint="red">
              web, mobile and AI systems
            </Rebus>
            , a{" "}
            <Rebus icon={GameController} tint="blue">
              game developer
            </Rebus>{" "}
            on the side, and full-time staff to{" "}
            <Rebus icon={Cat} tint="yellow">
              four cats
            </Rebus>
            .
          </p>
        </Rise>

        <Rise>
          <p className="sr-only">{PERSON.answerBlock}</p>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2 text-callout">
            {SOCIALS.map((l) => (
              <li key={l.label}>
                <IconLink {...l} />
              </li>
            ))}
          </ul>
        </Rise>
      </Stagger>

      <HeroScreens />
    </header>
  );
}

/**
 * The work itself, in the empty half of the hero. Real screens rather than a
 * decorative shape, fanned so they read as a stack and not as a gallery. They
 * sit on the page with no plate or shadow behind them, so the screens are the
 * only thing on show.
 */
const HERO_SHOTS = [
  { src: "/images/work/beedee-profile.webp", alt: "The BeeDee profile screen", rotate: "-7deg", z: "z-10", pos: "left-0 top-8", island: true },
  { src: "/images/work/tomorrowland-explore.webp", alt: "The Tomorrowland app's Explore screen", rotate: "2deg", z: "z-20", pos: "left-[104px] top-0", island: false },
  { src: "/images/work/beedee-travel.webp", alt: "BeeDee's travel mode", rotate: "10deg", z: "z-10", pos: "left-[208px] top-10", island: true },
];

function HeroScreens() {
  return (
    <div className="pointer-events-none relative hidden h-[430px] w-[420px] shrink-0 lg:block">
      {HERO_SHOTS.map((shot, i) => (
        <Reveal key={shot.src} delay={0.15 + i * 0.1} y={26} className={`absolute ${shot.pos} ${shot.z}`}>
          <Phone
            src={shot.src}
            alt={shot.alt}
            width={150}
            island={shot.island}
            priority
            style={{ transform: `rotate(${shot.rotate})` }}
          />
        </Reveal>
      ))}
    </div>
  );
}

function Also() {
  return (
    <section className="flex flex-col gap-12 pt-24">
      <h2 className="max-w-[24ch] text-title1 font-medium">
        Things I build on my own time.
      </h2>
      <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2">
        {ALSO.map((item, i) => (
          <Reveal
            key={item.name}
            delay={(i % 2) * 0.07}
            y={40}
            className={`flex ${"wide" in item && item.wide ? "md:col-span-2" : ""}`}
          >
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
