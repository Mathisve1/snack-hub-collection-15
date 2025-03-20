
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GroupedStreetInterviewData } from "../utils/types";
import { getMostCommon, formatBreakdown } from "../utils/calculationUtils";
import DataPoint from "./DataPoint";

interface ReactionsChannelsCardProps {
  groupedData: GroupedStreetInterviewData;
}

const ReactionsChannelsCard: React.FC<ReactionsChannelsCardProps> = ({ groupedData }) => {
  const firstReactionData = getMostCommon(groupedData.eerste_reacties);
  const salesChannelsData = getMostCommon(groupedData.verkoopskanalen);

  return (
    <Card className="shadow-md h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Eerste Reacties & Verkoopskanalen</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <DataPoint
            label="Meest Voorkomende Eerste Reactie"
            value={firstReactionData.value}
            subValue={`${firstReactionData.percentage}% van de reacties`}
          />
          
          <div className="mt-2">
            <h4 className="text-sm font-medium text-gray-500">Alle Eerste Reacties:</h4>
            <p className="text-sm text-gray-700 mt-1">
              {formatBreakdown(groupedData.eerste_reacties)}
            </p>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <DataPoint
              label="Favoriete Verkoopskanaal"
              value={salesChannelsData.value}
              subValue={`${salesChannelsData.percentage}% van alle respondenten`}
            />
            
            <div className="mt-2">
              <h4 className="text-sm font-medium text-gray-500">Alle Verkoopskanalen:</h4>
              <p className="text-sm text-gray-700 mt-1">
                {formatBreakdown(groupedData.verkoopskanalen)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReactionsChannelsCard;
