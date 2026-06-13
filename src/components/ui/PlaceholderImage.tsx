import { cn } from "@/lib/cn";

/*
  Themed placeholder shown wherever a real photo will go. Tints with the
  active theme (via --halo / --surface) so layouts read correctly before
  licensed photography arrives. Marked with data-todo for easy auditing.

  TODO: replace with licensed Godwit photos — set Photo.src in
  src/lib/outlets.ts and the <Media> component will use next/image instead.
*/
export function PlaceholderImage({
  label,
  hint = "Photo coming soon",
  className,
}: {
  label: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div
      data-todo="replace-with-photo"
      role="img"
      aria-label={label}
      className={cn(
        "relative grid place-items-center overflow-hidden bg-grain p-4 text-center",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(135deg, var(--halo), var(--surface) 70%)",
      }}
    >
      <div className="flex flex-col items-center gap-2 text-ink/55">
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h1.2a1 1 0 0 0 .8-.4l.9-1.2a1 1 0 0 1 .8-.4h5.6a1 1 0 0 1 .8.4l.9 1.2a1 1 0 0 0 .8.4h1.2A2.5 2.5 0 0 1 21 8.5v8A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5z" />
          <circle cx="12" cy="12.5" r="3.2" />
        </svg>
        <span className="font-display text-sm leading-snug text-ink/70">
          {label}
        </span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-ink/40">
          {hint}
        </span>
      </div>
    </div>
  );
}
