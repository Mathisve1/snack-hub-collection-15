
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BuyingPersona } from "../types";
import { countOccurrences, calculateOpenness, getMostCommonValue } from "./buying-personas/utils/personaDataUtils";
import { 
  Users, 
  Clock, 
  DollarSign, 
  Coffee, 
  Lightbulb, 
  Megaphone, 
  ThumbsUp 
} from "lucide-react";

interface BuyingPersonasCardsProps {
  personas: BuyingPersona[];
}

const Team3BuyingPersonasCards = ({ personas }: BuyingPersonasCardsProps) => {
  if (!personas || personas.length === 0) {
    return <div className="text-center p-6">No buying personas data available</div>;
  }

  const genderCount = countOccurrences(personas, 'geslacht');
  const ageCount = countOccurrences(personas, 'leeftijd');
  const consumptionCount = countOccurrences(personas, 'consumptie_situatie');
  const frequencyCount = countOccurrences(personas, 'frequentie_frituurbezoek');
  const motivationCount = countOccurrences(personas, 'motivatie_kiezen_proteine_snack');
  const marketingCount = countOccurrences(personas, 'marketing');
  const opennessData = calculateOpenness(personas);

  return (
    <>
      {/* Demographics Card */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Users className="mr-2 h-5 w-5 text-primary" />
            Demografische gegevens
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Meest voorkomend geslacht</p>
              <p className="text-lg font-semibold mt-1 capitalize">
                {getMostCommonValue(genderCount) || 'Geen gegevens'}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(genderCount).map(([gender, count]) => (
                  <Badge key={gender} variant="outline" className="capitalize">
                    {gender}: {count}x
                  </Badge>
                ))}
              </div>
            </div>
            <div className="pt-3 border-t">
              <p className="text-sm font-medium text-gray-500">Leeftijdsverdeling</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(ageCount).map(([age, count]) => (
                  <Badge key={age} variant="outline">
                    {age}: {count}x
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consumption Card */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Coffee className="mr-2 h-5 w-5 text-primary" />
            Consumptiegedrag
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Consumptiesituatie</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(consumptionCount).map(([situation, count]) => (
                  <Badge key={situation} variant="outline" className="capitalize">
                    {situation}: {count}x
                  </Badge>
                ))}
              </div>
            </div>
            <div className="pt-3 border-t">
              <p className="text-sm font-medium text-gray-500">Bezoekfrequentie</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(frequencyCount).map(([frequency, count]) => (
                  <Badge key={frequency} variant="outline" className="capitalize">
                    {frequency}: {count}x
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Motivation Card */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Lightbulb className="mr-2 h-5 w-5 text-primary" />
            Motivatie voor Proteïne Snacks
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Motivatiefactoren</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(motivationCount).map(([motivation, count]) => (
                  <Badge key={motivation} variant="outline" className="capitalize">
                    {motivation}: {count}x
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Marketing Card */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Megaphone className="mr-2 h-5 w-5 text-primary" />
            Marketing & Prijzen
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Marketing kanalen</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(marketingCount).map(([channel, count]) => (
                  <Badge key={channel} variant="outline" className="capitalize">
                    {channel}: {count}x
                  </Badge>
                ))}
              </div>
            </div>
            <div className="pt-3 border-t">
              <p className="text-sm font-medium text-gray-500">Gemiddelde prijs</p>
              <p className="text-lg font-semibold mt-1">
                €{personas.reduce((acc, p) => acc + (typeof p.prijs === 'number' ? p.prijs : 0), 0) / 
                  personas.filter(p => typeof p.prijs === 'number').length || 'Onbekend'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Openness Card */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <ThumbsUp className="mr-2 h-5 w-5 text-primary" />
            Openheid voor Nieuwe Snacks
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Open voor nieuwe snacks</p>
                <p className="text-2xl font-bold mt-1">{opennessData.percentage}%</p>
                <p className="text-xs text-gray-500">{opennessData.open} van {opennessData.total} personas</p>
              </div>
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <ThumbsUp className={`h-8 w-8 ${opennessData.percentage > 50 ? 'text-green-500' : 'text-orange-500'}`} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Team3BuyingPersonasCards;
