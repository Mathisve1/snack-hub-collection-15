
import { Target } from "lucide-react";
import { getMostCommonValue } from "../utils/personaDataUtils";

type MotivationSectionProps = {
  motivation: Record<string, number>;
};

export const MotivationSection = ({ motivation }: MotivationSectionProps) => {
  // Calculate total count for percentage calculations
  const totalMotivationCount = Object.values(motivation).reduce((sum, count) => sum + count, 0);
  const mostCommonMotivation = getMostCommonValue(motivation);
  
  return (
    <div>
      <h4 className="font-medium text-gray-700 mb-1">Motivatie voor Proteïne Snack</h4>
      <div className="text-gray-600">
        {Object.entries(motivation).map(([motivation, count], i) => {
          const percentage = Math.round((count / totalMotivationCount) * 100);
          return (
            <div key={motivation} className={motivation === mostCommonMotivation ? "font-bold" : ""}>
              {motivation !== 'onbekend' ? motivation : 'Onbekend'}: {count} ({percentage}%)
            </div>
          );
        })}
      </div>
    </div>
  );
};
