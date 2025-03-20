
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DataPoint from './DataPoint';
import { BarriersFrequencyCardProps, TopValue } from '../types';

const BarriersFrequencyCard: React.FC<BarriersFrequencyCardProps> = ({
  title = "Aankoopbarrières & Bezoekfrequentie",
  icon: Icon,
  topBarriers,
  topFrequencies,
  barriersTotal,
  frequenciesTotal
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          {Icon && <Icon className="h-5 w-5 mr-2 text-violet-500" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <DataPoint
              label="Belangrijkste aankoopbarrières"
              value={topBarriers[0]?.name || "Geen gegevens"}
              secondaryInfo={`${topBarriers[0]?.percentage || 0}% van de respondenten`}
              breakdown={formatTopValuesToString(topBarriers)}
            />
            
            <div className="mt-2 text-xs text-gray-500">
              Gebaseerd op {barriersTotal} antwoorden
            </div>
          </div>
          
          <div>
            <DataPoint
              label="Frequentie frituurbezoek"
              value={topFrequencies[0]?.name || "Geen gegevens"}
              secondaryInfo={`${topFrequencies[0]?.percentage || 0}% van de respondenten`}
              breakdown={formatTopValuesToString(topFrequencies)}
            />
            
            <div className="mt-2 text-xs text-gray-500">
              Gebaseerd op {frequenciesTotal} antwoorden
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to format TopValues array to string
const formatTopValuesToString = (values: TopValue[]): string => {
  if (!values || values.length === 0) return "Geen gegevens beschikbaar";
  
  return values
    .map(item => `${item.name} (${item.percentage}%)`)
    .join(", ");
};

export default BarriersFrequencyCard;
