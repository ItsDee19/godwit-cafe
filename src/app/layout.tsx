import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/nav/Footer";
import { ThemeController } from "@/components/ui/ThemeController";

// Runs before paint so outlet routes theme without a flash. Client-side
// navigations are then kept in sync by <ThemeController>.
const themeScript = `(function(){try{var s=location.pathname.split('/')[1];if(s==='indore'||s==='raipur'||s==='nagpur'){document.documentElement.setAttribute('data-theme',s);}}catch(e){}})();`;

// Display serif — editorial, "wandering" feel (headings)
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
});

// Clean grotesque (body)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// TODO: confirm production domain
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://godwit.cafe";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Godwit Cafe — Food for the Modern Nomad",
    template: "%s · Godwit Cafe",
  },
  description:
    "Pure-veg global comfort food with a desi twist. Born in Indore, now wandering to Raipur and Nagpur. One restless bird, endless flavours.",
  keywords: [
    "Godwit Cafe",
    "pure veg cafe",
    "Indore cafe",
    "Raipur cafe",
    "Nagpur cafe",
    "vegetarian fusion",
  ],
  openGraph: {
    type: "website",
    siteName: "Godwit Cafe",
    title: "Godwit Cafe — Food for the Modern Nomad",
    description:
      "Pure-veg global comfort food with a desi twist. Born in Indore, wandering everywhere.",
    // TODO: add /public/og/home.jpg
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-surface"
        >
          Skip to content
        </a>
        <ThemeController />
        <SmoothScroll>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
