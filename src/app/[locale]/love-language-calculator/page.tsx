import { LoveLanguageCalculatorWidget } from "./Calculator";
import { EducationalSections } from "@/components/education/EducationalSections";
import { loveLanguageEducation } from "./education";

export default function LoveLanguageCalculatorPage() {
  return (
    <LoveLanguageCalculatorWidget
      educationalContent={<EducationalSections content={loveLanguageEducation} />}
    />
  );
}
