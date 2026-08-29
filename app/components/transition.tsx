"use client";

import Link from "next/link";
import {
  unstable_ViewTransition as ViewTransition,
  unstable_addTransitionType as addTransitionType,
} from "react";
import type React from "react";
import type { ReactNode } from "react";

/**
 * Page-level transition, keyed by the direction of travel.
 *
 * Directional slides are reserved for hierarchical moves: the index into a
 * case study, and back out. Moving between the top-level pages is lateral, so
 * those cross-fade instead. A slide there would imply a depth that is not
 * there.
 *
 * `default: "none"` everywhere, otherwise every unrelated transition fires the
 * browser's own cross-fade on top of these.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        "nav-lateral": "fade-in",
        default: "none",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        "nav-lateral": "fade-out",
        default: "none",
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}

/**
 * The screenshot that grows out of a project card into the case study header,
 * and the project name that travels with it. Both sides use the same name, so
 * React pairs them into one morph.
 */
export function SharedMedia({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <ViewTransition name={`work-media-${slug}`} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}

export function SharedTitle({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <ViewTransition name={`work-title-${slug}`} share="text-morph" default="none">
      {children}
    </ViewTransition>
  );
}

/**
 * A link that tags the direction of travel before navigating.
 *
 * Next 15.5 has no `transitionTypes` prop on Link, so the type is added in
 * `onNavigate`, which fires inside the navigation's transition. This keeps a
 * real <Link> rather than dropping to router.push, so prefetch, middle-click
 * and the plain href all still work.
 */
export function DirectionalLink({
  href,
  direction,
  className,
  children,
  ...rest
}: {
  href: string;
  direction: "nav-forward" | "nav-back" | "nav-lateral";
  className?: string;
  children: ReactNode;
} & Omit<React.ComponentProps<typeof Link>, "href" | "onNavigate">) {
  return (
    <Link
      href={href}
      className={className}
      onNavigate={() => addTransitionType(direction)}
      {...rest}
    >
      {children}
    </Link>
  );
}
