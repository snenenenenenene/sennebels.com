"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { addEntry, hasSignedRecently, NAME_MAX, NOTE_MAX, visitorHash } from "../lib/guestbook";

export type SignState = { error?: string; ok?: boolean };

/**
 * Signing the guestbook. Anonymous writes from the open internet, so
 * everything below is a trust boundary and none of it is optional:
 * length caps, a required name, and one signature per visitor per day.
 *
 * There is no sanitising step because there is no HTML rendering step —
 * React escapes the text when it prints it, and the text is only ever
 * printed.
 */
export async function sign(_prev: SignState, form: FormData): Promise<SignState> {
  const name = String(form.get("name") ?? "").trim();
  const note = String(form.get("note") ?? "").trim();

  // Bots fill every field they are given; a human never sees this one.
  if (String(form.get("website") ?? "")) return { ok: true };

  if (!name) return { error: "A name, at least." };
  if (name.length > NAME_MAX) return { error: `Names cap at ${NAME_MAX} characters.` };
  if (note.length > NOTE_MAX) return { error: `Notes cap at ${NOTE_MAX} characters.` };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const visitor = visitorHash(ip);

  if (await hasSignedRecently(visitor)) {
    return { error: "You have already signed today. Come back tomorrow." };
  }

  await addEntry(name, note || null, visitor);
  revalidatePath("/guestbook");
  return { ok: true };
}
