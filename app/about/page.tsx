import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  openGraph: {
    title: "About - ColorStack at Ohio State",
    description:
      "Learn about ColorStack at The Ohio State University — our mission, community, and how to get involved.",
    images: ["/images/Logo.png"],
    url: "https://colorstackosu.org/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
