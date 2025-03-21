
import { Calendar } from "lucide-react";

type AgeSectionProps = {
  ages: (number)[];
};

export const AgeSection = ({ ages }: AgeSectionProps) => {
  // Convert all values to numbers for calculations
  const validAges = ages.filter(a => !isNaN(a));
  
  // Get age range
  const minAge = validAges.length > 0 ? Math.min(...validAges) : 'N/A';
  const maxAge = validAges.length > 0 ? Math.max(...validAges) : 'N/A';
  const ageRange = validAges.length > 0 ? `${minAge} - ${maxAge}` : 'N/A';
  
  // Calculate average age
  const averageAge = validAges.length > 0 
    ? Math.round(validAges.reduce((sum, age) => sum + age, 0) / validAges.length) 
    : 'N/A';
  
  // Count individual ages and their occurrences
  const ageOccurrences: Record<string, number> = {};
  validAges.forEach(age => {
    if (age !== null && age !== undefined) {
      const ageKey = age.toString();
      ageOccurrences[ageKey] = (ageOccurrences[ageKey] || 0) + 1;
    }
  });
  
  return (
    <div className="flex items-start">
      <Calendar className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
      <div>
        <h4 className="font-medium text-gray-700 mb-1">Leeftijd</h4>
        <div className="text-gray-600">
          <div>Gemiddeld: {averageAge}</div>
          <div>Bereik: {ageRange}</div>
          <div className="text-xs mt-1">
            {Object.entries(ageOccurrences).map(([age, count], i) => (
              <span key={age} className="mr-2">
                {age} ({count}x)
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
