import { RisingSignCompatibilityCalculator } from "./Calculator";
import { EducationalSections } from "@/components/education/EducationalSections";
import { risingSignEducation } from "./education";

export default function RisingSignCompatibilityPage() {
  return (
    <RisingSignCompatibilityCalculator
      educationalContent={<EducationalSections content={risingSignEducation} />}
    />
  );
}
