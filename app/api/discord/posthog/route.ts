import { NextResponse } from "next/server";

/**
 * PostHog → Discord.
 *
 * PostHog's webhook destination POSTs here, this formats one embed and
 * forwards it to DISCORD_WEBHOOK_URL. Which events arrive is decided in
 * the PostHog UI, not in this file — filtering there means no deploy is
 * needed to stop the channel being noisy.
 *
 * Setup, once:
 *   PostHog → Data pipelines → Destinations → HTTP Webhook
 *   URL:    https://sennebels.com/api/discord/posthog?secret=<DISCORD_POSTHOG_WEBHOOK_SECRET>
 *   Filter: $pageview, $autocapture, $rageclick
 *
 * No-ops silently when DISCORD_WEBHOOK_URL is unset, so previews and
 * local runs never ping the channel.
 */

export const runtime = "edge";

interface PostHogEvent {
  event?: string;
  distinct_id?: string;
  properties?: Record<string, unknown>;
}

/** PostHog sends the event flat on some pipelines and wrapped on others. */
type Body = PostHogEvent | { event?: PostHogEvent };

const COLOURS: Record<string, number> = {
  $pageview: 0x6b7280,
  $autocapture: 0x3b82f6,
  $rageclick: 0xdc5252,
};

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

  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ ok: true, skipped: "no webhook" });

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

  // What a click actually hit. PostHog puts the text of the clicked
  // element in $el_text and the href in the elements chain; the text is
  // the readable half and the only one worth a line in Discord.
  const fields = [
    { name: "Page", value: str(p.$current_url) ?? str(p.$pathname) ?? "—", inline: false },
    { name: "Clicked", value: str(p.$el_text), inline: true },
    { name: "From", value: str(p.$referring_domain), inline: true },
    { name: "Where", value: [str(p.$geoip_city_name), str(p.$geoip_country_name)].filter(Boolean).join(", "), inline: true },
    { name: "Device", value: [str(p.$browser), str(p.$os)].filter(Boolean).join(" · "), inline: true },
  ].filter((f) => f.value);

  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "sennebels.com",
      embeds: [{ title: name, color: COLOURS[name] ?? 0x1e1515, fields }],
    }),
  });

  return NextResponse.json({ ok: true });
}
