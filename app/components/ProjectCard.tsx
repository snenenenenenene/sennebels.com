import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import type { Featured } from "../data/portfolio";
import { Tilt, Plane } from "./tilt";

/**
 * Apple groups related content on a raised surface rather than separating it
 * with rules. There is not a single hairline in here: the fill does the
 * grouping and the shadow does the separating.
 */
export function ProjectCard({ project, flipped }: { project: Featured; flipped: boolean }) {
  return (
    <article className="group/card rounded-[26px] bg-raised p-6 shadow-[0_1px_2px_rgba(20,16,12,0.05),0_12px_36px_-28px_rgba(20,16,12,0.5)] transition-shadow duration-300 hover:shadow-[0_2px_4px_rgba(20,16,12,0.06),0_26px_60px_-30px_rgba(20,16,12,0.55)] md:p-8">
      <div className={`flex flex-col gap-9 lg:gap-14 ${flipped ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
        <div className="flex flex-col gap-4 lg:w-[44%] lg:shrink-0">
          <p className="text-caption font-medium uppercase tracking-[0.2em] text-ink-3">{project.name}</p>

          <h3 className="max-w-[18ch] text-title1 font-medium text-ink">{project.title}</h3>

          <p className="max-w-[54ch] text-body text-ink-2">{project.description}</p>

          <p className="text-callout text-ink-3">{project.meta}</p>

          <Link
            href={`/work/${project.slug}`}
            className="mt-1 inline-flex min-h-[44px] w-fit items-center gap-2 text-body font-medium text-moss"
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
            <div className="overflow-hidden rounded-[18px] shadow-[0_20px_50px_-26px_rgba(20,16,12,0.6)]">
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
                <li key={point} className="flex items-start gap-3 rounded-[16px] bg-paper/60 px-4 py-3.5">
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
          <div className="overflow-hidden rounded-[14px] shadow-[0_14px_32px_-22px_rgba(20,16,12,0.6)]">
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
    "group/small flex min-h-[44px] flex-col gap-1.5 rounded-[20px] bg-raised p-5 shadow-[0_1px_2px_rgba(20,16,12,0.04),0_10px_28px_-24px_rgba(20,16,12,0.45)] transition-shadow duration-300 hover:shadow-[0_2px_4px_rgba(20,16,12,0.06),0_20px_44px_-26px_rgba(20,16,12,0.5)]";

  return href ? (
    <Link href={href} className={cls}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}
