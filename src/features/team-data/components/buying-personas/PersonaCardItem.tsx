
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCardColor } from "./utils/personaDisplayUtils";
import { BuyingPersona } from "../../types";

type PersonaCardItemProps = {
  personaType: string;
  personaCount: number;
  personas: BuyingPersona[];
  index: number;
};

export const PersonaCardItem = ({ personaType, personaCount, personas, index }: PersonaCardItemProps) => {
  console.log("Rendering PersonaCardItem:", personaType, personaCount, personas);
  
  // Helper function to count occurrences
  const countOccurrences = (arr: any[], key: string) => {
    const counts: Record<string, number> = {};
    arr.forEach(item => {
      const value = item[key]?.toString().toLowerCase() || 'onbekend';
      counts[value] = (counts[value] || 0) + 1;
    });
    return counts;
  };
  
  // Helper to calculate openness percentage
  const calculateOpenness = () => {
    const openCount = personas.filter(p => p.openheid_nieuwe_snack === true).length;
    const percentage = Math.round((openCount / personas.length) * 100);
    return { open: openCount, total: personas.length, percentage };
  };
  
  // Process demographic data
  const genders = countOccurrences(personas, 'geslacht');
  const frequencyData = countOccurrences(personas, 'frequentie_frituurbezoek');
  const consumptionData = countOccurrences(personas, 'consumptie_situatie');
  const motivationData = countOccurrences(personas, 'motivatie_kiezen_proteine_snack');
  const openness = calculateOpenness();
  
  // Get age range
  const ages = personas.map(p => p.leeftijd).filter(age => age !== null && age !== undefined);
  const minAge = ages.length > 0 ? Math.min(...ages as number[]) : 'N/A';
  const maxAge = ages.length > 0 ? Math.max(...ages as number[]) : 'N/A';
  const ageRange = ages.length > 0 ? `${minAge} - ${maxAge}` : 'N/A';
  
  // Get price range
  const prices = personas.map(p => p.prijs).filter(price => price !== null && price !== undefined);
  const minPrice = prices.length > 0 ? Math.min(...prices as number[]) : 'N/A';
  const maxPrice = prices.length > 0 ? Math.max(...prices as number[]) : 'N/A';
  const priceRange = prices.length > 0 ? `€${minPrice} - €${maxPrice}` : 'N/A';

  // Calculate total count for percentage calculations
  const totalGenderCount = Object.values(genders).reduce((sum, count) => sum + count, 0);
  
  return (
    <Card 
      className={`overflow-hidden border shadow-md hover:shadow-lg transition-shadow ${getCardColor(index)}`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-gray-800">
          {personaType}
        </CardTitle>
        <CardDescription>
          {personaCount > 1 ? `Geaggregeerd van ${personaCount} profielen` : "1 profiel"}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4 text-sm">
        {/* Gender Section */}
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
        
        {/* Age Section */}
        <div>
          <h4 className="font-medium text-gray-700 mb-1">Leeftijd</h4>
          <div className="text-gray-600">{ageRange}</div>
        </div>
        
        {/* Price Section */}
        <div>
          <h4 className="font-medium text-gray-700 mb-1">Prijs</h4>
          <div className="text-gray-600">{priceRange}</div>
        </div>
        
        {/* Frequency Section */}
        <div>
          <h4 className="font-medium text-gray-700 mb-1">Frequentie Frituurbezoek</h4>
          <div className="text-gray-600">
            {Object.entries(frequencyData).map(([freq, count], i) => (
              <div key={freq}>{freq}: {count}</div>
            ))}
          </div>
        </div>
        
        {/* Consumption Section */}
        <div>
          <h4 className="font-medium text-gray-700 mb-1">Consumptie Situatie</h4>
          <div className="text-gray-600">
            {Object.entries(consumptionData).map(([situation, count], i) => (
              <div key={situation}>{situation}: {count}</div>
            ))}
          </div>
        </div>
        
        {/* Motivation Section */}
        <div>
          <h4 className="font-medium text-gray-700 mb-1">Motivatie voor Proteïne Snack</h4>
          <div className="text-gray-600">
            {Object.entries(motivationData).map(([motivation, count], i) => (
              <div key={motivation}>{motivation !== 'onbekend' ? motivation : 'Onbekend'}: {count}</div>
            ))}
          </div>
        </div>
        
        {/* Openness Section */}
        <div>
          <h4 className="font-medium text-gray-700 mb-1">Open voor Nieuwe Snack</h4>
          <div className="text-gray-600">
            {openness.percentage}% is open voor nieuwe snacks
            ({openness.open} van {openness.total})
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
