import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import type { Featured } from "../data/portfolio";
import { Tilt } from "./tilt";
import { ACCENT_TEXT, CARD_TINT, type Tint } from "./ui";
import { RebusText } from "./rebus-text";
import { CaseStudyButton } from "./cta";

/**
 * Apple groups related content on a raised surface rather than separating it
 * with rules. There is not a single hairline in here: the fill does the
 * grouping and the shadow does the separating.
 */
export function ProjectCard({ project, flipped }: { project: Featured; flipped: boolean }) {
  return (
    <article
      className={`group/card squircle rounded-card p-7 shadow-none transition-[background-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-card-hover md:p-10 ${CARD_TINT[project.accent]}`}
    >
      <div className={`flex flex-col gap-10 lg:gap-16 ${flipped ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
        <div className="flex flex-col lg:w-[45%] lg:shrink-0">
          {/* The client's own mark leads, the way a case study opens. */}
          <div className="mb-8 flex items-center gap-3">
            {project.brand && (
              <Image
                src={project.brand}
                alt=""
                width={140}
                height={56}
                className={`h-8 w-auto object-contain object-left ${project.brandMono ? "dark:brightness-0 dark:invert" : ""}`}
              />
            )}
            <span className="font-display text-title3 font-medium text-ink">{project.name}</span>
          </div>

          <h3 className="max-w-[16ch] text-title1 font-medium text-ink">{project.title}</h3>

          <RebusText
            text={project.description}
            marks={project.rebus}
            className="mt-6 max-w-[52ch] text-body leading-[2.1] text-ink-2"
          />

          <Link href={`/work/${project.slug}`} className="mt-9 w-fit">
            <CaseStudyButton label={project.cta} />
          </Link>
        </div>

        {project.image ? (
          <Tilt className="lg:min-w-0 lg:flex-1">
            <div className="squircle overflow-hidden rounded-media shadow-media">
              <Image
                src={project.image}
                alt={`${project.name}: ${project.title}`}
                width={1400}
                height={900}
                loading="eager"
                className="h-[230px] w-full object-cover object-top lg:h-[400px]"
              />
            </div>
          </Tilt>
        ) : (
          project.spec && (
            // Confidential client work has no shippable screenshot, so it gets
            // a written list rather than a faked mock.
            <ul className="flex flex-col justify-center gap-4 lg:min-w-0 lg:flex-1">
              {project.spec.points.map((point) => (
                <li
                  key={point}
                  className="squircle flex items-start gap-3 rounded-tile bg-paper/70 px-4 py-3.5"
                >
                  <CheckCircle size={19} weight="fill" className="mt-0.5 shrink-0 text-moss" aria-hidden />
                  <span className="text-body text-ink-2">{point}</span>
                </li>
              ))}
              <li className="pl-1 text-callout text-ink-3">{project.spec.credit}</li>
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
  tint = "blue",
  wide = false,
}: {
  name: string;
  kind: string;
  description: string;
  href?: string;
  image?: string;
  tint?: Tint;
  wide?: boolean;
}) {
  const body = (
    <>
      {image && (
        <Tilt max={6} className="mb-4">
          <div className="squircle overflow-hidden rounded-tile shadow-media">
            <Image
              src={image}
              alt={`${name}: ${description.slice(0, 60)}`}
              width={1200}
              height={760}
              loading="eager"
              className={`w-full object-cover object-top ${wide ? "h-[300px]" : "h-[210px]"}`}
            />
          </div>
        </Tilt>
      )}
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-title3 font-medium text-ink">{name}</h3>
        <p className={`shrink-0 text-caption font-medium ${ACCENT_TEXT[tint]}`}>{kind}</p>
      </div>
      <p className="text-callout text-ink-2">{description}</p>
    </>
  );

  const cls =
    "squircle group/small flex h-full w-full min-h-tap flex-col gap-1.5 rounded-panel bg-raised p-5 shadow-card transition-shadow duration-300 hover:shadow-card-hover";

  return href ? (
    <Link href={href} className={cls}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}
