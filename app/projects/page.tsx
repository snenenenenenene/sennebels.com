import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { PROJECTS, PROJECTS_PATH, projectPath } from "../data/projects";
import { PERSON_ID, SITE_URL, pageOpenGraph } from "../data/seo";
import { StatusPill } from "../components/status-pill";
import { Reveal, Rise, Stagger } from "../components/motion";
import { DirectionalLink, PageTransition } from "../components/transition";
import { ACCENT_TEXT } from "../components/ui";

const TITLE = "Products I build and run";
const DESCRIPTION =
  "Case studies of products built and run by Senne Bels: Transita, Keepr, Penfolk, Stadiq, Korf and the Payout Rescue experiment.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PROJECTS_PATH}` },
  openGraph: pageOpenGraph(PROJECTS_PATH, TITLE, DESCRIPTION),
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/assets/og.png"] },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE_URL}${PROJECTS_PATH}`,
  url: `${SITE_URL}${PROJECTS_PATH}`,
  name: TITLE,
  description: DESCRIPTION,
  author: { "@id": PERSON_ID },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: PROJECTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}${projectPath(p.slug)}`,
      name: p.name,
    })),
  },
};

export default function ProjectsPage() {
  return (
    <PageTransition>
      <main id="main" className="mx-auto flex w-full max-w-[1280px] flex-col px-6 pb-24 pt-24 md:px-12 lg:px-16">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

        <header className="pb-12 pt-10 md:pb-16 md:pt-24">
          <Stagger className="flex flex-col gap-5">
            <Rise>
              <h1 className="text-balance text-display font-medium text-ink">{TITLE}</h1>
            </Rise>
            <Rise>
              <p className="max-w-[60ch] text-lede leading-[1.7] text-ink-2">
                I’m Senne Bels, a software engineer in Antwerp. Alongside client work, I build and run my own products, from the
                first commit to the support inbox. Each page below covers the problem, what I built and where the product stands
                today.
              </p>
            </Rise>
          </Stagger>
        </header>

        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <li key={p.slug} className="flex">
            <Reveal delay={(i % 2) * 0.07} y={40} className="flex w-full">
              <DirectionalLink
                href={projectPath(p.slug)}
                direction="nav-forward"
                className="squircle group/tile flex w-full flex-col gap-3 rounded-panel bg-raised p-5 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
              >
                <div className="mb-2 overflow-hidden rounded-[12px]">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    width={1200}
                    height={750}
                    priority={i < 2}
                    sizes="(min-width: 1280px) 570px, (min-width: 768px) 45vw, 90vw"
                    className="h-[220px] w-full object-cover object-top transition-transform duration-500 ease-out group-hover/tile:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-display text-title3 font-medium text-ink">{p.name}</h2>
                  <StatusPill project={p} />
                </div>
                <p className="text-callout leading-[1.6] text-ink-2">{p.card}</p>
                <span className={`mt-auto inline-flex items-center gap-1.5 pt-2 text-callout font-medium ${ACCENT_TEXT[p.tint]}`}>
                  How I built {p.name}
                  <ArrowRight size={15} weight="bold" aria-hidden className="transition-transform duration-300 group-hover/tile:translate-x-1" />
                </span>
              </DirectionalLink>
            </Reveal>
            </li>
          ))}
        </ul>
      </main>
    </PageTransition>
  );
}
