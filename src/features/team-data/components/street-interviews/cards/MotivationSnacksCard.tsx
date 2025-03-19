
import { Store } from "lucide-react";
import SummaryCard from "./SummaryCard";
import DataPoint from "./DataPoint";
import { CommonValueInfo } from "../types";

type MotivationSnacksCardProps = {
  motivatieInfo: CommonValueInfo;
  populaireSnackInfo: CommonValueInfo;
  motivatie_frituur: Record<string, number>;
  populaire_snacks: Record<string, number>;
  formatBreakdown: (record: Record<string, number>) => string;
};

const MotivationSnacksCard = ({ 
  motivatieInfo, 
  populaireSnackInfo, 
  motivatie_frituur, 
  populaire_snacks,
  formatBreakdown 
}: MotivationSnacksCardProps) => {
  return (
    <SummaryCard
      title="Motivatie & Populaire Snacks"
      icon={Store}
      iconColor="text-orange-500"
    >
      <div className="space-y-4">
        <DataPoint
          label="Meest voorkomende motivatie frituur:"
          value={`${motivatieInfo.value} (${motivatieInfo.percentage}%)`}
          breakdown={formatBreakdown(motivatie_frituur)}
        />
        <DataPoint
          label="Populairste snacks:"
          value={`${populaireSnackInfo.value} (${populaireSnackInfo.percentage}%)`}
          breakdown={formatBreakdown(populaire_snacks)}
        />
      </div>
    </SummaryCard>
  );
};

export default MotivationSnacksCard;
