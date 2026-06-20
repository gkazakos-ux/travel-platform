import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";

/* ── Syne: bold geometric display — headings, numbers, brand ── */
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/* ── Inter: clean humanist sans — body, UI, labels ── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NomadFlow — Your Cinematic Travel Story",
  description:
    "Discover, save, and copy real travel itineraries from explorers worldwide. Plan your next adventure in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="antialiased font-sans bg-white">{children}</body>
    </html>
  );
}
