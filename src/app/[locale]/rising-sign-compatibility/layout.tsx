import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Rising Sign Compatibility Calculator — First Impressions",
    description: "Compare Ascendants for first-impression and partnership dynamics. See how your rising signs shape the way you meet and relate.",
    ogTitle: "Rising Sign Compatibility — AstrologyForLove",
    ogDescription: "Compare rising signs for partnership dynamics and first impressions.",
    href: "/rising-sign-compatibility",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
