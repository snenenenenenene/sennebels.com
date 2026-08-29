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

export function BrandMark({ slug, size = 18 }: { slug: string; size?: number }) {
  const icon = get(slug);
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
const MONOGRAM_TINT: Record<string, string> = {
  red: "bg-mark-red text-white",
  blue: "bg-mark-blue text-white",
  yellow: "bg-mark-yellow text-[#1E1515]",
  green: "bg-mark-green text-white",
};

/** Rebus mark for an organisation with no public icon in the set. */
export function Monogram({
  name,
  tint = "green",
  size = 28,
}: {
  name: string;
  tint?: "red" | "blue" | "yellow" | "green";
  size?: number;
}) {
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
      className={`squircle grid shrink-0 place-items-center rounded-[8px] font-semibold tracking-tight ${MONOGRAM_TINT[tint]}`}
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
  const icon = slug ? get(slug) : null;
  if (icon) {
    return (
      <span className="text-ink">
        <BrandMark slug={slug as string} size={size} />
      </span>
    );
  }
  return <Monogram name={name} tint={tint} size={size + 4} />;
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
