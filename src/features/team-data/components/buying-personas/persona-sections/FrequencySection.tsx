
import { Repeat } from "lucide-react";
import { getMostCommon } from "../utils/personaDisplayUtils";

type FrequencySectionProps = {
  frequency: Record<string, number>;
};

export const FrequencySection = ({ frequency }: FrequencySectionProps) => {
  const frequentie = getMostCommon(frequency);
  
  return (
    <div className="flex items-start">
      <Repeat className="h-5 w-5 mr-2 text-orange-500 shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold">Frituurbezoek</p>
        <p>{frequentie.value}</p>
      </div>
    </div>
  );
};
