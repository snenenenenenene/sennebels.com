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
const FLAGS: Record<string, { label: string; bars: string[]; vertical?: boolean }> = {
  nl: { label: "Dutch", bars: ["#AE1C28", "#FFFFFF", "#21468B"] },
  gb: { label: "English", bars: [] },
  fr: { label: "French", bars: ["#002395", "#FFFFFF", "#ED2939"], vertical: true },
};

export function Flag({ code, size = 20 }: { code: keyof typeof FLAGS; size?: number }) {
  const f = FLAGS[code];
  if (!f) return null;
  const h = size * 0.7;
  if (code === "gb") {
    return (
      <svg role="img" aria-label={f.label} viewBox="0 0 60 42" width={size} height={h} className="shrink-0 rounded-[3px]">
        <rect width="60" height="42" fill="#012169" />
        <path d="M0 0l60 42M60 0L0 42" stroke="#FFF" strokeWidth="8" />
        <path d="M0 0l60 42M60 0L0 42" stroke="#C8102E" strokeWidth="4" />
        <path d="M30 0v42M0 21h60" stroke="#FFF" strokeWidth="14" />
        <path d="M30 0v42M0 21h60" stroke="#C8102E" strokeWidth="8" />
      </svg>
    );
  }
  return (
    <svg role="img" aria-label={f.label} viewBox="0 0 60 42" width={size} height={h} className="shrink-0 rounded-[3px]">
      {f.bars.map((c, i) =>
        f.vertical ? (
          <rect key={c} x={i * 20} width="20" height="42" fill={c} />
        ) : (
          <rect key={c} y={i * 14} width="60" height="14" fill={c} />
        ),
      )}
    </svg>
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
