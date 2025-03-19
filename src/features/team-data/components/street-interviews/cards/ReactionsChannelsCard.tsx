
import { MessageSquare } from "lucide-react";
import SummaryCard from "./SummaryCard";
import DataPoint from "./DataPoint";
import { GroupedStreetInterviewData } from "../StreetInterviewsDataUtils";
import { CommonValueInfo } from "../types";

type ReactionsChannelsCardProps = {
  eersteReactieInfo: CommonValueInfo;
  verkoopskanalenInfo: CommonValueInfo;
  eerste_reacties: Record<string, number>;
  verkoopskanalen: Record<string, number>;
  formatBreakdown: (record: Record<string, number>) => string;
};

const ReactionsChannelsCard = ({ 
  eersteReactieInfo, 
  verkoopskanalenInfo, 
  eerste_reacties, 
  verkoopskanalen,
  formatBreakdown 
}: ReactionsChannelsCardProps) => {
  return (
    <SummaryCard
      title="Eerste Reactie & Verkoopskanalen"
      icon={MessageSquare}
      iconColor="text-blue-500"
    >
      <div className="space-y-4">
        <DataPoint
          label="Meest voorkomende eerste reactie:"
          value={`${eersteReactieInfo.value} (${eersteReactieInfo.percentage}%)`}
          breakdown={formatBreakdown(eerste_reacties)}
        />
        <DataPoint
          label="Populairste verkoopskanalen:"
          value={`${verkoopskanalenInfo.value} (${verkoopskanalenInfo.percentage}%)`}
          breakdown={formatBreakdown(verkoopskanalen)}
        />
      </div>
    </SummaryCard>
  );
};

export default ReactionsChannelsCard;
