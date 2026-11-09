import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://burgundyatelier.com"),
  title: {
    default: "Burgundy Atelier — The Fall wardrobe",
    template: "%s — Burgundy Atelier",
  },
  description:
    "Pakistani womenswear in ivory, burgundy and floral prints. Explore the Fall 2026 wardrobe; inquire directly through Instagram.",
  openGraph: {
    title: "Burgundy Atelier",
    description:
      "Pakistani womenswear in ivory, burgundy and floral prints. Explore the Fall 2026 wardrobe; inquire directly through Instagram.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-PK"
      className={`${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      {/* Extensions (Grammarly, Dark Reader, ColourZilla) inject attributes into
          <body> before hydration. Suppress only this element's attribute check. */}
      <body
        className="flex min-h-svh flex-col bg-cream text-ink"
        suppressHydrationWarning
      >
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
