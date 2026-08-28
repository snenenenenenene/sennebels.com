import type { ReactNode } from "react";
import type { Icon } from "@phosphor-icons/react";

/**
 * Shared primitives. Every surface on the site is built from these, so a
 * radius or shadow is defined once here (and in the Tailwind tokens they
 * reference) rather than re-tuned at each call site.
 */

/** Pressable affordance. iOS scales a control down on touch rather than dimming it. */
export const TAP =
  "min-h-tap transition-transform duration-200 ease-out active:scale-[0.98]";

/**
 * Liquid Glass, Regular variant. iOS 26 splits the interface into a content
 * layer and a functional layer that floats above it; this is that floating
 * material. Regular blurs and re-luminates whatever is behind it, which is
 * the correct choice wherever the panel carries text or controls.
 *
 * Glass has no colour of its own. The fill is a colour-mix against the live
 * surface token so it picks up whatever sits behind it, in either appearance.
 */
export const GLASS =
  "border border-white/50 bg-[color-mix(in_srgb,var(--raised)_72%,transparent)] shadow-glass backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:shadow-glass-dark";

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
export function Glyph({ icon: I, label }: { icon: Icon; label?: string }) {
  return (
    <I
      size="0.92em"
      weight="duotone"
      className="mx-[0.18em] inline-block shrink-0 -translate-y-[0.06em] align-baseline text-moss"
      aria-hidden={label ? undefined : true}
      aria-label={label}
    />
  );
}

/** Section sub-heading with its glyph. One definition, used by every section. */
export function Heading({ icon: I, children }: { icon: Icon; children: ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 text-title3 font-medium">
      <I size={21} weight="duotone" className="text-moss" aria-hidden />
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
    <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-caption font-medium uppercase tracking-[0.18em] text-ink-3">
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
