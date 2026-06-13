"use client";

import { useEffect, useState } from "react";

/**
 * Detects WebGL availability. Returns:
 *   null  → still detecting (first render)
 *   true  → WebGL available
 *   false → unavailable / blocked
 */
export function useWebGLSupport(): boolean | null {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      setSupported(Boolean(gl));
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}
