"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { outletIds } from "@/lib/themes";

/*
  Syncs <html data-theme="..."> with the current route on client-side
  navigations. Initial load is handled by a blocking inline script in
  layout.tsx (no theme flash). On /, /menu, etc. the attribute is
  removed → base brand theme.
*/
export function ThemeController() {
  const pathname = usePathname();

  useEffect(() => {
    const seg = (pathname ?? "/").split("/")[1];
    const root = document.documentElement;
    if ((outletIds as string[]).includes(seg)) {
      root.dataset.theme = seg;
    } else {
      delete root.dataset.theme;
    }
  }, [pathname]);

  return null;
}
