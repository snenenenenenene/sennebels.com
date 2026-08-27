import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Featured } from "../data/portfolio";
import { Rule } from "./ui";

/**
 * Wabi-sabi entry: no card, no tint block. A hairline opens the row, the
 * image sits unframed, and space carries the grouping. Rows alternate so the
 * page never settles into a single zigzag rhythm.
 *
 * Confidential client work has no shippable screenshot, so it gets a written
 * list instead of a faked mock.
 */
export function ProjectCard({ project, flipped }: { project: Featured; flipped: boolean }) {
  return (
    <article className="group/card flex flex-col gap-8 py-14">
      <Rule />
      <div
        className={`flex flex-col gap-10 lg:gap-16 ${flipped ? "lg:flex-row-reverse" : "lg:flex-row"}`}
      >
        <div className="flex flex-col gap-5 lg:w-[46%] lg:shrink-0">
          <p className="text-caption font-medium uppercase tracking-[0.2em] text-ink-3">
            {project.name}
          </p>

          <h3 className="max-w-[18ch] text-title1 font-medium text-ink">
            {project.title}
          </h3>

          <p className="max-w-[54ch] text-body text-ink-2">{project.description}</p>

          <p className="text-callout text-ink-3">{project.meta}</p>

          <Link
            href={`/work/${project.slug}`}
            className="mt-2 inline-flex min-h-[44px] w-fit items-center gap-2 border-b border-moss/40 pb-1 text-body font-medium text-moss transition-colors hover:border-moss"
          >
            {project.cta}
            <ArrowRight
              size={17}
              weight="bold"
              aria-hidden
              className="transition-transform duration-300 group-hover/card:translate-x-1"
            />
          </Link>
        </div>

        {project.image ? (
          <div className="overflow-hidden rounded-[3px] lg:min-w-0 lg:flex-1">
            {/* HIG dark mode: soften bright content images so they do not glow. */}
            <Image
              src={project.image}
              alt={`${project.name}: ${project.title}`}
              width={1400}
              height={900}
              loading="eager"
              className="h-[240px] w-full object-cover object-top transition-transform duration-300 ease-out group-hover/card:scale-[1.03] lg:h-[380px]"
            />
          </div>
        ) : (
          project.spec && (
            <ul className="flex flex-col justify-center gap-5 lg:min-w-0 lg:flex-1">
              {project.spec.points.map((point) => (
                <li key={point} className="flex flex-col gap-4">
                  <span className="text-body text-ink-2">{point}</span>
                  <Rule />
                </li>
              ))}
              <li className="font-display text-callout italic text-ink-3">
                {project.spec.credit}
              </li>
            </ul>
          )
        )}
      </div>
    </article>
  );
}

export function SmallCard({
  name,
  kind,
  description,
  href,
  image,
}: {
  name: string;
  kind: string;
  description: string;
  href?: string;
  image?: string;
}) {
  const body = (
    <>
      {image && (
        <div className="mb-5 overflow-hidden rounded-[3px]">
          <Image
            src={image}
            alt={`${name}: ${description.slice(0, 60)}`}
            width={1200}
            height={760}
            loading="eager"
            className="h-[150px] w-full object-cover object-top transition-transform duration-300 ease-out group-hover/small:scale-[1.04]"
          />
        </div>
      )}
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-title3 font-medium text-ink">{name}</h3>
        <p className="text-caption uppercase tracking-[0.14em] text-ink-3">{kind}</p>
      </div>
      <p className="text-callout text-ink-2">{description}</p>
    </>
  );

  // min-h keeps the interactive target comfortably over the HIG 44pt minimum.
  const className = "group/small flex min-h-[44px] flex-col gap-2";

  return href ? (
    <Link href={href} className={className}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
}
