
export type CommonValueInfo = {
  value: string;
  count: number;
  percentage: number;
};

export type TopValue = {
  value: string;
  count: number;
  percentage: number;
};

// Get the most common value from a record of counts
export const getMostCommon = (record: Record<string, number>): CommonValueInfo => {
  if (Object.keys(record).length === 0) {
    return { value: "No data", count: 0, percentage: 0 };
  }
  
  const entries = Object.entries(record);
  const total = entries.reduce((sum, [_, count]) => sum + count, 0);
  const [value, count] = entries.reduce((max, current) => 
    current[1] > max[1] ? current : max
  );
  
  return {
    value,
    count,
    percentage: Math.round((count / total) * 100)
  };
};

// Format breakdown of values with percentages
export const formatBreakdown = (data: Record<string, number>): string => {
  if (Object.keys(data).length === 0) return "No data available";
  
  const entries = Object.entries(data);
  const total = entries.reduce((sum, [_, count]) => sum + count, 0);
  
  return entries
    .sort((a, b) => b[1] - a[1])
    .map(([value, count]) => {
      const percentage = Math.round((count / total) * 100);
      return `${value}: ${count} (${percentage}%)`;
    })
    .join(", ");
};

// Calculate percentage of true values in boolean array
export const calculateBooleanPercentage = (values: number[]): number => {
  if (values.length === 0) return 0;
  
  const trueCount = values.reduce((sum, val) => sum + val, 0);
  return Math.round((trueCount / values.length) * 100);
};
