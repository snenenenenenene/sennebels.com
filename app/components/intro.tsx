"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Cat } from "@phosphor-icons/react";
import { PERSON } from "../data/portfolio";
import { MICRO, TAP } from "./ui";
import { DirectionalLink } from "./transition";

/**
 * First-visit intro.
 *
 * Deliberately an overlay and not a route. The usual way to do this is to put
 * a splash at `/` and move the real site to `/home`, which costs you the page
 * every link, every search result and every share points at. Here the real
 * page is rendered underneath from the first byte: crawlers, deep links and
 * anyone returning never see this, and the HTML is unchanged either way.
 *
 * Rules it has to obey to be worth having at all:
 *  - once per visitor, ever (localStorage), and never for a repeat visit
 *  - never on a deep link, only on the front page
 *  - dismissable by clicking, by Escape, and by not having JavaScript
 *  - skipped entirely under prefers-reduced-motion
 */
const SEEN = "sb:intro-seen";

export function Intro() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Mount-time only: rendering this on the server would put a full-screen
    // panel into the HTML that a crawler reads as the page's content.
    if (window.location.pathname !== "/") return;
    if (reduce) return;
    try {
      if (localStorage.getItem(SEEN)) return;
    } catch {
      // Private mode with storage blocked: show it once, this visit.
    }
    setOpen(true);
  }, [reduce]);

  const dismiss = () => {
    setOpen(false);
    try {
      localStorage.setItem(SEEN, "1");
    } catch {}
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    document.addEventListener("keydown", onKey);
    // The page behind must not scroll under the panel.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Welcome"
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-9 bg-paper px-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="flex flex-col items-center gap-5"
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Cat size={34} weight="fill" aria-hidden className="text-tone-red" />
            <p className={`text-ink-3 ${MICRO}`}>
              You have reached
            </p>
            <h1 className="max-w-[18ch] text-display font-medium text-ink">
              {PERSON.name}, a{" "}
              <span className="font-display italic leading-[1.15] text-tone-red">creative</span>{" "}
              software engineer.
            </h1>
            <p className="max-w-[46ch] text-lede text-ink-2">
              Six years of web, mobile and AI systems, four cats, and a great deal of coffee.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <DirectionalLink
              href="/welcome"
              direction="nav-forward"
              onClick={dismiss}
              className={`rounded-full bg-mark-yellow px-8 py-3.5 text-body font-semibold text-[#1E1515] shadow-card-hover ${TAP}`}
            >
              Get a visitor card
            </DirectionalLink>

            <button
              type="button"
              onClick={dismiss}
              autoFocus
              className={`min-h-tap text-ink-3 underline decoration-hairline decoration-2 underline-offset-4 transition-colors duration-200 hover:text-ink ${MICRO}`}
            >
              Just look around
            </button>
          </motion.div>

          <motion.p
            className={`text-ink-3 ${MICRO}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Escape does the same. It only ever asks once.
          </motion.p>

          {/* A running clock, because a door wants something alive behind it. */}
          <Clock />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Local time, ticking. The one thing on the intro that proves the page is
 * running rather than a picture of a page.
 *
 * Null until mounted: a clock rendered on the server is a hydration mismatch
 * with a one-second fuse.
 */
function Clock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date().toLocaleTimeString());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <p className={`fixed bottom-6 left-6 text-ink-3 ${MICRO}`} suppressHydrationWarning>
      {now ?? ""}
    </p>
  );
}
