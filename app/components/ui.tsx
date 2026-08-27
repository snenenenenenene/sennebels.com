import type { ReactNode } from "react";
import type { Tint } from "../data/portfolio";

export const TINT_BG: Record<Tint, string> = {
  violet: "bg-tint-violet",
  mint: "bg-tint-mint",
  blush: "bg-tint-blush",
  rose: "bg-tint-rose",
  butter: "bg-tint-butter",
};

/** Body copy inside a tinted surface — dark enough on every tint we use. */
export const TINT_TEXT: Record<Tint, string> = {
  violet: "text-[#514459]",
  mint: "text-[#465244]",
  blush: "text-[#5C443E]",
  rose: "text-[#5C3A44]",
  butter: "text-[#6B6047]",
};

export const TINT_LINK: Record<Tint, string> = {
  violet: "text-[#6B3F8C]",
  mint: "text-[#2E6B48]",
  blush: "text-[#B0453A]",
  rose: "text-[#9B2244]",
  butter: "text-[#7A5A12]",
};

export function SectionHeader({ label, aside }: { label: string; aside: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1">
      <h2 className="text-[15px] font-semibold uppercase tracking-[0.14em] text-ink-3">{label}</h2>
      <p className="font-display text-[19px] font-medium italic text-moss">{aside}</p>
    </div>
  );
}

export function Chip({ children, tone = "plain" }: { children: ReactNode; tone?: "plain" | "ai" | "muted" }) {
  const tones = {
    plain: "bg-white text-ink-2",
    ai: "bg-tint-mint text-[#33603F]",
    muted: "bg-[#F4F2EE] text-ink-3",
  };
  return (
    <li className={`rounded-full px-[17px] py-[9px] text-[15px] font-semibold ${tones[tone]}`}>
      {children}
    </li>
  );
}

/** A soft tinted panel — used by the numbers row and the "not working" tiles. */
export function TintPanel({
  tint,
  title,
  body,
  titleClass = "font-display text-[30px] font-semibold -tracking-[0.02em] text-ink",
}: {
  tint: Tint;
  title: string;
  body: string;
  titleClass?: string;
}) {
  return (
    <div className={`flex flex-1 flex-col gap-2 rounded-[24px] px-[30px] py-7 ${TINT_BG[tint]}`}>
      <p className={titleClass}>{title}</p>
      <p className={`text-base leading-[26px] ${TINT_TEXT[tint]}`}>{body}</p>
    </div>
  );
}
