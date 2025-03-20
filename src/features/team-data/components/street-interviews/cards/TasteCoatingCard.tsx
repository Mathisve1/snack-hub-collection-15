
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DataPoint from './DataPoint';
import { TasteCoatingCardProps, TopValue } from '../types';

const TasteCoatingCard: React.FC<TasteCoatingCardProps> = ({
  title = "Smaakvoorkeuren & Coating",
  icon: Icon,
  topTastes,
  topCoatings,
  tastesTotal,
  coatingsTotal
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          {Icon && <Icon className="h-5 w-5 mr-2 text-amber-500" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <DataPoint
            label="Meest populaire smaakvoorkeuren"
            value={topTastes[0]?.name || "Geen gegevens"}
            secondaryInfo={`${topTastes[0]?.percentage || 0}% van de respondenten`}
            breakdown={formatTopValuesToString(topTastes)}
          />
          
          <div className="mt-1 text-xs text-gray-500">
            Gebaseerd op {tastesTotal} antwoorden
          </div>
          
          <DataPoint
            label="Voorkeur coating"
            value={topCoatings[0]?.name || "Geen gegevens"}
            secondaryInfo={`${topCoatings[0]?.percentage || 0}% van de respondenten`}
            breakdown={formatTopValuesToString(topCoatings)}
          />
          
          <div className="mt-1 text-xs text-gray-500">
            Gebaseerd op {coatingsTotal} antwoorden
          </div>
          
          <div className="mt-4">
            <DataPoint
              label="Notitie"
              value="De coating is een belangrijk onderdeel van de smaakbeleving"
              secondaryInfo="Textuur en krokante buitenkant worden vaak genoemd"
            />
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

export default TasteCoatingCard;
