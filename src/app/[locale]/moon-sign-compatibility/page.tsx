import { MoonSignCompatibilityCalculator } from "./Calculator";
import { EducationalSections } from "@/components/education/EducationalSections";
import { moonSignEducation } from "./education";

export default function MoonSignCompatibilityPage() {
  return (
    <MoonSignCompatibilityCalculator
      educationalContent={<EducationalSections content={moonSignEducation} />}
    />
  );
}
