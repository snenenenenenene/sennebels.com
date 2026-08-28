"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Cat } from "@phosphor-icons/react";
import { GLASS, TAP } from "./ui";

/**
 * Top navigation, in the shape Cecilia Kim uses: named destinations and one
 * CTA, rather than a Dock. It rides in the functional layer on Liquid Glass,
 * so the page scrolls underneath and the material has something to refract.
 *
 * The Dock component is still in the tree at components/dock.tsx and can be
 * swapped back in from the layout; nothing here deletes it.
 */

const LINKS = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/fun", label: "Fun" },
];

export function Navbar({ email }: { email: string }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3.5">
      <nav
        aria-label="Primary"
        className={`pointer-events-auto flex items-center gap-1 rounded-full py-1.5 pl-2 pr-1.5 ${GLASS}`}
      >
        <Link
          href="/"
          aria-label="Senne Bels, home"
          className="grid size-tap place-items-center rounded-full text-moss"
        >
          <Cat size={20} weight="fill" aria-hidden />
        </Link>

        {LINKS.map((l) => {
          const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? "page" : undefined}
              className="relative flex min-h-tap items-center px-3.5 text-callout font-medium"
            >
              {/* The pill travels between items rather than fading in and out,
                  which is how a segmented control moves on iOS. */}
              {active && (
                <motion.span
                  layoutId={reduce ? undefined : "nav-pill"}
                  className="absolute inset-y-1 inset-x-0 -z-10 rounded-full bg-accent-soft"
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                />
              )}
              <span className={active ? "text-moss" : "text-ink-2 transition-colors hover:text-ink"}>
                {l.label}
              </span>
            </Link>
          );
        })}

        <a
          href={`mailto:${email}`}
          className={`ml-1 flex min-h-tap items-center rounded-full bg-moss px-4 text-callout font-semibold text-paper ${TAP}`}
        >
          Get in touch
        </a>
      </nav>
    </div>
  );
}
