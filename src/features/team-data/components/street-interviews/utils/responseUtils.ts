
import { StreetInterview } from "../../../types";

/**
 * Utility function for calculating overall average satisfaction or response rate
 */
export const calculateAverageResponse = (data: StreetInterview[]): string => {
  const totalResponses = data.length;
  const positiveResponses = data.filter(item => 
    item.ruimte_voor_innovatie === true || 
    item.hogere_prijs === true || 
    item.vervangen_traditionele_snack === true
  ).length;
  
  if (totalResponses === 0) return "Niet beschikbaar";
  const averagePositivity = (positiveResponses / (totalResponses * 3)) * 100;
  return `${Math.round(averagePositivity)}%`;
};

/**
 * Utility function to format breakdown of values with counts
 */
export const formatBreakdown = (record: Record<string, number>): string => {
  if (Object.keys(record).length === 0) return "Geen gegevens";
  
  return Object.entries(record)
    .sort((a, b) => b[1] - a[1]) // Sort by count, descending
    .map(([value, count]) => `${value} (${count}x)`)
    .join(", ");
};
