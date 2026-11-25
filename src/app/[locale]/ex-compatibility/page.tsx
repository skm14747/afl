import { ExCompatibilityCalculator } from "./Calculator";
import { EducationalSections } from "@/components/education/EducationalSections";
import { exCompatEducation } from "./education";

export default function ExCompatibilityPage() {
  return (
    <ExCompatibilityCalculator
      educationalContent={<EducationalSections content={exCompatEducation} />}
    />
  );
}
