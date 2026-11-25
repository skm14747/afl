import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AstrologyForLove — Zodiac Compatibility Calculators",
    short_name: "AstrologyForLove",
    description:
      "Free zodiac compatibility calculators for love, soulmates, and marriage. Real planetary positions calculated in your browser.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d0712",
    theme_color: "#b52d52",
    icons: [
      { src: "/icon-192", sizes: "192x192", type: "image/png" },
      { src: "/icon-512", sizes: "512x512", type: "image/png" },
    ],
  };
}
