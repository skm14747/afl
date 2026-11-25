import { SoulmateCalculatorWidget } from "./Calculator";
import { EducationalSections } from "@/components/education/EducationalSections";
import { soulmateEducation } from "./education";

export default function SoulmateCalculatorPage() {
  return (
    <SoulmateCalculatorWidget
      educationalContent={<EducationalSections content={soulmateEducation} />}
    />
  );
}
