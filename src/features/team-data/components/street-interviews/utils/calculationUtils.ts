/**
 * Utility function to get most common value from a record
 */
export const getMostCommon = (record: Record<string, number>): { value: string; count: number; percentage: number } => {
  if (Object.keys(record).length === 0) {
    return { value: "Niet beschikbaar", count: 0, percentage: 0 };
  }
  
  const entries = Object.entries(record);
  const total = entries.reduce((sum, [_, count]) => sum + count, 0);
  const [value, count] = entries.reduce((max, current) => (current[1] > max[1] ? current : max));
  
  return { 
    value, 
    count, 
    percentage: Math.round((count / total) * 100) 
  };
};

/**
 * Utility function to calculate average for boolean values (percentage of "true")
 */
export const calculateBooleanPercentage = (values: number[]): string => {
  if (values.length === 0) return "Niet beschikbaar";
  
  const sum = values.reduce((acc, val) => acc + val, 0);
  return `${Math.round((sum / values.length) * 100)}%`;
};

/**
 * Calculate average numeric value from a string record, extracting numbers from strings
 */
export const calculateAverageFromRecord = (record: Record<string, number>): string => {
  if (Object.keys(record).length === 0) return "Niet beschikbaar";
  
  let total = 0;
  let count = 0;
  
  // Process each key in the record to extract numeric values
  Object.entries(record).forEach(([key, frequency]) => {
    // Try to extract numeric value from the key
    let numericValue: number | null = null;
    
    // For protein content: extract percentages
    if (key.includes('%')) {
      const match = key.match(/(\d+)%/);
      if (match && match[1]) {
        numericValue = parseInt(match[1], 10);
      }
    } 
    // For price: extract numeric values (assuming format like "€3,50" or "3-4 euro")
    else if (key.includes('€') || key.includes('euro')) {
      const match = key.match(/(\d+[.,]?\d*)/);
      if (match && match[1]) {
        numericValue = parseFloat(match[1].replace(',', '.'));
      }
    }
    // Otherwise try to extract any number
    else {
      const match = key.match(/(\d+[.,]?\d*)/);
      if (match && match[1]) {
        numericValue = parseFloat(match[1].replace(',', '.'));
      }
    }
    
    // If we found a numeric value, add it to the total
    if (numericValue !== null) {
      total += numericValue * frequency;
      count += frequency;
    }
  });
  
  if (count === 0) return "Niet beschikbaar";
  
  return (total / count).toFixed(1);
};
