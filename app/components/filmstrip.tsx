import Image from "next/image";
import { BrandMark } from "./marks";

/**
 * A row of real stills from films Senne actually gave five stars, pulled from
 * their Letterboxd pages. Oku does this with book covers, and it works for the
 * same reason: the artwork is doing the talking, not a paragraph about liking
 * films.
 *
 * It scrolls horizontally rather than wrapping, so the row reads as one strip
 * and stays one row on a phone.
 */
export function FilmStrip({
  films,
  href,
}: {
  films: { title: string; year: string; img: string }[];
  href: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="-mx-6 overflow-x-auto px-6 pb-2 md:-mx-12 md:px-12 lg:-mx-16 lg:px-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="flex w-max gap-3">
          {films.map((f) => (
            <li key={f.title} className="group/film w-[248px] shrink-0">
              <div className="squircle overflow-hidden rounded-media shadow-media">
                <Image
                  src={f.img}
                  alt={`Still from ${f.title}`}
                  width={640}
                  height={360}
                  className="h-[140px] w-full object-cover transition-transform duration-500 ease-out group-hover/film:scale-[1.04]"
                />
              </div>
              <p className="mt-2.5 truncate text-callout font-medium text-ink">{f.title}</p>
              <p className="text-caption text-ink-3">{f.year}</p>
            </li>
          ))}
        </ul>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group/link flex min-h-tap w-fit items-center gap-2 text-callout font-medium text-ink-2 transition-colors duration-200 hover:text-tone-blue"
      >
        <span className="text-[#202830] dark:text-white">
          <BrandMark slug="letterboxd" size={17} />
        </span>
        <span className="relative">
          All 198 on Letterboxd
          <span
            aria-hidden
            className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-tone-blue transition-transform duration-300 ease-out group-hover/link:scale-x-100"
          />
        </span>
      </a>
    </div>
  );
}
