
import { Heart } from "lucide-react";
import { getMostCommonValue } from "../utils/personaDataUtils";

type ConsumptionSectionProps = {
  consumption: Record<string, number>;
};

export const ConsumptionSection = ({ consumption }: ConsumptionSectionProps) => {
  // Calculate total count for percentage calculations
  const totalConsumptionCount = Object.values(consumption).reduce((sum, count) => sum + count, 0);
  const mostCommonConsumption = getMostCommonValue(consumption);
  
  return (
    <div>
      <h4 className="font-medium text-gray-700 mb-1">Consumptie Situatie</h4>
      <div className="text-gray-600">
        {Object.entries(consumption).map(([situation, count], i) => {
          const percentage = Math.round((count / totalConsumptionCount) * 100);
          return (
            <div key={situation} className={situation === mostCommonConsumption ? "font-bold" : ""}>
              {situation !== 'onbekend' ? situation : 'Onbekend'}: {count} ({percentage}%)
            </div>
          );
        })}
      </div>
    </div>
  );
};
