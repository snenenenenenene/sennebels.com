/**
 * BuurtSit waitlist form destination.
 *
 * Prefer NEXT_PUBLIC_BUURTSIT_FORM_URL in Vercel when overriding.
 * Default is the public BuurtSit Google Form short link.
 * If unset and no default, submissions open mailto:hello@transita.app.
 */
export const FORM_URL =
  (typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_BUURTSIT_FORM_URL?.trim()
    : "") || "https://forms.gle/Mywc9ZteJyqmf3Sw9";

export const MAILTO_FALLBACK = "hello@transita.app";
