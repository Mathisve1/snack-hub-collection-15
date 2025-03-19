
import { GroupedPersona } from "../PersonaDataUtils";

// Get most common value from a record of counts
export const getMostCommon = (record: Record<string, number>): { value: string; count: number; percentage: number } => {
  if (Object.keys(record).length === 0) {
    return { value: "Niet beschikbaar", count: 0, percentage: 0 };
  }
  
  const entries = Object.entries(record);
  const total = entries.reduce((sum, [_, count]) => sum + count, 0);
  const [value, count] = entries.reduce((max, current) => (current[1] > max[1] ? current : max));
  
  return { 
    value, 
    count, 
    percentage: Math.round((count / total) * 100) 
  };
};

// Calculate average age and count occurrences
export const getAgeInfo = (ages: (string | number)[]): { average: string; breakdown: string } => {
  if (ages.length === 0) return { average: "Niet beschikbaar", breakdown: "" };
  
  // Convert all values to strings for consistent handling
  const ageStrings = ages.map(age => String(age));
  
  // Count occurrences of each age
  const ageCounts = ageStrings.reduce((acc: Record<string, number>, age) => {
    acc[age] = (acc[age] || 0) + 1;
    return acc;
  }, {});
  
  // Calculate average if ages are numeric
  let average = "Niet beschikbaar";
  try {
    const numericAges = ages.map(age => typeof age === 'number' ? age : parseInt(String(age), 10))
                           .filter(age => !isNaN(age));
    if (numericAges.length > 0) {
      const sum = numericAges.reduce((total, age) => total + age, 0);
      average = (sum / numericAges.length).toFixed(0);
    }
  } catch (e) {
    console.error("Error calculating average age:", e);
  }
  
  // Format the breakdown string
  const breakdown = Object.entries(ageCounts)
    .map(([age, count]) => `${age} (${count}x)`)
    .join(", ");
  
  return { average, breakdown };
};

// Get percentage for boolean values
export const getPercentage = (data: { ja: number; nee: number; total: number }): string => {
  if (data.total === 0) return "Niet beschikbaar";
  const percentage = Math.round((data.ja / data.total) * 100);
  return `${percentage}% (${data.ja}/${data.total})`;
};

// Get gender distribution
export const getGenderDistribution = (genders: Record<string, number>): { vrouw: number } => {
  if (Object.keys(genders).length === 0) return { vrouw: 0 };
  
  const total = Object.values(genders).reduce((sum, count) => sum + count, 0);
  const vrouwCount = genders["vrouw"] || 0;
  const vrouwPercentage = Math.round((vrouwCount / total) * 100);
  
  return { vrouw: vrouwPercentage };
};

// Card background colors based on persona types
export const getCardColor = (cardIndex: number): string => {
  const colors = [
    "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
    "bg-gradient-to-br from-green-50 to-green-100 border-green-200",
    "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200",
    "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200",
    "bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200"
  ];
  return colors[cardIndex % colors.length];
};
