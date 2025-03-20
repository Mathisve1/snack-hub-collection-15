
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
