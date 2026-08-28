import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import type { Featured } from "../data/portfolio";
import { Tilt } from "./tilt";
import { Flavour, TAP, TypeLine } from "./ui";

/**
 * Apple groups related content on a raised surface rather than separating it
 * with rules. There is not a single hairline in here: the fill does the
 * grouping and the shadow does the separating.
 */
export function ProjectCard({ project, flipped }: { project: Featured; flipped: boolean }) {
  return (
    <article className="group/card rounded-card bg-raised p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover md:p-8">
      <div className={`flex flex-col gap-9 lg:gap-14 ${flipped ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
        <div className="flex flex-col gap-4 lg:w-[44%] lg:shrink-0">
          <TypeLine kind={project.typeLine.kind} sub={project.typeLine.sub} />

          <p className="text-callout font-semibold text-moss">{project.name}</p>

          <h3 className="max-w-[18ch] text-title1 font-medium text-ink">{project.title}</h3>

          <p className="max-w-[54ch] text-body text-ink-2">{project.description}</p>

          <Flavour>{project.flavour}</Flavour>

          <Link
            href={`/work/${project.slug}`}
            className={`mt-1 inline-flex w-fit items-center gap-2 text-body font-medium text-moss ${TAP}`}
          >
            {project.cta}
            <ArrowRight
              size={17}
              weight="bold"
              aria-hidden
              className="transition-transform duration-300 ease-out group-hover/card:translate-x-1"
            />
          </Link>
        </div>

        {project.image ? (
          <Tilt className="lg:min-w-0 lg:flex-1">
            <div className="overflow-hidden rounded-media shadow-media">
              <Image
                src={project.image}
                alt={`${project.name}: ${project.title}`}
                width={1400}
                height={900}
                loading="eager"
                className="h-[230px] w-full object-cover object-top lg:h-[370px]"
              />
            </div>
          </Tilt>
        ) : (
          project.spec && (
            // Confidential client work has no shippable screenshot, so it gets a
            // written list rather than a faked mock.
            <ul className="flex flex-col justify-center gap-4 lg:min-w-0 lg:flex-1">
              {project.spec.points.map((point) => (
                <li key={point} className="flex items-start gap-3 rounded-tile bg-paper/60 px-4 py-3.5 transition-colors duration-200 hover:bg-paper">
                  <CheckCircle size={19} weight="duotone" className="mt-0.5 shrink-0 text-moss" aria-hidden />
                  <span className="text-body text-ink-2">{point}</span>
                </li>
              ))}
              <li className="pl-1 font-display text-callout italic text-ink-3">{project.spec.credit}</li>
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
        <Tilt max={6} className="mb-4">
          <div className="overflow-hidden rounded-tile shadow-media">
            <Image
              src={image}
              alt={`${name}: ${description.slice(0, 60)}`}
              width={1200}
              height={760}
              loading="eager"
              className="h-[148px] w-full object-cover object-top"
            />
          </div>
        </Tilt>
      )}
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-title3 font-medium text-ink">{name}</h3>
        <p className="text-caption uppercase tracking-[0.14em] text-ink-3">{kind}</p>
      </div>
      <p className="text-callout text-ink-2">{description}</p>
    </>
  );

  const cls =
    "group/small flex min-h-tap flex-col gap-1.5 rounded-panel bg-raised p-5 shadow-card transition-shadow duration-300 hover:shadow-card-hover";

  return href ? (
    <Link href={href} className={cls}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}
