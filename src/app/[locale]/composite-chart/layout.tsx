import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Composite Chart Calculator — Relationship Midpoint Chart | AstrologyForLove",
  description: "Calculate a composite chart from two birth charts. See the midpoint relationship chart and, when birth times and cities are known, the Davison chart.",
  openGraph: {
    title: "Composite Chart Calculator — AstrologyForLove",
    description: "A tropical composite chart of a relationship, calculated in the browser.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
