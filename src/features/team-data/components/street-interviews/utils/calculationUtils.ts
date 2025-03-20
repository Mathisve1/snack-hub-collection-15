
// Calculate the most common value from a record of counts
export const getMostCommonValue = (record: Record<string, number>): { value: string; count: number; percentage: number } => {
  if (Object.keys(record).length === 0) {
    return { value: "Geen gegevens", count: 0, percentage: 0 };
  }
  
  const sortedEntries = Object.entries(record).sort((a, b) => b[1] - a[1]);
  const [value, count] = sortedEntries[0];
  const total = Object.values(record).reduce((sum, c) => sum + c, 0);
  const percentage = Math.round((count / total) * 100);
  
  return { value, count, percentage };
};

// Calculate average from boolean values (0/1)
export const calculateBooleanPercentage = (values: number[]): number => {
  if (values.length === 0) return 0;
  
  const trueCount = values.reduce((count, value) => count + value, 0);
  return Math.round((trueCount / values.length) * 100);
};

// Calculate average from values
export const calculateAverage = (values: number[]): number => {
  if (values.length === 0) return 0;
  
  const sum = values.reduce((total, val) => total + val, 0);
  return parseFloat((sum / values.length).toFixed(1));
};

// Format a record to display as a breakdown string
export const formatBreakdownString = (record: Record<string, number>): string => {
  if (Object.keys(record).length === 0) return "Geen gegevens beschikbaar";
  
  return Object.entries(record)
    .sort((a, b) => b[1] - a[1])
    .map(([key, count]) => `${key} (${count}x)`)
    .join(", ");
};

// Convert a number to string with percentage
export const formatPercentage = (value: number): string => {
  return `${value}%`;
};

// Convert numeric record to categorical record with ranges
export const categorizeNumericValues = (record: Record<string, number>): Record<string, number> => {
  const result: Record<string, number> = {};
  
  for (const [valueStr, count] of Object.entries(record)) {
    const value = parseFloat(valueStr);
    if (isNaN(value)) continue;
    
    // Create categories (change these ranges as needed)
    let category: string;
    if (value < 5) category = "< 5";
    else if (value < 10) category = "5-10";
    else if (value < 15) category = "10-15";
    else if (value < 20) category = "15-20";
    else category = "20+";
    
    result[category] = (result[category] || 0) + count;
  }
  
  return result;
};

