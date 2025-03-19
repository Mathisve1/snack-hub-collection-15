
import { Calendar } from "lucide-react";

type AgeSectionProps = {
  ages: (string | number)[];
};

export const AgeSection = ({ ages }: AgeSectionProps) => {
  // Convert all values to numbers for calculations
  const numericAges = ages.map(a => typeof a === 'number' ? a : parseInt(a.toString(), 10));
  const validAges = numericAges.filter(a => !isNaN(a));
  
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
  );
};
