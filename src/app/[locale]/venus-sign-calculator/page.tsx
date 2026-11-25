import { VenusSignCalculator } from "./Calculator";
import { EducationalSections } from "@/components/education/EducationalSections";
import { venusSignEducation } from "./education";

export default function VenusSignCalculatorPage() {
  return (
    <VenusSignCalculator
      educationalContent={<EducationalSections content={venusSignEducation} />}
    />
  );
}
