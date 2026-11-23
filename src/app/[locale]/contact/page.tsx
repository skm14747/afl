import { LegalPage } from "@/components/layout/LegalPage";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Contact",
  description: "AstrologyForLove does not take chart orders by mail. Questions about a result are answered on the calculator page.",
  ogTitle: "Contact — AstrologyForLove",
  ogDescription: "There is no mailing address and no chart-order desk.",
  href: "/contact",
});

export default function ContactPage() {
  return (
    <LegalPage title="Contact">
      <p>
        There is no mailing address and no desk that reads charts for you. Each calculator explains its own result on the page.
      </p>
      <p>
        Birth details stay in your browser, as described on the privacy page. Nothing you type creates a support ticket.
      </p>
    </LegalPage>
  );
}
