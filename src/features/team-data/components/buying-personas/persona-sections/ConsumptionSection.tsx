
import { Heart } from "lucide-react";
import { getConsumptionInfo } from "../utils/personaDisplayUtils";

type ConsumptionSectionProps = {
  consumption: Record<string, number>;
};

export const ConsumptionSection = ({ consumption }: ConsumptionSectionProps) => {
  const consumptionInfo = getConsumptionInfo(consumption);
  
  return (
    <div className="flex items-start">
      <Heart className="h-5 w-5 mr-2 text-red-500 shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold">Consumptiesituatie</p>
        <p className="font-medium">Meest voorkomend: {consumptionInfo.mostCommon}</p>
        {consumptionInfo.breakdown && (
          <p className="text-xs text-gray-600 mt-1">{consumptionInfo.breakdown}</p>
        )}
      </div>
    </div>
  );
};
