"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { HeroScene, type Quality } from "./HeroScene";
import type { DonutColors, DragState } from "./DonutModel";

const ROT_PER_PX = 0.008;

/*
  HeroCanvas — the WebGL stage. Owns drag-to-spin (pointer + touch) and
  feeds a shared DragState to the model rig. `touch-action: pan-y` keeps
  vertical page scroll free on mobile; horizontal drags spin the donut.

  This module is imported dynamically (ssr:false) so three.js never ships
  in the server bundle and the canvas is lazy.
*/
export default function HeroCanvas({
  progressRef,
  colors,
  modelUrl,
  quality,
  reducedMotion,
}: {
  progressRef: { current: number };
  colors: DonutColors;
  modelUrl?: string;
  quality: Quality;
  reducedMotion: boolean;
}) {
  const drag = useRef<DragState>({ velocity: 0, angle: 0, dragging: false });
  const last = useRef({ x: 0, t: 0 });

  const onDown = (e: React.PointerEvent) => {
    if (reducedMotion) return;
    drag.current.dragging = true;
    drag.current.velocity = 0;
    last.current = { x: e.clientX, t: performance.now() };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const onMove = (e: React.PointerEvent) => {
    if (!drag.current.dragging) return;
    const now = performance.now();
    const dx = e.clientX - last.current.x;
    const dt = Math.max((now - last.current.t) / 1000, 0.001);
    last.current = { x: e.clientX, t: now };
    const dAngle = dx * ROT_PER_PX;
    drag.current.angle += dAngle;
    // velocity (rad/s) retained for release inertia, clamped
    drag.current.velocity = Math.max(-12, Math.min(12, dAngle / dt));
  };

  const onUp = (e: React.PointerEvent) => {
    drag.current.dragging = false;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  };

  return (
    <div
      className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onPointerLeave={onUp}
    >
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6], fov: 34 }}
      >
        <Suspense fallback={null}>
          <HeroScene
            progressRef={progressRef}
            drag={drag}
            colors={colors}
            modelUrl={modelUrl}
            quality={quality}
            reducedMotion={reducedMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
