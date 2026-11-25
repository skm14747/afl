import { RelationshipForecastCalculator } from "./Calculator";
import { EducationalSections } from "@/components/education/EducationalSections";
import { relationshipForecastEducation } from "./education";

export default function RelationshipForecastPage() {
  return (
    <RelationshipForecastCalculator
      educationalContent={<EducationalSections content={relationshipForecastEducation} />}
    />
  );
}
