
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { SummaryCardProps } from '../types';

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  icon: Icon,
  count,
  children,
  className,
  iconClassName,
  countUnit,
  subtitle
}) => {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">
              {count}{countUnit && ` ${countUnit}`}
            </h3>
            {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          </div>
          {Icon && (
            <div className={`bg-primary/10 p-2 rounded-full ${iconClassName}`}>
              <Icon className="h-5 w-5 text-primary" />
            </div>
          )}
        </div>
        <div className="mt-6">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
