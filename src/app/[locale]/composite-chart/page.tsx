import { CompositeChartCalculator } from "./Calculator";
import { EducationalSections } from "@/components/education/EducationalSections";
import { compositeChartEducation } from "./education";

export default function CompositeChartPage() {
  return (
    <CompositeChartCalculator
      educationalContent={<EducationalSections content={compositeChartEducation} />}
    />
  );
}
