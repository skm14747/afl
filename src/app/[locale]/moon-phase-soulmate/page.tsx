import { MoonPhaseSoulmateCalculator } from "./Calculator";
import { EducationalSections } from "@/components/education/EducationalSections";
import { moonPhaseSoulmateEducation } from "./education";

export default function MoonPhaseSoulmatePage() {
  return (
    <MoonPhaseSoulmateCalculator
      educationalContent={<EducationalSections content={moonPhaseSoulmateEducation} />}
    />
  );
}
