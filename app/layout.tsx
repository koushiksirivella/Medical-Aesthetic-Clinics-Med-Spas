import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Watermark } from "@/components/ui/watermark";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MedSpa Revenue Recovery Engine™ — AI Automation for Medical Aesthetic Clinics",
  description:
    "Revenue Recovery Systems for Medical Aesthetic Clinics. AI-powered automation that converts missed inbound leads into booked high-ticket patients within 60 seconds — built exclusively for med spas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
        <Watermark />
      </body>
    </html>
  );
}
