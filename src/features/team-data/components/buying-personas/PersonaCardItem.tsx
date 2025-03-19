
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCardColor } from "./utils/personaDisplayUtils";
import { BuyingPersona } from "../../types";
import { GenderSection } from "./persona-sections/GenderSection";
import { AgeSection } from "./persona-sections/AgeSection";
import { PriceSection } from "./persona-sections/PriceSection";
import { FrequencySection } from "./persona-sections/FrequencySection";
import { ConsumptionSection } from "./persona-sections/ConsumptionSection";
import { MotivationSection } from "./persona-sections/MotivationSection";
import { OpenToNewSection } from "./persona-sections/OpenToNewSection";
import { countOccurrences, calculateOpenness } from "./utils/personaDataUtils";

type PersonaCardItemProps = {
  personaType: string;
  personaCount: number;
  personas: BuyingPersona[];
  index: number;
};

export const PersonaCardItem = ({ personaType, personaCount, personas, index }: PersonaCardItemProps) => {
  console.log("Rendering PersonaCardItem:", personaType, personaCount, personas);
  
  // Process demographic data
  const genders = countOccurrences(personas, 'geslacht');
  const frequencyData = countOccurrences(personas, 'frequentie_frituurbezoek');
  const consumptionData = countOccurrences(personas, 'consumptie_situatie');
  const motivationData = countOccurrences(personas, 'motivatie_kiezen_proteine_snack');
  const openness = calculateOpenness(personas);
  
  // Get age range data
  const ages = personas.map(p => p.leeftijd).filter(age => age !== null && age !== undefined);
  
  // Get price data
  const prices = personas.map(p => p.prijs).filter(price => price !== null && price !== undefined);
  
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
        <GenderSection genders={genders} />
        
        {/* Age Section */}
        <AgeSection ages={ages} />
        
        {/* Price Section */}
        <PriceSection prices={prices} />
        
        {/* Frequency Section */}
        <FrequencySection frequency={frequencyData} />
        
        {/* Consumption Section */}
        <ConsumptionSection consumption={consumptionData} />
        
        {/* Motivation Section */}
        <MotivationSection motivation={motivationData} />
        
        {/* Openness Section with Progress Bar */}
        <OpenToNewSection openheid={{ 
          ja: openness.open, 
          nee: openness.total - openness.open, 
          total: openness.total 
        }} />
      </CardContent>
    </Card>
  );
};
