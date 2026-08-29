import type { Icon } from "@phosphor-icons/react";
import { ACCENT_TEXT, LINK_HOVER, RULE_BG, type Tint } from "./ui";

/**
 * One link component for the hero socials and the footer.
 *
 * At rest the mark carries its primary and the label is body colour. On hover
 * the label takes the same primary, so mark and word read as one object, and a
 * rule wipes in from the left. The rule animates on scaleX rather than width,
 * which keeps it on the compositor.
 */
export function IconLink({
  href,
  label,
  icon: I,
  tint,
  external = true,
}: {
  href: string;
  label: string;
  icon: Icon;
  tint: Tint;
  external?: boolean;
}) {
  const outbound = external && href.startsWith("http");
  return (
    <a
      href={href}
      {...(outbound ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`group/link flex min-h-tap min-w-tap items-center justify-center gap-2 text-ink-2 transition-colors duration-200 sm:justify-start ${LINK_HOVER[tint]}`}
    >
      <I
        size={19}
        weight="fill"
        aria-hidden
        className={`shrink-0 transition-transform duration-300 ease-out group-hover/link:-translate-y-px ${ACCENT_TEXT[tint]}`}
      />
      <span className="relative">
        {label}
        <span
          aria-hidden
          className={`absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover/link:scale-x-100 ${RULE_BG[tint]}`}
        />
      </span>
    </a>
  );
}
