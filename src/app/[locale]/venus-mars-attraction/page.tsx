import { VenusMarsAttractionCalculator } from "./Calculator";
import { EducationalSections } from "@/components/education/EducationalSections";
import { venusMarsEducation } from "./education";

export default function VenusMarsAttractionPage() {
  return (
    <VenusMarsAttractionCalculator
      educationalContent={<EducationalSections content={venusMarsEducation} />}
    />
  );
}
