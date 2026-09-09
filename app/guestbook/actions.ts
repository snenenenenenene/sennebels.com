"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { addEntry, hasSignedRecently, visitorHash } from "../lib/guestbook";
import { NOTE_MAX } from "../lib/guestbook-limits";
import { isCardColor, isGeneratedName, isHat, parseSignature } from "../data/visitor";

export type SignState = { error?: string; ok?: boolean };

/**
 * Issuing a visitor card. Anonymous writes from the open internet, so nothing
 * the client sends is trusted:
 *
 *  - the name has to be one the generator could have produced, which is what
 *    keeps the gallery free of both slurs and anyone's real name
 *  - colour and hat have to be in their enums
 *  - the signature is re-parsed and re-clamped rather than stored as sent
 *  - one card per visitor per day, on a salted hash of the address
 */
export async function sign(_prev: SignState, form: FormData): Promise<SignState> {
  const name = String(form.get("name") ?? "").trim();
  const note = String(form.get("note") ?? "").trim();
  const color = String(form.get("color") ?? "");
  const hat = String(form.get("hat") ?? "none");

  if (String(form.get("website") ?? "")) return { ok: true };

  if (!isGeneratedName(name)) return { error: "That name did not come from the machine. Reroll it." };
  if (!isCardColor(color)) return { error: "Pick a colour." };
  if (!isHat(hat)) return { error: "That is not one of the hats." };
  if (note.length > NOTE_MAX) return { error: `Notes cap at ${NOTE_MAX} characters.` };

  let signature = null;
  const raw = String(form.get("signature") ?? "");
  if (raw) {
    try {
      signature = parseSignature(JSON.parse(raw));
    } catch {
      return { error: "That signature did not survive the trip. Try again." };
    }
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const visitor = visitorHash(ip);

  if (await hasSignedRecently(visitor)) {
    return { error: "You already have a card for today. Come back tomorrow." };
  }

  await addEntry({ name: name.toUpperCase(), note: note || null, color, hat, signature, hash: visitor });
  revalidatePath("/guestbook");
  return { ok: true };
}
