
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GroupedStreetInterviewData } from "../utils/types";
import { calculateAverageFromRecord } from "../utils/responseUtils";
import { getAveragePrice } from "../utils/calculationUtils";
import DataPoint from "./DataPoint";

interface ProteinPriceCardProps {
  groupedData: GroupedStreetInterviewData;
}

const ProteinPriceCard: React.FC<ProteinPriceCardProps> = ({ groupedData }) => {
  const averageProtein = calculateAverageFromRecord(groupedData.eiwitgehalte);
  const averagePrice = getAveragePrice(groupedData.prijzen);

  return (
    <Card className="shadow-md h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Eiwitgehalte & Prijs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <DataPoint
              label="Gemiddeld Gewenst Eiwitgehalte"
              value={`${averageProtein}g`}
              subValue="per 100g product"
            />
            
            <div className="mt-3 bg-gray-50 p-3 rounded-md">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Verdeling Eiwitgehalte Voorkeuren:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(groupedData.eiwitgehalte)
                  .sort(([a], [b]) => parseFloat(a) - parseFloat(b))
                  .map(([amount, count]) => (
                    <div key={amount} className="flex justify-between">
                      <span className="text-gray-600">{amount}g:</span>
                      <span className="font-medium">{count}x</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <DataPoint
              label="Gemiddelde Prijsverwachting"
              value={`€${averagePrice.toFixed(2)}`}
              subValue="per portie"
            />
            
            <div className="mt-3 bg-gray-50 p-3 rounded-md">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Verdeling Prijsverwachtingen:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(groupedData.prijzen)
                  .sort(([a], [b]) => parseFloat(a) - parseFloat(b))
                  .map(([price, count]) => (
                    <div key={price} className="flex justify-between">
                      <span className="text-gray-600">€{price}:</span>
                      <span className="font-medium">{count}x</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProteinPriceCard;
