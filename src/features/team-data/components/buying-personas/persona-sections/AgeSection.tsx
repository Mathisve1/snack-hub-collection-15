
import { Calendar } from "lucide-react";
import { getAgeInfo } from "../utils/personaDisplayUtils";

type AgeSectionProps = {
  ages: (string | number)[];
};

export const AgeSection = ({ ages }: AgeSectionProps) => {
  const ageInfo = getAgeInfo(ages);
  
  return (
    <div className="flex items-start">
      <Calendar className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold">Leeftijd</p>
        <p className="font-medium">Gemiddeld: {ageInfo.average}</p>
        {ageInfo.breakdown && (
          <p className="text-xs text-gray-600 mt-1">{ageInfo.breakdown}</p>
        )}
      </div>
    </div>
  );
};
