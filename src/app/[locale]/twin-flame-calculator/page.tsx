import { TwinFlameCalculatorWidget } from "./Calculator";
import { EducationalSections } from "@/components/education/EducationalSections";
import { twinFlameEducation } from "./education";

export default function TwinFlameCalculatorPage() {
  return (
    <TwinFlameCalculatorWidget
      educationalContent={<EducationalSections content={twinFlameEducation} />}
    />
  );
}
