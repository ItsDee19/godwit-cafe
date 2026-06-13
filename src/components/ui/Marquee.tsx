"use client";

import { cn } from "@/lib/cn";

/*
  Infinite horizontal marquee. Renders two identical copies of `children`
  and slides the track by -50%. Pauses on hover; honours reduced motion
  (globals.css neutralises the animation duration).
*/
export function Marquee({
  children,
  speedSeconds = 40,
  reverse = false,
  pauseOnHover = true,
  className,
}: {
  children: React.ReactNode;
  speedSeconds?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("group relative w-full overflow-hidden", className)}
      role="presentation"
    >
      <div
        className={cn(
          "flex w-max flex-nowrap will-change-transform animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={
          {
            "--marquee-duration": `${speedSeconds}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        <div className="flex shrink-0 items-stretch" aria-hidden={false}>
          {children}
        </div>
        <div className="flex shrink-0 items-stretch" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
