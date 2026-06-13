import Link from "next/link";
import { BirdMark } from "@/components/ui/BirdMark";
import { PureVegBadge } from "@/components/ui/PureVegBadge";
import { Container } from "@/components/ui/Container";
import { outletList } from "@/lib/outlets";

export function Footer() {
  const year = new Date().getFullYear();
  const instagram = outletList[0].instagram;

  return (
    <footer className="relative mt-auto border-t border-line bg-surface">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5 text-ink">
              <BirdMark className="h-6 w-9 text-accent" decorative />
              <span className="font-display text-2xl font-semibold tracking-tight">
                Godwit
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft text-pretty">
              Global flavours, pure veg. One restless bird, wandering from
              Indore to Raipur to Nagpur — food for the modern nomad.
            </p>
            <PureVegBadge />
            <div className="flex items-center gap-3 pt-1">
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Godwit Cafe on Instagram"
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-ink hover:text-surface"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.97.24 2.67.51.72.28 1.33.65 1.94 1.26.61.61.98 1.22 1.26 1.94.27.7.46 1.5.51 2.67.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.17-.24 1.97-.51 2.67a5.4 5.4 0 0 1-1.26 1.94 5.4 5.4 0 0 1-1.94 1.26c-.7.27-1.5.46-2.67.51-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.17-.05-1.97-.24-2.67-.51a5.4 5.4 0 0 1-1.94-1.26 5.4 5.4 0 0 1-1.26-1.94c-.27-.7-.46-1.5-.51-2.67C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.17.24-1.97.51-2.67.28-.72.65-1.33 1.26-1.94A5.4 5.4 0 0 1 5.98 1.23c.7-.27 1.5-.46 2.67-.51C9.95 2.2 10.35 2.2 12 2.2Zm0 1.98c-3.14 0-3.51.01-4.75.07-.9.04-1.39.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.81-.32 1.71-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.04.9.19 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.81.28 1.71.32 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c.9-.04 1.39-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.81.32-1.71.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.04-.9-.19-1.39-.32-1.71a2.86 2.86 0 0 0-.69-1.06 2.86 2.86 0 0 0-1.06-.69c-.32-.13-.81-.28-1.71-.32-1.24-.06-1.61-.07-4.75-.07Zm0 3.37a4.45 4.45 0 1 1 0 8.9 4.45 4.45 0 0 1 0-8.9Zm0 7.34a2.89 2.89 0 1 0 0-5.78 2.89 2.89 0 0 0 0 5.78Zm5.66-7.56a1.04 1.04 0 1 1-2.08 0 1.04 1.04 0 0 1 2.08 0Z" />
                </svg>
              </a>
              <span className="text-sm text-ink-soft">@godwitcafe</span>
            </div>
          </div>

          {/* Outlets */}
          <div className="grid gap-8 sm:grid-cols-3">
            {outletList.map((o) => (
              <div key={o.id} className="flex flex-col gap-2">
                <Link
                  href={`/${o.id}`}
                  className="font-display text-lg text-ink hover:text-accent"
                >
                  {o.city}
                </Link>
                <span className="text-xs uppercase tracking-[0.16em] text-accent">
                  {o.positioning}
                </span>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {o.area}
                </p>
                <p className="text-sm text-ink-soft">{o.hours}</p>
                {o.phone && (
                  <a
                    href={`tel:${o.phone.replace(/\s+/g, "")}`}
                    className="text-sm text-ink-soft hover:text-ink"
                  >
                    {o.phone}
                  </a>
                )}
                <Link
                  href={`/${o.id}`}
                  className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-ink hover:gap-2"
                >
                  View outlet
                  <span aria-hidden>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-sm text-ink-soft sm:flex-row sm:items-center">
          <p>© {year} Godwit Cafe. All rights reserved.</p>
          <p>
            Made by{" "}
            <span className="font-medium text-ink">AvlysAI</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
