import type { Metadata } from "next";
import { ArrowRight, ChatCircleText, DeviceMobile, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { FEATURED, HIRE, HIRE_FAQ, HIRE_SOURCES, PERSON } from "../data/portfolio";
import { pageOpenGraph, PERSON_ID, SITE_URL } from "../data/seo";
import { ACCENT_TEXT, CARD_TINT, Heading, Surface } from "../components/ui";
import { INLINE_LINK } from "../components/linked-text";
import { PageTitle } from "../components/section-header";
import { Reveal } from "../components/motion";
import { DirectionalLink, PageTransition } from "../components/transition";

const PAGE_URL = `${SITE_URL}${HIRE.path}`;

/** The nav is fixed, so a jump to a section anchor has to land below it. */
const ANCHOR = "scroll-mt-24";

export const metadata: Metadata = {
  title: HIRE.title,
  description: HIRE.description,
  alternates: { canonical: PAGE_URL },
  openGraph: pageOpenGraph(HIRE.path, `${HIRE.title} | ${PERSON.name}`, HIRE.description),
};

/** The shipped React Native work, read off the case studies rather than retyped. */
const RN_WORK = FEATURED.filter((p) => p.builtWith.some((t) => t.name === "React Native"));

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: HIRE.title,
      serviceType: "React Native app development",
      description: HIRE.description,
      url: PAGE_URL,
      provider: { "@id": PERSON_ID },
      areaServed: PERSON.country,
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      url: PAGE_URL,
      mainEntity: HIRE_FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function ReactNativeDeveloper() {
  return (
    <PageTransition>
      <main id="main" className="mx-auto flex w-full max-w-[1280px] flex-col px-6 pb-24 pt-28 md:px-12 lg:px-16">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

        <PageTitle title={HIRE.heading} lede={HIRE.lede} />

        <section id="work" className={`flex flex-col gap-6 pt-20 ${ANCHOR}`}>
          <Heading as="h2" icon={DeviceMobile} tint="red">
            React Native apps I have shipped
          </Heading>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {RN_WORK.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 2) * 0.07} className="flex">
                <DirectionalLink
                  href={`/work/${project.slug}`}
                  direction="nav-forward"
                  className={`squircle group/card flex h-full w-full flex-col gap-3 rounded-card p-7 shadow-none transition-[background-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-card-hover ${CARD_TINT[project.accent]}`}
                >
                  <h3 className="font-display text-title3 font-medium text-ink">{project.name}</h3>
                  <p className="text-body font-medium text-ink">{project.title}</p>
                  <p className="text-body leading-[1.75] text-ink-2">{project.description}</p>
                  <span className={`mt-auto inline-flex items-center gap-1 pt-2 text-callout font-medium ${ACCENT_TEXT[project.accent]}`}>
                    Read the case study
                    <ArrowRight
                      size={13}
                      weight="bold"
                      aria-hidden
                      className="transition-transform duration-300 ease-out group-hover/card:translate-x-0.5"
                    />
                  </span>
                </DirectionalLink>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="quote" className={`flex flex-col gap-4 pt-20 ${ANCHOR}`}>
          <Heading as="h2" icon={EnvelopeSimple} tint="yellow">
            Hire a React Native developer: how a quote works
          </Heading>
          <p className="max-w-[62ch] text-body leading-[1.9] text-ink-2">
            {HIRE.quote}{" "}
            <a href={`mailto:${PERSON.email}`} className={INLINE_LINK}>
              {PERSON.email}
            </a>
          </p>
        </section>

        <section id="faq" className={`flex max-w-[70ch] flex-col gap-6 pt-20 ${ANCHOR}`}>
          <Heading as="h2" icon={ChatCircleText} tint="blue">
            Questions people ask before hiring
          </Heading>
          <div className="flex flex-col gap-3">
            {HIRE_FAQ.map((f) => (
              <Surface key={f.q} as="article" className="flex flex-col gap-3 p-5 sm:p-6">
                <h3 className="text-body font-semibold text-ink">{f.q}</h3>
                <p className="text-body leading-[1.8] text-ink-2">{f.a}</p>
                {f.sources.length > 0 && (
                  <div className="flex flex-col gap-1.5 text-callout">
                    <p className="text-caption font-medium text-ink-3">
                      {f.sources.length > 1 ? "Sources" : "Source"}
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {f.sources.map((key) => (
                        <li key={key}>
                          <a href={HIRE_SOURCES[key].href} target="_blank" rel="noreferrer" className={INLINE_LINK}>
                            {HIRE_SOURCES[key].label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Surface>
            ))}
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
