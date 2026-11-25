import { RelationshipPatternAnalyzerCalculator } from "./Calculator";
import { EducationalSections } from "@/components/education/EducationalSections";
import { relationshipPatternEducation } from "./education";

export default function RelationshipPatternAnalyzerPage() {
  return (
    <RelationshipPatternAnalyzerCalculator
      educationalContent={<EducationalSections content={relationshipPatternEducation} />}
    />
  );
}
