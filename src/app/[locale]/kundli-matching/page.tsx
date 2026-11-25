import { KundliMatchingCalculator } from "./Calculator";
import { EducationalSections } from "@/components/education/EducationalSections";
import { kundliMatchingEducation } from "./education";

export default function KundliMatchingPage() {
  return (
    <KundliMatchingCalculator
      educationalContent={<EducationalSections content={kundliMatchingEducation} />}
    />
  );
}
