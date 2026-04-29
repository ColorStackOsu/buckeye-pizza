import { Metadata } from "next";
import ExecBoardClient from "./ExecBoardClient";

export const metadata: Metadata = {
  title: "ColorStackOSU",
  openGraph: {
    title: "Executive Board - ColorStack at Ohio State",
    description:
      "Meet the executive board members of ColorStack at The Ohio State University.",
    images: ["/images/Logo.png"],
    url: "/execboard",
  },
};

export default function ExecBoardPage() {
  return <ExecBoardClient />;
}
