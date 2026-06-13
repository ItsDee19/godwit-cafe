import Image from "next/image";
import type { Photo } from "@/lib/outlets";
import { cn } from "@/lib/cn";
import { PlaceholderImage } from "./PlaceholderImage";

/*
  Smart image: renders next/image when a real src is set, otherwise a
  themed placeholder. Always lives inside a positioned/aspect parent.
*/
export function Media({
  photo,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  className,
}: {
  photo: Photo;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  if (photo.src) {
    return (
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }
  return (
    <PlaceholderImage
      label={photo.alt}
      className={cn("absolute inset-0", className)}
    />
  );
}

/** Convenience aspect-ratio frame around <Media>. */
export function MediaFrame({
  photo,
  ratio = "4 / 3",
  rounded = "rounded-2xl",
  sizes,
  priority,
  className,
}: {
  photo: Photo;
  ratio?: string;
  rounded?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("relative overflow-hidden bg-surface", rounded, className)}
      style={{ aspectRatio: ratio }}
    >
      <Media photo={photo} sizes={sizes} priority={priority} />
    </div>
  );
}
