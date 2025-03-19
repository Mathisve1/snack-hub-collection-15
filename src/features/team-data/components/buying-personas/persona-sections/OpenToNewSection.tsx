
import { getPercentage } from "../utils/personaDisplayUtils";

type OpenToNewSectionProps = {
  openheid: { ja: number; nee: number; total: number };
};

export const OpenToNewSection = ({ openheid }: OpenToNewSectionProps) => {
  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <p className="font-semibold mb-1">Open voor nieuwe snacks</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ 
            width: `${openheid.total > 0 
              ? (openheid.ja / openheid.total) * 100 
              : 0}%` 
          }}
        ></div>
      </div>
      <p className="text-xs mt-1 text-gray-600">
        {getPercentage(openheid)}
      </p>
    </div>
  );
};
