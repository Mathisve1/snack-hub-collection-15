
import { Users } from "lucide-react";
import { GenderChart } from "./GenderChart";

type GenderSectionProps = {
  genders: Record<string, number>;
};

export const GenderSection = ({ genders }: GenderSectionProps) => {
  // Calculate total count for percentage calculations
  const totalGenderCount = Object.values(genders).reduce((sum, count) => sum + count, 0);
  
  // Function to get gender-specific color
  const getGenderColor = (gender: string) => {
    const lowerGender = gender.toLowerCase();
    if (lowerGender === "vrouw" || lowerGender === "vrouwen") return "text-pink-500"; // Pink for women
    if (lowerGender === "man" || lowerGender === "mannen") return "text-blue-500"; // Blue for men
    return "text-purple-500"; // Default purple for other genders
  };
  
  return (
    <div>
      <GenderChart genders={genders} />
      <div className="text-gray-600 text-xs mt-2">
        {Object.entries(genders).map(([gender, count], i) => {
          const percentage = Math.round((count / totalGenderCount) * 100);
          const colorClass = getGenderColor(gender);
          return (
            <div key={gender} className="flex justify-between">
              <span className={colorClass}>{gender.charAt(0).toUpperCase() + gender.slice(1)}</span>
              <span>{count} ({percentage}%)</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
