"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BirdMark } from "@/components/ui/BirdMark";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { outletList } from "@/lib/outlets";
import { easeGodwit } from "@/lib/motion";

const links = [
  { label: "Story", href: "/#story" },
  { label: "Menu", href: "/menu" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500",
        scrolled || open
          ? "border-b border-line/70 bg-paper/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-ink"
          aria-label="Godwit Cafe — home"
        >
          <BirdMark className="h-5 w-8 text-accent" decorative />
          <span className="font-display text-xl font-semibold tracking-tight">
            Godwit
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink key={l.href} href={l.href} active={pathname === l.href}>
              {l.label}
            </NavLink>
          ))}

          {/* Locations dropdown */}
          <div className="group relative">
            <button
              className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm text-ink/80 transition-colors hover:text-ink"
              aria-haspopup="true"
            >
              Locations
              <svg
                viewBox="0 0 12 12"
                className="h-3 w-3 transition-transform group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                aria-hidden
              >
                <path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" />
              </svg>
            </button>
            <div className="invisible absolute right-0 top-full w-56 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="overflow-hidden rounded-2xl border border-line bg-surface p-1.5 shadow-lift">
                {outletList.map((o) => (
                  <Link
                    key={o.id}
                    href={`/${o.id}`}
                    className="flex flex-col rounded-xl px-3 py-2 transition-colors hover:bg-ink/5"
                  >
                    <span className="font-display text-base">{o.city}</span>
                    <span className="text-xs text-ink-soft">
                      {o.positioning}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <Button href="/#locations" size="sm">
            Find your Godwit
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="relative z-50 -mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className="flex flex-col gap-1.5">
            <span
              className={cn(
                "block h-0.5 w-5 bg-ink transition-transform duration-300",
                open && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 bg-ink transition-opacity duration-300",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 bg-ink transition-transform duration-300",
                open && "-translate-y-2 -rotate-45",
              )}
            />
          </span>
        </button>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: easeGodwit }}
            className="overflow-hidden border-t border-line bg-paper/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-xl px-3 py-2.5 text-lg text-ink"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 border-t border-line pt-3">
                <span className="px-3 text-xs uppercase tracking-[0.2em] text-ink-soft">
                  Locations
                </span>
                {outletList.map((o) => (
                  <Link
                    key={o.id}
                    href={`/${o.id}`}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-ink"
                  >
                    <span className="font-display text-lg">{o.city}</span>
                    <span className="text-xs text-ink-soft">
                      {o.positioning}
                    </span>
                  </Link>
                ))}
              </div>
              <Button href="/#locations" className="mt-3 w-full">
                Find your Godwit
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-3.5 py-2 text-sm transition-colors hover:text-ink",
        active ? "text-ink" : "text-ink/80",
      )}
    >
      {children}
    </Link>
  );
}
