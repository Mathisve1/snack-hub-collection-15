
import { Repeat } from "lucide-react";
import { getFrequencyInfo } from "../utils/personaDisplayUtils";

type FrequencySectionProps = {
  frequency: Record<string, number>;
};

export const FrequencySection = ({ frequency }: FrequencySectionProps) => {
  const frequencyInfo = getFrequencyInfo(frequency);
  
  return (
    <div className="flex items-start">
      <Repeat className="h-5 w-5 mr-2 text-orange-500 shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold">Frituurbezoek</p>
        <p className="font-medium">Meest voorkomend: {frequencyInfo.mostCommon}</p>
        {frequencyInfo.breakdown && (
          <p className="text-xs text-gray-600 mt-1">{frequencyInfo.breakdown}</p>
        )}
      </div>
    </div>
  );
};
