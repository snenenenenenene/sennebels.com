"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";

/**
 * PostHog, cookieless.
 *
 * Autocapture does the work: every click, every rage-click, every dead
 * click, without a line of instrumentation per element. What this
 * component adds is the init and a $pageview per route, because the App
 * Router never reloads the document and the SDK cannot see the navigation.
 *
 * The SDK's own `capture_pageview: "history_change"` looks like it should
 * replace the effect below. It does not: driven in a production build it
 * captures the client-side navigations and never the first pageload, so
 * the landing page — the one page every visitor sees — goes uncounted.
 * Hence `false` plus an explicit capture, and hence `capture_pageleave`
 * spelled out, since its default of "if_capture_pageview" would otherwise
 * read that `false` and take $pageleave down with it. $pageleave is worth
 * keeping: it carries scroll depth and time on page, which is the only
 * signal here that separates read from bounced.
 *
 * It runs fully cookieless, which is why there is no consent banner and
 * why the traffic count is the real one: nothing is stored on the
 * visitor's device, so there is no opt-in to decline and no silent
 * majority missing from the numbers. See below for what that costs and
 * who counts unique people instead.
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
        // EU, because that is where this site reports. The fallback used to
        // name the US host, so an unset env var would have sent events to the
        // wrong region rather than failing visibly.
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com",
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
        // Web Analytics, which does its own cookieless de-duplication.
        persistence: "memory",
        // Never record sessions. There is no consent banner on this site, and
        // replay is the one thing here that genuinely would need one — it
        // records what a visitor did, not just that they came. The PostHog
        // project is shared with other products, one of which does want replay
        // for its consented users, so a project-level toggle flipped there
        // would otherwise silently start recording portfolio visitors.
        disable_session_recording: true,
        capture_pageview: false,
        // Every island in the shared PostHog project stamps `product` on its
        // events, so one query can span them or single one out. Set through
        // before_send rather than register(): on posthog-js 1.422 register()
        // writes super-properties through to persisted storage even under
        // persistence "memory", which would put a cookie on a site that has
        // no consent banner precisely because it stores nothing.
        before_send: (event) => {
          if (event) event.properties = { ...event.properties, product: "portfolio" };
          return event;
        },
        capture_pageleave: true,
        // An error a visitor hits is worth knowing about even though nobody
        // will ever report it.
        capture_exceptions: true,
        // Nothing calls identify() here, so person profiles would only be
        // empty rows against the billing quota.
        person_profiles: "identified_only",
      });
    }
    posthog.capture("$pageview");
  }, [pathname]);

  return null;
}
