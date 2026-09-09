import type { Hat } from "../data/visitor";

/**
 * Hats, drawn rather than emoji.
 *
 * An emoji hat is somebody else's drawing at somebody else's colour, and it
 * changes shape per platform. These are flat shapes on a 24x16 box whose
 * bottom edge is the brim line, so every hat sits on whatever it is put on
 * without per-hat nudging.
 */
export function HatMark({ hat, size = 26 }: { hat: Hat; size?: number }) {
  if (hat === "none") return null;
  return (
    <svg
      width={size}
      height={(size * 16) / 24}
      viewBox="0 0 24 16"
      fill="none"
      aria-hidden
      className="block overflow-visible"
    >
      {hat === "party" && (
        <>
          <path d="M12 0 L18 15 H6 Z" fill="var(--sys-red)" />
          <path d="M9.2 8.4 L15.6 8.4 M7.6 12.2 L16.8 12.2" stroke="var(--mark-yellow)" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="12" cy="0.6" r="1.8" fill="var(--sys-yellow)" />
        </>
      )}
      {hat === "cap" && (
        <>
          <path d="M4 12 C4 5 20 5 20 12 Z" fill="var(--sys-blue)" />
          <path d="M3.4 12 H23 C23 14.2 20 14.6 3.4 14 Z" fill="var(--sys-blue)" opacity="0.75" />
          <circle cx="12" cy="5.4" r="1.1" fill="var(--mark-yellow)" />
        </>
      )}
      {hat === "bucket" && (
        <>
          <path d="M6 12 C6 5.5 18 5.5 18 12 Z" fill="var(--sys-green)" />
          <path d="M2.5 12 H21.5 C21.5 15 18.5 15.6 12 15.6 S2.5 15 2.5 12 Z" fill="var(--sys-green)" />
          <path d="M6.6 9.6 H17.4" stroke="var(--mark-yellow)" strokeWidth="1.2" opacity="0.8" />
        </>
      )}
      {hat === "top" && (
        <>
          <rect x="7" y="0.5" width="10" height="11.5" rx="1" fill="#241C1A" />
          <rect x="7" y="7.6" width="10" height="2.6" fill="var(--sys-red)" />
          <path d="M2.5 12.4 H21.5 C21.5 14.6 18 15.2 12 15.2 S2.5 14.6 2.5 12.4 Z" fill="#241C1A" />
        </>
      )}
      {hat === "sprout" && (
        <>
          <path d="M12 15 V7.5" stroke="var(--sys-green)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M12 9.5 C7.5 9.5 6 6.5 6.4 4.2 C9.4 3.8 12 5.8 12 9.5 Z" fill="var(--sys-green)" />
          <path d="M12 8.2 C16.2 8.2 17.6 5.4 17.2 3.2 C14.4 2.9 12 4.8 12 8.2 Z" fill="var(--sys-green)" opacity="0.72" />
        </>
      )}
    </svg>
  );
}
