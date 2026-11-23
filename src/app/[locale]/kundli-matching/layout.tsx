import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kundli Matching — 36 Guna, Mangal Dosha, Porutham | AstrologyForLove",
  description: "Vedic kundli matching with Ashtakoota points, Mangal dosha, and the ten Tamil poruthams. Lahiri sidereal. Calculated in the browser.",
  openGraph: {
    title: "Kundli Matching — AstrologyForLove",
    description: "36 guna, Mangal dosha, and porutham from sidereal Moon and Mars.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
