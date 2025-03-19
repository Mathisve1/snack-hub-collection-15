
import { Frituur } from "../../types";

export type GroupedFrituurData = {
  count: number;
  bestsellers: Record<string, number>;
  trends: Record<string, number>;
  groothandel: Record<string, number>;
  extra_groothandel: Record<string, number>;
  gemiddelde_marges: number[];
  absolute_marges: number[];
  aankoopprijs: number[];
  aankoopprijs_proteine_snacks: number[];
  belangrijke_factoren: Record<string, number>;
  marketing: Record<string, number>;
  bereidheid_aanbieden: Record<string, number>;
  waarom_niet_verkopen: Record<string, number>;
};

export const processFriturenData = (data: Frituur[]): GroupedFrituurData => {
  const result: GroupedFrituurData = {
    count: data.length,
    bestsellers: {},
    trends: {},
    groothandel: {},
    extra_groothandel: {},
    gemiddelde_marges: [],
    absolute_marges: [],
    aankoopprijs: [],
    aankoopprijs_proteine_snacks: [],
    belangrijke_factoren: {},
    marketing: {},
    bereidheid_aanbieden: {},
    waarom_niet_verkopen: {},
  };

  data.forEach((frituur) => {
    // Process bestsellers
    if (frituur.bestseller_1) {
      result.bestsellers[frituur.bestseller_1] = (result.bestsellers[frituur.bestseller_1] || 0) + 1;
    }
    if (frituur.bestseller_2) {
      result.bestsellers[frituur.bestseller_2] = (result.bestsellers[frituur.bestseller_2] || 0) + 1;
    }
    if (frituur.bestseller_3) {
      result.bestsellers[frituur.bestseller_3] = (result.bestsellers[frituur.bestseller_3] || 0) + 1;
    }

    // Process trends
    if (frituur.trends_1) {
      result.trends[frituur.trends_1] = (result.trends[frituur.trends_1] || 0) + 1;
    }
    if (frituur.trends_2) {
      result.trends[frituur.trends_2] = (result.trends[frituur.trends_2] || 0) + 1;
    }

    // Process groothandel
    if (frituur.groothandel) {
      result.groothandel[frituur.groothandel] = (result.groothandel[frituur.groothandel] || 0) + 1;
    }

    // Process extra groothandel
    if (frituur.extra_groothandel) {
      result.extra_groothandel[frituur.extra_groothandel] = (result.extra_groothandel[frituur.extra_groothandel] || 0) + 1;
    }

    // Process numeric values - improved handling for both string and number types
    if (frituur.gemiddlede_marges !== null && frituur.gemiddlede_marges !== undefined) {
      const value = typeof frituur.gemiddlede_marges === 'string' 
        ? parseFloat(frituur.gemiddlede_marges) 
        : frituur.gemiddlede_marges;
      if (!isNaN(value)) {
        result.gemiddelde_marges.push(value);
      }
    }

    if (frituur.absolute_marges !== null && frituur.absolute_marges !== undefined) {
      const value = typeof frituur.absolute_marges === 'string' 
        ? parseFloat(frituur.absolute_marges) 
        : frituur.absolute_marges;
      if (!isNaN(value)) {
        result.absolute_marges.push(value);
      }
    }

    if (frituur.aankoopprijs !== null && frituur.aankoopprijs !== undefined) {
      const value = typeof frituur.aankoopprijs === 'string' 
        ? parseFloat(frituur.aankoopprijs) 
        : frituur.aankoopprijs;
      if (!isNaN(value)) {
        result.aankoopprijs.push(value);
      }
    }

    if (frituur.aankoopprijs_proteine_snacks !== null && frituur.aankoopprijs_proteine_snacks !== undefined) {
      const value = typeof frituur.aankoopprijs_proteine_snacks === 'string' 
        ? parseFloat(frituur.aankoopprijs_proteine_snacks) 
        : frituur.aankoopprijs_proteine_snacks;
      if (!isNaN(value)) {
        result.aankoopprijs_proteine_snacks.push(value);
      }
    }

    // Process belangrijke factoren
    if (frituur.belangrijke_factor_1) {
      result.belangrijke_factoren[frituur.belangrijke_factor_1] = (result.belangrijke_factoren[frituur.belangrijke_factor_1] || 0) + 1;
    }
    if (frituur.belangrijke_factor_2) {
      result.belangrijke_factoren[frituur.belangrijke_factor_2] = (result.belangrijke_factoren[frituur.belangrijke_factor_2] || 0) + 1;
    }

    // Process marketing
    if (frituur.marketing_1) {
      result.marketing[frituur.marketing_1] = (result.marketing[frituur.marketing_1] || 0) + 1;
    }
    if (frituur.marketing_2) {
      result.marketing[frituur.marketing_2] = (result.marketing[frituur.marketing_2] || 0) + 1;
    }

    // Process bereidheid aanbieden
    if (frituur.bereidheid_aanbieden) {
      result.bereidheid_aanbieden[frituur.bereidheid_aanbieden] = (result.bereidheid_aanbieden[frituur.bereidheid_aanbieden] || 0) + 1;
    }

    // Process waarom niet verkopen
    if (frituur.waarom_niet_verkopen) {
      result.waarom_niet_verkopen[frituur.waarom_niet_verkopen] = (result.waarom_niet_verkopen[frituur.waarom_niet_verkopen] || 0) + 1;
    }
    if (frituur.waarom_niet_verkopen_2) {
      result.waarom_niet_verkopen[frituur.waarom_niet_verkopen_2] = (result.waarom_niet_verkopen[frituur.waarom_niet_verkopen_2] || 0) + 1;
    }
  });

  return result;
};

// Utility function to get most common value from a record
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

// Utility function to calculate average
export const calculateAverage = (values: number[]): string => {
  if (values.length === 0) return "Niet beschikbaar";
  
  const sum = values.reduce((acc, val) => acc + val, 0);
  return (sum / values.length).toFixed(2);
};

// Utility function to format breakdown of values with counts
export const formatBreakdown = (record: Record<string, number>): string => {
  if (Object.keys(record).length === 0) return "Geen gegevens";
  
  return Object.entries(record)
    .sort((a, b) => b[1] - a[1]) // Sort by count, descending
    .map(([value, count]) => `${value} (${count}x)`)
    .join(", ");
};
