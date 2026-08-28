import { IDENTITY } from "../data/portfolio";

/**
 * Colour identity, stated the way a Magic player would state it. Two pips,
 * named and explained, so it reads as a real claim rather than decoration.
 * This is the only place coloured dots appear on the site.
 */
export function Pips() {
  return (
    <p className="flex flex-wrap items-center gap-x-2.5 gap-y-2 text-callout text-ink-3">
      <span className="flex items-center gap-1.5" aria-hidden>
        {IDENTITY.pips.map((p) => (
          <span
            key={p.key}
            className={`grid size-[22px] place-items-center rounded-full text-caption font-bold ${
              p.key === "G" ? "bg-accent-soft text-moss" : "bg-ink text-paper"
            }`}
          >
            {p.key}
          </span>
        ))}
      </span>
      <span className="sr-only">
        Colour identity: {IDENTITY.pips.map((p) => p.name).join(" and ")}.
      </span>
      <span>{IDENTITY.line}</span>
    </p>
  );
}
