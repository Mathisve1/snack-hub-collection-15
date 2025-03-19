
import React from "react";

type DataPointProps = {
  label: string;
  value: string;
  unit?: string;
  breakdown?: string;
  valueClassName?: string;
  secondaryInfo?: string;
};

const DataPoint = ({ label, value, unit, breakdown, valueClassName, secondaryInfo }: DataPointProps) => {
  return (
    <div>
      <p className="font-semibold">{label}</p>
      <p className={valueClassName || ""}>
        {value}{unit && ` ${unit}`}
      </p>
      {secondaryInfo && (
        <p className="text-sm text-muted-foreground mt-1">{secondaryInfo}</p>
      )}
      {breakdown && (
        <p className="text-sm text-gray-600 mt-1">{breakdown}</p>
      )}
    </div>
  );
};

export default DataPoint;
