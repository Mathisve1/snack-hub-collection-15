
import { Clock } from "lucide-react";
import SummaryCard from "./SummaryCard";
import DataPoint from "./DataPoint";
import { CommonValueInfo } from "../types";

type BarriersFrequencyCardProps = {
  aankoopbarriereInfo: CommonValueInfo;
  frequentieInfo: CommonValueInfo;
  aankoopbarrieres: Record<string, number>;
  frituurbezoek_frequentie: Record<string, number>;
  formatBreakdown: (record: Record<string, number>) => string;
};

const BarriersFrequencyCard = ({ 
  aankoopbarriereInfo, 
  frequentieInfo, 
  aankoopbarrieres, 
  frituurbezoek_frequentie,
  formatBreakdown 
}: BarriersFrequencyCardProps) => {
  return (
    <SummaryCard
      title="Aankoopbarrière & Bezoekfrequentie"
      icon={Clock}
      iconColor="text-pink-500"
    >
      <div className="space-y-4">
        <DataPoint
          label="Belangrijkste aankoopbarrière:"
          value={`${aankoopbarriereInfo.value} (${aankoopbarriereInfo.percentage}%)`}
          breakdown={formatBreakdown(aankoopbarrieres)}
        />
        <DataPoint
          label="Frituurbezoek frequentie:"
          value={`${frequentieInfo.value} (${frequentieInfo.percentage}%)`}
          breakdown={formatBreakdown(frituurbezoek_frequentie)}
        />
      </div>
    </SummaryCard>
  );
};

export default BarriersFrequencyCard;
