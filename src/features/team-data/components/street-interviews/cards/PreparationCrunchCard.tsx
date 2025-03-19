
import { Package } from "lucide-react";
import SummaryCard from "./SummaryCard";
import DataPoint from "./DataPoint";
import { CommonValueInfo } from "../types";

type PreparationCrunchCardProps = {
  bereidingsvoorkeurInfo: CommonValueInfo;
  belangKrokantheidInfo: CommonValueInfo;
  bereidingsvoorkeur: Record<string, number>;
  belang_krokantheid: Record<string, number>;
  formatBreakdown: (record: Record<string, number>) => string;
};

const PreparationCrunchCard = ({ 
  bereidingsvoorkeurInfo, 
  belangKrokantheidInfo, 
  bereidingsvoorkeur, 
  belang_krokantheid,
  formatBreakdown 
}: PreparationCrunchCardProps) => {
  return (
    <SummaryCard
      title="Bereiding & Krokantheid"
      icon={Package}
      iconColor="text-red-500"
    >
      <div className="space-y-4">
        <DataPoint
          label="Bereidingsvoorkeur:"
          value={`${bereidingsvoorkeurInfo.value} (${bereidingsvoorkeurInfo.percentage}%)`}
          breakdown={formatBreakdown(bereidingsvoorkeur)}
        />
        <DataPoint
          label="Belang van krokantheid:"
          value={`${belangKrokantheidInfo.value} (${belangKrokantheidInfo.percentage}%)`}
          breakdown={formatBreakdown(belang_krokantheid)}
        />
      </div>
    </SummaryCard>
  );
};

export default PreparationCrunchCard;
