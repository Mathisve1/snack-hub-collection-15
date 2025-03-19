
import { Users } from "lucide-react";

type GenderSectionProps = {
  genders: Record<string, number>;
};

export const GenderSection = ({ genders }: GenderSectionProps) => {
  // Calculate total count for percentage calculations
  const totalGenderCount = Object.values(genders).reduce((sum, count) => sum + count, 0);
  
  return (
    <div>
      <h4 className="font-medium text-gray-700 mb-1">Geslacht</h4>
      <div className="text-gray-600">
        {Object.entries(genders).map(([gender, count], i) => {
          const percentage = Math.round((count / totalGenderCount) * 100);
          return (
            <div key={gender}>
              {gender.charAt(0).toUpperCase() + gender.slice(1)}: {count} ({percentage}%)
            </div>
          );
        })}
      </div>
    </div>
  );
};
