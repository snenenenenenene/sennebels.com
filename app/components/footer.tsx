import { ArrowUpRight, Clock, EnvelopeSimple, FileText, GithubLogo, LinkedinLogo, UsersThree, XLogo } from "@phosphor-icons/react/dist/ssr";
import { PERSON } from "../data/portfolio";
import { TAP, type Tint } from "./ui";
import { IconLink } from "./icon-link";

/**
 * Site footer. Lives in the layout so every route ends the same way, rather
 * than the contact line existing only on the homepage.
 */

const TRIO: Tint[] = ["red", "blue", "yellow"];

export const SOCIALS = [
  { label: "Resume", href: PERSON.resume, icon: FileText, tint: "red" as Tint, external: false },
  { label: "GitHub", href: PERSON.github, icon: GithubLogo, tint: "blue" as Tint },
  { label: "LinkedIn", href: PERSON.linkedin, icon: LinkedinLogo, tint: "yellow" as Tint },
  { label: "X", href: PERSON.x, icon: XLogo, tint: "red" as Tint },
  { label: "Email", href: `mailto:${PERSON.email}`, icon: EnvelopeSimple, tint: "red" as Tint, external: false },
];

const MORE = [
  { label: "Now", href: "/now", icon: Clock, external: false },
  { label: "Friends", href: "/friends", icon: UsersThree, external: false },
  { label: "Transita", href: "https://transita.app", icon: ArrowUpRight },
  { label: "Korf", href: "https://korf.app", icon: ArrowUpRight },
];

export function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-[1280px] flex-col gap-12 px-6 pb-16 pt-28 md:px-12 lg:px-16">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-5">
          <h2 className="max-w-[16ch] font-display text-title1 font-medium italic text-tone-blue">
            Come say hi
          </h2>
          <p className="max-w-[52ch] text-body text-ink-2">
            Open to contract work, and to full-time roles in Canada or the United States that
            sponsor. The plan points at Vancouver.
          </p>
          <a
            href={`mailto:${PERSON.email}`}
            className={`inline-flex w-fit items-center gap-2.5 rounded-full bg-mark-yellow px-6 py-3 text-body font-semibold text-[#1E1515] shadow-card-hover ${TAP}`}
          >
            {PERSON.email}
            <ArrowUpRight size={19} weight="bold" aria-hidden />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 text-callout">
          <div className="flex flex-col gap-3">
            <p className="text-caption font-medium text-ink-3">Elsewhere</p>
            {SOCIALS.map((l) => (
              <IconLink key={l.label} {...l} />
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-caption font-medium text-ink-3">More</p>
            {MORE.map((m, i) => (
              <IconLink key={m.label} {...m} tint={TRIO[i % TRIO.length]} />
            ))}
          </div>
        </div>
      </div>

      <p className="text-caption text-ink-3">
        &copy; 2026 {PERSON.name}, {PERSON.locality}. Built on too much coffee, with four cats in
        the way.
      </p>
    </footer>
  );
}
