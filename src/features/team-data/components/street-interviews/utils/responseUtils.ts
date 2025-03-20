
import { StreetInterview } from "../../../types";

/**
 * Calculates the average positive response rate from boolean fields
 */
export const calculateAverageResponse = (data: StreetInterview[]): string => {
  if (!data || data.length === 0) {
    return "Niet beschikbaar";
  }
  
  let totalResponses = 0;
  let positiveCount = 0;
  
  // Count boolean fields
  data.forEach(interview => {
    if (interview.ruimte_voor_innovatie !== undefined) {
      totalResponses++;
      if (interview.ruimte_voor_innovatie) positiveCount++;
    }
    
    if (interview.hogere_prijs !== undefined) {
      totalResponses++;
      if (interview.hogere_prijs) positiveCount++;
    }
    
    if (interview.vervangen_traditionele_snack !== undefined) {
      totalResponses++;
      if (interview.vervangen_traditionele_snack) positiveCount++;
    }
  });
  
  if (totalResponses === 0) {
    return "Niet beschikbaar";
  }
  
  const percentage = Math.round((positiveCount / totalResponses) * 100);
  return percentage.toString();
};

/**
 * Calculates the average numeric value from a record
 */
export const calculateAverageFromRecord = (record: Record<string, number>): string => {
  if (!record || Object.keys(record).length === 0) {
    return "Niet beschikbaar";
  }
  
  try {
    let sum = 0;
    let count = 0;
    
    for (const [value, occurrences] of Object.entries(record)) {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        sum += numValue * occurrences;
        count += occurrences;
      }
    }
    
    if (count === 0) {
      return "Niet beschikbaar";
    }
    
    return (sum / count).toFixed(2);
  } catch (error) {
    console.error("Error calculating average from record:", error);
    return "Niet beschikbaar";
  }
};
