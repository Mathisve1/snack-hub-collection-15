
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
