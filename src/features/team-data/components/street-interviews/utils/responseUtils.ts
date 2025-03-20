
// Calculate average from an array of numbers
export const calculateAverageResponse = (values: number[]): number => {
  if (values.length === 0) return 0;
  
  const sum = values.reduce((total, val) => total + val, 0);
  return parseFloat((sum / values.length).toFixed(1));
};

// Calculate weighted average from a record of value counts
export const calculateAverageFromRecord = (record: Record<string, number>): number => {
  if (Object.keys(record).length === 0) return 0;
  
  let sum = 0;
  let count = 0;
  
  for (const [valueStr, frequency] of Object.entries(record)) {
    const value = parseFloat(valueStr);
    if (!isNaN(value)) {
      sum += value * frequency;
      count += frequency;
    }
  }
  
  return count > 0 ? parseFloat((sum / count).toFixed(1)) : 0;
};

// Calculate standard deviation
export const calculateStandardDeviation = (values: number[]): number => {
  if (values.length <= 1) return 0;
  
  const avg = calculateAverageResponse(values);
  const squareDiffs = values.map(value => Math.pow(value - avg, 2));
  const variance = squareDiffs.reduce((sum, squareDiff) => sum + squareDiff, 0) / values.length;
  return parseFloat(Math.sqrt(variance).toFixed(1));
};

// Normalize values to percentage
export const normalizeToPercentage = (record: Record<string, number>): Record<string, number> => {
  const total = Object.values(record).reduce((sum, count) => sum + count, 0);
  if (total === 0) return {};
  
  return Object.entries(record).reduce((result, [key, value]) => {
    result[key] = Math.round((value / total) * 100);
    return result;
  }, {} as Record<string, number>);
};

// Extract numeric values from a record of string to number
export const extractNumericValues = (record: Record<string, number>): number[] => {
  const values: number[] = [];
  
  for (const [valueStr, count] of Object.entries(record)) {
    const value = parseFloat(valueStr);
    if (!isNaN(value)) {
      // Add the value to the array 'count' times
      for (let i = 0; i < count; i++) {
        values.push(value);
      }
    }
  }
  
  return values;
};

// Count boolean values and return percentage of true values
export const countBooleanValues = (values: (boolean | number)[]): { trueCount: number; falseCount: number; truePercentage: number } => {
  if (values.length === 0) {
    return { trueCount: 0, falseCount: 0, truePercentage: 0 };
  }
  
  const trueCount = values.reduce((count, value) => {
    // Handle both boolean and numeric (0/1) values
    const isTrue = typeof value === 'boolean' ? value : value === 1;
    return count + (isTrue ? 1 : 0);
  }, 0);
  
  const falseCount = values.length - trueCount;
  const truePercentage = Math.round((trueCount / values.length) * 100);
  
  return { trueCount, falseCount, truePercentage };
};

// Get top N values from a record
export const getTopNValues = (record: Record<string, number>, n: number = 3): Array<{ name: string; count: number; percentage: number }> => {
  const total = Object.values(record).reduce((sum, count) => sum + count, 0);
  if (total === 0) return [];
  
  return Object.entries(record)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / total) * 100)
    }));
};
