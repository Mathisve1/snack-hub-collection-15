
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCardColor } from "./utils/personaDisplayUtils";
import { AgeSection } from "./persona-sections/AgeSection";
import { GenderSection } from "./persona-sections/GenderSection";
import { PriceSection } from "./persona-sections/PriceSection";
import { FrequencySection } from "./persona-sections/FrequencySection";
import { ConsumptionSection } from "./persona-sections/ConsumptionSection";
import { MotivationSection } from "./persona-sections/MotivationSection";
import { OpenToNewSection } from "./persona-sections/OpenToNewSection";

type PersonaCardItemProps = {
  persona: GroupedPersona;
  index: number;
};

export type GroupedPersona = {
  name: string;
  count: number;
  leeftijd: (string | number)[];
  geslacht: Record<string, number>;
  prijs: Record<string, number>;
  frequentie_frituurbezoek: Record<string, number>;
  consumptie_situatie: Record<string, number>;
  motivatie_kiezen_proteine_snack: Record<string, number>;
  marketing: Record<string, number>;
  openheid_nieuwe_snack: { ja: number; nee: number; total: number };
};

export const PersonaCardItem = ({ persona, index }: PersonaCardItemProps) => {
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
        <GenderSection genders={persona.geslacht} />
        <AgeSection ages={persona.leeftijd} />
        <PriceSection prices={persona.prijs} />
        <FrequencySection frequency={persona.frequentie_frituurbezoek} />
        <ConsumptionSection consumption={persona.consumptie_situatie} />
        <MotivationSection motivation={persona.motivatie_kiezen_proteine_snack} />
        <OpenToNewSection openheid={persona.openheid_nieuwe_snack} />
      </CardContent>
    </Card>
  );
};
