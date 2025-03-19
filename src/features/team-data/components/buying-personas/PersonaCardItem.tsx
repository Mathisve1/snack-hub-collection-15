import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Repeat, ShoppingBag, Heart, Target } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type PersonaCardItemProps = {
  persona: GroupedPersona;
  index: number;
};

export type GroupedPersona = {
  name: string;
  count: number;
  leeftijd: string[];
  geslacht: Record<string, number>;
  prijs: Record<string, number>;
  frequentie_frituurbezoek: Record<string, number>;
  consumptie_situatie: Record<string, number>;
  motivatie_kiezen_proteine_snack: Record<string, number>;
  marketing: Record<string, number>;
  openheid_nieuwe_snack: { ja: number; nee: number; total: number };
};

type CommonValueResult = { 
  value: string; 
  count: number; 
  percentage: number 
};

export const PersonaCardItem = ({ persona, index }: PersonaCardItemProps) => {
  // Get most common value from a record of counts
  const getMostCommon = (record: Record<string, number>): CommonValueResult => {
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

  // Calculate average age from age ranges or get description
  const getAgeInfo = (ages: string[]): string => {
    if (ages.length === 0) return "Niet beschikbaar";
    
    // If all values are the same, return that value
    if (new Set(ages).size === 1) {
      return ages[0];
    }
    
    // Otherwise, show all values with their count
    const ageCounts = ages.reduce((acc: Record<string, number>, age) => {
      acc[age] = (acc[age] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(ageCounts)
      .map(([age, count]) => `${age} (${count}x)`)
      .join(", ");
  };

  // Get percentage for boolean values
  const getPercentage = (data: { ja: number; nee: number; total: number }) => {
    if (data.total === 0) return "Niet beschikbaar";
    const percentage = Math.round((data.ja / data.total) * 100);
    return `${percentage}% (${data.ja}/${data.total})`;
  };

  // Card background colors based on persona types
  const getCardColor = (cardIndex: number) => {
    const colors = [
      "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
      "bg-gradient-to-br from-green-50 to-green-100 border-green-200",
      "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200",
      "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200",
      "bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200"
    ];
    return colors[cardIndex % colors.length];
  };

  const geslacht = getMostCommon(persona.geslacht);
  const prijs = getMostCommon(persona.prijs);
  const frequentie = getMostCommon(persona.frequentie_frituurbezoek);
  const consumptie = getMostCommon(persona.consumptie_situatie);
  const motivatie = getMostCommon(persona.motivatie_kiezen_proteine_snack);

  return (
    <Card 
      className={`overflow-hidden border shadow-md hover:shadow-lg transition-shadow ${getCardColor(index)}`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-gray-800">
          {persona.name}
        </CardTitle>
        <CardDescription>
          {persona.count > 1 ? `Geaggregeerd van ${persona.count} profielen` : "1 profiel"}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4 text-sm">
        <div className="flex items-start">
          <Users className="h-5 w-5 mr-2 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Geslacht</p>
            <p>{geslacht.value} ({geslacht.percentage}%)</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Calendar className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Leeftijd</p>
            <p>{getAgeInfo(persona.leeftijd)}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <ShoppingBag className="h-5 w-5 mr-2 text-purple-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Prijsgevoeligheid</p>
            <p>{prijs.value}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Repeat className="h-5 w-5 mr-2 text-orange-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Frituurbezoek</p>
            <p>{frequentie.value}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Heart className="h-5 w-5 mr-2 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Consumptiesituatie</p>
            <p>{consumptie.value}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Target className="h-5 w-5 mr-2 text-indigo-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Motivatie</p>
            <p>{motivatie.value}</p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="font-semibold mb-1">Open voor nieuwe snacks</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ 
                width: `${persona.openheid_nieuwe_snack.total > 0 
                  ? (persona.openheid_nieuwe_snack.ja / persona.openheid_nieuwe_snack.total) * 100 
                  : 0}%` 
              }}
            ></div>
          </div>
          <p className="text-xs mt-1 text-gray-600">
            {getPercentage(persona.openheid_nieuwe_snack)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
