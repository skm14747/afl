import { MarriageCompatibilityCalculator } from "./Calculator";
import { EducationalSections } from "@/components/education/EducationalSections";
import { marriageEducation } from "./education";

export default function MarriageCompatibilityPage() {
  return (
    <MarriageCompatibilityCalculator
      educationalContent={<EducationalSections content={marriageEducation} />}
    />
  );
}
