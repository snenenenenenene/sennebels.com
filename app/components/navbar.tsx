"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Cat } from "@phosphor-icons/react";
import { GLASS, TAP } from "./ui";

/**
 * Top navigation on Liquid Glass, with the page scrolling underneath.
 *
 * The active pill is ONE element positioned from a measurement, not a shared
 * layoutId handed between links. With layoutId, the outgoing pill unmounts on
 * one frame and the incoming one mounts on the next, so Framer animates from a
 * stale rectangle and the pill visibly flies outside the bar. Measuring the
 * active link and moving a single pill to it cannot desynchronise that way.
 */

const LINKS = [
  { href: "/", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/fun", label: "Fun" },
];

export function Navbar({ email }: { email: string }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);

  const activeIndex = LINKS.findIndex((l) =>
    l.href === "/" ? pathname === "/" : pathname.startsWith(l.href),
  );

  useEffect(() => {
    const measure = () => {
      const el = refs.current[activeIndex];
      if (!el) return setPill(null);
      setPill({ x: el.offsetLeft, w: el.offsetWidth });
    };
    measure();
    // Fonts land after first paint and change the widths under us.
    document.fonts?.ready.then(measure).catch(() => {});
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeIndex, pathname]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3.5">
      <nav
        aria-label="Primary"
        className={`pointer-events-auto relative flex items-center gap-1 rounded-full py-1.5 pl-2 pr-1.5 ${GLASS}`}
      >
        <Link
          href="/"
          aria-label="Senne Bels, home"
          className="grid size-tap place-items-center rounded-full text-tone-red"
        >
          <Cat size={20} weight="fill" aria-hidden />
        </Link>

        {pill && (
          <motion.span
            aria-hidden
            className="absolute inset-y-1.5 rounded-full bg-[color-mix(in_srgb,var(--sys-blue)_16%,var(--raised))]"
            initial={false}
            animate={{ x: pill.x, width: pill.w }}
            style={{ left: 0 }}
            transition={
              reduce ? { duration: 0 } : { type: "spring", bounce: 0, duration: 0.4 }
            }
          />
        )}

        {LINKS.map((l, i) => {
          const active = i === activeIndex;
          return (
            <Link
              key={l.href}
              href={l.href}
              ref={(el) => {
                refs.current[i] = el;
              }}
              aria-current={active ? "page" : undefined}
              className={`relative z-10 flex min-h-tap items-center px-3.5 text-callout font-medium transition-colors duration-200 ${
                active ? "text-tone-blue" : "text-ink-2 hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          );
        })}

        <a
          href={`mailto:${email}`}
          className={`relative z-10 ml-1 flex min-h-tap items-center rounded-full bg-mark-yellow px-4 text-callout font-semibold text-[#1E1515] ${TAP}`}
        >
          Get in touch
        </a>
      </nav>
    </div>
  );
}
