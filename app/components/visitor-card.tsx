import { CARD_COLORS, type CardColor, type Hat, type Signature } from "../data/visitor";
import { HatMark } from "./hat";

/**
 * The visitor card: a library card, issued rather than filled in.
 *
 * A guestbook entry is a row of text and reads like one. A card is an object,
 * and an object is a thing people want to keep — which is the whole reason
 * anybody signs a guestbook on a stranger's website.
 *
 * Everything is drawn at a fixed 320x200 viewBox and scaled by the container,
 * so one card renders identically in the onboarding preview and in a gallery
 * grid three columns wide.
 */
export function VisitorCard({
  name,
  color,
  hat = "none",
  signature,
  issued,
  serial,
  className = "",
}: {
  name: string;
  color: CardColor;
  hat?: Hat;
  signature?: Signature | null;
  issued: Date;
  serial: number;
  className?: string;
}) {
  const { ground, ink } = CARD_COLORS[color];
  const date = issued.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  return (
    <div className={`relative ${className}`}>
      {/* The hat sits on the card's top edge rather than inside it, so it
          reads as worn rather than printed. */}
      {hat !== "none" && (
        <div className="pointer-events-none absolute -top-[13px] left-[18%] z-10 -rotate-[8deg]">
          <HatMark hat={hat} size={34} />
        </div>
      )}

      <svg
        viewBox="0 0 320 200"
        className="squircle block w-full rounded-media shadow-card"
        role="img"
        aria-label={`Visitor card for ${name}, issued ${date}`}
      >
        <rect width="320" height="200" fill={ground} />

        {/* Guilloche, the engraved rosette on anything that wants to look
            issued by an institution. Two rotated ellipse families, which is
            all that pattern ever was. */}
        <g opacity="0.16" stroke={ink} strokeWidth="0.6" fill="none">
          {Array.from({ length: 18 }, (_, i) => (
            <ellipse
              key={i}
              cx="248"
              cy="104"
              rx="62"
              ry="22"
              transform={`rotate(${i * 10} 248 104)`}
            />
          ))}
        </g>

        <text x="20" y="36" fill={ink} fontSize="17" fontFamily="var(--font-fraunces), Georgia, serif" fontStyle="italic">
          Senne&#39;s desk
        </text>
        <line x1="20" y1="48" x2="300" y2="48" stroke={ink} strokeWidth="0.8" opacity="0.35" />

        <text x="20" y="74" fill={ink} fontSize="8" letterSpacing="1.6" opacity="0.7" fontFamily="var(--font-mono), monospace">
          VISITOR
        </text>
        <text x="20" y="93" fill={ink} fontSize="14" letterSpacing="0.6" fontFamily="var(--font-mono), monospace">
          {name}
        </text>

        <text x="20" y="120" fill={ink} fontSize="8" letterSpacing="1.6" opacity="0.7" fontFamily="var(--font-mono), monospace">
          ISSUED ON
        </text>
        <text x="20" y="136" fill={ink} fontSize="12" fontFamily="var(--font-mono), monospace">
          {date}
        </text>

        {/* Signature line. The X is the part that makes people sign it. */}
        <text x="20" y="176" fill={ink} fontSize="10" opacity="0.8" fontFamily="var(--font-mono), monospace">
          X
        </text>
        <line x1="34" y1="176" x2="230" y2="176" stroke={ink} strokeWidth="0.8" opacity="0.45" />
        {signature?.length ? (
          <g stroke={ink} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {signature.map((stroke, i) => (
              <polyline
                key={i}
                points={stroke.map(([x, y]) => `${34 + x * 196},${140 + y * 36}`).join(" ")}
              />
            ))}
          </g>
        ) : null}

        <text x="20" y="192" fill={ink} fontSize="7" letterSpacing="1.4" opacity="0.55" fontFamily="var(--font-mono), monospace">
          NO. {String(serial).padStart(4, "0")}
        </text>
      </svg>
    </div>
  );
}
