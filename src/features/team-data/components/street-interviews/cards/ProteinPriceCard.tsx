
import { DollarSign } from "lucide-react";
import SummaryCard from "./SummaryCard";
import DataPoint from "./DataPoint";
import { CommonValueInfo } from "../types";

type ProteinPriceCardProps = {
  eiwitgehalteInfo: CommonValueInfo;
  prijsInfo: CommonValueInfo;
  gemiddeldeEiwitgehalte: string;
  gemiddeldePrijs: string;
  eiwitgehalte: Record<string, number>;
  prijzen: Record<string, number>;
  formatBreakdown: (record: Record<string, number>) => string;
};

const ProteinPriceCard = ({ 
  eiwitgehalteInfo, 
  prijsInfo, 
  gemiddeldeEiwitgehalte, 
  gemiddeldePrijs, 
  eiwitgehalte, 
  prijzen,
  formatBreakdown 
}: ProteinPriceCardProps) => {
  return (
    <SummaryCard
      title="Eiwitgehalte & Prijs"
      icon={DollarSign}
      iconColor="text-green-500"
    >
      <div className="space-y-4">
        <DataPoint
          label="Gewenst eiwitgehalte:"
          value={`Gemiddeld: ${gemiddeldeEiwitgehalte}`}
          unit="gram"
          valueClassName="text-xl font-medium"
          secondaryInfo={`Meest voorkomend: ${eiwitgehalteInfo.value} (${eiwitgehalteInfo.percentage}%)`}
          breakdown={formatBreakdown(eiwitgehalte)}
        />
        <DataPoint
          label="Prijsindicatie:"
          value={`Gemiddeld: €${gemiddeldePrijs}`}
          valueClassName="text-xl font-medium"
          secondaryInfo={`Meest voorkomend: ${prijsInfo.value} (${prijsInfo.percentage}%)`}
          breakdown={formatBreakdown(prijzen)}
        />
      </div>
    </SummaryCard>
  );
};

export default ProteinPriceCard;
