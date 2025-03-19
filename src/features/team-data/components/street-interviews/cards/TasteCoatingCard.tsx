
import { Utensils } from "lucide-react";
import SummaryCard from "./SummaryCard";
import DataPoint from "./DataPoint";
import { CommonValueInfo } from "../types";

type TasteCoatingCardProps = {
  smaakvoorkeurenInfo: CommonValueInfo;
  coatingInfo: CommonValueInfo;
  smaakvoorkeuren: Record<string, number>;
  coating: Record<string, number>;
  formatBreakdown: (record: Record<string, number>) => string;
};

const TasteCoatingCard = ({ 
  smaakvoorkeurenInfo, 
  coatingInfo, 
  smaakvoorkeuren, 
  coating,
  formatBreakdown 
}: TasteCoatingCardProps) => {
  return (
    <SummaryCard
      title="Smaak & Coating"
      icon={Utensils}
      iconColor="text-purple-500"
    >
      <div className="space-y-4">
        <DataPoint
          label="Smaakvoorkeuren:"
          value={`${smaakvoorkeurenInfo.value} (${smaakvoorkeurenInfo.percentage}%)`}
          breakdown={formatBreakdown(smaakvoorkeuren)}
        />
        <DataPoint
          label="Coating voorkeur:"
          value={`${coatingInfo.value} (${coatingInfo.percentage}%)`}
          breakdown={formatBreakdown(coating)}
        />
      </div>
    </SummaryCard>
  );
};

export default TasteCoatingCard;
