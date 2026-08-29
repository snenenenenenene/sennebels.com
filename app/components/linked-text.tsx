import Link from "next/link";
import { FEATURED } from "../data/portfolio";

/**
 * Turns a project's name into a link to its case study, wherever it is
 * mentioned in prose.
 *
 * Naming a project and then making the reader go find it is the sort of thing
 * that only reads as fine to the person who already knows the way around. One
 * component so the rule lives in a single place rather than being remembered
 * at every call site.
 *
 * `skip` exists because a case study naming itself should not link to itself.
 */
const TARGETS = FEATURED.map((p) => ({ name: p.name, slug: p.slug }));

export function LinkedText({
  text,
  skip,
  className = "",
}: {
  text: string;
  skip?: string;
  className?: string;
}) {
  const targets = TARGETS.filter((t) => t.slug !== skip);
  // Longest first, so "Lokaal Beslist" is matched before any shorter name that
  // happens to sit inside it.
  const names = targets.map((t) => t.name).sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`(${names.map(escape).join("|")})`, "g");

  const parts = text.split(pattern);

  return (
    <p className={className}>
      {parts.map((part, i) => {
        const hit = targets.find((t) => t.name === part);
        if (!hit) return part;
        return (
          <Link
            key={`${hit.slug}-${i}`}
            href={`/work/${hit.slug}`}
            className="font-medium text-ink underline decoration-tone-red/35 decoration-2 underline-offset-[3px] transition-colors duration-200 hover:decoration-tone-red"
          >
            {part}
          </Link>
        );
      })}
    </p>
  );
}

/** Project names are plain words today, but a regex should not assume that. */
function escape(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
