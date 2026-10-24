import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import Consent from "@/components/Consent";

// One variable family: the width axis carries both the condensed display
// caps (wdth 62) and the plain body text (wdth 100).
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bilalessakini.com"),
  title: "Bilal Essakini — Front-end developer",
  description:
    "Front-end developer with engineering depth. Interfaces that feel as good as they look — and hold up in production. UK-based, open to remote.",
  openGraph: {
    title: "Bilal Essakini — Front-end developer",
    description:
      "Interfaces that feel as good as they look — and hold up in production.",
    url: "https://bilalessakini.com",
    siteName: "Bilal Essakini",
    locale: "en_GB",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  verification: { google: "Dj5LjnGcQvGu4gx0nnb7CH5SW_xGbL9Ml2_GSkVf2vA" },
};

export const viewport: Viewport = {
  // the page ground; also lets env(safe-area-inset-*) report real notch insets
  themeColor: "#f1e6cf",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={archivo.variable}>
      <body>
        {children}
        <Consent />
      </body>
    </html>
  );
}
