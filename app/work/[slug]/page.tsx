import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle, Crown, Lightbulb, MagnifyingGlass, TrendUp } from "@phosphor-icons/react/dist/ssr";
import { FEATURED, PERSON } from "../../data/portfolio";
import { Tilt } from "../../components/tilt";
import { Phone } from "../../components/phone";
import { RebusText } from "../../components/rebus-text";
import { BrandMark, Flags, type FlagCode } from "../../components/marks";
import { ACCENT_TEXT, CARD_TINT, GlyphTile, TAP, type Tint } from "../../components/ui";
import { Reveal, Rise, Stagger } from "../../components/motion";

const TRIO: Tint[] = ["red", "blue", "yellow"];
const OUTCOME_ICONS = [TrendUp, MagnifyingGlass, Crown];

/** Feature pills carry the trio, tinted rather than plain. */
const FEATURE_TINT: Record<Tint, string> = {
  red: "bg-[color-mix(in_srgb,var(--sys-red)_12%,var(--raised))] text-tone-red",
  blue: "bg-[color-mix(in_srgb,var(--sys-blue)_12%,var(--raised))] text-tone-blue",
  yellow: "bg-[color-mix(in_srgb,var(--sys-yellow)_22%,var(--raised))] text-tone-yellow",
  green: "bg-[color-mix(in_srgb,var(--sys-green)_12%,var(--raised))] text-tone-green",
};

/**
 * Two ways to survive dark mode, picked per mark rather than applied blindly.
 */
const BRAND_DARK: Record<string, string> = {
  // A flat near-black mark inverts cleanly to white.
  invert: "dark:brightness-0 dark:invert",
  // One that carries colour cannot be rescued by brightness, because
  // multiplying a near-black pixel leaves it near-black. It gets a light
  // plate in dark mode instead, which keeps the colour and the contrast.
  lift: "dark:rounded-[8px] dark:bg-white dark:p-1.5",
  none: "",
};

export function generateStaticParams() {
  return FEATURED.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = FEATURED.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.name}: ${project.title}`;
  return {
    title,
    description: project.description,
    alternates: { canonical: `https://sennebels.com/work/${project.slug}` },
    openGraph: {
      type: "article",
      title,
      description: project.description,
      url: `https://sennebels.com/work/${project.slug}`,
      images: project.image ? [{ url: project.image, width: 1400, height: 900 }] : undefined,
    },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = FEATURED.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = FEATURED[index];
  const next = FEATURED[(index + 1) % FEATURED.length];
  const prev = FEATURED[(index - 1 + FEATURED.length) % FEATURED.length];

  const caseSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    headline: project.title,
    description: project.description,
    url: `https://sennebels.com/work/${project.slug}`,
    keywords: project.tech.join(", "),
    author: { "@type": "Person", name: PERSON.name, url: "https://sennebels.com" },
  };

  return (
    <main className="relative isolate mx-auto flex w-full max-w-[1280px] flex-col px-6 pb-24 pt-24 md:px-12 lg:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseSchema) }}
      />

      <nav className="flex h-[68px] items-center">
        <Link
          href="/#work"
          className="inline-flex min-h-tap items-center gap-2 text-callout text-ink-2 transition-colors duration-200 hover:text-ink"
        >
          <ArrowLeft size={16} weight="bold" aria-hidden />
          All work
        </Link>
      </nav>

      {/* Tinted opener carries the project's own colour through from the index. */}
      {/*
        Apple puts light behind the top of a page rather than a gradient bar:
        large, heavily blurred colour fields that read as illumination. These
        are static and pointer-events-none, so they never cost a repaint, and
        they carry the project's own accent.
      */}
      {/* Full bleed: main is capped at 1280px, so the field has to break out of
          it or the light stops at the content edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-screen -translate-x-1/2 overflow-hidden"
      >
        <div
          className="absolute -top-40 left-[8%] size-[560px] rounded-full blur-[110px]"
          style={{ backgroundColor: `var(--sys-${project.accent})`, opacity: 0.16 }}
        />
        <div
          className="absolute -top-24 right-[4%] size-[420px] rounded-full blur-[100px]"
          style={{ backgroundColor: "var(--sys-blue)", opacity: 0.1 }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-paper" />
      </div>

      <header className="flex flex-col gap-8 pb-16 pt-16">
        <Stagger className="flex flex-col gap-5">
          <Rise>
            <div className="flex items-center gap-3.5">
              {project.brand && (
                <Image
                  src={project.brand}
                  alt=""
                  width={200}
                  height={80}
                  priority
                  className={`h-10 w-auto object-contain object-left ${BRAND_DARK[project.brandDark ?? "none"]}`}
                />
              )}
              {/* Serif beside the mark: the name is a proper noun, not a label. */}
              <span className="font-display text-title2 font-medium text-ink">{project.name}</span>
            </div>
          </Rise>
          <Rise><h1 className="max-w-[20ch] text-display font-medium">
            {project.title}
          </h1></Rise>
          <Rise>
            <RebusText
              text={project.description}
              marks={project.rebus}
              className="max-w-[62ch] text-lede leading-[2.1] text-ink-2"
            />
          </Rise>
          {project.live && (
            <Rise><a
              href={project.live.href}
              className={`inline-flex w-fit items-center gap-2 rounded-full bg-accent-soft px-5 py-2.5 text-body font-semibold text-moss ${TAP}`}
            >
              {project.live.label}
              <ArrowUpRight size={17} weight="bold" aria-hidden />
            </a></Rise>
          )}
        </Stagger>
      </header>

      {/* Story left, facts sidebar right. Tailscale's case-study shape, adapted to engineering work. */}
      <div className="grid grid-cols-1 gap-12 pt-4 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
        <article className="flex flex-col gap-6">
          {project.story.map((para, i) => (
            <Reveal key={para.slice(0, 40)} delay={i * 0.06}>
              <RebusText
                text={para}
                marks={project.storyRebus ?? project.rebus}
                className="max-w-[65ch] text-body leading-[2.1] text-ink-2"
              />
            </Reveal>
          ))}
        </article>

        <aside className="flex flex-col gap-6">
          <dl className="flex flex-col gap-5">
            {project.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1">
                <dt className="text-caption font-medium text-ink-3">{fact.label}</dt>
                <dd className="text-body text-ink-2">{fact.value}</dd>
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <dt className="text-caption font-medium text-ink-3">Built with</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-accent-soft px-3.5 py-[7px] text-caption font-medium text-moss transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      {project.stack && (
        <ul className="flex flex-wrap items-center gap-2.5 pt-2">
          {project.stack.map((slug) => (
            <li
              key={slug}
              className="squircle flex size-9 items-center justify-center rounded-tile bg-raised text-ink shadow-card"
            >
              <BrandMark slug={slug} size={18} />
            </li>
          ))}
        </ul>
      )}

      {project.features && (
        <section className="flex flex-col gap-5 pt-16">
          <h2 className="text-title3 font-medium text-ink">What I shipped</h2>
          <ul className="flex flex-wrap gap-2.5">
            {project.features.map((f, i) => (
              <li
                key={f}
                className={`squircle flex items-center gap-2 rounded-full px-4 py-2 text-callout font-medium transition-transform duration-200 ease-out hover:-translate-y-0.5 ${FEATURE_TINT[TRIO[i % TRIO.length]]}`}
              >
                <CheckCircle size={15} weight="fill" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.phones && (
        <Reveal className="pt-16">
          <figure className="flex flex-wrap items-start justify-center gap-6">
            {project.phones.map((src, i) => (
              <Phone key={src} src={src} width={236} island={project.phonesHaveIsland} className={i % 2 ? "" : "sm:mt-10"} />
            ))}
          </figure>
        </Reveal>
      )}

      {project.image && (
        <Reveal className="pt-16"><figure><Tilt>
          <Image
            src={project.image}
            alt={`${project.name}: ${project.title}`}
            width={1400}
            height={900}
            className="w-full object-contain"
          />
        </Tilt></figure></Reveal>
      )}

      {project.regions && (
        <p className="flex flex-wrap items-center gap-3 pt-12 text-callout text-ink-2">
          <Flags codes={project.regions.codes as FlagCode[]} />
          {project.regions.label}
        </p>
      )}

      {project.gallery && (
        // Phone screens are tall, so they scroll sideways rather than
        // shrinking to fit a row. The rail bleeds past the text column.
        <section className="flex flex-col gap-8 pt-24">
          <h2 className="text-title2 font-medium">In the app</h2>
          <ul className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 md:-mx-12 md:px-12">
            {project.gallery.map((shot) => (
              <li key={shot.src} className="flex w-[210px] shrink-0 snap-start flex-col gap-3 sm:w-[240px]">
                <Phone src={shot.src} alt={shot.caption} width={228} island={project.phonesHaveIsland} className="w-full" />
                <p className="text-callout leading-[1.5] text-ink-2">{shot.caption}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="flex flex-col gap-8 pt-24">
        <h2 className="text-title2 font-medium">Where it landed</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {project.outcomes.map((o, i) => (
            <Reveal key={o.label} delay={i * 0.08} className="flex">
              <div
                className={`squircle group/card flex h-full w-full flex-col gap-2.5 rounded-panel p-6 shadow-none transition-[background-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-card-hover ${CARD_TINT[TRIO[i % TRIO.length]]}`}
              >
                <GlyphTile icon={OUTCOME_ICONS[i % OUTCOME_ICONS.length]} tint={TRIO[i % TRIO.length]} />
                <p className={`font-display text-title1 font-medium ${ACCENT_TEXT[TRIO[i % TRIO.length]]}`}>
                  {o.value}
                </p>
                <p className="max-w-[28ch] text-callout text-ink-2">{o.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-8 pt-24">
        <h2 className="text-title2 font-medium">What it taught me</h2>
        <Reveal>
          <div
            className={`squircle rounded-card p-8 shadow-none md:p-12 ${CARD_TINT[project.accent]}`}
          >
            <GlyphTile icon={Lightbulb} tint={project.accent} />
            <p className="mt-5 max-w-[62ch] font-display text-title3 font-normal italic leading-[1.55] text-ink">
              {project.lesson}
            </p>
          </div>
        </Reveal>
      </section>

      <nav aria-label="More work" className="grid grid-cols-1 gap-5 pb-24 pt-24 sm:grid-cols-2">
        <PeekCard project={prev} direction="prev" />
        <PeekCard project={next} direction="next" />
      </nav>
    </main>
  );
}

function PeekCard({
  project,
  direction,
}: {
  project: (typeof FEATURED)[number];
  direction: "prev" | "next";
}) {
  const isPrev = direction === "prev";
  const Arrow = isPrev ? ArrowLeft : ArrowRight;
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`squircle group/peek flex flex-col gap-4 rounded-card p-5 shadow-none transition-[background-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-card-hover ${CARD_TINT[project.accent]} ${isPrev ? "" : "sm:items-end sm:text-right"}`}
    >
      <div className="flex h-[150px] items-start justify-center overflow-hidden">
        {project.phones ? (
          <Phone src={project.phones[0]} width={96} island={project.phonesHaveIsland} />
        ) : project.image ? (
          <Image
            src={project.image}
            alt=""
            width={800}
            height={500}
            className="h-[150px] w-full object-cover object-top transition-transform duration-500 ease-out group-hover/peek:scale-[1.03]"
          />
        ) : (
          <div className="grid h-[150px] w-full place-items-center">
            {project.brand && (
              <Image
                src={project.brand}
                alt=""
                width={200}
                height={80}
                className={`h-9 w-auto object-contain ${BRAND_DARK[project.brandDark ?? "none"]}`}
              />
            )}
          </div>
        )}
      </div>

      <span
        className={`flex items-center gap-2 text-caption font-medium ${ACCENT_TEXT[project.accent]} ${isPrev ? "" : "sm:flex-row-reverse"}`}
      >
        <Arrow
          size={15}
          weight="bold"
          aria-hidden
          className={`transition-transform duration-300 ${isPrev ? "group-hover/peek:-translate-x-1" : "group-hover/peek:translate-x-1"}`}
        />
        {isPrev ? "Previous" : "Next"}
      </span>

      <span className="flex flex-col gap-1">
        <span className="font-display text-title3 font-medium text-ink">{project.name}</span>
        <span className="max-w-[30ch] text-callout text-ink-2">{project.title}</span>
      </span>
    </Link>
  );
}
