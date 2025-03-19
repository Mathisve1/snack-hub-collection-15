
import { BuyingPersona } from "../../types";

export interface GroupedPersona {
  name: string;
  count: number;
  geslacht: Record<string, number>;
  leeftijd: (string | number)[];
  prijs: Record<string, number>;
  frequentie_frituurbezoek: Record<string, number>;
  consumptie_situatie: Record<string, number>;
  motivatie_kiezen_proteine_snack: Record<string, number>;
  openheid_nieuwe_snack: { ja: number; nee: number; total: number };
}

export const groupPersonasByName = (personas: BuyingPersona[]): GroupedPersona[] => {
  if (!personas || personas.length === 0) {
    console.log("No personas to group!");
    return [];
  }

  console.log("Grouping personas:", personas);
  
  // Group personas by their buying_persona name
  const groups: Record<string, BuyingPersona[]> = {};
  
  personas.forEach(persona => {
    if (!persona.buying_persona) {
      console.log("Persona missing name:", persona);
      return;
    }
    
    const name = persona.buying_persona.toLowerCase().trim();
    if (!groups[name]) {
      groups[name] = [];
    }
    groups[name].push(persona);
  });
  
  console.log("Grouped by name:", groups);
  
  // Convert each group to the GroupedPersona format
  const result: GroupedPersona[] = Object.entries(groups).map(([name, items]) => {
    // Initialize the grouped persona object
    const grouped: GroupedPersona = {
      name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter
      count: items.length,
      geslacht: {},
      leeftijd: [],
      prijs: {},
      frequentie_frituurbezoek: {},
      consumptie_situatie: {},
      motivatie_kiezen_proteine_snack: {},
      openheid_nieuwe_snack: { ja: 0, nee: 0, total: 0 }
    };
    
    // Process each persona in the group
    items.forEach(item => {
      // Process gender
      if (item.geslacht) {
        const gender = item.geslacht.toLowerCase().trim();
        grouped.geslacht[gender] = (grouped.geslacht[gender] || 0) + 1;
      }
      
      // Process age
      if (item.leeftijd !== undefined && item.leeftijd !== null) {
        grouped.leeftijd.push(item.leeftijd);
      }
      
      // Process price
      if (item.prijs !== undefined && item.prijs !== null) {
        const price = String(item.prijs);
        grouped.prijs[price] = (grouped.prijs[price] || 0) + 1;
      }
      
      // Process frequency
      if (item.frequentie_frituurbezoek) {
        const freq = item.frequentie_frituurbezoek.toLowerCase().trim();
        grouped.frequentie_frituurbezoek[freq] = (grouped.frequentie_frituurbezoek[freq] || 0) + 1;
      }
      
      // Process consumption situation
      if (item.consumptie_situatie) {
        const situation = item.consumptie_situatie.toLowerCase().trim();
        grouped.consumptie_situatie[situation] = (grouped.consumptie_situatie[situation] || 0) + 1;
      }
      
      // Process motivation
      if (item.motivatie_kiezen_proteine_snack) {
        const motivation = item.motivatie_kiezen_proteine_snack.toLowerCase().trim();
        grouped.motivatie_kiezen_proteine_snack[motivation] = (grouped.motivatie_kiezen_proteine_snack[motivation] || 0) + 1;
      }
      
      // Process openness to new snacks
      grouped.openheid_nieuwe_snack.total += 1;
      if (item.openheid_nieuwe_snack === true) {
        grouped.openheid_nieuwe_snack.ja += 1;
      } else {
        grouped.openheid_nieuwe_snack.nee += 1;
      }
    });
    
    return grouped;
  });
  
  console.log("Final grouped personas:", result);
  return result;
};
