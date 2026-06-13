import { cn } from "@/lib/cn";

/*
  Pure-veg mark — the conventional green-square symbol. Kept green
  across all themes (it's a food-safety convention, not a brand accent).
*/
export function PureVegBadge({
  className,
  label = "100% Pure Veg",
  showLabel = true,
}: {
  className?: string;
  label?: string;
  showLabel?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em]",
        className,
      )}
    >
      <span
        aria-hidden
        className="grid h-4 w-4 place-items-center rounded-[3px] border-2 border-[#3f7d20]"
      >
        <span className="h-2 w-2 rounded-full bg-[#3f7d20]" />
      </span>
      {showLabel && <span>{label}</span>}
    </span>
  );
}
