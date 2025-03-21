
import { StreetInterview } from "../../../types";
import { CommonValueInfo, TopValue } from "../types";

/**
 * Calculates the percentage of true values in an array of booleans
 */
export const calculateBooleanPercentage = (values: (boolean | number)[]): number => {
  if (!values || values.length === 0) return 0;
  
  const trueCount = values.filter(value => 
    typeof value === 'boolean' ? value === true : value === 1
  ).length;
  
  return Math.round((trueCount / values.length) * 100);
};

/**
 * Formats a record of values and their counts into a readable string
 */
export const formatBreakdown = (record: Record<string, number>, limit: number = 3): string => {
  if (!record || Object.keys(record).length === 0) {
    return "Geen gegevens beschikbaar";
  }

  const total = Object.values(record).reduce((sum, count) => sum + count, 0);
  
  return Object.entries(record)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([value, count]) => {
      const percentage = Math.round((count / total) * 100);
      return `${value}: ${percentage}%`;
    })
    .join(", ");
};

/**
 * Gets the most common values from a record
 */
export const getMostCommon = (record: Record<string, number>, limit: number = 3): CommonValueInfo[] => {
  if (!record || Object.keys(record).length === 0) {
    return [];
  }
  
  const total = Object.values(record).reduce((sum, count) => sum + count, 0);
  
  return Object.entries(record)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([value, count]) => ({
      value,
      count,
      percentage: Math.round((count / total) * 100)
    }));
};

/**
 * Calculate average response positivity based on multiple boolean values
 */
export const calculateAverageResponse = (data: StreetInterview[]): string => {
  if (!data || data.length === 0) return "0";
  
  let positiveCount = 0;
  let totalFields = 0;
  
  data.forEach(interview => {
    // Count each positive boolean response
    if (interview.ruimte_voor_innovatie === true) {
      positiveCount += 1;
      totalFields += 1;
    } else if (interview.ruimte_voor_innovatie === false) {
      totalFields += 1;
    }
    
    if (interview.hogere_prijs === true) {
      positiveCount += 1;
      totalFields += 1;
    } else if (interview.hogere_prijs === false) {
      totalFields += 1;
    }
    
    if (interview.vervangen_traditionele_snack === true) {
      positiveCount += 1;
      totalFields += 1;
    } else if (interview.vervangen_traditionele_snack === false) {
      totalFields += 1;
    }
  });
  
  if (totalFields === 0) return "0";
  
  const averagePercentage = Math.round((positiveCount / totalFields) * 100);
  return averagePercentage.toString();
};

/**
 * Calculate the average value from a record of numeric ranges
 */
export const calculateAverageFromRecord = (record: Record<string, number>): string => {
  if (!record || Object.keys(record).length === 0) return "0";
  
  let sum = 0;
  let count = 0;
  
  Object.entries(record).forEach(([range, frequency]) => {
    // Extract the average value from the range (e.g., "10-15" becomes 12.5)
    let avgValue: number;
    
    if (range.includes("<")) {
      // Handle "< X" format
      const value = parseFloat(range.replace("<", "").trim());
      avgValue = value / 2; // Assume average is half of the upper bound
    } else if (range.includes("+")) {
      // Handle "X+" format
      const value = parseFloat(range.replace("+", "").trim());
      avgValue = value * 1.5; // Assume average is 50% more than the lower bound
    } else if (range.includes("-")) {
      // Handle "X-Y" format
      const [min, max] = range.split("-").map(v => parseFloat(v.trim()));
      avgValue = (min + max) / 2;
    } else {
      // Handle single value
      avgValue = parseFloat(range);
    }
    
    if (!isNaN(avgValue)) {
      sum += avgValue * frequency;
      count += frequency;
    }
  });
  
  if (count === 0) return "0";
  
  const average = Math.round((sum / count) * 10) / 10; // Round to 1 decimal place
  return average.toString();
};

/**
 * Extracts numeric values from a record with string keys
 * Added for missing function error
 */
export const extractNumericValues = (record: Record<string, number>): number[] => {
  if (!record || Object.keys(record).length === 0) return [];
  
  const result: number[] = [];
  
  for (const [valueStr, count] of Object.entries(record)) {
    const numValue = parseFloat(valueStr);
    if (!isNaN(numValue)) {
      // Add the value to the array 'count' times
      for (let i = 0; i < count; i++) {
        result.push(numValue);
      }
    }
  }
  
  return result;
};

/**
 * Gets the top N values from a record
 * Added for missing function error
 */
export const getTopNValues = (record: Record<string, number>, n: number = 3): TopValue[] => {
  if (!record || Object.keys(record).length === 0) return [];
  
  const total = Object.values(record).reduce((sum, count) => sum + count, 0);
  
  return Object.entries(record)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / total) * 100)
    }));
};

