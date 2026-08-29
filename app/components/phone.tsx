import Image from "next/image";

/**
 * An iPhone, drawn rather than photographed: a titanium bezel, a screen inset
 * inside it, and nothing else. No drop shadow and no plate, so it still sits
 * on the page ground the way the bare screenshots did.
 *
 * Radii and bezel thickness scale off the width, because a rounded corner that
 * stays 40px while the device shrinks to a thumbnail reads as a rounded
 * rectangle rather than a phone.
 *
 * `island` is off by default: several of these captures already have the
 * Dynamic Island painted into the screenshot, and drawing a second one over
 * the top gives the device two of them.
 */
export function Phone({
  src,
  alt = "",
  width,
  island = false,
  className = "",
  priority = false,
  style,
}: {
  src: string;
  alt?: string;
  width: number;
  island?: boolean;
  className?: string;
  priority?: boolean;
  style?: React.CSSProperties;
}) {
  const bezel = Math.max(2, Math.round(width * 0.026));
  const outer = width * 0.165;

  return (
    <div
      className={`relative shrink-0 bg-[#2b2b30] dark:bg-[#38383d] ${className}`}
      style={{ width, padding: bezel, borderRadius: outer, ...style }}
    >
      {/* The polished edge where the titanium catches light. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20"
        style={{ borderRadius: outer }}
      />
      <div className="relative overflow-hidden" style={{ borderRadius: outer - bezel }}>
        <Image
          src={src}
          alt={alt}
          width={620}
          height={1300}
          priority={priority}
          className="block w-full"
        />
        {island && (
          <span
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black"
            style={{
              top: Math.round(width * 0.028),
              width: Math.round(width * 0.28),
              height: Math.round(width * 0.082),
            }}
          />
        )}
      </div>
    </div>
  );
}
