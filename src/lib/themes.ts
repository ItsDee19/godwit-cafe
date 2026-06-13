/*
  JS-side mirror of the CSS color tokens in src/app/globals.css.
  Used by the 3D canvas (backdrop hue, glaze accent), postprocessing,
  and GSAP — anywhere we need the color as a value, not a CSS utility.
  Keep this in sync with globals.css.
*/

export type OutletId = "indore" | "raipur" | "nagpur";
export type ThemeName = "base" | OutletId;

export interface ThemeColors {
  paper: string;
  surface: string;
  ink: string;
  inkSoft: string;
  line: string;
  accent: string;
  accentInk: string;
  accent2: string;
  halo: string;
}

export const themes: Record<ThemeName, ThemeColors> = {
  // Base brand / home — espresso + cream + golden amber
  base: {
    paper: "#faf4e9",
    surface: "#fffdf8",
    ink: "#1c1611",
    inkSoft: "#6b6157",
    line: "#eadfcc",
    accent: "#e0a100",
    accentInk: "#1c1611",
    accent2: "#3a2a1e",
    halo: "#f5e3c2",
  },
  // Indore — flagship / origin
  indore: {
    paper: "#f7efe2",
    surface: "#fffdf9",
    ink: "#20160f",
    inkSoft: "#6e6256",
    line: "#e6d8c3",
    accent: "#d98a04",
    accentInk: "#20160f",
    accent2: "#4a2e1a",
    halo: "#f3ddb6",
  },
  // Raipur — explorer's table
  raipur: {
    paper: "#f1f0e8",
    surface: "#fbfcfa",
    ink: "#15211d",
    inkSoft: "#5c6661",
    line: "#d8e0da",
    accent: "#0c6f60",
    accentInk: "#ffffff",
    accent2: "#c0552f",
    halo: "#cfe6dd",
  },
  // Nagpur — new arrival
  nagpur: {
    paper: "#fbf0ec",
    surface: "#fffcfa",
    ink: "#2a1a20",
    inkSoft: "#7a6a6f",
    line: "#f0ddd6",
    accent: "#ec3f63",
    accentInk: "#ffffff",
    accent2: "#7e9b6b",
    halo: "#fbd9ce",
  },
};

export const outletIds: OutletId[] = ["indore", "raipur", "nagpur"];
