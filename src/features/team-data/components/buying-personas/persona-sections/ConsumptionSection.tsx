
import { Heart } from "lucide-react";
import { getMostCommon } from "../utils/personaDisplayUtils";

type ConsumptionSectionProps = {
  consumption: Record<string, number>;
};

export const ConsumptionSection = ({ consumption }: ConsumptionSectionProps) => {
  const consumptie = getMostCommon(consumption);
  
  return (
    <div className="flex items-start">
      <Heart className="h-5 w-5 mr-2 text-red-500 shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold">Consumptiesituatie</p>
        <p>{consumptie.value}</p>
      </div>
    </div>
  );
};
