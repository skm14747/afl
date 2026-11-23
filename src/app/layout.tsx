import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AstrologyForLove — Written in the Stars. Felt in the Heart.",
  description:
    "Premium love astrology, zodiac compatibility, soulmate discovery, and relationship insights.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
