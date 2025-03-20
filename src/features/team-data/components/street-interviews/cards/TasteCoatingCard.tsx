
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GroupedStreetInterviewData } from "../utils/types";
import { getMostCommon, formatBreakdown } from "../utils/calculationUtils";
import DataPoint from "./DataPoint";

interface TasteCoatingCardProps {
  groupedData: GroupedStreetInterviewData;
}

const TasteCoatingCard: React.FC<TasteCoatingCardProps> = ({ groupedData }) => {
  const tasteData = getMostCommon(groupedData.smaakvoorkeuren);
  const coatingData = getMostCommon(groupedData.coating);
  const brandingData = getMostCommon(groupedData.branding);

  return (
    <Card className="shadow-md h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Smaak, Coating & Branding</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <DataPoint
            label="Belangrijkste Smaakvoorkeur"
            value={tasteData.value}
            subValue={`${tasteData.percentage}% van alle respondenten`}
          />
          
          <div className="mt-2">
            <h4 className="text-sm font-medium text-gray-500">Alle Smaakvoorkeuren:</h4>
            <p className="text-sm text-gray-700 mt-1">
              {formatBreakdown(groupedData.smaakvoorkeuren)}
            </p>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <DataPoint
              label="Voorkeur Coating Type"
              value={coatingData.value}
              subValue={`${coatingData.percentage}% van alle respondenten`}
            />
            
            <div className="mt-2">
              <h4 className="text-sm font-medium text-gray-500">Alle Coating Voorkeuren:</h4>
              <p className="text-sm text-gray-700 mt-1">
                {formatBreakdown(groupedData.coating)}
              </p>
            </div>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <DataPoint
              label="Voorkeur Branding"
              value={brandingData.value}
              subValue={`${brandingData.percentage}% van alle respondenten`}
            />
            
            <div className="mt-2">
              <h4 className="text-sm font-medium text-gray-500">Alle Branding Voorkeuren:</h4>
              <p className="text-sm text-gray-700 mt-1">
                {formatBreakdown(groupedData.branding)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TasteCoatingCard;
