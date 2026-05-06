import type { Metadata } from "next";
import "./globals.css";
import { absoluteUrl, siteConfig } from "@/app/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Big Bowl Hot Pot | Self-Served MalaTang in Calgary",
    template: "%s | Big Bowl Hot Pot"
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Big Bowl Hot Pot | Self-Served MalaTang in Calgary",
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl("/contact/dining-area-bg.png"),
        width: 1200,
        height: 630,
        alt: "Big Bowl Hot Pot dining area"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Big Bowl Hot Pot | Self-Served MalaTang in Calgary",
    description: siteConfig.description,
    images: [absoluteUrl("/contact/dining-area-bg.png")]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA">
      <body>{children}</body>
    </html>
  );
}
