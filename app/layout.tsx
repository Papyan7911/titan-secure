import type { Metadata } from "next";
import { ScrollEffects } from "@/components/scroll-effects";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://titansecure.com"),
  title: {
    default: "Titan Alarm & Electronics | Smarter Security. Total Peace of Mind.",
    template: "%s | Titan Alarm & Electronics",
  },
  description:
    "Professional CCTV, alarm, access control and security system installation for homes and businesses. Get a free, no-obligation security assessment.",
  openGraph: {
    title: "Titan Alarm & Electronics | Smarter Security. Total Peace of Mind.",
    description: "Security designed around you. Expert installation, ongoing support, and peace of mind.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <div className="announcement">
          <span className="announcement-dot" /> Your safety comes first. <a href="/quote">Book a free security assessment <span aria-hidden="true">↗</span></a>
        </div>
        <SiteHeader />
        <ScrollEffects />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
