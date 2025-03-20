
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GroupedStreetInterviewData } from "../utils/types";
import { getMostCommon, formatBreakdown, getTopValues } from "../utils/calculationUtils";
import DataPoint from "./DataPoint";

interface MotivationSnacksCardProps {
  groupedData: GroupedStreetInterviewData;
}

const MotivationSnacksCard: React.FC<MotivationSnacksCardProps> = ({ groupedData }) => {
  const motivationData = getMostCommon(groupedData.motivatie_frituur);
  const topSnacks = getTopValues(groupedData.populaire_snacks, 3);

  return (
    <Card className="shadow-md h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Motivatie & Populaire Snacks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <DataPoint
            label="Belangrijkste Motivatie voor Frituurbezoek"
            value={motivationData.value}
            subValue={`${motivationData.percentage}% van alle respondenten`}
          />
          
          <div className="mt-2">
            <h4 className="text-sm font-medium text-gray-500">Alle Motivaties:</h4>
            <p className="text-sm text-gray-700 mt-1">
              {formatBreakdown(groupedData.motivatie_frituur)}
            </p>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Top Populaire Snacks:</h4>
            
            {topSnacks.length > 0 ? (
              <div className="space-y-3">
                {topSnacks.map((snack, index) => (
                  <DataPoint
                    key={index}
                    label={`#${index + 1}`}
                    value={snack.value}
                    subValue={`${snack.percentage}% van alle vermeldingen`}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Geen snackgegevens beschikbaar</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotivationSnacksCard;
