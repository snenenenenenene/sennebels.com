import "react";

/**
 * Next bundles an experimental React internally and aliases the app's `react`
 * to it when experimental.viewTransition is on, so ViewTransition exists at
 * runtime. The published types for react@19 stable do not describe it yet, and
 * the skill is explicit that react@canary must not be installed alongside Next.
 * So the shape is declared here instead.
 */
declare module "react" {
  type ViewTransitionClass = string | "auto" | "none";
  type ViewTransitionClassPerType = { default: ViewTransitionClass } & Record<string, ViewTransitionClass>;

  interface ViewTransitionProps {
    children?: import("react").ReactNode;
    name?: string;
    default?: ViewTransitionClass;
    enter?: ViewTransitionClass | ViewTransitionClassPerType;
    exit?: ViewTransitionClass | ViewTransitionClassPerType;
    update?: ViewTransitionClass | ViewTransitionClassPerType;
    share?: ViewTransitionClass | ViewTransitionClassPerType;
  }

  export const unstable_ViewTransition: import("react").ComponentType<ViewTransitionProps>;
  export function unstable_addTransitionType(type: string): void;
}
