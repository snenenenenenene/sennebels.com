import Image from "next/image";

/**
 * A browser window, drawn the same way the phone is: a chrome bar, the page
 * inset below it, nothing else. It exists so a desktop capture reads as a
 * product rather than as a stray rectangle on the page.
 *
 * The screenshot keeps its own aspect ratio. Cropping it to a fixed card
 * height is what was slicing the bottom off these captures, and a web app
 * screenshot loses its point the moment you cut the interface in half.
 */
export function Browser({
  src,
  alt = "",
  url,
  className = "",
  priority = false,
}: {
  src: string;
  alt?: string;
  url?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`overflow-hidden rounded-[14px] bg-[#e6e2dc] dark:bg-[#2b2b30] ${className}`}>
      <div className="flex items-center gap-1.5 px-3 py-2.5">
        <span aria-hidden className="size-2.5 rounded-full bg-[#f2685f]" />
        <span aria-hidden className="size-2.5 rounded-full bg-[#f5bf4f]" />
        <span aria-hidden className="size-2.5 rounded-full bg-[#61c454]" />
        {url && (
          <span className="ml-2 truncate rounded-full bg-paper px-2.5 py-0.5 text-[11px] leading-[1.6] text-ink-2">
            {url}
          </span>
        )}
      </div>
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1000}
        priority={priority}
        className="block w-full"
      />
    </div>
  );
}
