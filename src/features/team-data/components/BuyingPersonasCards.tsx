import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTeam38BuyingPersonas } from "../hooks/useTeam38Data";
import { Loader2, Users, Calendar, Repeat, ShoppingBag, Heart, Target } from "lucide-react";
import { BuyingPersona } from "../types";

type GroupedPersona = {
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

const BuyingPersonasCards = () => {
  const { data, loading, error } = useTeam38BuyingPersonas();

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error loading buying personas data: {error}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-gray-500 p-4 text-center">
        No buying personas data available.
      </div>
    );
  }

  // Group personas by name
  const groupedPersonas = data.reduce((acc: Record<string, GroupedPersona>, persona) => {
    const name = persona.buying_persona;
    
    if (!acc[name]) {
      acc[name] = {
        name,
        count: 0,
        leeftijd: [],
        geslacht: {},
        prijs: {},
        frequentie_frituurbezoek: {},
        consumptie_situatie: {},
        motivatie_kiezen_proteine_snack: {},
        marketing: {},
        openheid_nieuwe_snack: { ja: 0, nee: 0, total: 0 }
      };
    }

    // Increment count
    acc[name].count++;

    // Collect leeftijd (for averaging later)
    if (persona.leeftijd) {
      acc[name].leeftijd.push(persona.leeftijd);
    }

    // Count geslacht occurrences
    if (persona.geslacht) {
      acc[name].geslacht[persona.geslacht] = (acc[name].geslacht[persona.geslacht] || 0) + 1;
    }

    // Count prijs occurrences
    if (persona.prijs) {
      acc[name].prijs[persona.prijs] = (acc[name].prijs[persona.prijs] || 0) + 1;
    }

    // Count frequentie_frituurbezoek occurrences
    if (persona.frequentie_frituurbezoek) {
      acc[name].frequentie_frituurbezoek[persona.frequentie_frituurbezoek] = 
        (acc[name].frequentie_frituurbezoek[persona.frequentie_frituurbezoek] || 0) + 1;
    }

    // Count consumptie_situatie occurrences
    if (persona.consumptie_situatie) {
      acc[name].consumptie_situatie[persona.consumptie_situatie] = 
        (acc[name].consumptie_situatie[persona.consumptie_situatie] || 0) + 1;
    }

    // Count motivatie_kiezen_proteine_snack occurrences
    if (persona.motivatie_kiezen_proteine_snack) {
      acc[name].motivatie_kiezen_proteine_snack[persona.motivatie_kiezen_proteine_snack] = 
        (acc[name].motivatie_kiezen_proteine_snack[persona.motivatie_kiezen_proteine_snack] || 0) + 1;
    }

    // Count marketing occurrences
    if (persona.marketing) {
      acc[name].marketing[persona.marketing] = (acc[name].marketing[persona.marketing] || 0) + 1;
    }

    // Count openheid_nieuwe_snack
    if (persona.openheid_nieuwe_snack !== null && persona.openheid_nieuwe_snack !== undefined) {
      if (persona.openheid_nieuwe_snack) {
        acc[name].openheid_nieuwe_snack.ja++;
      } else {
        acc[name].openheid_nieuwe_snack.nee++;
      }
      acc[name].openheid_nieuwe_snack.total++;
    }

    return acc;
  }, {});

  // Get most common value from a record of counts
  const getMostCommon = (record: Record<string, number>): { value: string; count: number; percentage: number } => {
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

  // Get average age from age ranges
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

  // Convert the grouped object to an array for rendering
  const personaGroups = Object.values(groupedPersonas);

  // Card background colors based on persona types
  const getCardColor = (index: number) => {
    const colors = [
      "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
      "bg-gradient-to-br from-green-50 to-green-100 border-green-200",
      "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200",
      "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200",
      "bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200"
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
      {personaGroups.map((persona, index) => {
        const geslacht = getMostCommon(persona.geslacht);
        const prijs = getMostCommon(persona.prijs);
        const frequentie = getMostCommon(persona.frequentie_frituurbezoek);
        const consumptie = getMostCommon(persona.consumptie_situatie);
        const motivatie = getMostCommon(persona.motivatie_kiezen_proteine_snack);
        
        return (
          <Card 
            key={persona.name} 
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
              <div className="grid grid-cols-2 gap-4">
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
              </div>
              
              <div className="grid grid-cols-2 gap-4">
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
      })}
    </div>
  );
};

export default BuyingPersonasCards;
