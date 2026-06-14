import Image from "next/image";
import { StarRating } from "./StarRating";
import type { Review } from "@/lib/places";

export function ReviewCard({ review }: { review: Review }) {
  const initial = review.author?.trim()?.[0]?.toUpperCase() ?? "G";
  return (
    <article className="flex w-[300px] shrink-0 snap-start flex-col gap-3 rounded-3xl border border-line bg-surface p-6 shadow-soft">
      <div className="flex items-center gap-3">
        {review.avatar ? (
          <Image
            src={review.avatar}
            alt={review.author}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
            unoptimized
          />
        ) : (
          <span className="grid h-10 w-10 place-items-center rounded-full bg-accent/15 font-display text-lg text-accent">
            {initial}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate font-medium text-ink">{review.author}</p>
          <p className="text-xs text-ink-soft">{review.relativeTime}</p>
        </div>
      </div>

      <StarRating rating={review.rating} size={15} />

      <p className="line-clamp-6 text-sm leading-relaxed text-ink-soft text-pretty">
        {review.text}
      </p>

      <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-xs text-ink-soft">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
          <path
            fill="#4285F4"
            d="M22.5 12.2c0-.7-.06-1.4-.18-2.06H12v3.9h5.9a5.04 5.04 0 0 1-2.19 3.3v2.74h3.54c2.07-1.91 3.25-4.72 3.25-8.04z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.94 0 5.41-.97 7.21-2.64l-3.54-2.74c-.98.66-2.23 1.05-3.67 1.05-2.82 0-5.21-1.9-6.06-4.46H2.28v2.8A10.9 10.9 0 0 0 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.94 14.21a6.57 6.57 0 0 1 0-4.2v-2.8H2.28a10.9 10.9 0 0 0 0 9.8z"
          />
          <path
            fill="#EA4335"
            d="M12 5.55c1.6 0 3.03.55 4.16 1.62l3.12-3.12A10.9 10.9 0 0 0 12 1a10.9 10.9 0 0 0-9.72 5.99l3.66 2.8C6.79 7.45 9.18 5.55 12 5.55z"
          />
        </svg>
        via Google
      </span>
    </article>
  );
}
