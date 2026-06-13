import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  overline?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  overline,
  title,
  intro,
  align = "left",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {overline && (
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          {overline}
        </span>
      )}
      <Tag
        className={cn(
          "font-display tracking-tight text-balance",
          Tag === "h1"
            ? "text-4xl leading-[1.05] sm:text-6xl lg:text-7xl"
            : "text-3xl leading-[1.1] sm:text-4xl lg:text-5xl",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg text-pretty",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
