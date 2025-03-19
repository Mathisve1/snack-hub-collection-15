
import { BuyingPersona } from "../../../types";

// Helper function to count occurrences
export const countOccurrences = (arr: any[], key: string): Record<string, number> => {
  const counts: Record<string, number> = {};
  arr.forEach(item => {
    const value = item[key]?.toString().toLowerCase() || 'onbekend';
    counts[value] = (counts[value] || 0) + 1;
  });
  return counts;
};

// Helper to calculate openness percentage
export const calculateOpenness = (personas: BuyingPersona[]) => {
  const openCount = personas.filter(p => p.openheid_nieuwe_snack === true).length;
  const percentage = Math.round((openCount / personas.length) * 100);
  return { open: openCount, total: personas.length, percentage };
};

// Find the most common value
export const getMostCommonValue = (data: Record<string, number>): string => {
  if (Object.keys(data).length === 0) return '';
  return Object.entries(data).reduce((a, b) => a[1] > b[1] ? a : b)[0];
};
