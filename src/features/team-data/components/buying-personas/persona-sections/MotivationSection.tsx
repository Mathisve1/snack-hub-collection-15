
import { Target } from "lucide-react";
import { getMotivationInfo } from "../utils/personaDisplayUtils";

type MotivationSectionProps = {
  motivation: Record<string, number>;
};

export const MotivationSection = ({ motivation }: MotivationSectionProps) => {
  const motivationInfo = getMotivationInfo(motivation);
  
  return (
    <div className="flex items-start">
      <Target className="h-5 w-5 mr-2 text-indigo-500 shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold">Motivatie</p>
        <p className="font-medium">Meest voorkomend: {motivationInfo.mostCommon}</p>
        {motivationInfo.breakdown && (
          <p className="text-xs text-gray-600 mt-1">{motivationInfo.breakdown}</p>
        )}
      </div>
    </div>
  );
};
