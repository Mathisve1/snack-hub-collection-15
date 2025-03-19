
import { Target } from "lucide-react";
import { getMostCommon } from "../utils/personaDisplayUtils";

type MotivationSectionProps = {
  motivation: Record<string, number>;
};

export const MotivationSection = ({ motivation }: MotivationSectionProps) => {
  const motivatie = getMostCommon(motivation);
  
  return (
    <div className="flex items-start">
      <Target className="h-5 w-5 mr-2 text-indigo-500 shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold">Motivatie</p>
        <p>{motivatie.value}</p>
      </div>
    </div>
  );
};
