"use client";

/*
  The hero model — a SWAPPABLE SLOT.

  - <HeroModel> renders a procedural donut by default (no assets needed).
  - Drop a /public/models/donut.glb (or sizzler/shake/arancini) and pass
    `modelUrl` to swap it in; if the file fails to load we fall back to the
    procedural donut automatically (ErrorBoundary).
  - The choreography (scroll rotate/scale/travel, drag-spin, float, pointer
    parallax) lives on <DonutRig> and is model-agnostic.
*/

import {
  Component,
  useMemo,
  useRef,
  Suspense,
  type ReactNode,
} from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Float } from "@react-three/drei";
import * as THREE from "three";

export interface DonutColors {
  dough: string;
  glaze: string;
  sprinkles: string[];
}

export interface DragState {
  /** angular velocity injected by pointer drag */
  velocity: number;
  /** accumulated spin angle */
  angle: number;
  dragging: boolean;
}

// ---------------------------------------------------------------
// Procedural donut
// ---------------------------------------------------------------
function ProceduralDonut({ colors }: { colors: DonutColors }) {
  const R = 1; // ring radius
  const tube = 0.46;

  const sprinkles = useMemo(() => {
    const items: {
      pos: [number, number, number];
      rot: [number, number, number];
      color: string;
    }[] = [];
    const count = 90;
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      // bias phi to the upper hemisphere so sprinkles sit on top of the glaze
      const phi = (Math.random() * 0.7 + 0.05) * Math.PI; // ~9°..135° from top
      const rr = R + tube * Math.cos(phi) * 0.62;
      const x = rr * Math.cos(theta);
      const z = rr * Math.sin(theta);
      const y = tube * Math.sin(phi) * 0.62 + 0.16;
      items.push({
        pos: [x, y, z],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        color: colors.sprinkles[i % colors.sprinkles.length],
      });
    }
    return items;
  }, [colors]);

  return (
    <group>
      {/* dough */}
      <mesh castShadow receiveShadow>
        <torusGeometry args={[R, tube, 48, 96]} />
        <meshStandardMaterial
          color={colors.dough}
          roughness={0.75}
          metalness={0}
        />
      </mesh>

      {/* glaze — slightly larger, raised cap; clearcoat for a wet sheen */}
      <mesh position={[0, 0.12, 0]} scale={[1.015, 0.92, 1.015]} castShadow>
        <torusGeometry args={[R, tube, 48, 96]} />
        <meshPhysicalMaterial
          color={colors.glaze}
          roughness={0.28}
          clearcoat={1}
          clearcoatRoughness={0.18}
          sheen={0.6}
          sheenColor={colors.glaze}
          sheenRoughness={0.5}
        />
      </mesh>

      {/* sprinkles */}
      {sprinkles.map((s, i) => (
        <mesh key={i} position={s.pos} rotation={s.rot} castShadow>
          <capsuleGeometry args={[0.022, 0.085, 4, 8]} />
          <meshStandardMaterial color={s.color} roughness={0.45} />
        </mesh>
      ))}
    </group>
  );
}

// ---------------------------------------------------------------
// GLB variant (optional)
// ---------------------------------------------------------------
function GLBDonut({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  return <primitive object={cloned} />;
}

class ModelErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

// ---------------------------------------------------------------
// Rig — model-agnostic choreography
// ---------------------------------------------------------------
function DonutRig({
  progressRef,
  drag,
  reducedMotion,
  children,
}: {
  progressRef: { current: number };
  drag: React.RefObject<DragState>;
  reducedMotion: boolean;
  children: ReactNode;
}) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const { pointer, size } = useThree();

  useFrame((_, delta) => {
    const g = group.current;
    const inr = inner.current;
    if (!g || !inr) return;
    const d = Math.min(delta, 1 / 30);
    const p = progressRef.current; // 0..1 across hero

    // --- drag-spin inertia ---
    // While dragging, HeroCanvas drives ds.angle directly (position-based).
    // On release we integrate the retained velocity and damp it (inertia).
    const ds = drag.current;
    if (ds && !ds.dragging) {
      ds.angle += ds.velocity * d;
      ds.velocity *= Math.pow(0.94, d * 60);
    }

    if (reducedMotion) {
      g.rotation.set(-0.5, 0.5, 0);
      g.position.set(0, 0, 0);
      g.scale.setScalar(1);
      return;
    }

    // narrow/portrait viewports: shrink + lift so the headline has room
    const compact = size.width < 760;

    // --- scroll choreography (travel + rotate + scale) ---
    // The donut lives in the UPPER area so the copy band below stays clear;
    // it drifts further up and shrinks as the user scrolls into beat 2.
    const targetRotY = p * Math.PI * 2.2 + (ds ? ds.angle : 0);
    const targetRotX = -0.5 + Math.sin(p * Math.PI) * 0.22;
    const travelX = Math.sin(p * Math.PI * 2) * (compact ? 0.25 : 0.45);
    const travelY =
      (compact ? 1.05 : 0.9) + Math.sin(p * Math.PI) * 0.28 - p * 0.5;
    const scale =
      (1 + Math.sin(p * Math.PI) * 0.1 - p * 0.12) * (compact ? 0.62 : 0.78);

    // pointer parallax (subtle)
    const px = pointer.x * 0.15;
    const py = pointer.y * 0.12;

    inr.rotation.y = THREE.MathUtils.damp(inr.rotation.y, targetRotY, 6, d);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetRotX + py, 5, d);
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, px * 0.5, 5, d);
    g.position.x = THREE.MathUtils.damp(g.position.x, travelX + px, 5, d);
    g.position.y = THREE.MathUtils.damp(g.position.y, travelY, 5, d);
    g.scale.x = g.scale.y = g.scale.z = THREE.MathUtils.damp(
      g.scale.x,
      scale,
      5,
      d,
    );
  });

  return (
    <group ref={group}>
      <Float
        speed={reducedMotion ? 0 : 1.4}
        rotationIntensity={reducedMotion ? 0 : 0.25}
        floatIntensity={reducedMotion ? 0 : 0.5}
      >
        <group ref={inner}>{children}</group>
      </Float>
    </group>
  );
}

export function HeroModel({
  progressRef,
  drag,
  colors,
  modelUrl,
  reducedMotion = false,
}: {
  progressRef: { current: number };
  drag: React.RefObject<DragState>;
  colors: DonutColors;
  modelUrl?: string;
  reducedMotion?: boolean;
}) {
  const procedural = <ProceduralDonut colors={colors} />;
  return (
    <DonutRig progressRef={progressRef} drag={drag} reducedMotion={reducedMotion}>
      {modelUrl ? (
        <ModelErrorBoundary fallback={procedural}>
          <Suspense fallback={procedural}>
            <GLBDonut url={modelUrl} />
          </Suspense>
        </ModelErrorBoundary>
      ) : (
        procedural
      )}
    </DonutRig>
  );
}

// Preload only if a model is actually configured (no-op otherwise).
export function preloadHeroModel(url?: string) {
  if (url) useGLTF.preload(url);
}
