
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DataPoint from './DataPoint';
import { PreparationCrunchCardProps, TopValue } from '../types';

const PreparationCrunchCard: React.FC<PreparationCrunchCardProps> = ({
  title = "Bereidingsvoorkeur & Krokantheid",
  icon: Icon,
  topPreparations,
  topImportanceCrunch,
  preparationsTotal,
  crunchImportanceTotal
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          {Icon && <Icon className="h-5 w-5 mr-2 text-pink-500" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <DataPoint
              label="Voorkeur bereidingsmethode"
              value={topPreparations[0]?.name || "Geen gegevens"}
              secondaryInfo={`${topPreparations[0]?.percentage || 0}% van de respondenten`}
              breakdown={formatTopValuesToString(topPreparations)}
            />
            
            <div className="mt-2 text-xs text-gray-500">
              Gebaseerd op {preparationsTotal} antwoorden
            </div>
          </div>
          
          <div>
            <DataPoint
              label="Belang van krokantheid"
              value={topImportanceCrunch[0]?.name || "Geen gegevens"}
              secondaryInfo={`${topImportanceCrunch[0]?.percentage || 0}% van de respondenten`}
              breakdown={formatTopValuesToString(topImportanceCrunch)}
            />
            
            <div className="mt-2 text-xs text-gray-500">
              Gebaseerd op {crunchImportanceTotal} antwoorden
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

export default PreparationCrunchCard;
