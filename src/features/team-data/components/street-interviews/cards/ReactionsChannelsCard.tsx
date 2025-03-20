
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DataPoint from './DataPoint';
import { TopValue, ReactionsChannelsCardProps } from '../types';

const ReactionsChannelsCard: React.FC<ReactionsChannelsCardProps> = ({
  title = "Eerste Reacties & Verkoopskanalen",
  icon: Icon,
  topFirstReactions,
  topSalesChannels,
  eersteReactiesTotal,
  verkoopskanalenTotal
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          {Icon && <Icon className="h-5 w-5 mr-2 text-blue-500" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <DataPoint
              label="Eerste reacties op proteïne snacks"
              value={topFirstReactions[0]?.name || "Geen gegevens"}
              secondaryInfo={`${topFirstReactions[0]?.percentage || 0}% van de respondenten`}
              breakdown={formatTopValuesToString(topFirstReactions)}
            />
            
            <div className="mt-2 text-xs text-gray-500">
              Gebaseerd op {eersteReactiesTotal} antwoorden
            </div>
          </div>
          
          <div>
            <DataPoint
              label="Voorkeur verkoopskanalen"
              value={topSalesChannels[0]?.name || "Geen gegevens"}
              secondaryInfo={`${topSalesChannels[0]?.percentage || 0}% van de respondenten`}
              breakdown={formatTopValuesToString(topSalesChannels)}
            />
            
            <div className="mt-2 text-xs text-gray-500">
              Gebaseerd op {verkoopskanalenTotal} antwoorden
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

export default ReactionsChannelsCard;
