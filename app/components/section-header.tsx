/**
 * Page title. A real heading, not a micro-label above one.
 */
export function PageTitle({ title, lede }: { title: string; lede?: string }) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-display font-medium text-ink">{title}</h1>
      {lede && <p className="max-w-[54ch] text-lede text-ink-2">{lede}</p>}
    </div>
  );
}
