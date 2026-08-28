import Image from "next/image";

/**
 * A row of stills from films Senne gave five stars. The artwork does the
 * talking rather than a paragraph about liking films.
 *
 * Deliberately no link and no service mark: the viewing log is his, and the
 * account it came from stays private. The films are the point, not the profile.
 *
 * Scrolls horizontally rather than wrapping, so it stays one row on a phone.
 */
export function FilmStrip({ films }: { films: { title: string; year: string; img: string }[] }) {
  return (
    <div>
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

    </div>
  );
}
