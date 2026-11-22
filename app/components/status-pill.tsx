import { Flask } from "@phosphor-icons/react/dist/ssr";
import type { Project } from "../data/projects";
import { ACCENT_TEXT, type Tint } from "./ui";

/** Colour means status here, never brand: live is green, beta blue, an experiment yellow. */
const tone = (p: Project): Tint => (p.experiment ? "yellow" : /beta/i.test(p.status) ? "blue" : "green");

/** A product's status. Experiments carry a flask so they never read as a launch. */
export function StatusPill({ project }: { project: Project }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-caption font-medium ${ACCENT_TEXT[tone(project)]} bg-[color-mix(in_srgb,currentColor_10%,transparent)]`}
    >
      {project.experiment ? <Flask size={13} weight="fill" aria-hidden /> : <span aria-hidden className="size-[6px] rounded-full bg-current" />}
      {project.status}
    </span>
  );
}
