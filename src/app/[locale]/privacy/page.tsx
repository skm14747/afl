import { LegalPage } from "@/components/layout/LegalPage";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "Privacy",
  description: "AstrologyForLove calculates charts in your browser. Birth details you save stay on this device.",
  ogTitle: "Privacy — AstrologyForLove",
  ogDescription: "Charts are calculated in the browser. Saved birth details stay on this device.",
  href: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy">
      <p>
        AstrologyForLove calculates planetary positions in your browser. The birth date, time, and city you type are used for that calculation and are not sent to an account, because there is no account.
      </p>
      <p>
        If you choose “Save on this device,” the name and birth details stay in this browser’s local storage. Clearing the site data removes them. They are not a public profile.
      </p>
      <p>
        This site does not sell a mailing list, and it does not publish reviews or a street address.
      </p>
    </LegalPage>
  );
}
