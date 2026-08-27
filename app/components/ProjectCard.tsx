import Image from "next/image";
import Link from "next/link";
import type { Featured } from "../data/portfolio";
import { TINT_BG, TINT_LINK, TINT_TEXT } from "./ui";

/**
 * Full-width tinted card. Cards alternate sides so the page doesn't read as a grid.
 * Confidential client work has no shippable screenshot, so it gets a spec panel instead
 * of a faked mock — see `spec` in app/data/portfolio.ts.
 */
export function ProjectCard({ project, flipped }: { project: Featured; flipped: boolean }) {
  const { tint } = project;

  return (
    <article
      className={`flex flex-col items-center gap-8 rounded-[34px] p-8 lg:gap-12 md:p-11 ${TINT_BG[tint]} ${
        flipped ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <div className="flex w-full flex-col gap-4 lg:w-[46%] lg:shrink-0">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="size-8 shrink-0 rounded-[10px]"
            style={{ backgroundColor: project.markColor }}
          />
          <p className="text-[17px] font-bold text-ink">{project.name}</p>
        </div>

        <p className={`text-[13px] font-semibold uppercase tracking-[0.11em] ${TINT_TEXT[tint]}`}>
          {project.meta}
        </p>

        <h3 className="text-[28px] font-semibold leading-tight -tracking-[0.025em] text-ink md:text-4xl">
          {project.title}
        </h3>

        <p className={`text-[17px] leading-7 ${TINT_TEXT[tint]}`}>{project.description}</p>

        <ul className="flex flex-wrap items-center gap-2 pt-1">
          {project.tech.map((t) => (
            <li
              key={t}
              className={`rounded-full bg-white px-3.5 py-[7px] text-[13px] font-semibold ${TINT_TEXT[tint]}`}
            >
              {t}
            </li>
          ))}
        </ul>

        <p className={`pt-2 text-base font-bold ${TINT_LINK[tint]}`}>{project.cta} &rarr;</p>
      </div>

      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.name} — ${project.title}`}
          width={1400}
          height={900}
          className="h-[240px] w-full rounded-3xl object-cover object-top lg:h-[330px] lg:w-auto lg:min-w-0 lg:flex-1"
        />
      ) : (
        project.spec && <SpecPanel project={project} />
      )}
    </article>
  );
}

function SpecPanel({ project }: { project: Featured }) {
  if (!project.spec) return null;
  return (
    <div className="flex w-full flex-col justify-center gap-[22px] rounded-3xl bg-white p-8 md:p-10 lg:h-[330px] lg:w-auto lg:min-w-0 lg:flex-1">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-3">
        What the work involved
      </p>
      <ul className="flex flex-col gap-[22px]">
        {project.spec.points.map((point) => (
          <li key={point} className="flex items-start gap-3.5">
            <span
              aria-hidden
              className="mt-2 size-[9px] shrink-0 rounded-full"
              style={{ backgroundColor: project.markColor }}
            />
            <span className={`text-[17px] leading-[26px] ${TINT_TEXT[project.tint]}`}>{point}</span>
          </li>
        ))}
      </ul>
      <p className="font-display text-base italic text-ink-3">{project.spec.credit}</p>
    </div>
  );
}

export function SmallCard({
  name,
  kind,
  description,
  href,
}: {
  name: string;
  kind: string;
  description: string;
  href?: string;
}) {
  const body = (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-xl font-bold text-ink">{name}</h3>
        <p
          className={`text-xs font-bold uppercase tracking-[0.11em] ${
            kind === "My game" ? "text-[#8C5A2E]" : "text-moss"
          }`}
        >
          {kind}
        </p>
      </div>
      <p className="text-[15px] leading-6 text-[#6D625E]">{description}</p>
    </>
  );

  const className =
    "flex w-full flex-col gap-2 rounded-[22px] bg-white px-7 py-[26px] md:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)]";

  return href ? (
    <Link href={href} className={className}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
}
