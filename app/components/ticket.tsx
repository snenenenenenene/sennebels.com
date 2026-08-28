import { MicrophoneStage } from "@phosphor-icons/react/dist/ssr";
import type { Tint } from "./ui";

/**
 * A gig as a ticket stub rather than a press photo.
 *
 * Artist photography is somebody else's to license, and one of these acts has
 * no freely licensed image at all, so a row of borrowed band shots was never
 * an option. A stub says the same thing in the site's own language: the act is
 * the type, the colour block is the tear-off, and the perforation is a border.
 */

const STUB: Record<Tint, { block: string; text: string }> = {
  red: { block: "bg-mark-red", text: "text-tone-red" },
  blue: { block: "bg-mark-blue", text: "text-tone-blue" },
  yellow: { block: "bg-mark-yellow", text: "text-tone-yellow" },
  green: { block: "bg-mark-green", text: "text-tone-green" },
};

export function Ticket({
  act,
  where,
  year,
  tint,
}: {
  act: string;
  where: string;
  year: string;
  tint: Tint;
}) {
  const s = STUB[tint];
  return (
    <li className="squircle group/ticket flex w-[210px] shrink-0 overflow-hidden rounded-tile bg-raised shadow-card transition-shadow duration-300 hover:shadow-card-hover">
      <span
        aria-hidden
        className={`grid w-9 shrink-0 place-items-center ${s.block} text-white`}
      >
        <MicrophoneStage size={16} weight="fill" className={tint === "yellow" ? "text-[#1E1515]" : ""} />
      </span>
      {/* The perforation. A dashed edge reads as a tear-off without an image. */}
      <span aria-hidden className="w-px border-l border-dashed border-hairline" />
      <span className="flex min-w-0 flex-col justify-center gap-0.5 px-3.5 py-3">
        <span className="truncate text-callout font-semibold text-ink">{act}</span>
        <span className="text-caption text-ink-3">{[where, year].filter(Boolean).join(" · ")}</span>
      </span>
    </li>
  );
}
