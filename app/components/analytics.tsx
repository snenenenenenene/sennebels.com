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
 * It runs fully cookieless, which is why there is no consent banner and
 * why the traffic count is the real one: nothing is stored on the
 * visitor's device, so there is no opt-in to decline and no silent
 * majority missing from the numbers. See the init below for what that
 * costs and who counts unique people instead.
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
        // Nothing is written to the visitor's device: no cookie, no
        // localStorage, no sessionStorage. So there is no consent gate and
        // every visitor is counted, not just the ones who would accept one.
        //
        // The cost is that PostHog cannot tell two visits apart from two
        // visitors — each page load is a fresh anonymous id. PostHog's
        // cookieless_mode: "always" is meant to fix exactly that, and it
        // silently drops every event on project 356563 (probed directly
        // against /e/ in both server-hash modes: "Ok" on the wire, nothing
        // ingested), so it stays off. Unique-visitor counts come from Vercel
        // Web Analytics above, which does its own cookieless de-duplication.
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
