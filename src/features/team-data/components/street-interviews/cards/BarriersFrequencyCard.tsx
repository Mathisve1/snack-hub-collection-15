
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GroupedStreetInterviewData } from "../utils/types";
import { getMostCommon, formatBreakdown, getTopValues } from "../utils/calculationUtils";
import DataPoint from "./DataPoint";

interface BarriersFrequencyCardProps {
  groupedData: GroupedStreetInterviewData;
}

const BarriersFrequencyCard: React.FC<BarriersFrequencyCardProps> = ({ groupedData }) => {
  const barriersData = getMostCommon(groupedData.aankoopbarrieres);
  const frequencyData = getMostCommon(groupedData.frituurbezoek_frequentie);
  
  // Marketing preferences
  const marketingPreferences = getTopValues(groupedData.marketing, 3);

  return (
    <Card className="shadow-md h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Aankoopbarrières, Frequentie & Marketing</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <DataPoint
              label="Belangrijkste Aankoopbarrière"
              value={barriersData.value}
              subValue={`${barriersData.percentage}% van alle respondenten`}
            />
            
            <div className="mt-2">
              <h4 className="text-sm font-medium text-gray-500">Alle Aankoopbarrières:</h4>
              <p className="text-sm text-gray-700 mt-1">
                {formatBreakdown(groupedData.aankoopbarrieres)}
              </p>
            </div>
            
            <div className="mt-3 bg-red-50 p-3 rounded-md">
              <h4 className="text-sm font-medium text-red-700 mb-1">Aandachtspunt:</h4>
              <p className="text-sm text-red-600">
                De identificatie van aankoopbarrières kan helpen bij het ontwikkelen van 
                strategieën om deze obstakels te overwinnen in de productintroductie.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <DataPoint
              label="Meest Voorkomende Bezoekfrequentie"
              value={frequencyData.value}
              subValue={`${frequencyData.percentage}% van alle respondenten`}
            />
            
            <div className="mt-2">
              <h4 className="text-sm font-medium text-gray-500">Verdeling Bezoekfrequentie:</h4>
              <p className="text-sm text-gray-700 mt-1">
                {formatBreakdown(groupedData.frituurbezoek_frequentie)}
              </p>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Top Marketing Voorkeuren:</h4>
              
              {marketingPreferences.length > 0 ? (
                <div className="space-y-2">
                  {marketingPreferences.map((pref, index) => (
                    <div key={index} className="flex justify-between bg-gray-50 p-2 rounded">
                      <span className="text-gray-700">{pref.value}</span>
                      <span className="font-medium">{pref.percentage}%</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Geen marketing gegevens beschikbaar</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarriersFrequencyCard;
