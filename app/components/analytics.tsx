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
 * majority missing from the numbers.
 *
 * Push notifications are not fired from here: PostHog forwards the events it
 * is told to, to /api/discord/posthog. Doing it client-side would mean
 * shipping the ntfy topic to the browser.
 */

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

export function PostHogAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!KEY) return;
    if (!posthog.__loaded) {
      posthog.init(KEY, {
        // First-party proxy (see next.config.mjs), so ad blockers that
        // drop *.posthog.com still let the pageview through. ui_host keeps
        // toolbar links pointing at the real PostHog app.
        api_host: "/ingest",
        ui_host: "https://eu.posthog.com",
        // Nothing is written to the visitor's device: no cookie, no
        // localStorage, no sessionStorage. So there is no consent gate and
        // every visitor is counted, not just the ones who would accept one.
        //
        // cookieless_mode "on_reject" plus opt_out_capturing_by_default puts
        // every visitor on PostHog's cookieless rail: events go out with a
        // sentinel id and PostHog derives a daily visitor hash server-side
        // (server hash mode is on for project 92696), so unique visitors
        // count without storing anything here. There is no consent banner,
        // so nobody ever leaves that rail.
        cookieless_mode: "on_reject",
        opt_out_capturing_by_default: true,
        // Never record sessions. There is no consent banner on this site, and
        // replay is the one thing here that genuinely would need one — it
        // records what a visitor did, not just that they came. The PostHog
        // project is shared with other products, one of which does want replay
        // for its consented users, so a project-level toggle flipped there
        // would otherwise silently start recording portfolio visitors.
        disable_session_recording: true,
        capture_pageview: false,
        // No feature flags here, and /flags answers 400 for cookieless visitors.
        advanced_disable_flags: true,
        // Every island in the shared PostHog project stamps `product` on its
        // events, so one query can span them or single one out. Set through
        // before_send rather than register(): on posthog-js 1.422 register()
        // writes super-properties through to persisted storage even under
        // persistence "memory", which would put a cookie on a site that has
        // no consent banner precisely because it stores nothing.
        before_send: (event) => {
          if (event) {
            const path = event.properties?.$current_url
              ? new URL(event.properties.$current_url).pathname
              : "";
            const product = path.startsWith("/buurtsit") ? "buurtsit" : "portfolio";
            event.properties = { ...event.properties, product };
          }
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
