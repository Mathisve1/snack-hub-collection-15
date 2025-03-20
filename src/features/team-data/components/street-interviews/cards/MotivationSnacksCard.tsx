
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DataPoint from './DataPoint';
import { MotivationSnacksCardProps, TopValue } from '../types';

const MotivationSnacksCard: React.FC<MotivationSnacksCardProps> = ({
  title = "Motivatie & Populaire Snacks",
  icon: Icon,
  topMotivations,
  topSnacks,
  motivationTotal,
  snacksTotal
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          {Icon && <Icon className="h-5 w-5 mr-2 text-green-500" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <DataPoint
            label="Motivatie om frituur te bezoeken"
            value={topMotivations[0]?.name || "Geen gegevens"}
            secondaryInfo={`${topMotivations[0]?.percentage || 0}% van de respondenten`}
            breakdown={formatTopValuesToString(topMotivations)}
          />
          
          <div className="mt-1 text-xs text-gray-500">
            Gebaseerd op {motivationTotal} antwoorden
          </div>
          
          <div className="mt-4">
            <h4 className="font-medium mb-2">Populaire snacks</h4>
            <ul className="space-y-2">
              {topSnacks.map((snack, index) => (
                <li key={index} className="flex justify-between items-center">
                  <DataPoint
                    label={`${index + 1}. ${snack.name}`}
                    value={`${snack.percentage}%`}
                    secondaryInfo={`${snack.count} vermeldingen`}
                  />
                </li>
              ))}
            </ul>
            
            <div className="mt-2 text-xs text-gray-500">
              Gebaseerd op {snacksTotal} antwoorden
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

export default MotivationSnacksCard;
