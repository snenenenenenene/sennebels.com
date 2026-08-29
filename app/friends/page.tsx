import type { Metadata } from "next";
import { ArrowUpRight, EnvelopeSimple, LinkSimple } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "../components/motion";
import { PageTitle } from "../components/section-header";
import { CARD_TINT, GlyphTile, TAP, type Tint } from "../components/ui";
import { PERSON } from "../data/portfolio";
import { PageTransition } from "../components/transition";

export const metadata: Metadata = {
  title: "Friends",
  description:
    "People and personal websites worth finding on the open web, collected by Senne Bels. Independent blogs, /now pages and small corners of the internet.",
  alternates: { canonical: "https://sennebels.com/friends" },
};

const PEOPLE = [
  {
    name: "Nick Gray",
    href: "https://nickgray.net",
    tint: "red" as Tint,
    note: "Shared the eight-link checklist that finally made me add this page. Useful, specific, no SEO theatre.",
  },
  {
    name: "Derek Sivers",
    href: "https://sive.rs",
    tint: "blue" as Tint,
    note: "Started the /now page idea. Small pages with one clear job are still the best kind.",
  },
] as const;

export default function Friends() {
  return (
    <PageTransition>
      <main id="main" className="mx-auto flex w-full max-w-[1280px] flex-col px-6 pb-24 pt-28 md:px-12 lg:px-16">
        <PageTitle
          title="Friends of the site"
          lede="People whose work sent me down a useful rabbit hole."
        />
  
        <p className="mt-8 max-w-[62ch] text-lede leading-[1.75] text-ink-2">
          This is not a contact list. It is a short list of people whose work took me somewhere
          useful. Calling it /friends is generous, but /people-i-like-and-want-to-see-thrive is a
          terrible URL.
        </p>
  
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {PEOPLE.map((person, index) => (
            <Reveal key={person.name} delay={index * 0.07} className="flex">
              <a
                href={person.href}
                target="_blank"
                rel="friend noreferrer"
                className={`squircle group/card flex h-full w-full flex-col gap-4 rounded-card p-7 shadow-none transition-[background-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-card-hover ${CARD_TINT[person.tint]}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <GlyphTile icon={LinkSimple} tint={person.tint} />
                  <ArrowUpRight
                    size={20}
                    weight="bold"
                    aria-hidden
                    className="text-ink-3 transition-transform duration-300 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5"
                  />
                </div>
                <h2 className="text-title2 font-medium text-ink">{person.name}</h2>
                <p className="text-body leading-[1.75] text-ink-2">{person.note}</p>
              </a>
            </Reveal>
          ))}
        </div>
  
        <section className="mt-16 flex max-w-[62ch] flex-col gap-4">
          <h2 className="text-title2 font-medium text-ink">Your site should be here?</h2>
          <p className="text-body leading-[1.75] text-ink-2">
            Send it over. Actual personal sites only; I’d rather keep this short than fill it for the
            sake of having a directory.
          </p>
          <a
            href={`mailto:${PERSON.email}?subject=My%20personal%20site`}
            className={`inline-flex w-fit items-center gap-2.5 rounded-full bg-mark-yellow px-5 py-3 text-callout font-semibold text-[#1E1515] shadow-card-hover ${TAP}`}
          >
            <EnvelopeSimple size={19} weight="fill" aria-hidden />
            Send me your site
          </a>
        </section>
  
        <p className="mt-12 max-w-[62ch] text-callout text-ink-3">
          If this is your kind of internet, browse more of it at{" "}
          <a
            href="https://slashfriends.org"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-ink-3/40 underline-offset-4 transition-colors hover:text-tone-blue"
          >
            slashfriends.org
          </a>
          {" "}or{" "}
          <a
            href="https://personalwebsites.org"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-ink-3/40 underline-offset-4 transition-colors hover:text-tone-red"
          >
            personalwebsites.org
          </a>
          .
        </p>
      </main>
    </PageTransition>
  );
}
