/**
 * The visitor card's vocabulary: the name you are issued, the colour you pick,
 * and the hat you put on it.
 *
 * Names are generated rather than asked for. "What is your name" on a stranger's
 * website is a small act of extraction, and most people answer it with "asdf".
 * Being handed AMBER MIRAGE and offered a reroll is a nicer transaction, and it
 * keeps the gallery free of anything that identifies anyone.
 */

const ADJECTIVES = [
  "amber", "cobalt", "dusky", "opal", "little", "westfall", "heather", "rosa",
  "almond", "ivy", "quiet", "brass", "hollow", "sable", "pale", "wintering",
  "salt", "copper", "gentle", "far", "moss", "linen", "still", "north",
  "bramble", "clover", "tallow", "ember", "wren", "harbour", "slate", "plum",
] as const;

const NOUNS = [
  "mirage", "nightingale", "botanist", "almanac", "letter", "lullaby", "poet",
  "engineer", "cartographer", "lantern", "orchard", "signal", "ledger", "kestrel",
  "compass", "archive", "meridian", "beacon", "thicket", "postcard", "atlas",
  "wanderer", "printer", "gardener", "draft", "chorus", "lighthouse", "field",
] as const;

/** ADJECTIVE NOUN, upper case, the way it is printed on the card. */
export function generateName(random: () => number = Math.random) {
  const a = ADJECTIVES[Math.floor(random() * ADJECTIVES.length)];
  const n = NOUNS[Math.floor(random() * NOUNS.length)];
  return `${a} ${n}`.toUpperCase();
}

/** Every name the generator can produce, so the validator does not have to trust the client. */
export function isGeneratedName(name: string) {
  const [a, n, ...rest] = name.toLowerCase().split(" ");
  return (
    rest.length === 0 &&
    (ADJECTIVES as readonly string[]).includes(a) &&
    (NOUNS as readonly string[]).includes(n)
  );
}

/**
 * Card colours. These are the site's own marks rather than a new palette,
 * so a wall of visitor cards still looks like it belongs to this site.
 */
export const CARD_COLORS = {
  red: { ink: "#F3EDE6", ground: "#8E3B3B", label: "Red" },
  blue: { ink: "#EDF1F5", ground: "#2F4C6B", label: "Blue" },
  green: { ink: "#EDF2EA", ground: "#3C5D42", label: "Green" },
  yellow: { ink: "#2A2018", ground: "#D9A62E", label: "Yellow" },
} as const;

export type CardColor = keyof typeof CARD_COLORS;
export const CARD_COLOR_KEYS = Object.keys(CARD_COLORS) as CardColor[];
export const isCardColor = (v: string): v is CardColor =>
  (CARD_COLOR_KEYS as string[]).includes(v);

/** Hats. "none" is a real choice and the default, not an absence. */
export const HATS = ["none", "party", "cap", "bucket", "top", "sprout"] as const;
export type Hat = (typeof HATS)[number];
export const isHat = (v: string): v is Hat => (HATS as readonly string[]).includes(v);

export const HAT_LABELS: Record<Hat, string> = {
  none: "Bare-headed",
  party: "Party",
  cap: "Cap",
  bucket: "Bucket",
  top: "Top hat",
  sprout: "Sprout",
};

/** A drawn signature: polylines in 0..1 space. */
export type Signature = [number, number][][];

export const SIGNATURE_MAX_POINTS = 1200;

/** The client sends this; none of it is trusted until it comes back through here. */
export function parseSignature(value: unknown): Signature | null {
  if (!Array.isArray(value)) return null;
  const strokes: Signature = [];
  let points = 0;
  for (const stroke of value) {
    if (!Array.isArray(stroke)) return null;
    const line: [number, number][] = [];
    for (const p of stroke) {
      if (!Array.isArray(p) || p.length !== 2) return null;
      const [x, y] = p;
      if (typeof x !== "number" || typeof y !== "number") return null;
      if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
      if (x < 0 || x > 1 || y < 0 || y > 1) return null;
      // Three decimals is a tenth of a pixel on a 300px card, and it keeps
      // the stored JSON to a few hundred bytes.
      line.push([Math.round(x * 1000) / 1000, Math.round(y * 1000) / 1000]);
      if (++points > SIGNATURE_MAX_POINTS) return null;
    }
    if (line.length > 1) strokes.push(line);
  }
  return strokes.length ? strokes : null;
}
