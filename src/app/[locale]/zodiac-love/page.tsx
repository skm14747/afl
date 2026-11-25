import { ZodiacLoveCalculator } from "./Calculator";
import { EducationalSections } from "@/components/education/EducationalSections";
import { zodiacLoveEducation } from "./education";

export default function ZodiacLovePage() {
  return (
    <ZodiacLoveCalculator
      educationalContent={<EducationalSections content={zodiacLoveEducation} />}
    />
  );
}
