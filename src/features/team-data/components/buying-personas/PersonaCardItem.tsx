
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
  
  // Get age range and calculate average
  const ages = personas.map(p => p.leeftijd).filter(age => age !== null && age !== undefined);
  const minAge = ages.length > 0 ? Math.min(...ages as number[]) : 'N/A';
  const maxAge = ages.length > 0 ? Math.max(...ages as number[]) : 'N/A';
  const ageRange = ages.length > 0 ? `${minAge} - ${maxAge}` : 'N/A';
  
  // Calculate average age
  const averageAge = ages.length > 0 
    ? Math.round(ages.reduce((sum, age) => sum + Number(age), 0) / ages.length) 
    : 'N/A';
  
  // Count individual ages and their occurrences
  const ageOccurrences: Record<string, number> = {};
  ages.forEach(age => {
    if (age !== null && age !== undefined) {
      const ageKey = age.toString();
      ageOccurrences[ageKey] = (ageOccurrences[ageKey] || 0) + 1;
    }
  });
  
  // Get price range
  const prices = personas.map(p => p.prijs).filter(price => price !== null && price !== undefined);
  const minPrice = prices.length > 0 ? Math.min(...prices as number[]) : 'N/A';
  const maxPrice = prices.length > 0 ? Math.max(...prices as number[]) : 'N/A';
  const priceRange = prices.length > 0 ? `€${minPrice} - €${maxPrice}` : 'N/A';
  
  // Calculate average price
  const averagePrice = prices.length > 0 
    ? Math.round(prices.reduce((sum, price) => sum + Number(price), 0) / prices.length * 100) / 100
    : 'N/A';
    
  // Count individual prices and their occurrences
  const priceOccurrences: Record<string, number> = {};
  prices.forEach(price => {
    if (price !== null && price !== undefined) {
      const priceKey = price.toString();
      priceOccurrences[priceKey] = (priceOccurrences[priceKey] || 0) + 1;
    }
  });

  // Calculate total count for percentage calculations
  const totalGenderCount = Object.values(genders).reduce((sum, count) => sum + count, 0);
  const totalFrequencyCount = Object.values(frequencyData).reduce((sum, count) => sum + count, 0);
  const totalConsumptionCount = Object.values(consumptionData).reduce((sum, count) => sum + count, 0);
  const totalMotivationCount = Object.values(motivationData).reduce((sum, count) => sum + count, 0);
  
  // Find the most common values
  const getMostCommonValue = (data: Record<string, number>) => {
    if (Object.keys(data).length === 0) return '';
    return Object.entries(data).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  };
  
  const mostCommonFrequency = getMostCommonValue(frequencyData);
  const mostCommonConsumption = getMostCommonValue(consumptionData);
  const mostCommonMotivation = getMostCommonValue(motivationData);
  
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
        
        {/* Price Section */}
        <div>
          <h4 className="font-medium text-gray-700 mb-1">Prijs</h4>
          <div className="text-gray-600">
            <div>Gemiddeld: €{typeof averagePrice === 'number' ? averagePrice.toFixed(2) : averagePrice}</div>
            <div>Bereik: {priceRange}</div>
            <div className="text-xs mt-1">
              {Object.entries(priceOccurrences).map(([price, count], i) => (
                <span key={price} className="mr-2">
                  €{price} ({count}x)
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Frequency Section */}
        <div>
          <h4 className="font-medium text-gray-700 mb-1">Frequentie Frituurbezoek</h4>
          <div className="text-gray-600">
            {Object.entries(frequencyData).map(([freq, count], i) => {
              const percentage = Math.round((count / totalFrequencyCount) * 100);
              return (
                <div key={freq} className={freq === mostCommonFrequency ? "font-bold" : ""}>
                  {freq}: {count} ({percentage}%)
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Consumption Section */}
        <div>
          <h4 className="font-medium text-gray-700 mb-1">Consumptie Situatie</h4>
          <div className="text-gray-600">
            {Object.entries(consumptionData).map(([situation, count], i) => {
              const percentage = Math.round((count / totalConsumptionCount) * 100);
              return (
                <div key={situation} className={situation === mostCommonConsumption ? "font-bold" : ""}>
                  {situation !== 'onbekend' ? situation : 'Onbekend'}: {count} ({percentage}%)
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Motivation Section */}
        <div>
          <h4 className="font-medium text-gray-700 mb-1">Motivatie voor Proteïne Snack</h4>
          <div className="text-gray-600">
            {Object.entries(motivationData).map(([motivation, count], i) => {
              const percentage = Math.round((count / totalMotivationCount) * 100);
              return (
                <div key={motivation} className={motivation === mostCommonMotivation ? "font-bold" : ""}>
                  {motivation !== 'onbekend' ? motivation : 'Onbekend'}: {count} ({percentage}%)
                </div>
              );
            })}
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
