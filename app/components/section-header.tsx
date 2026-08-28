"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP owns this one leaf and nothing else. GSAP and Motion both drive frames,
 * so they must never share a component tree; everything else on the page stays
 * on Motion springs.
 *
 * The words rise and unblur in sequence as the section arrives, which gives the
 * heading a reading order instead of appearing all at once.
 */
export function SectionHeader({
  label,
  aside,
  id,
  as = "h2",
}: {
  label: string;
  aside?: string;
  id?: string;
  /** A page title is an h1; a section inside a page is an h2. */
  as?: "h1" | "h2";
}) {
  const Tag = as;
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.set(root.current, { autoAlpha: 1 });
      gsap.from(root.current!.querySelectorAll(".sh-word"), {
        yPercent: 115,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.055,
        scrollTrigger: { trigger: root.current, start: "top 88%", once: true },
      });
    },
    { scope: root },
  );

  const words = (text: string, cls: string) =>
    text.split(" ").map((w, i) => (
      <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.14em] align-bottom">
        <span className={`sh-word inline-block ${cls}`}>{w}</span>
      </span>
    ));

  return (
    <div
      id={id}
      ref={root}
      // Starts hidden only for JS users; the noscript-safe fallback is the
      // opacity-100 class, which GSAP overrides on mount.
      className="flex flex-wrap items-baseline gap-x-3 gap-y-1 opacity-100"
    >
      <Tag className="flex flex-wrap gap-x-[0.3em] text-callout font-semibold uppercase tracking-[0.22em] text-ink-3">
        {words(label, "")}
      </Tag>
      {aside && (
        <p className="flex flex-wrap gap-x-[0.24em] font-display text-title3 font-medium italic text-moss">
          {words(aside, "")}
        </p>
      )}
    </div>
  );
}
