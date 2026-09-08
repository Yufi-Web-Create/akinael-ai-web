import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Header, Footer } from "@/components/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "アキナエルAI｜商いの願いを叶えるAI", template: "%s｜アキナエルAI" },
  description: siteConfig.description,
  robots: { index: process.env.SITE_INDEXABLE === "true", follow: process.env.SITE_INDEXABLE === "true" },
  openGraph: { type: "website", locale: "ja_JP", siteName: siteConfig.name, title: "アキナエルAI｜商いの願いを叶えるAI", description: siteConfig.description },
  twitter: { card: "summary", title: "アキナエルAI", description: siteConfig.description },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body><Header />{children}<Footer /></body></html>;
}
