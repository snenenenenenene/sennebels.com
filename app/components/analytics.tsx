"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";

/**
 * PostHog, cookieless.
 *
 * Autocapture does the work: every click, every rage-click, every form
 * interaction, without a line of instrumentation per element. All this
 * component adds is the init and a $pageview on client-side navigation,
 * which the SDK cannot see on its own because the App Router never
 * reloads the document.
 *
 * `persistence: "memory"` is the reason there is no cookie banner here.
 * Nothing is written to the visitor's device, so no consent is needed
 * for a site that is a CV. The price is that a returning visitor looks
 * like a new one — fine for "what did people look at", useless for
 * retention cohorts.
 *
 * Discord pings are not fired from here: PostHog forwards the events it
 * is told to, to /api/discord/posthog. Doing it client-side would mean
 * shipping a webhook URL to the browser.
 */

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

export function PostHogAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!KEY) return;
    if (!posthog.__loaded) {
      posthog.init(KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
        persistence: "memory",
        // Nothing calls identify() here, so person profiles would only be
        // empty rows against the billing quota.
        person_profiles: "identified_only",
        capture_pageview: false,
      });
    }
    posthog.capture("$pageview");
  }, [pathname]);

  return null;
}
