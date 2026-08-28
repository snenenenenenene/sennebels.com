import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle, Crown, MagnifyingGlass, TrendUp } from "@phosphor-icons/react/dist/ssr";
import { FEATURED, PERSON } from "../../data/portfolio";
import { Tilt } from "../../components/tilt";
import { RebusText } from "../../components/rebus-text";
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
            {project.brand ? (
              <Image
                src={project.brand}
                alt={`${project.name} logo`}
                width={200}
                height={80}
                priority
                className={`h-10 w-auto object-contain object-left ${project.brandMono ? "dark:brightness-0 dark:invert" : ""}`}
              />
            ) : (
              <p className="text-title3 font-semibold text-ink">{project.name}</p>
            )}
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
              <p className="max-w-[65ch] text-lede text-ink-2">{para}</p>
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

      {project.image && (
        <Reveal className="pt-16"><figure><Tilt>
          <Image
            src={project.image}
            alt={`${project.name}: ${project.title}`}
            width={1400}
            height={900}
            className="w-full rounded-panel object-cover shadow-media"
          />
        </Tilt></figure></Reveal>
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

      <Link
        href={`/work/${next.slug}`}
        className="group mb-24 mt-24 flex flex-col gap-3 rounded-card bg-raised p-8 shadow-card transition-shadow duration-300 hover:shadow-card-hover md:p-12"
      >
        <span className="text-caption font-medium text-ink-3">Next</span>
        <span className="flex flex-wrap items-center gap-x-4 gap-y-2 text-title1 font-medium text-ink">
          {next.title}
          <ArrowRight
            size={30}
            weight="bold"
            aria-hidden
            className="text-moss transition-transform duration-300 group-hover:translate-x-2"
          />
        </span>
      </Link>
    </main>
  );
}
