import { useMemo } from "react";
import type { DonutColors } from "./DonutModel";

// Deterministic PRNG so server and client render identical sprinkles
// (avoids hydration mismatches — this component is server-rendered).
function makeRng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/*
  Static, asset-free hero visual — shown when WebGL is unavailable, the
  visitor prefers reduced motion, or while the canvas is still loading.
  An SVG donut keeps the page looking intentional with zero dependencies.

  TODO: optionally replace with a licensed hero photo (/public/og/hero.jpg).
*/
export function HeroFallback({ colors }: { colors: DonutColors }) {
  const sprinkles = useMemo(() => {
    const rng = makeRng(1337);
    // Round to 2dp: Math.cos/sin differ by ~1 ULP between Node's V8 (server)
    // and the browser's V8 (client); rounding makes the serialized strings
    // identical and keeps hydration clean.
    const r2 = (n: number) => Math.round(n * 100) / 100;
    const items: { x: number; y: number; r: number; c: string }[] = [];
    const cx = 100;
    const cy = 100;
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * Math.PI * 2 + rng();
      const rad = 52 + (rng() - 0.5) * 26;
      items.push({
        x: r2(cx + Math.cos(a) * rad),
        y: r2(cy + Math.sin(a) * rad),
        r: r2(a * (180 / Math.PI) + 90),
        c: colors.sprinkles[i % colors.sprinkles.length],
      });
    }
    return items;
  }, [colors]);

  return (
    // Upper-area placement mirrors the lifted WebGL donut so the copy band
    // below stays clear on every screen size.
    <div className="absolute inset-x-0 top-0 flex h-[60%] items-center justify-center px-6">
      <svg
        viewBox="0 0 200 200"
        className="h-[min(46vmin,360px)] w-[min(46vmin,360px)] drop-shadow-[0_30px_40px_rgba(42,29,20,0.25)]"
        role="img"
        aria-label="A glazed donut with colourful sprinkles"
      >
        <defs>
          <radialGradient id="glaze" cx="42%" cy="36%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="35%" stopColor={colors.glaze} />
            <stop offset="100%" stopColor={colors.glaze} />
          </radialGradient>
        </defs>
        {/* dough ring */}
        <circle
          cx="100"
          cy="100"
          r="64"
          fill="none"
          stroke={colors.dough}
          strokeWidth="54"
        />
        {/* glaze ring */}
        <circle
          cx="100"
          cy="100"
          r="62"
          fill="none"
          stroke="url(#glaze)"
          strokeWidth="44"
        />
        {/* sprinkles */}
        {sprinkles.map((s, i) => (
          <rect
            key={i}
            x={s.x - 1.6}
            y={s.y - 5}
            width="3.2"
            height="10"
            rx="1.6"
            fill={s.c}
            transform={`rotate(${s.r} ${s.x} ${s.y})`}
          />
        ))}
      </svg>
    </div>
  );
}
