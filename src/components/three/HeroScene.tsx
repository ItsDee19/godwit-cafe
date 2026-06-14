"use client";

import {
  Environment,
  Lightformer,
  ContactShadows,
  AdaptiveDpr,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Vignette,
} from "@react-three/postprocessing";
import { HeroModel, type DonutColors, type DragState } from "./DonutModel";

export type Quality = "high" | "low";

export function HeroScene({
  progressRef,
  drag,
  colors,
  modelUrl,
  quality,
  reducedMotion,
}: {
  progressRef: { current: number };
  drag: React.RefObject<DragState>;
  colors: DonutColors;
  modelUrl?: string;
  quality: Quality;
  reducedMotion: boolean;
}) {
  return (
    <>
      {/* soft warm key + fill */}
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 6, 4]} intensity={1.5} color="#fff4df" />
      <directionalLight position={[-4, 1, -3]} intensity={0.5} color={colors.glaze} />

      {/* procedural studio reflections (no HDRI file) */}
      <Environment resolution={256} frames={1}>
        <Lightformer
          intensity={2.2}
          position={[0, 3, 2]}
          scale={[7, 3, 1]}
          color="#fff7e8"
        />
        <Lightformer
          intensity={1.3}
          position={[-4, 1, -1]}
          scale={[4, 4, 1]}
          color={colors.glaze}
        />
        <Lightformer
          intensity={1}
          position={[4, -1, 2]}
          scale={[4, 4, 1]}
          color="#ffffff"
        />
      </Environment>

      <HeroModel
        progressRef={progressRef}
        drag={drag}
        colors={colors}
        modelUrl={modelUrl}
        reducedMotion={reducedMotion}
      />

      <ContactShadows
        position={[0, -0.75, 0]}
        opacity={0.35}
        scale={9}
        blur={3.2}
        far={3}
        resolution={quality === "high" ? 512 : 256}
        color="#2a1d14"
      />

      {quality === "high" && (
        <EffectComposer enableNormalPass={false}>
          <Bloom
            intensity={0.55}
            luminanceThreshold={0.7}
            luminanceSmoothing={0.3}
            mipmapBlur
          />
          <DepthOfField
            focusDistance={0.02}
            focalLength={0.05}
            bokehScale={2.2}
          />
          <Vignette eskil={false} offset={0.18} darkness={0.55} />
        </EffectComposer>
      )}

      <AdaptiveDpr pixelated={false} />
    </>
  );
}
