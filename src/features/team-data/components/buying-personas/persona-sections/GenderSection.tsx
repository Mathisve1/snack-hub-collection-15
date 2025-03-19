
import { Users } from "lucide-react";
import { GenderChart } from "./GenderChart";

type GenderSectionProps = {
  genders: Record<string, number>;
};

export const GenderSection = ({ genders }: GenderSectionProps) => {
  // Calculate total count for percentage calculations
  const totalGenderCount = Object.values(genders).reduce((sum, count) => sum + count, 0);
  
  return (
    <div>
      <GenderChart genders={genders} />
      <div className="text-gray-600 text-xs mt-2">
        {Object.entries(genders).map(([gender, count], i) => {
          const percentage = Math.round((count / totalGenderCount) * 100);
          return (
            <div key={gender} className="flex justify-between">
              <span>{gender.charAt(0).toUpperCase() + gender.slice(1)}</span>
              <span>{count} ({percentage}%)</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
