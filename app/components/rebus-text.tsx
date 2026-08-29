import { Fragment } from "react";
import * as Ph from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Rebus } from "./ui";

/**
 * Renders a paragraph with certain phrases carrying a rebus mark, so the icon
 * sits inside the sentence attached to the words it means, rather than in a row
 * of tiles beside the copy where it stands for nothing in particular.
 *
 * Phrases are matched longest-first so a short phrase cannot eat a longer one
 * it happens to sit inside.
 */
export function RebusText({
  text,
  marks,
  className = "",
}: {
  text: string;
  marks: { phrase: string; icon: string; tint: "red" | "blue" | "yellow" }[];
  className?: string;
}) {
  const ordered = [...marks].sort((a, b) => b.phrase.length - a.phrase.length);

  type Part = string | { phrase: string; icon: string; tint: "red" | "blue" | "yellow" };
  let parts: Part[] = [text];

  for (const m of ordered) {
    parts = parts.flatMap((part) => {
      if (typeof part !== "string") return [part];
      const at = part.indexOf(m.phrase);
      if (at === -1) return [part];
      return [part.slice(0, at), m, part.slice(at + m.phrase.length)].filter(
        (x) => x !== "",
      ) as Part[];
    });
  }

  return (
    <p className={className}>
      {parts.map((part, i) => {
        if (typeof part === "string") return <Fragment key={i}>{part}</Fragment>;
        const I = (Ph as unknown as Record<string, Icon>)[part.icon];
        if (!I) return <Fragment key={i}>{part.phrase}</Fragment>;
        return (
          <Rebus key={i} icon={I} tint={part.tint}>
            {part.phrase}
          </Rebus>
        );
      })}
    </p>
  );
}
