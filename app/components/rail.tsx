"use client";

import { usePathname } from "next/navigation";
import { ArrowRight, Cat } from "@phosphor-icons/react";
import { PERSON } from "../data/portfolio";
import { SOCIALS } from "./footer";
import { DirectionalLink } from "./transition";
import { EASE, MICRO } from "./ui";

/**
 * The identity rail: who this is, on every page, at desktop widths.
 *
 * A floating pill nav gives four words and nothing else, so the answer to
 * "who am I reading" lives only on the page you happened to land on. A rail
 * has room for the name, what I do, what I am looking for, and the way to
 * reach me, and it keeps them there while you read the work.
 *
 * It replaces the pill bar rather than joining it: two navigations is one too
 * many. Below `lg` there is no room for a column, so the rail is hidden and
 * the pill bar comes back — see Navbar.
 */

const LINKS = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/fun", label: "Fun" },
  { href: "/now", label: "Now" },
  { href: "/guestbook", label: "Guestbook" },
];

export function Rail() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <div
      // Its own scroll context: the rail is taller than a laptop viewport once
      // the bio and both link lists are in it, and a rail you cannot reach the
      // bottom of is worse than no rail.
      className="fixed inset-y-0 left-0 z-40 hidden w-rail flex-col gap-10 overflow-y-auto border-r border-hairline bg-raised px-9 py-11 lg:flex"
    >
      <div className="flex flex-col gap-4">
        <DirectionalLink
          href="/"
          direction="nav-lateral"
          aria-label={`${PERSON.name}, home`}
          className="flex w-fit items-center gap-2.5"
        >
          <Cat size={22} weight="fill" aria-hidden className="text-tone-red" />
          <span className="font-display text-title3 font-medium text-ink">{PERSON.name}</span>
        </DirectionalLink>

        <p className={`text-ink-3 ${MICRO}`}>
          {PERSON.jobTitle}, {PERSON.locality}
        </p>

        <p className="max-w-[34ch] text-callout leading-[1.7] text-ink-2">
          Six years building web, mobile and AI systems. Currently on the Tomorrowland app and a
          handful of products of my own. {PERSON.relocation}.
        </p>
      </div>

      <nav aria-label="Primary" className="flex flex-col gap-1">
        <p className={`mb-2 text-ink-3 ${MICRO}`}>
          Explore
        </p>
        {LINKS.map((l, i) => {
          const active = isActive(l.href);
          return (
            <DirectionalLink
              key={l.href}
              href={l.href}
              direction="nav-lateral"
              aria-current={active ? "page" : undefined}
              className={`squircle group/rail flex min-h-tap items-center gap-3 rounded-tile pr-3 text-callout transition-[background-color,color,padding-left] duration-200 ${EASE} ${
                active
                  ? "bg-paper pl-4 font-medium text-ink"
                  : "pl-3 text-ink-2 hover:bg-paper/60 hover:pl-4 hover:text-ink"
              }`}
            >
              <span aria-hidden className={`tabular-nums text-ink-3 ${MICRO}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {l.label}
              <ArrowRight
                size={13}
                weight="bold"
                aria-hidden
                className={`ml-auto -translate-x-1 opacity-0 transition-[transform,opacity] duration-200 ${EASE} group-hover/rail:translate-x-0 group-hover/rail:opacity-100 ${
                  active ? "translate-x-0 opacity-60" : ""
                }`}
              />
            </DirectionalLink>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-3">
        <p className={`text-ink-3 ${MICRO}`}>Outbound</p>
        {SOCIALS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            {...(l.external !== false && l.href.startsWith("http")
              ? { target: "_blank", rel: "noreferrer" }
              : {})}
            className="w-fit text-callout text-ink-2 underline decoration-hairline decoration-2 underline-offset-[3px] transition-colors duration-200 hover:text-ink hover:decoration-tone-red"
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}
