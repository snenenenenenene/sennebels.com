import type React from "react";
import ES from "country-flag-icons/react/3x2/ES";
import PL from "country-flag-icons/react/3x2/PL";
import IT from "country-flag-icons/react/3x2/IT";
import BG from "country-flag-icons/react/3x2/BG";
import CH from "country-flag-icons/react/3x2/CH";
import MC from "country-flag-icons/react/3x2/MC";
import DK from "country-flag-icons/react/3x2/DK";
import SE from "country-flag-icons/react/3x2/SE";
import CZ from "country-flag-icons/react/3x2/CZ";
import DE from "country-flag-icons/react/3x2/DE";
import NO from "country-flag-icons/react/3x2/NO";
import HR from "country-flag-icons/react/3x2/HR";
import GR from "country-flag-icons/react/3x2/GR";
import NL from "country-flag-icons/react/3x2/NL";
import GB from "country-flag-icons/react/3x2/GB";
import FR from "country-flag-icons/react/3x2/FR";
import BE from "country-flag-icons/react/3x2/BE";
import PT from "country-flag-icons/react/3x2/PT";
import IN from "country-flag-icons/react/3x2/IN";
import SG from "country-flag-icons/react/3x2/SG";
import US from "country-flag-icons/react/3x2/US";
import CA from "country-flag-icons/react/3x2/CA";
import BR from "country-flag-icons/react/3x2/BR";
import Image from "next/image";
import * as si from "simple-icons";

/**
 * Real brand marks, from simple-icons. The path data comes from the package,
 * so nothing here is a hand-drawn icon and nothing is fetched at runtime.
 *
 * Where a brand is not in the set (private companies, agencies), we use a
 * monogram tile instead of inventing a logo. An invented mark for a real
 * employer would be worse than no mark.
 */

type SI = { title: string; path: string; hex: string };

const get = (slug: string): SI | null => {
  const key = "si" + slug.charAt(0).toUpperCase() + slug.slice(1);
  return (si as unknown as Record<string, SI>)[key] ?? null;
};


/**
 * Marks that simple-icons does not carry. OpenAI and AWS were removed from it
 * over trademark, Pinecone and Playwright were never in it.
 *
 * Only single-path, currentColor marks belong here: they sit next to
 * simple-icons marks on the same row, and a multi-colour logo from a different
 * icon set reads as a mistake rather than a brand. C#, AWS and Playwright only
 * exist as multi-colour art, so they keep the monogram instead.
 */
const EXTRA_MARKS: Record<string, { title: string; path: string }> = {
  openai: {
    title: "OpenAI",
    path: "M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z",
  },
};

export function BrandMark({ slug, size = 18 }: { slug: string; size?: number }) {
  const icon = get(slug) ?? EXTRA_MARKS[slug];
  if (!icon) return null;
  return (
    <svg
      role="img"
      aria-label={icon.title}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className="shrink-0 fill-current"
    >
      <path d={icon.path} />
    </svg>
  );
}

// Fixed fills, so the glyph contrast is the same in both appearances.
/** Rebus mark for an organisation with no public icon in the set. */
/**
 * Initials for a brand with no mark in any icon set we use. Monochrome on
 * purpose: it sits in a row of monochrome brand marks, and a filled colour
 * block there reads as a different system rather than a logo.
 */
export function Monogram({ name, size = 28 }: { name: string; size?: number }) {
  const initials = name
    .replace(/[^A-Za-z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
  return (
    <span
      aria-hidden
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      className="squircle grid shrink-0 place-items-center rounded-[6px] font-semibold tracking-tight text-ink ring-1 ring-inset ring-ink/25"
    >
      {initials}
    </span>
  );
}

/**
 * Flat flag, drawn from plain rectangles rather than an emoji. Senne's rule is
 * flat SVG flags, never emoji flags. Only the three he actually speaks.
 */
/**
 * Real flags, from a maintained set. The hand-drawn three-bar version could
 * only ever be right for tricolours, and quietly drew India, Singapore and
 * Brazil as stripes they are not.
 */
const FLAGS: Record<string, { Icon: (p: { title?: string }) => React.JSX.Element; label: string }> = {
  nl: { Icon: NL, label: "Netherlands" },
  gb: { Icon: GB, label: "United Kingdom" },
  fr: { Icon: FR, label: "France" },
  be: { Icon: BE, label: "Belgium" },
  pt: { Icon: PT, label: "Portugal" },
  it: { Icon: IT, label: "Italy" },
  in: { Icon: IN, label: "India" },
  sg: { Icon: SG, label: "Singapore" },
  us: { Icon: US, label: "United States" },
  ca: { Icon: CA, label: "Canada" },
  br: { Icon: BR, label: "Brazil" },
  es: { Icon: ES, label: "Spain" },
  pl: { Icon: PL, label: "Poland" },
  bg: { Icon: BG, label: "Bulgaria" },
  ch: { Icon: CH, label: "Switzerland" },
  mc: { Icon: MC, label: "Monaco" },
  dk: { Icon: DK, label: "Denmark" },
  se: { Icon: SE, label: "Sweden" },
  cz: { Icon: CZ, label: "Czechia" },
  de: { Icon: DE, label: "Germany" },
  no: { Icon: NO, label: "Norway" },
  hr: { Icon: HR, label: "Croatia" },
  gr: { Icon: GR, label: "Greece" },
};

export type FlagCode = keyof typeof FLAGS;

export function Flag({ code, size = 20 }: { code: FlagCode; size?: number }) {
  const f = FLAGS[code];
  if (!f) return null;
  const { Icon } = f;
  return (
    <span
      className="inline-flex shrink-0 overflow-hidden rounded-[3px]"
      style={{ width: size, height: size * (2 / 3) }}
      role="img"
      aria-label={f.label}
    >
      <Icon title={f.label} />
    </span>
  );
}

/** A short row of flags, for a list of markets or offices. */
export function Flags({ codes, size = 18 }: { codes: FlagCode[]; size?: number }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {codes.map((c) => (
        <Flag key={c} code={c} size={size} />
      ))}
    </span>
  );
}



/**
 * A mark for anything: the real brand icon when simple-icons has one, and a
 * monogram when it does not. Several brands (AWS, OpenAI, C#, Playwright,
 * Pinecone) are absent from the set for trademark reasons, and a monogram is
 * honest about being a monogram in a way an invented logo would not be.
 */
export function Mark({
  name,
  slug,
  tint = "green",
  size = 16,
}: {
  name: string;
  slug?: string;
  tint?: "red" | "blue" | "yellow" | "green";
  size?: number;
}) {
  const icon = slug ? get(slug) ?? EXTRA_MARKS[slug] : null;
  if (icon) {
    return (
      <span className="text-ink">
        <BrandMark slug={slug as string} size={size} />
      </span>
    );
  }
  return <Monogram name={name} size={size + 4} />;
}


/**
 * A company's logo, flat. No plate, no card: the mark sits directly on the row
 * the way an icon does in an iOS list.
 *
 * 29pt is the size a list-row icon takes in iOS, which is why it is the size
 * here. Marks supplied in a single near-black colourway are inverted in dark
 * mode rather than being given a background to survive on.
 */
export function CompanyLogo({
  src,
  name,
  mono = false,
  size = 29,
}: {
  src: string;
  name: string;
  mono?: boolean;
  size?: number;
}) {
  return (
    <Image
      src={src}
      alt={`${name} logo`}
      width={size * 2}
      height={size * 2}
      style={{ width: size, height: size }}
      className={`shrink-0 object-contain ${mono ? "dark:brightness-0 dark:invert" : ""}`}
    />
  );
}
