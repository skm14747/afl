import { MarsSignCompatibilityCalculator } from "./Calculator";
import { EducationalSections } from "@/components/education/EducationalSections";
import { marsSignEducation } from "./education";

export default function MarsSignCompatibilityPage() {
  return (
    <MarsSignCompatibilityCalculator
      educationalContent={<EducationalSections content={marsSignEducation} />}
    />
  );
}
