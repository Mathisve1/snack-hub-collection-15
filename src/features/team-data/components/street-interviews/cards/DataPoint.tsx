
import React from "react";

type DataPointProps = {
  label: string;
  value: string | number;
  unit?: string;
  breakdown?: string;
  valueClassName?: string;
  secondaryInfo?: string;
  subValue?: string;
  iconComponent?: React.ReactNode;
  highlightValue?: boolean;
};

const DataPoint = ({ 
  label, 
  value, 
  unit, 
  breakdown, 
  valueClassName, 
  secondaryInfo, 
  subValue,
  iconComponent,
  highlightValue = false
}: DataPointProps) => {
  // Convert numeric values to strings for rendering
  const displayValue = typeof value === 'number' ? String(value) : value;
  
  return (
    <div className="flex items-start">
      {iconComponent && <div className="mr-3 mt-1">{iconComponent}</div>}
      <div className={`flex-1 ${iconComponent ? '' : ''}`}>
        <p className="font-semibold text-gray-700">{label}</p>
        <p className={`${valueClassName || ""} ${highlightValue ? "text-lg font-bold text-primary" : ""}`}>
          {displayValue}{unit && ` ${unit}`}
        </p>
        {subValue && (
          <p className="text-sm text-gray-500 mt-0.5">{subValue}</p>
        )}
        {secondaryInfo && (
          <p className="text-sm text-muted-foreground mt-1">{secondaryInfo}</p>
        )}
        {breakdown && (
          <p className="text-sm text-gray-600 mt-1">{breakdown}</p>
        )}
      </div>
    </div>
  );
};

export default DataPoint;
