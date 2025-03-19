
import { Sparkles } from "lucide-react";
import SummaryCard from "./SummaryCard";
import DataPoint from "./DataPoint";

type InnovationPriceCardProps = {
  innovatieRuimtePercentage: string;
  hogerePrijsPercentage: string;
  vervangenTraditionalPercentage: string;
};

const InnovationPriceCard = ({ 
  innovatieRuimtePercentage, 
  hogerePrijsPercentage, 
  vervangenTraditionalPercentage 
}: InnovationPriceCardProps) => {
  return (
    <SummaryCard
      title="Bereidheid voor Innovatie & Hogere Prijs"
      icon={Sparkles}
      iconColor="text-yellow-500"
    >
      <div className="grid grid-cols-1 gap-4">
        <DataPoint
          label="Ruimte voor innovatie:"
          value={`${innovatieRuimtePercentage} van respondenten`}
        />
        <DataPoint
          label="Bereidheid hogere prijs:"
          value={`${hogerePrijsPercentage} van respondenten`}
        />
        <DataPoint
          label="Vervangen traditionele snack:"
          value={`${vervangenTraditionalPercentage} van respondenten`}
        />
      </div>
    </SummaryCard>
  );
};

export default InnovationPriceCard;
