import { SynastryChartCalculator } from "./Calculator";
import { EducationalSections } from "@/components/education/EducationalSections";
import { synastryEducation } from "./education";

export default function SynastryChartPage() {
  return (
    <SynastryChartCalculator
      educationalContent={<EducationalSections content={synastryEducation} />}
    />
  );
}
