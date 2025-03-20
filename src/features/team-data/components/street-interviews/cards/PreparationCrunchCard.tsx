
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GroupedStreetInterviewData } from "../utils/types";
import { getMostCommon, formatBreakdown } from "../utils/calculationUtils";
import DataPoint from "./DataPoint";

interface PreparationCrunchCardProps {
  groupedData: GroupedStreetInterviewData;
}

const PreparationCrunchCard: React.FC<PreparationCrunchCardProps> = ({ groupedData }) => {
  const prepData = getMostCommon(groupedData.bereidingsvoorkeur);
  const crunchData = getMostCommon(groupedData.belang_krokantheid);

  return (
    <Card className="shadow-md h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Bereiding & Krokantheid</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <DataPoint
            label="Voorkeur Bereidingswijze"
            value={prepData.value}
            subValue={`${prepData.percentage}% van alle respondenten`}
          />
          
          <div className="mt-2">
            <h4 className="text-sm font-medium text-gray-500">Alle Bereidingsvoorkeuren:</h4>
            <p className="text-sm text-gray-700 mt-1">
              {formatBreakdown(groupedData.bereidingsvoorkeur)}
            </p>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <DataPoint
              label="Belang van Krokantheid"
              value={crunchData.value}
              subValue={`${crunchData.percentage}% van alle respondenten`}
            />
            
            <div className="mt-2">
              <h4 className="text-sm font-medium text-gray-500">Verdeling Belang Krokantheid:</h4>
              <p className="text-sm text-gray-700 mt-1">
                {formatBreakdown(groupedData.belang_krokantheid)}
              </p>
            </div>
          </div>
          
          <div className="mt-3 bg-blue-50 p-3 rounded-md">
            <h4 className="text-sm font-medium text-blue-700 mb-1">Inzicht:</h4>
            <p className="text-sm text-blue-600">
              De bereidingsvoorkeur en het belang van krokantheid geven aan hoe de consumenten 
              de eiwit-snack graag geserveerd zien, wat belangrijk is voor de ontwikkeling 
              van het product.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreparationCrunchCard;
