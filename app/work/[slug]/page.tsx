import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { FEATURED, PERSON } from "../../data/portfolio";
import { TINT_BG, TINT_LINK, TINT_TEXT } from "../../components/ui";
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
  const { tint } = project;

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
    <main className="mx-auto flex w-full max-w-[1440px] flex-col bg-paper font-sans text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseSchema) }}
      />

      <nav className="px-6 pt-8 md:px-[72px]">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-[15px] font-medium text-ink-3 transition-colors hover:text-ink"
        >
          <ArrowLeft size={16} strokeWidth={2} aria-hidden />
          All work
        </Link>
      </nav>

      {/* Tinted opener carries the project's own colour through from the index. */}
      <header className={`mt-6 px-6 py-14 md:mx-[72px] md:rounded-[34px] md:px-14 ${TINT_BG[tint]}`}>
        <Stagger className="flex flex-col gap-5">
          <Rise className="flex items-center gap-3">
            <span
              aria-hidden
              className="size-8 shrink-0 rounded-[10px]"
              style={{ backgroundColor: project.markColor }}
            />
            <p className="text-[17px] font-bold">{project.name}</p>
          </Rise>
          <Rise><h1 className="max-w-[20ch] text-[34px] font-semibold leading-[1.08] -tracking-[0.03em] md:text-[56px]">
            {project.title}
          </h1></Rise>
          <Rise><p className={`max-w-[62ch] text-lg leading-8 ${TINT_TEXT[tint]}`}>{project.description}</p></Rise>
          {project.live && (
            <Rise><a
              href={project.live.href}
              className={`inline-flex w-fit items-center gap-1.5 text-base font-bold ${TINT_LINK[tint]}`}
            >
              {project.live.label}
              <ArrowUpRight size={17} strokeWidth={2.5} aria-hidden />
            </a></Rise>
          )}
        </Stagger>
      </header>

      {/* Story left, facts sidebar right. Tailscale's case-study shape, adapted to engineering work. */}
      <div className="flex flex-col gap-12 px-6 pt-16 md:px-[72px] lg:flex-row lg:gap-20">
        <article className="flex flex-col gap-6 lg:w-[62%] lg:shrink-0">
          <h2 className="text-[15px] font-semibold uppercase tracking-[0.14em] text-ink-3">
            What happened
          </h2>
          {project.story.map((para, i) => (
            <Reveal key={para.slice(0, 40)} delay={i * 0.06}>
              <p className="max-w-[65ch] text-lg leading-[34px] text-ink-2">{para}</p>
            </Reveal>
          ))}
        </article>

        <aside className="flex flex-1 flex-col gap-6 lg:pt-9">
          <dl className="flex flex-col gap-5">
            {project.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1">
                <dt className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#A09189]">
                  {fact.label}
                </dt>
                <dd className="text-[17px] text-ink-2">{fact.value}</dd>
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <dt className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#A09189]">
                Built with
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-white px-3.5 py-[7px] text-[13px] font-semibold text-ink-2"
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
        <Reveal className="px-6 pt-16 md:px-[72px]"><figure>
          <Image
            src={project.image}
            alt={`${project.name}: ${project.title}`}
            width={1400}
            height={900}
            className="w-full rounded-[28px] object-cover"
          />
        </figure></Reveal>
      )}

      <section className="flex flex-col gap-6 px-6 pt-16 md:px-[72px]">
        <h2 className="text-[15px] font-semibold uppercase tracking-[0.14em] text-ink-3">
          Where it landed
        </h2>
        <div className="flex flex-col gap-5 md:flex-row">
          {project.outcomes.map((o, i) => (
            <Reveal key={o.label} delay={i * 0.08} className="flex flex-1">
            <div
              className={`flex flex-1 flex-col gap-2 rounded-[24px] px-[30px] py-8 ${TINT_BG[tint]}`}
            >
              <p className="font-display text-[40px] font-semibold leading-[46px] -tracking-[0.03em]">
                {o.value}
              </p>
              <p className={`text-base leading-[26px] ${TINT_TEXT[tint]}`}>{o.label}</p>
            </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Link
        href={`/work/${next.slug}`}
        className={`group mx-6 mt-20 mb-16 flex flex-col gap-3 rounded-[34px] px-8 py-12 md:mx-[72px] md:px-14 ${TINT_BG[next.tint]}`}
      >
        <span className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#A09189]">
          Next
        </span>
        <span className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[28px] font-semibold -tracking-[0.025em] md:text-[38px]">
          {next.title}
          <ArrowRight
            size={30}
            strokeWidth={2}
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </span>
      </Link>
    </main>
  );
}
