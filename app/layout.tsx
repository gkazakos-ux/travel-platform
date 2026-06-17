import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Travel Itinerary Platform",
  description: "Discover, save, and copy real travel itineraries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
