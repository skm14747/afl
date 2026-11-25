import { BirthChartCompatibilityCalculator } from "./Calculator";
import { EducationalSections } from "@/components/education/EducationalSections";
import { birthChartCompatEducation } from "./education";

export default function BirthChartCompatibilityPage() {
  return (
    <BirthChartCompatibilityCalculator
      educationalContent={<EducationalSections content={birthChartCompatEducation} />}
    />
  );
}
