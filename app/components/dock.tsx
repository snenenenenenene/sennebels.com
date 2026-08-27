"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import {
  Cat,
  EnvelopeSimple,
  FileText,
  GithubLogo,
  House,
  LinkedinLogo,
  Briefcase,
} from "@phosphor-icons/react";

/**
 * macOS Dock, not a row of inline text links. Icons magnify with proximity to
 * the cursor, which is Apple's own navigation idiom and the reason the Dock
 * reads as a physical object rather than a menu.
 *
 * Pointer position lives in a MotionValue, never useState: a continuous value
 * driven by input must stay outside the React render cycle or every mousemove
 * re-renders the tree and the effect collapses on contact.
 */

const ITEMS = [
  { label: "Top", href: "#top", icon: House },
  { label: "Work", href: "#work", icon: Briefcase },
  { label: "About", href: "#about", icon: Cat },
  { label: "Resume", href: null as string | null, icon: FileText, key: "resume" },
  { label: "GitHub", href: null as string | null, icon: GithubLogo, key: "github" },
  { label: "LinkedIn", href: null as string | null, icon: LinkedinLogo, key: "linkedin" },
  { label: "Email", href: null as string | null, icon: EnvelopeSimple, key: "email" },
];

export function Dock({ links }: { links: Record<string, string> }) {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4">
      <motion.nav
        aria-label="Primary"
        // clientX, not pageX: it must share a coordinate space with
        // getBoundingClientRect below, which is viewport-relative.
        onMouseMove={(e) => !reduce && mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
        className="pointer-events-auto flex items-end gap-1.5 rounded-[22px] border border-white/50 bg-[color-mix(in_srgb,var(--raised)_72%,transparent)] px-3 pb-2.5 pt-2 shadow-[0_18px_50px_-24px_rgba(20,16,12,0.5),inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:shadow-[0_18px_50px_-20px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.09)]"
      >
        {ITEMS.map((item) => (
          <DockItem
            key={item.label}
            mouseX={mouseX}
            label={item.label}
            href={item.key ? links[item.key] : (item.href as string)}
            icon={item.icon}
            reduce={!!reduce}
          />
        ))}
      </motion.nav>
    </div>
  );
}

function DockItem({
  mouseX,
  label,
  href,
  icon: I,
  reduce,
}: {
  mouseX: MotionValue<number>;
  label: string;
  href: string;
  icon: typeof Cat;
  reduce: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const b = ref.current?.getBoundingClientRect();
    if (!b) return Number.POSITIVE_INFINITY;
    return val - (b.x + b.width / 2);
  });

  // 44pt resting size is the HIG touch minimum, so the target is never too
  // small even with magnification off.
  const raw = useTransform(distance, [-130, 0, 130], [44, 66, 44], { clamp: true });
  const width = useSpring(raw, { stiffness: 320, damping: 26, mass: 0.18 });
  const glyph = useTransform(width, (w) => w * 0.46);

  const internal = href.startsWith("#");
  const inner = (
    <>
      <motion.span style={{ width: glyph, height: glyph }} className="flex items-center justify-center">
        <I size="100%" weight="duotone" aria-hidden />
      </motion.span>
      <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1 text-caption font-medium text-paper opacity-0 transition-opacity duration-150 group-hover/dock:opacity-100">
        {label}
      </span>
    </>
  );

  const cls =
    "group/dock relative flex aspect-square items-center justify-center rounded-[14px] text-ink-2 transition-colors hover:text-moss";

  return internal ? (
    <motion.a ref={ref} href={href} aria-label={label} style={{ width: reduce ? 44 : width }} className={cls}>
      {inner}
    </motion.a>
  ) : (
    <motion.a
      ref={ref}
      href={href}
      aria-label={label}
      style={{ width: reduce ? 44 : width }}
      className={cls}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {inner}
    </motion.a>
  );
}
