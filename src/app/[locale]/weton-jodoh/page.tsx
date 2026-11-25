import { WetonJodohCalculator } from "./Calculator";
import { EducationalSections } from "@/components/education/EducationalSections";
import { wetonJodohEducation } from "./education";

export default function WetonJodohPage() {
  return (
    <WetonJodohCalculator
      educationalContent={<EducationalSections content={wetonJodohEducation} />}
    />
  );
}
