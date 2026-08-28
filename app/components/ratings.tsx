"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star } from "@phosphor-icons/react/dist/ssr";
import type { Rated } from "../data/portfolio";
import { RATINGS } from "../data/portfolio";
import { ACCENT_TEXT, CARD_TINT, TAP, type Tint } from "./ui";

/** Warm at the top of the scale, cool at the bottom. */
function tintFor(stars: number): Tint {
  if (stars >= 4) return "red";
  if (stars >= 2.5) return "yellow";
  return "blue";
}

/**
 * Half-star fill without a second icon set: an outline star underneath, a
 * filled one on top, clipped horizontally to the fraction earned.
 */
function StarIcon({ fill, size = 30 }: { fill: number; size?: number }) {
  return (
    <span className="relative inline-block shrink-0" style={{ width: size, height: size }}>
      <Star size={size} weight="regular" className="absolute inset-0 text-ink-3/45" aria-hidden />
      <span
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${fill * 100}%` }}
        aria-hidden
      >
        <Star size={size} weight="fill" className="text-sys-yellow" />
      </span>
    </span>
  );
}

/** How much of star `i` a rating fills: all, half, or none. */
const fillOf = (stars: number, i: number) => Math.min(1, Math.max(0, stars - i));

/**
 * The whole scale, one tier at a time. It advances on its own so the page has
 * something moving on it, and the stars are buttons so you can go straight to
 * a rating instead of waiting for it to come round.
 */
export function Ratings() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false);
  // Server and first client render must match, so the sample is drawn after
  // mount rather than during render.
  const [shuffled, setShuffled] = useState(false);

  const tier = RATINGS[i];
  const tint = tintFor(tier.stars);

  useEffect(() => setShuffled(true), []);

  useEffect(() => {
    if (reduce || held) return;
    const t = setTimeout(() => setI((n) => (n + 1) % RATINGS.length), 4200);
    return () => clearTimeout(t);
  }, [i, reduce, held]);

  const items = pick(tier.items, 5, shuffled);

  return (
    <section
      className="flex flex-col gap-6"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
        <h2 className="text-title3 font-medium text-ink">Everything, rated</h2>
        <p className="text-caption text-ink-3">
          {reduce ? "Pick a rating" : "Cycles on its own. Point at it to stop."}
        </p>
      </div>

      <div
        className={`squircle flex flex-col gap-7 rounded-card p-7 transition-colors duration-500 md:p-10 ${CARD_TINT[tint]}`}
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          {/* Each star sets the rating: click the third for three stars, and
              the same star again for the half below it. */}
          <div className="flex items-center gap-1.5" role="group" aria-label="Pick a rating">
            {[0, 1, 2, 3, 4].map((n) => (
              <button
                key={n}
                type="button"
                aria-label={`${n + 1} stars`}
                onClick={() => {
                  const want = tier.stars === n + 1 ? n + 0.5 : n + 1;
                  const at = RATINGS.findIndex((r) => r.stars === want);
                  if (at >= 0) setI(at);
                }}
                className={`${TAP} min-h-0 rounded-[10px] p-0.5 hover:scale-110`}
              >
                <StarIcon fill={fillOf(tier.stars, n)} />
              </button>
            ))}
          </div>

          <p className={`font-display text-title2 font-medium ${ACCENT_TEXT[tint]}`}>
            {tier.stars === 0 ? "No stars" : `${tier.stars}`}
          </p>
        </div>

        <motion.div key={i} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <ul className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it) => (
              <li key={it.name} className="flex flex-col gap-2.5">
                <Image
                  src={it.img ?? ""}
                  alt=""
                  width={640}
                  height={300}
                  className="aspect-[16/7] w-full rounded-[10px] object-cover"
                />
                <span className="text-callout leading-[1.4] text-ink">{it.name}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}


/**
 * First n on the server, a random n once mounted. Anything with a poster is
 * kept: they are the only items carrying an image, and a sample that drops
 * them leaves a column of blank rails.
 */
function pick(items: Rated[], n: number, shuffled: boolean): Rated[] {
  if (!shuffled) return items.slice(0, n);
  const withArt = items.filter((i) => i.img);
  const rest = [...items].filter((i) => !i.img).sort(() => Math.random() - 0.5);
  return [...withArt, ...rest].slice(0, n);
}
