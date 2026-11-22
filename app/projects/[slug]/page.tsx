import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Compass, Flask, Gauge, Lightning, ShieldCheck, Wrench } from "@phosphor-icons/react/dist/ssr";
import { PERSON } from "../../data/portfolio";
import { PROJECTS, PROJECTS_PATH, projectPath, type Project } from "../../data/projects";
import { PERSON_ID, SITE_URL } from "../../data/seo";
import { Tilt } from "../../components/tilt";
import { Browser } from "../../components/browser";
import { BuiltWith } from "../../components/built-with";
import { StatusPill } from "../../components/status-pill";
import { ACCENT_TEXT, CARD_TINT, GlyphTile, TAP, type Tint } from "../../components/ui";
import { Reveal, Rise, Stagger } from "../../components/motion";
import { DirectionalLink, PageTransition } from "../../components/transition";

const TRIO: Tint[] = ["red", "blue", "yellow", "green"];
const DECISION_ICONS = [Compass, ShieldCheck, Gauge, Wrench];

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  const url = `${SITE_URL}${projectPath(project.slug)}`;
  const image = { url: project.image, width: 1600, height: 1000, alt: project.alt };
  return {
    title: project.seoTitle,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: PERSON.name,
      locale: "en_GB",
      title: project.seoTitle,
      description: project.description,
      url,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: project.seoTitle, description: project.description, images: [project.image] },
  };
}

function schemaFor(project: Project) {
  const url = `${SITE_URL}${projectPath(project.slug)}`;
  const appId = `${url}#app`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": project.schemaType,
        "@id": appId,
        name: project.name,
        url: project.live.href,
        description: project.summary,
        applicationCategory: project.category,
        operatingSystem: project.os,
        image: `${SITE_URL}${project.image}`,
        creator: { "@id": PERSON_ID },
        author: { "@id": PERSON_ID },
        keywords: project.builtWith.map((t) => t.name).join(", "),
      },
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: `${project.name}: ${project.title}`,
        description: project.description,
        about: { "@id": appId },
        author: { "@id": PERSON_ID },
        primaryImageOfPage: `${SITE_URL}${project.image}`,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}${PROJECTS_PATH}` },
            { "@type": "ListItem", position: 3, name: project.name, item: url },
          ],
        },
      },
    ],
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];

  return (
    <PageTransition>
      <main id="main" className="relative isolate mx-auto flex w-full max-w-[1280px] flex-col px-6 pb-24 pt-24 md:px-12 lg:px-16">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFor(project)) }} />

        <nav className="flex h-[68px] items-center">
          <DirectionalLink
            href={PROJECTS_PATH}
            direction="nav-back"
            className="inline-flex min-h-tap items-center gap-2 text-callout text-ink-2 transition-colors duration-200 hover:text-ink"
          >
            <ArrowLeft size={16} weight="bold" aria-hidden />
            All projects
          </DirectionalLink>
        </nav>

        {/* Same light field as the client case studies, in the product's colour. */}
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-screen -translate-x-1/2 overflow-hidden">
          <div
            className="absolute -top-40 left-[8%] size-[560px] rounded-full blur-[110px]"
            style={{ backgroundColor: `var(--sys-${project.tint})`, opacity: 0.16 }}
          />
          <div className="absolute -top-24 right-[4%] size-[420px] rounded-full blur-[100px]" style={{ backgroundColor: "var(--sys-blue)", opacity: 0.1 }} />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-paper" />
        </div>

        <header className="flex flex-col gap-8 pb-10 pt-6 md:pb-12 md:pt-16">
          <Stagger className="flex flex-col gap-5">
            <Rise>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-display text-title2 font-medium text-ink">{project.name}</span>
                <StatusPill project={project} />
              </div>
            </Rise>
            <Rise>
              <h1 className="max-w-[22ch] text-balance text-display font-medium">{project.title}</h1>
            </Rise>
            <Rise>
              <p className="max-w-[62ch] text-lede leading-[1.7] text-ink-2">{project.summary}</p>
            </Rise>
            <Rise>
              <a
                href={project.live.href}
                className={`inline-flex w-fit items-center gap-2 rounded-full bg-accent-soft px-5 py-2.5 text-body font-semibold text-moss ${TAP}`}
              >
                {project.live.label}
                <ArrowUpRight size={17} weight="bold" aria-hidden />
              </a>
            </Rise>
          </Stagger>
        </header>

        <figure>
          <Tilt>
            <Browser src={project.image} alt={project.alt} url={project.live.label} priority sizes="(min-width: 1280px) 1150px, 90vw" />
          </Tilt>
        </figure>

        <div className="grid grid-cols-1 gap-12 pt-14 md:pt-20 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <article className="flex flex-col gap-12">
            <section className="flex flex-col gap-5">
              <h2 className="text-title2 font-medium">The problem</h2>
              {project.problem.map((para) => (
                <p key={para.slice(0, 40)} className="max-w-[65ch] text-body leading-[1.9] text-ink-2">
                  {para}
                </p>
              ))}
            </section>
            <section className="flex flex-col gap-5">
              <h2 className="text-title2 font-medium">What I built</h2>
              {project.built.map((para) => (
                <p key={para.slice(0, 40)} className="max-w-[65ch] text-body leading-[1.9] text-ink-2">
                  {para}
                </p>
              ))}
              <BuiltWith items={project.builtWith} className="pt-2" />
            </section>
          </article>

          {/* Facts first on a phone, where the sidebar would otherwise land after the whole story. */}
          <aside className="order-first lg:order-none">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 lg:sticky lg:top-28 lg:grid-cols-1">
              {project.facts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-1">
                  <dt className="text-caption font-medium text-ink-3">{fact.label}</dt>
                  <dd className="text-body text-ink-2">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <section className="flex flex-col gap-8 pt-24">
          <h2 className="text-title2 font-medium">Decisions worth explaining</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {project.decisions.map((d, i) => (
              <Reveal key={d.title} delay={(i % 2) * 0.08} className="flex">
                <div className={`squircle flex h-full w-full flex-col gap-3 rounded-panel p-6 shadow-none transition-[background-color] duration-300 ${CARD_TINT[TRIO[i % TRIO.length]]}`}>
                  <GlyphTile icon={DECISION_ICONS[i % DECISION_ICONS.length]} tint={TRIO[i % TRIO.length]} />
                  <h3 className="text-title3 font-medium text-ink">{d.title}</h3>
                  <p className="text-callout leading-[1.7] text-ink-2">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-8 pt-24">
          <h2 className="text-title2 font-medium">Where it stands</h2>
          <Reveal>
            <div className={`squircle flex flex-col gap-5 rounded-card p-8 shadow-none md:p-12 ${CARD_TINT[project.tint]}`}>
              <GlyphTile icon={project.experiment ? Flask : Lightning} tint={project.tint} />
              <p className="max-w-[62ch] font-display text-title3 font-normal italic leading-[1.55] text-ink">{project.statusNote}</p>
              <p className="max-w-[62ch] text-callout text-ink-2">
                I build and run {project.name} myself, alongside client work.{" "}
                <DirectionalLink href="/about" direction="nav-lateral" className={`font-medium underline underline-offset-4 ${ACCENT_TEXT[project.tint]}`}>
                  More about me
                </DirectionalLink>
                .
              </p>
            </div>
          </Reveal>
        </section>

        <nav aria-label="More projects" className="grid grid-cols-1 gap-5 pt-24 sm:grid-cols-2">
          <PeekCard project={prev} direction="prev" />
          <PeekCard project={next} direction="next" />
        </nav>
      </main>
    </PageTransition>
  );
}

function PeekCard({ project, direction }: { project: Project; direction: "prev" | "next" }) {
  const isPrev = direction === "prev";
  const Arrow = isPrev ? ArrowLeft : ArrowRight;
  return (
    <DirectionalLink
      href={projectPath(project.slug)}
      direction={isPrev ? "nav-back" : "nav-forward"}
      className={`squircle group/peek flex flex-col gap-4 rounded-card p-5 shadow-none transition-[background-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-card-hover ${CARD_TINT[project.tint]} ${isPrev ? "" : "sm:items-end sm:text-right"}`}
    >
      <div className="h-[150px] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.alt}
          width={800}
          height={500}
          sizes="(min-width: 1280px) 560px, (min-width: 640px) 45vw, 90vw"
          className="h-[150px] w-full object-cover object-top transition-transform duration-500 ease-out group-hover/peek:scale-[1.03]"
        />
      </div>
      <span className={`flex items-center gap-2 text-caption font-medium ${ACCENT_TEXT[project.tint]} ${isPrev ? "" : "sm:flex-row-reverse"}`}>
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
        <span className="max-w-[34ch] text-callout text-ink-2">{project.title}</span>
      </span>
    </DirectionalLink>
  );
}
