
import { BuyingPersona } from "../../../types";

export type GroupedPersona = {
  personaType: string;
  personas: BuyingPersona[];
};

export function groupPersonasByType(personas: BuyingPersona[]): GroupedPersona[] {
  const groupedMap: Record<string, BuyingPersona[]> = {};
  
  personas.forEach(persona => {
    const personaType = persona.buying_persona;
    if (!groupedMap[personaType]) {
      groupedMap[personaType] = [];
    }
    groupedMap[personaType].push(persona);
  });
  
  return Object.entries(groupedMap).map(([personaType, personaList]) => ({
    personaType,
    personas: personaList
  }));
}

export function countOccurrences<T extends BuyingPersona, K extends keyof T>(
  personas: T[],
  key: K
): Record<string, number> {
  return personas.reduce((acc: Record<string, number>, persona) => {
    const value = persona[key];
    if (value === null || value === undefined) return acc;
    
    const valueStr = String(value);
    acc[valueStr] = (acc[valueStr] || 0) + 1;
    return acc;
  }, {});
}

export function calculateOpenness(personas: BuyingPersona[]): { open: number; total: number; percentage: number } {
  const total = personas.filter(p => p.openheid_nieuwe_snack !== undefined && p.openheid_nieuwe_snack !== null).length;
  const open = personas.filter(p => p.openheid_nieuwe_snack === true).length;
  const percentage = total > 0 ? Math.round((open / total) * 100) : 0;
  
  return { open, total, percentage };
}

export function getMostCommonValue(occurrences: Record<string, number>): string | null {
  if (Object.keys(occurrences).length === 0) return null;
  
  return Object.entries(occurrences)
    .sort((a, b) => b[1] - a[1])[0][0];
}
