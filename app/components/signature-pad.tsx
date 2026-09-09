"use client";

import { useRef, useState } from "react";
import type { Signature } from "../data/visitor";
import { MICRO } from "./ui";

/**
 * Draw-your-own signature, on pointer events so a mouse, a finger and a
 * stylus are all the same code path.
 *
 * Coordinates are stored normalised (0..1) rather than in pixels: the pad is
 * whatever width the layout gives it, and the card that renders the result is
 * a different width again.
 */
export function SignaturePad({
  value,
  onChange,
}: {
  value: Signature;
  onChange: (next: Signature) => void;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [drawing, setDrawing] = useState(false);

  const at = (e: React.PointerEvent) => {
    const r = box.current!.getBoundingClientRect();
    return [
      Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)),
      Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)),
    ] as [number, number];
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <span className={`text-ink-3 ${MICRO}`}>Sign, if you like</span>
        {value.length > 0 && (
          <button
            type="button"
            onClick={() => onChange([])}
            className={`text-ink-3 underline underline-offset-2 hover:text-ink ${MICRO}`}
          >
            Clear
          </button>
        )}
      </div>

      <div
        ref={box}
        // touch-none stops the browser treating a signature stroke as a scroll.
        className="squircle relative h-28 w-full cursor-crosshair touch-none rounded-tile bg-raised shadow-card"
        onPointerDown={(e) => {
          (e.target as Element).setPointerCapture(e.pointerId);
          setDrawing(true);
          onChange([...value, [at(e)]]);
        }}
        onPointerMove={(e) => {
          if (!drawing) return;
          const next = value.slice();
          const last = next[next.length - 1];
          if (!last) return;
          next[next.length - 1] = [...last, at(e)];
          onChange(next);
        }}
        onPointerUp={() => setDrawing(false)}
        onPointerLeave={() => setDrawing(false)}
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <g stroke="var(--ink-2)" strokeWidth="0.9" fill="none" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke">
            {value.map((stroke, i) => (
              <polyline key={i} points={stroke.map(([x, y]) => `${x * 100},${y * 100}`).join(" ")} />
            ))}
          </g>
        </svg>
        {value.length === 0 && (
          <p className="pointer-events-none absolute inset-0 grid place-items-center text-callout text-ink-3">
            Draw here
          </p>
        )}
      </div>
    </div>
  );
}
