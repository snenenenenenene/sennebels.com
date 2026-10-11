import { NextResponse } from "next/server";

/**
 * PostHog → ntfy.
 *
 * PostHog's webhook destination POSTs here, this formats one short
 * message and sends it to ntfy (NTFY_TOPIC). Which events arrive is decided in
 * the PostHog UI, not in this file — filtering there means no deploy is
 * needed to stop the phone being noisy.
 *
 * Setup, once:
 *   PostHog → Data pipelines → Destinations → HTTP Webhook
 *   URL:    https://sennebels.com/api/discord/posthog?secret=<DISCORD_POSTHOG_WEBHOOK_SECRET>
 *   Filter: $pageleave (the read/bounce signal), $autocapture (clicks),
 *           $rageclick and $dead_click (something is broken), $exception.
 *           $pageview is deliberately left out — it fires for every bot
 *           and every reload and would drown the rest.
 *
 * The route path and DISCORD_POSTHOG_WEBHOOK_SECRET keep their names so the
 * PostHog destination config does not change. No-ops silently when
 * NTFY_TOPIC is unset, so previews and local runs never ping the phone.
 */

export const runtime = "edge";

interface PostHogEvent {
  event?: string;
  distinct_id?: string;
  properties?: Record<string, unknown>;
}

/** PostHog sends the event flat on some pipelines and wrapped on others. */
type Body = PostHogEvent | { event?: PostHogEvent };

function str(v: unknown): string | undefined {
  if (typeof v !== "string" || v === "") return undefined;
  return v.length > 256 ? v.slice(0, 255) + "…" : v;
}

export async function POST(req: Request) {
  // Shared secret, or anyone who finds the route owns the channel.
  const expected = process.env.DISCORD_POSTHOG_WEBHOOK_SECRET;
  const provided = new URL(req.url).searchParams.get("secret");
  if (!expected || provided !== expected) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  }

  const topic = process.env.NTFY_TOPIC;
  if (!topic) return NextResponse.json({ ok: true, skipped: "no topic" });

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const e: PostHogEvent =
    body && typeof (body as { event?: unknown }).event === "object"
      ? ((body as { event: PostHogEvent }).event)
      : (body as PostHogEvent);

  const name = str(e.event) ?? "(unknown)";
  const p = e.properties ?? {};

  // A campaign beats a bare referrer when both are present: utm_source is
  // what was actually clicked on, $referring_domain is only where the
  // browser happened to come from.
  const source =
    str(p.utm_source) ?? str(p.$referring_domain) ?? (p.$referrer === "$direct" ? "direct" : undefined);

  // The read-or-bounced signal. PostHog hangs it off the NEXT event as
  // $prev_pageview_*, so it arrives on $pageleave at the end of a visit and
  // on each $pageview in the middle of one — same fields either way.
  // max_scroll_percentage is a 0–1 fraction, not a 0–100 one.
  const engagement = [
    typeof p.$prev_pageview_max_scroll_percentage === "number"
      ? `${Math.round(p.$prev_pageview_max_scroll_percentage * 100)}% read`
      : undefined,
    typeof p.$prev_pageview_duration === "number"
      ? `${Math.round(p.$prev_pageview_duration)}s on page`
      : undefined,
  ]
    .filter(Boolean)
    .join(" · ");

  // What a click actually hit. PostHog puts the text of the clicked
  // element in $el_text and the href in the elements chain; the text is
  // the readable half and the only one worth a line in the push.
  const fields = [
    { name: "Page", value: str(p.$current_url) ?? str(p.$pathname) ?? "—", inline: false },
    { name: "Clicked", value: str(p.$el_text), inline: true },
    { name: "Error", value: str((p.$exception_list as { value?: string }[] | undefined)?.[0]?.value), inline: false },
    { name: "Engagement", value: engagement, inline: true },
    { name: "From", value: source, inline: true },
    { name: "Where", value: [str(p.$geoip_city_name), str(p.$geoip_country_name)].filter(Boolean).join(", "), inline: true },
    { name: "Device", value: [str(p.$browser), str(p.$os), str(p.$device_type)].filter(Boolean).join(" · "), inline: true },
  ].filter((f) => f.value);

  // Every ping links to the visitor's full session in PostHog, so one
  // interesting push is one tap away from everything else they did.
  const sessionId = str(p.$session_id);
  const click = sessionId
    ? `https://us.posthog.com/project/356563/replay/${encodeURIComponent(sessionId)}`
    : undefined;

  const headers: Record<string, string> = {
    // Header values must be Latin-1 or fetch() throws.
    Title: `sennebels.com - ${name}`.replace(/[^\x20-\xff]/g, "-"),
  };
  if (click) headers.Click = click;
  await fetch(`${process.env.NTFY_SERVER || "https://ntfy.sh"}/${topic}`, {
    method: "POST",
    headers,
    body: fields.map((f) => `${f.name}: ${f.value}`).join("\n") || name,
  }).catch(() => {});

  return NextResponse.json({ ok: true });
}
