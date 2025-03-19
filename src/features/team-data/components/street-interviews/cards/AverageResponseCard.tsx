
import { BarChart } from "lucide-react";
import SummaryCard from "./SummaryCard";
import DataPoint from "./DataPoint";

type AverageResponseCardProps = {
  gemiddeldePositiefResponse: string;
  gemiddeldeEiwitgehalte: string;
  gemiddeldePrijs: string;
};

const AverageResponseCard = ({ 
  gemiddeldePositiefResponse, 
  gemiddeldeEiwitgehalte, 
  gemiddeldePrijs 
}: AverageResponseCardProps) => {
  return (
    <SummaryCard
      title="Gemiddelde responswaarden"
      icon={BarChart}
      iconColor="text-indigo-500"
    >
      <div className="space-y-4">
        <DataPoint
          label="Gemiddelde positieve respons:"
          value={gemiddeldePositiefResponse}
          valueClassName="text-xl font-medium"
          breakdown="Berekend op basis van innovatie openheid, hogere prijs bereidheid, en bereidheid traditionele snacks te vervangen"
        />
        <div className="mt-4">
          <DataPoint
            label="Gemiddeld gewenst eiwitgehalte:"
            value={`${gemiddeldeEiwitgehalte}%`}
            valueClassName="text-xl font-medium"
          />
        </div>
        <div className="mt-4">
          <DataPoint
            label="Gemiddelde prijsindicatie:"
            value={`€${gemiddeldePrijs}`}
            valueClassName="text-xl font-medium"
          />
        </div>
      </div>
    </SummaryCard>
  );
};

export default AverageResponseCard;
