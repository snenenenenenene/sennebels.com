import type { ReactNode } from "react";
import type { Icon } from "@phosphor-icons/react";

/**
 * Shared primitives. Every surface on the site is built from these, so a
 * radius or shadow is defined once here (and in the Tailwind tokens they
 * reference) rather than re-tuned at each call site.
 */

/** Pressable affordance. iOS scales a control down on touch rather than dimming it. */
export const TAP =
  "min-h-tap transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:translate-y-0";

/**
 * Micro-label. Every small uppercase caption on the site — section labels,
 * metric labels, dates, credit rows — resolves here.
 *
 * There were ten of these written by hand across the site with five different
 * tracking values, which is what drift looks like before anyone calls it that.
 * One face (mono), one size, one tracking.
 */
export const MICRO = "font-mono text-caption uppercase tracking-[0.16em]";

/**
 * The one easing the site moves on. Slow out, no overshoot: things settle
 * rather than bounce, which is the difference between a page that feels
 * built and one that feels animated.
 */
export const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

/**
 * A card that is pinned rather than placed.
 *
 * At rest it sits a fraction of a degree off square, the way something put
 * down by hand does. On hover it straightens and lifts. That is the whole
 * trick: the movement is toward order, so hovering reads as picking a thing
 * up and squaring it rather than as the card flinching away from the cursor.
 *
 * Rotation is sub-degree on purpose. At one degree it looks broken; at a
 * third of one it only registers once the card straightens.
 *
 * Under reduced motion the rest angle goes too, not just the transition —
 * a permanently crooked card is the part that bothers people.
 */
export const PINNED =
  "-rotate-[0.4deg] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:rotate-0 hover:-translate-y-[3px] hover:shadow-card-hover motion-reduce:rotate-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

/** Media inside a PINNED card, which leans in slightly as the card is picked up. */
export const PINNED_MEDIA =
  "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/small:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover/small:scale-100";

/**
 * Liquid Glass, Regular variant.
 *
 * The point of glass is that live content passes underneath it. A translucent
 * panel with an opaque backdrop behind it is just a grey rectangle, which is
 * exactly what this was until the scrim came out. Nothing may sit between a
 * glass surface and the scrolling content.
 *
 * The fill is a tint, not a surface colour, so what shows through is the page.
 */
export const GLASS =
  "squircle bg-glass-tint shadow-pane backdrop-blur-2xl backdrop-saturate-[1.8]";

export const ACCENT_TEXT: Record<Tint, string> = {
  red: "text-tone-red",
  blue: "text-tone-blue",
  yellow: "text-tone-yellow",
  green: "text-tone-green",
};

/**
 * Written out, never composed at runtime. Tailwind only emits classes it can
 * see as literal strings in the source, so a class built with .replace() or a
 * template exists in the markup and nowhere in the stylesheet.
 */
/**
 * Plain hover:, not group-hover/link:. This colours the anchor itself, and a
 * group-hover variant compiles to a DESCENDANT selector, so an element that is
 * the group can never match its own group-hover rule.
 */
export const LINK_HOVER: Record<Tint, string> = {
  red: "hover:text-tone-red",
  blue: "hover:text-tone-blue",
  yellow: "hover:text-tone-yellow",
  green: "hover:text-tone-green",
};

/** Row hover, written out for the same reason LINK_HOVER is. */
export const ROW_TEXT: Record<Tint, string> = {
  red: "group-hover/row:text-tone-red",
  blue: "group-hover/row:text-tone-blue",
  yellow: "group-hover/row:text-tone-yellow",
  green: "group-hover/row:text-tone-green",
};

/**
 * Skill pill hover. A light ground with the dark text variant on top, so the
 * label and its mark stay readable: the vivid fill is bright enough to carry a
 * white glyph but nowhere near dark enough to be read as type.
 */
export const PILL_HOVER: Record<Tint, string> = {
  red: "hover:bg-[color-mix(in_srgb,var(--sys-red)_16%,var(--raised))] hover:text-tone-red",
  blue: "hover:bg-[color-mix(in_srgb,var(--sys-blue)_16%,var(--raised))] hover:text-tone-blue",
  yellow: "hover:bg-[color-mix(in_srgb,var(--sys-yellow)_30%,var(--raised))] hover:text-tone-yellow",
  green: "hover:bg-[color-mix(in_srgb,var(--sys-green)_16%,var(--raised))] hover:text-tone-green",
};

export const RULE_BG: Record<Tint, string> = {
  red: "bg-tone-red",
  blue: "bg-tone-blue",
  yellow: "bg-tone-yellow",
  green: "bg-tone-green",
};

export const ACCENT_HOVER: Record<Tint, string> = {
  red: "group-hover/card:text-tone-red",
  blue: "group-hover/card:text-tone-blue",
  yellow: "group-hover/card:text-tone-yellow",
  green: "group-hover/card:text-tone-green",
};

/** A grouped content surface. Replaces rules: fill groups, elevation separates. */
export function Surface({
  children,
  className = "",
  interactive = false,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  as?: "div" | "article" | "li" | "section";
}) {
  return (
    <Tag
      className={`rounded-panel bg-raised shadow-card ${
        interactive ? "transition-shadow duration-300 hover:shadow-card-hover" : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

/**
 * Rebus: the glyph sits inside the sentence rather than beside it, so the
 * words and the marks read as one line. Icons come from Phosphor, never
 * hand-drawn paths.
 */
/**
 * Rebus, done as a bound unit rather than a loose glyph.
 *
 * An icon dropped after a word floats: nothing ties it to the text, it breaks
 * the line rhythm, and it can wrap away from the word it belongs to. Binding
 * the mark and its noun into one inline-flex run with a tinted ground fixes all
 * three. The icon is sized in ch so it tracks the text, and sits at cap height
 * rather than on the baseline.
 */
export function Rebus({
  icon: I,
  tint = "blue",
  children,
}: {
  icon: Icon;
  tint?: Tint;
  children: ReactNode;
}) {
  return (
    <span
      // Horizontal inset gives the unit room; vertical inset stays small on
      // purpose, because an inline object taller than its line box overflows
      // into the line above and two of them on adjacent lines will touch.
      // Space between lines is the paragraph's leading, not the chip's padding.
      className={`mx-[0.18em] inline-flex max-w-full items-center gap-[0.55ch] whitespace-normal rounded-[0.5em] sm:whitespace-nowrap px-[0.7ch] py-[0.14em] align-middle leading-[1.15] ${REBUS_GROUND[tint]}`}
    >
      <I
        size="1.05ch"
        weight="fill"
        aria-hidden
        className={`shrink-0 ${ACCENT_TEXT[tint]}`}
        style={{ width: "1.05ch", height: "1.05ch" }}
      />
      {children}
    </span>
  );
}

/** A very light ground, so the unit reads as one object without shouting. */
const REBUS_GROUND: Record<Tint, string> = {
  red: "bg-[color-mix(in_srgb,var(--sys-red)_10%,transparent)]",
  blue: "bg-[color-mix(in_srgb,var(--sys-blue)_10%,transparent)]",
  yellow: "bg-[color-mix(in_srgb,var(--sys-yellow)_18%,transparent)]",
  green: "bg-[color-mix(in_srgb,var(--sys-green)_10%,transparent)]",
};

/** Bare inline glyph, kept for places where a ground would be too much. */
export function Glyph({
  icon: I,
  label,
  tint = "blue",
}: {
  icon: Icon;
  label?: string;
  tint?: Tint;
}) {
  return (
    <I
      size="0.92em"
      weight="fill"
      className={`mx-[0.18em] inline-block shrink-0 -translate-y-[0.06em] align-baseline ${ACCENT_TEXT[tint]}`}
      aria-hidden={label ? undefined : true}
      aria-label={label}
    />
  );
}

export type Tint = "red" | "blue" | "yellow" | "green";

/**
 * Project surface tint. The accent sits at a low mix with the page at rest and
 * comes up to full strength on hover, so colour is a reward for pointing at
 * something rather than constant noise. Mixed against the live surface token,
 * which keeps both appearances correct from one declaration.
 */
/** Card fill at rest and on hover, plus the shadow that arrives with it. */
export const CARD_TINT: Record<Tint, string> = {
  red: "bg-[color-mix(in_srgb,var(--sys-red)_8%,var(--raised))] hover:bg-[color-mix(in_srgb,var(--sys-red)_17%,var(--raised))]",
  blue: "bg-[color-mix(in_srgb,var(--sys-blue)_8%,var(--raised))] hover:bg-[color-mix(in_srgb,var(--sys-blue)_17%,var(--raised))]",
  yellow: "bg-[color-mix(in_srgb,var(--sys-yellow)_13%,var(--raised))] hover:bg-[color-mix(in_srgb,var(--sys-yellow)_26%,var(--raised))]",
  green: "bg-[color-mix(in_srgb,var(--sys-green)_8%,var(--raised))] hover:bg-[color-mix(in_srgb,var(--sys-green)_17%,var(--raised))]",
};

export const SURFACE_TINT: Record<Tint, string> = {
  red: "bg-[color-mix(in_srgb,var(--sys-red)_6%,var(--raised))] hover:bg-[color-mix(in_srgb,var(--sys-red)_15%,var(--raised))]",
  blue: "bg-[color-mix(in_srgb,var(--sys-blue)_6%,var(--raised))] hover:bg-[color-mix(in_srgb,var(--sys-blue)_15%,var(--raised))]",
  yellow: "bg-[color-mix(in_srgb,var(--sys-yellow)_10%,var(--raised))] hover:bg-[color-mix(in_srgb,var(--sys-yellow)_24%,var(--raised))]",
  green: "bg-[color-mix(in_srgb,var(--sys-green)_6%,var(--raised))] hover:bg-[color-mix(in_srgb,var(--sys-green)_15%,var(--raised))]",
};

/**
 * Full-strength accent on hover. These are written out rather than composed at
 * runtime, because Tailwind only ships classes it can see as literal strings.
 */
/**
 * Accent as TEXT. Separate from the fill values, because a colour bright
 * enough to sit behind a white glyph is not dark enough to be read on paper.
 * iOS ships the same split.
 */

const TINT: Record<Tint, string> = {
  red: "bg-mark-red",
  blue: "bg-mark-blue",
  yellow: "bg-mark-yellow",
  green: "bg-mark-green",
};

/**
 * Glyph tile. iOS renders a symbol as white on a vivid rounded-square fill,
 * the way every row icon in Settings does, rather than as a bare outline in
 * the text colour. Squircle corners where the browser supports them.
 */
export function GlyphTile({ icon: I, tint }: { icon: Icon; tint: Tint }) {
  return (
    <span
      aria-hidden
      className={`squircle grid size-7 shrink-0 place-items-center rounded-[9px] ${TINT[tint]} shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]`}
    >
      {/* Deep yellow is too light to carry a white glyph, so it takes ink. */}
      <I size={17} weight="fill" className={tint === "yellow" ? "text-[#1E1515]" : "text-white"} />
    </span>
  );
}

/** Section sub-heading with its glyph tile. One definition, every section. */
export function Heading({
  icon: I,
  tint = "green",
  children,
}: {
  icon: Icon;
  tint?: Tint;
  children: ReactNode;
}) {
  return (
    <h3 className="flex items-center gap-2.5 text-title3 font-medium">
      <GlyphTile icon={I} tint={tint} />
      {children}
    </h3>
  );
}

export function Chip({ children, tone = "plain" }: { children: ReactNode; tone?: "plain" | "accent" }) {
  return (
    <li
      className={`rounded-full px-[17px] py-[9px] text-callout font-medium transition-colors duration-200 ${
        tone === "accent" ? "bg-accent-soft text-moss" : "bg-raised text-ink-2"
      }`}
    >
      {children}
    </li>
  );
}

/**
 * Type line, borrowed from a Magic card: what the thing is, then what kind.
 * The separator is an element, not a dash character, so no em-dash sneaks in
 * and the two halves stay legible when the line wraps.
 */
export function TypeLine({ kind, sub }: { kind: string; sub: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-2.5 gap-y-1 text-ink-3 ${MICRO}`}>
      <span>{kind}</span>
      <span aria-hidden className="h-px w-4 bg-ink-3/50" />
      <span>{sub}</span>
    </p>
  );
}

/**
 * Flavour text. On a Magic card this is the italic line at the bottom that
 * tells you what the thing feels like rather than what it does. Here it is
 * where the personality lives, attached to the work instead of quarantined
 * in a grid of tiles at the end of the page.
 */
export function Flavour({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-2 border-moss/30 pl-4 font-display text-callout italic leading-[1.6] text-ink-3">
      {children}
    </p>
  );
}

/**
 * The evidence row on a project card: three results, stated as a number and
 * what it counts. A card that says "AI-powered pipeline" and a card that says
 * "89% faster page loads" cost the same amount of space and are not worth the
 * same amount to a reader, so the numbers get to lead.
 *
 * Values are the project's own `outcomes`, not a second set written for the
 * card, and not every one of them is a figure: "Flutter to RN" is a result the
 * same way "+27%" is. So the value is sized as a heading rather than a display
 * number, which is a size a short phrase survives.
 */
export function OutcomeRow({
  outcomes,
  tint = "blue",
}: {
  outcomes: { value: string; label: string }[];
  tint?: Tint;
}) {
  return (
    <dl className="flex flex-wrap gap-x-9 gap-y-5">
      {outcomes.slice(0, 3).map((o) => (
        <div key={o.label} className="flex max-w-[19ch] flex-col gap-1">
          <dt className="sr-only">{o.label}</dt>
          <dd className={`font-display text-title3 font-medium leading-[1.15] ${ACCENT_TEXT[tint]}`}>
            {o.value}
          </dd>
          <p aria-hidden className={`text-ink-3 ${MICRO}`}>
            {o.label}
          </p>
        </div>
      ))}
    </dl>
  );
}

/**
 * Role, engagement and dates, as a credit line rather than prose. Reads off
 * the same `facts` the case study uses; the card takes the first three, which
 * is where the answers to "what did you actually do, and when" live.
 */
export function MetaRow({ facts }: { facts: { label: string; value: string }[] }) {
  return (
    <dl className="flex flex-wrap gap-x-8 gap-y-4">
      {facts.slice(0, 3).map((f) => (
        <div key={f.label} className="flex max-w-[24ch] flex-col gap-1">
          <dt className={`text-ink-3 ${MICRO}`}>{f.label}</dt>
          <dd className="text-callout text-ink-2">{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}
