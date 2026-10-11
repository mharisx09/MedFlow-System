import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { siteConfig } from "@/config/site";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://medflow-system-six.vercel.app").replace(
  /\/$/,
  ""
);

export const metadata: Metadata = {
  title: {
    template: "%s | Med Flow System",
    default: "Med Flow System | Medical Billing & Revenue Cycle Management",
  },
  description:
    "Med Flow System provides professional medical billing services and revenue cycle management for US healthcare providers — cleaner claims, faster reimbursements, and less administrative burden.",
  openGraph: {
    title: "Med Flow System | Medical Billing & Revenue Cycle Management",
    description:
      "Professional medical billing services and revenue cycle management for US healthcare providers — cleaner claims, faster reimbursements, less admin burden.",
    url: siteUrl,
    siteName: "Med Flow System",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Med Flow System | Medical Billing & Revenue Cycle Management",
    description:
      "Professional medical billing services and revenue cycle management for US healthcare providers.",
  },
};

/** Structured business data — helps Google show rich results (name, phone, location). */
const businessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  description:
    "Medical billing services and revenue cycle management for US healthcare providers.",
  url: siteUrl,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pittsburgh",
    addressRegion: "PA",
    addressCountry: "US",
  },
  areaServed: "United States",
  priceRange: "$$",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingCallButton />
        <SpeedInsights />
      </body>
    </html>
  );
}
