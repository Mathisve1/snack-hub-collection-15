
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { SummaryCardProps } from '../types';

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  icon: Icon,
  count,
  children
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{count}</h3>
            <p className="text-xs text-gray-500 mt-1">totale antwoorden</p>
          </div>
          {Icon && (
            <div className="bg-primary/10 p-2 rounded-full">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          )}
        </div>
        {children}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
