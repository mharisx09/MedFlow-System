import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";

export const metadata: Metadata = {
  title: {
    template: "%s | Med Flow System",
    default: "Med Flow System | Medical Billing & Revenue Cycle Management",
  },
  description:
    "Med Flow System provides professional medical billing services and revenue cycle management for US healthcare providers — cleaner claims, faster reimbursements, and less administrative burden.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingCallButton />
      </body>
    </html>
  );
}
