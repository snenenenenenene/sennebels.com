import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { FEATURED, PERSON } from "../../data/portfolio";
import { Rule } from "../../components/ui";
import { Reveal, Rise, Stagger } from "../../components/motion";

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
    <main className="mx-auto flex w-full max-w-[1280px] flex-col px-6 md:px-12 lg:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseSchema) }}
      />

      <nav className="flex h-[68px] items-center">
        <Link
          href="/#work"
          className="inline-flex min-h-[44px] items-center gap-2 text-callout text-ink-2 transition-colors hover:text-ink"
        >
          <ArrowLeft size={16} weight="bold" aria-hidden />
          All work
        </Link>
      </nav>

      {/* Tinted opener carries the project's own colour through from the index. */}
      <header className="flex flex-col gap-8 pb-16 pt-16">
        <Rule />
        <Stagger className="flex flex-col gap-5">
          <Rise>
            <p className="text-caption font-medium uppercase tracking-[0.2em] text-ink-3">
              {project.name}
            </p>
          </Rise>
          <Rise><h1 className="max-w-[20ch] text-display font-medium">
            {project.title}
          </h1></Rise>
          <Rise><p className="max-w-[62ch] text-lede text-ink-2">{project.description}</p></Rise>
          {project.live && (
            <Rise><a
              href={project.live.href}
              className="inline-flex w-fit items-center gap-2 border-b border-moss/40 pb-1 text-body font-medium text-moss"
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
                <dt className="text-caption uppercase tracking-[0.14em] text-ink-3">{fact.label}</dt>
                <dd className="text-body text-ink-2">{fact.value}</dd>
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <dt className="text-caption uppercase tracking-[0.14em] text-ink-3">Built with</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-raised px-3.5 py-[7px] text-caption font-medium text-ink-2"
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

      {project.image && (
        <Reveal className="pt-16"><figure>
          <Image
            src={project.image}
            alt={`${project.name}: ${project.title}`}
            width={1400}
            height={900}
            className="w-full rounded-[3px] object-cover"
          />
        </figure></Reveal>
      )}

      <section className="flex flex-col gap-8 pt-24">
        <h2 className="text-title2 font-medium">Where it landed</h2>
        <Rule />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {project.outcomes.map((o, i) => (
            <Reveal key={o.label} delay={i * 0.08} className="flex flex-1">
            <div className="flex flex-col gap-3 border-b border-hairline py-8 pr-8">
              <p className="font-display text-title1 font-medium">
                {o.value}
              </p>
              <p className="max-w-[28ch] text-callout text-ink-3">{o.label}</p>
            </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Link
        href={`/work/${next.slug}`}
        className="group mb-16 mt-24 flex flex-col gap-4 border-t border-hairline pt-12"
      >
        <span className="text-caption uppercase tracking-[0.14em] text-ink-3">Next</span>
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
