import type { Metadata } from "next";
import { Onest } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
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
    <html lang="en" className={onest.variable}>
      <body className="font-sans bg-bg-white flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
