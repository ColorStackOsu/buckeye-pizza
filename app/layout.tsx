import type { Metadata } from "next";
import { Syne } from "next/font/google";
import { Source_Serif_4 } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollHint from "@/components/ScrollHint";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://colorstackosu.org"),
  title: "ColorStackOSU",
  description:
    "Increasing the number of Black, Latinx, and Indigenous technologists who graduate and launch rewarding technical careers.",
  icons: {
    icon: "/Logo.png",
  },
  openGraph: {
    title: "ColorStackOSU",
    description:
      "Increasing the number of Black, Latinx, and Indigenous technologists who graduate and launch rewarding technical careers.",
    images: ["/images/Logo.png"],
    url: "https://colorstackosu.org",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${sourceSerif.variable}`}>
      <body className="font-sans bg-bg-white flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
