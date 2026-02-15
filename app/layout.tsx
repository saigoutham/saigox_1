import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gouthamvaddi.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Goutham Vaddi — Product Manager & Photographer",
  description:
    "Product Manager specializing in Monetization & LiveOps for mobile gaming ($80M+ annual revenue). Wildlife photographer. Currently at Scopely.",
  keywords: [
    "Product Manager",
    "LiveOps",
    "Monetization",
    "Mobile Gaming",
    "Wildlife Photography",
    "Scopely",
    "Portfolio",
  ],
  authors: [{ name: "Venkata Sai Goutham Vaddi" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Goutham Vaddi — Product Manager & Photographer",
    description:
      "Monetization & LiveOps PM at Scopely | Wildlife Photographer | $80M+ Revenue Games",
    type: "website",
    locale: "en_US",
    url: baseUrl,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Goutham Vaddi — Product Manager & Photographer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Goutham Vaddi — Product Manager & Photographer",
    description:
      "Monetization & LiveOps PM at Scopely | Wildlife Photographer | $80M+ Revenue Games",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Venkata Sai Goutham Vaddi",
  url: baseUrl,
  jobTitle: "Product Manager — Monetization & LiveOps",
  worksFor: { "@type": "Organization", name: "Scopely" },
  sameAs: ["https://linkedin.com/in/saigouthamvaddi/"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="noise-overlay font-sans antialiased">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[200] -translate-y-20 rounded-lg bg-accent px-4 py-2 font-mono text-xs font-semibold text-bg transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
