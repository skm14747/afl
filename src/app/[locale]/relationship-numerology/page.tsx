import { RelationshipNumerologyCalculator } from "./Calculator";
import { EducationalSections } from "@/components/education/EducationalSections";
import { relationshipNumerologyEducation } from "./education";

export default function RelationshipNumerologyPage() {
  return (
    <RelationshipNumerologyCalculator
      educationalContent={<EducationalSections content={relationshipNumerologyEducation} />}
    />
  );
}
