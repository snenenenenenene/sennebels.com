"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Konami } from "./konami";

/** Routes that ship as standalone surfaces (no portfolio nav/footer). */
const BARE = [/^\/buurtsit(\/|$)/];

/**
 * Wraps portfolio chrome so product pages like /buurtsit can opt out without
 * splitting the root layout into route groups.
 */
export function SiteChrome({
  email,
  children,
}: {
  email: string;
  children: ReactNode;
}) {
  const pathname = usePathname() || "/";
  const bare = BARE.some((re) => re.test(pathname));

  if (bare) {
    return <>{children}</>;
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-body focus:font-medium focus:text-paper"
      >
        Skip to content
      </a>
      <Navbar email={email} />
      {children}
      <Footer />
      <Konami />
    </>
  );
}
