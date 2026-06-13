import { cn } from "@/lib/cn";

/*
  BirdMark — a generated, minimal godwit line-mark used as a recurring
  motif (nav, dividers, scroll cue, loader). Uses currentColor so it
  inherits / themes naturally.

  TODO: replace with the official Godwit logo mark when provided
  (drop into /public/brand and swap this component's internals).
*/

interface BirdMarkProps {
  className?: string;
  strokeWidth?: number;
  /** "flight" = swept wings (default, logo-ish) · "wade" = standing wader */
  variant?: "flight" | "wade";
  /** decorative marks are hidden from screen readers */
  decorative?: boolean;
  title?: string;
}

export function BirdMark({
  className,
  strokeWidth = 5,
  variant = "flight",
  decorative = false,
  title = "Godwit",
}: BirdMarkProps) {
  const a11y = decorative
    ? ({ "aria-hidden": true } as const)
    : ({ role: "img", "aria-label": title } as const);

  if (variant === "wade") {
    return (
      <svg
        viewBox="0 0 100 100"
        className={cn("inline-block", className)}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...a11y}
      >
        {/* body + neck + long bill */}
        <path d="M26 56 C 30 44, 46 40, 56 46 C 64 50, 66 40, 72 30 L 86 14" />
        {/* tail */}
        <path d="M26 56 C 18 54, 14 58, 12 62" />
        {/* long legs */}
        <path d="M44 56 L 40 84" />
        <path d="M56 54 L 58 84" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 100 60"
      className={cn("inline-block", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...a11y}
    >
      {/* swept wings — godwit in flight */}
      <path d="M6 40 C 28 10, 42 12, 50 30 C 58 12, 72 10, 94 40" />
    </svg>
  );
}
