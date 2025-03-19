
import { Users } from "lucide-react";
import { getGenderDistribution, getMostCommon } from "../utils/personaDisplayUtils";

type GenderSectionProps = {
  genders: Record<string, number>;
};

export const GenderSection = ({ genders }: GenderSectionProps) => {
  const geslacht = getMostCommon(genders);
  const genderDistribution = getGenderDistribution(genders);
  
  return (
    <div className="flex items-start">
      <Users className="h-5 w-5 mr-2 text-blue-500 shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold">Geslacht</p>
        <p>
          {geslacht.value} ({geslacht.percentage}%) | Vrouw: {genderDistribution.vrouw}%
        </p>
      </div>
    </div>
  );
};
