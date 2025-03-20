
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import DataPoint from './DataPoint';
import { InnovationPriceCardProps, TopValue } from '../types';

const InnovationPriceCard: React.FC<InnovationPriceCardProps> = ({
  innovationPercentage,
  higherPricePercentage,
  replaceTradSnackPercentage,
  highPriceFactors
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <div className="mb-2">
          <DataPoint
            label="Ruimte voor innovatie"
            value={`${innovationPercentage}%`}
            secondaryInfo="Van de respondenten"
            valueClassName="text-2xl font-bold text-green-600"
          />
        </div>
        <p className="text-sm text-gray-600">
          {getInnovationInsight(innovationPercentage)}
        </p>
      </div>
      
      <div>
        <div className="mb-2">
          <DataPoint
            label="Bereid hogere prijs te betalen"
            value={`${higherPricePercentage}%`}
            secondaryInfo="Van de respondenten"
            valueClassName="text-2xl font-bold text-amber-600"
          />
        </div>
        <p className="text-sm text-gray-600">
          {getPriceInsight(higherPricePercentage)}
        </p>
      </div>
      
      <div>
        <div className="mb-2">
          <DataPoint
            label="Bereid traditionele snack te vervangen"
            value={`${replaceTradSnackPercentage}%`}
            secondaryInfo="Van de respondenten"
            valueClassName="text-2xl font-bold text-blue-600"
          />
        </div>
        <p className="text-sm text-gray-600">
          {getReplacementInsight(replaceTradSnackPercentage)}
        </p>
      </div>
      
      {highPriceFactors && highPriceFactors.length > 0 && (
        <div className="md:col-span-3">
          <Card className="mt-4 bg-gray-50">
            <CardContent className="pt-4">
              <h4 className="font-semibold mb-2">Factoren voor hogere prijsbereidheid:</h4>
              <p className="text-sm text-gray-700">{formatTopValuesToString(highPriceFactors)}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

// Helper functions to generate insights based on percentages
const getInnovationInsight = (percentage: number): string => {
  if (percentage >= 70) return "Er is sterk draagvlak voor innovatie in het frituur-aanbod.";
  if (percentage >= 50) return "Er is redelijk draagvlak voor innovatie in het frituur-aanbod.";
  return "Er is beperkt draagvlak voor innovatie in het frituur-aanbod.";
};

const getPriceInsight = (percentage: number): string => {
  if (percentage >= 70) return "Sterke bereidheid om meer te betalen voor proteïne snacks.";
  if (percentage >= 50) return "Redelijke bereidheid om meer te betalen voor proteïne snacks.";
  return "Beperkte bereidheid om meer te betalen voor proteïne snacks.";
};

const getReplacementInsight = (percentage: number): string => {
  if (percentage >= 70) return "Sterke bereidheid om traditionele snacks te vervangen door proteïne-alternatieven.";
  if (percentage >= 50) return "Redelijke bereidheid om traditionele snacks te vervangen door proteïne-alternatieven.";
  return "Beperkte bereidheid om traditionele snacks te vervangen door proteïne-alternatieven.";
};

// Helper function to format TopValues array to string
const formatTopValuesToString = (values: TopValue[]): string => {
  if (!values || values.length === 0) return "Geen gegevens beschikbaar";
  
  return values
    .map(item => `${item.name} (${item.percentage}%)`)
    .join(", ");
};

export default InnovationPriceCard;
