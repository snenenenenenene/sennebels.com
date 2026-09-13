/**
 * BuurtSit waitlist form destination.
 *
 * Until this is set, submissions open a mailto: to hello@transita.app.
 * Inject via env (preferred) or replace the empty string below when the
 * Google Form / Typeform link is ready:
 *
 *   NEXT_PUBLIC_BUURTSIT_FORM_URL=https://forms.gle/...
 */
export const FORM_URL =
  (typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_BUURTSIT_FORM_URL?.trim()
    : "") || "";

export const MAILTO_FALLBACK = "hello@transita.app";
