import { cn } from "@/lib/cn";

const STAR =
  "M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.95 5.06 16.81l.94-5.5-4-3.9 5.53-.8z";

function StarRow({ size, color }: { size: number; color: string }) {
  return (
    <span className="flex" style={{ color }} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d={STAR} />
        </svg>
      ))}
    </span>
  );
}

export function StarRating({
  rating,
  size = 16,
  className,
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  return (
    <span
      className={cn("relative inline-flex", className)}
      role="img"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      <StarRow size={size} color="var(--line)" />
      <span
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pct}%` }}
      >
        <StarRow size={size} color="#f5a623" />
      </span>
    </span>
  );
}
