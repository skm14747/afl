import { LoveCompatibilityCalculator } from "./Calculator";
import { EducationalSections } from "@/components/education/EducationalSections";
import { loveCompatEducation } from "./education";

export default function LoveCompatibilityPage() {
  return (
    <LoveCompatibilityCalculator
      educationalContent={<EducationalSections content={loveCompatEducation} />}
    />
  );
}
