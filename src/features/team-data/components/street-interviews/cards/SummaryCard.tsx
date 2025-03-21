import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { SummaryCardProps } from '../types';
const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  icon: Icon,
  count,
  children,
  className = "",
  iconClassName = "",
  countUnit = "",
  subtitle = "",
  iconColor = ""
}) => {
  return <Card className={className}>
      
    </Card>;
};
export default SummaryCard;