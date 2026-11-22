import { BrandMark } from "./marks";

/** The stack a project was built with, as marked pills. One list, every case study. */
export function BuiltWith({ items, className = "" }: { items: { name: string; slug?: string }[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {items.map((t) => (
        <li
          key={t.name}
          className="squircle flex items-center gap-2 rounded-full bg-raised py-1.5 pl-2.5 pr-4 text-callout text-ink-2 shadow-card"
        >
          {t.slug ? <BrandMark slug={t.slug} size={17} /> : <span aria-hidden className="size-[7px] rounded-full bg-ink-3/40" />}
          {t.name}
        </li>
      ))}
    </ul>
  );
}
