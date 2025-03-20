
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GroupedStreetInterviewData } from "../utils/types";
import { calculateBooleanPercentage, getMostCommon, formatBreakdown } from "../utils/calculationUtils";
import DataPoint from "./DataPoint";

interface InnovationPriceCardProps {
  groupedData: GroupedStreetInterviewData;
}

const InnovationPriceCard: React.FC<InnovationPriceCardProps> = ({ groupedData }) => {
  const innovationPercentage = calculateBooleanPercentage(groupedData.innovatie_ruimte);
  const higherPricePercentage = calculateBooleanPercentage(groupedData.hogere_prijs_bereidheid);
  const replaceTraditionalPercentage = calculateBooleanPercentage(groupedData.vervangen_traditionele_snack);
  const priceFactorsData = getMostCommon(groupedData.hogere_prijs_factoren);

  return (
    <Card className="shadow-md h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Innovatie & Prijsbereidheid</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-green-50 p-3 rounded-md text-center">
              <div className="text-xl font-bold text-green-600">{innovationPercentage}%</div>
              <div className="text-xs text-green-700 mt-1">Ziet ruimte voor innovatie</div>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-md text-center">
              <div className="text-xl font-bold text-blue-600">{higherPricePercentage}%</div>
              <div className="text-xs text-blue-700 mt-1">Bereid hogere prijs te betalen</div>
            </div>
            
            <div className="bg-purple-50 p-3 rounded-md text-center">
              <div className="text-xl font-bold text-purple-600">{replaceTraditionalPercentage}%</div>
              <div className="text-xs text-purple-700 mt-1">Kan traditionele snack vervangen</div>
            </div>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <DataPoint
              label="Belangrijkste Factor voor Hogere Prijsbereidheid"
              value={priceFactorsData.value}
              subValue={`${priceFactorsData.percentage}% van alle respondenten`}
            />
            
            <div className="mt-2">
              <h4 className="text-sm font-medium text-gray-500">Alle Factoren voor Hogere Prijs:</h4>
              <p className="text-sm text-gray-700 mt-1">
                {formatBreakdown(groupedData.hogere_prijs_factoren)}
              </p>
            </div>
          </div>
          
          <div className="mt-3 bg-amber-50 p-3 rounded-md">
            <h4 className="text-sm font-medium text-amber-700 mb-1">Analyse:</h4>
            <p className="text-sm text-amber-600">
              De bereidheid om een hogere prijs te betalen hangt sterk samen met specifieke 
              factoren zoals kwaliteit en gezondheidsvoordelen. Dit biedt kansen voor premium positionering.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InnovationPriceCard;
