"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

/**
 * Real 3D, not a drop shadow pretending. The surface rotates on X and Y around
 * a perspective origin and the contents sit on separate Z planes, so moving the
 * pointer produces genuine parallax between the image and the label above it.
 *
 * X and Y are separate springs. A single spring driving a 2D distance desyncs
 * the moment the two axes carry different velocities.
 *
 * Pointer position stays in MotionValues, outside React's render cycle.
 */

const SPRING = { stiffness: 260, damping: 24, mass: 0.3 };

export function Tilt({
  children,
  className = "",
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), SPRING);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), SPRING);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div className={`[perspective:1400px] ${className}`}>
      <motion.div
        ref={ref}
        onPointerMove={(e) => {
          const b = ref.current?.getBoundingClientRect();
          if (!b) return;
          px.set((e.clientX - b.left) / b.width - 0.5);
          py.set((e.clientY - b.top) / b.height - 0.5);
        }}
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Lifts a child onto its own Z plane so it parallaxes against the surface. */
export function Plane({
  z,
  children,
  className = "",
}: {
  z: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div style={{ transform: `translateZ(${z}px)`, transformStyle: "preserve-3d" }} className={className}>
      {children}
    </div>
  );
}
