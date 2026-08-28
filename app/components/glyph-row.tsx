import * as Ph from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { GlyphTile, type Tint } from "./ui";

/**
 * Rebus row. Three glyphs standing for what the work actually involved,
 * carrying the three primaries between them so no single colour does all the
 * talking. Icon names resolve from the Phosphor set by name, so the data stays
 * plain strings and nothing is hand-drawn.
 */

const TRIO: Tint[] = ["red", "blue", "yellow"];

export function GlyphRow({ names, labels }: { names: string[]; labels?: string[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-2.5">
      {names.map((n, i) => {
        const I = (Ph as unknown as Record<string, Icon>)[n];
        if (!I) return null;
        return (
          <li key={n} className="flex items-center gap-2">
            <GlyphTile icon={I} tint={TRIO[i % TRIO.length]} />
            {labels?.[i] && <span className="text-caption text-ink-3">{labels[i]}</span>}
          </li>
        );
      })}
    </ul>
  );
}
