/**
 * Shared between the form and the server action, so it lives in a module that
 * imports nothing. The rest of the guestbook's data layer reaches for
 * node:crypto, and one value import from a client component would drag that
 * into the browser bundle.
 */
export const NAME_MAX = 40;
export const NOTE_MAX = 140;
