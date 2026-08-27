import type { ReactNode } from "react";
import type { Icon } from "@phosphor-icons/react";

/**
 * Wabi-sabi: space does the grouping, not boxes. There is one accent
 * (celadon-moss) and it is the only accent on the page. Every colour comes
 * from a CSS variable that swaps under prefers-color-scheme, per HIG's
 * "embrace colors that adapt to the current appearance".
 */

/**
 * Rebus: the glyph sits inside the sentence rather than beside it, so the
 * words and the marks read as one line. Icons come from Phosphor, never
 * hand-drawn paths.
 */
export function Glyph({ icon: I, label }: { icon: Icon; label?: string }) {
  return (
    <I
      size={"0.92em"}
      weight="duotone"
      className="mx-[0.18em] inline-block shrink-0 -translate-y-[0.06em] align-baseline text-moss"
      aria-hidden={label ? undefined : true}
      aria-label={label}
    />
  );
}

/** Section opener. Used sparingly: the page allows three across all sections. */
export function SectionHeader({ label, aside }: { label: string; aside?: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1">
      <h2 className="text-callout font-semibold uppercase tracking-[0.22em] text-ink-3">{label}</h2>
      {aside && <p className="font-display text-title3 font-medium italic text-moss">{aside}</p>}
    </div>
  );
}

export function Chip({ children, tone = "plain" }: { children: ReactNode; tone?: "plain" | "accent" }) {
  return (
    <li
      className={`rounded-full px-[17px] py-[9px] text-callout font-medium ${
        tone === "accent" ? "bg-accent-soft text-moss" : "bg-raised text-ink-2"
      }`}
    >
      {children}
    </li>
  );
}
