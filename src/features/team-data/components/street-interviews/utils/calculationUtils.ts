
import { CommonValueInfo } from "../types";

/**
 * Gets the most common value from a record
 */
export const getMostCommon = (record: Record<string, number>): CommonValueInfo => {
  if (!record || Object.keys(record).length === 0) {
    return { value: "Niet beschikbaar", count: 0, percentage: 0 };
  }
  
  const entries = Object.entries(record);
  const total = entries.reduce((sum, [_, count]) => sum + count, 0);
  
  // Sort entries by count in descending order
  const sortedEntries = [...entries].sort((a, b) => b[1] - a[1]);
  const [value, count] = sortedEntries[0];
  
  return {
    value,
    count,
    percentage: Math.round((count / total) * 100)
  };
};

/**
 * Formats a record into a readable breakdown string
 */
export const formatBreakdown = (record: Record<string, number>): string => {
  if (!record || Object.keys(record).length === 0) {
    return "Geen gegevens beschikbaar";
  }
  
  const entries = Object.entries(record);
  const total = entries.reduce((sum, [_, count]) => sum + count, 0);
  
  // Sort entries by count in descending order
  const sortedEntries = [...entries].sort((a, b) => b[1] - a[1]);
  
  return sortedEntries
    .map(([value, count]) => {
      const percentage = Math.round((count / total) * 100);
      return `${value}: ${count}x (${percentage}%)`;
    })
    .join(", ");
};

/**
 * Calculates the percentage of true values in a boolean array
 */
export const calculateBooleanPercentage = (values: number[]): string => {
  if (!values || values.length === 0) {
    return "Niet beschikbaar";
  }
  
  const trueCount = values.filter(v => v === 1).length;
  const percentage = Math.round((trueCount / values.length) * 100);
  
  return `${percentage}%`;
};
