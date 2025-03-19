
import { Repeat } from "lucide-react";
import { getMostCommonValue } from "../utils/personaDataUtils";

type FrequencySectionProps = {
  frequency: Record<string, number>;
};

export const FrequencySection = ({ frequency }: FrequencySectionProps) => {
  // Calculate total count for percentage calculations
  const totalFrequencyCount = Object.values(frequency).reduce((sum, count) => sum + count, 0);
  const mostCommonFrequency = getMostCommonValue(frequency);
  
  return (
    <div className="flex items-start">
      <Repeat className="h-5 w-5 mr-2 text-blue-500 shrink-0 mt-0.5" />
      <div>
        <h4 className="font-medium text-gray-700 mb-1">Frequentie Frituurbezoek</h4>
        <div className="text-gray-600">
          {Object.entries(frequency).map(([freq, count], i) => {
            const percentage = Math.round((count / totalFrequencyCount) * 100);
            return (
              <div key={freq} className={freq === mostCommonFrequency ? "font-bold" : ""}>
                {freq}: {count} ({percentage}%)
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
