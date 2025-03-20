
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DataPoint from './DataPoint';
import { ProteinPriceCardProps } from '../types';

const ProteinPriceCard: React.FC<ProteinPriceCardProps> = ({
  title = "Eiwitgehalte & Prijs",
  icon: Icon,
  avgProtein,
  avgPrice,
  proteinRanges,
  priceRanges
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          {Icon && <Icon className="h-5 w-5 mr-2 text-yellow-500" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <DataPoint
              label="Gemiddeld eiwitgehalte voorkeur"
              value={avgProtein.toString()}
              unit="g"
              valueClassName="text-xl font-bold"
              secondaryInfo="Gram proteïne per portie"
              breakdown={formatRangesToString(proteinRanges)}
            />
            
            <div className="mt-2 text-xs text-gray-500">
              De meeste consumenten verkiezen {getMostCommonRange(proteinRanges)} gram proteïne
            </div>
          </div>
          
          <div>
            <DataPoint
              label="Gemiddelde prijsbereidheid"
              value={avgPrice.toString()}
              unit="€"
              valueClassName="text-xl font-bold"
              secondaryInfo="Prijs per portie"
              breakdown={formatRangesToString(priceRanges)}
            />
            
            <div className="mt-2 text-xs text-gray-500">
              De meeste consumenten zijn bereid {getMostCommonRange(priceRanges)}€ te betalen
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to format ranges to string
const formatRangesToString = (ranges: Record<string, number>): string => {
  if (!ranges || Object.keys(ranges).length === 0) return "Geen gegevens beschikbaar";
  
  const total = Object.values(ranges).reduce((sum, count) => sum + count, 0);
  
  return Object.entries(ranges)
    .sort((a, b) => {
      // Sort by numeric value of range start (e.g., "5-10" starts with 5)
      const aStart = parseInt(a[0].split('-')[0].replace('<', '').replace('+', '').trim());
      const bStart = parseInt(b[0].split('-')[0].replace('<', '').replace('+', '').trim());
      return aStart - bStart;
    })
    .map(([range, count]) => {
      const percentage = Math.round((count / total) * 100);
      return `${range}: ${percentage}%`;
    })
    .join(", ");
};

// Helper function to get most common range
const getMostCommonRange = (ranges: Record<string, number>): string => {
  if (!ranges || Object.keys(ranges).length === 0) return "geen";
  
  const entries = Object.entries(ranges);
  if (entries.length === 0) return "geen";
  
  const [mostCommonRange] = entries.reduce((max, current) => 
    current[1] > max[1] ? current : max
  );
  
  return mostCommonRange;
};

export default ProteinPriceCard;
