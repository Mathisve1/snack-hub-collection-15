
export type GroupedPersona = {
  name: string;
  count: number;
  leeftijd: (string | number)[];
  geslacht: Record<string, number>;
  prijs: Record<string, number>;
  frequentie_frituurbezoek: Record<string, number>;
  consumptie_situatie: Record<string, number>;
  motivatie_kiezen_proteine_snack: Record<string, number>;
  marketing: Record<string, number>;
  openheid_nieuwe_snack: { ja: number; nee: number; total: number };
};

import { BuyingPersona } from "../../types";

export const groupPersonasByName = (data: BuyingPersona[]): GroupedPersona[] => {
  // Group personas by name
  const groupedMap = data.reduce((acc: Record<string, GroupedPersona>, persona) => {
    const name = persona.buying_persona;
    
    if (!acc[name]) {
      acc[name] = {
        name,
        count: 0,
        leeftijd: [],
        geslacht: {},
        prijs: {},
        frequentie_frituurbezoek: {},
        consumptie_situatie: {},
        motivatie_kiezen_proteine_snack: {},
        marketing: {},
        openheid_nieuwe_snack: { ja: 0, nee: 0, total: 0 }
      };
    }

    // Increment count
    acc[name].count++;

    // Collect leeftijd (for averaging later)
    if (persona.leeftijd !== null && persona.leeftijd !== undefined) {
      acc[name].leeftijd.push(persona.leeftijd);
    }

    // Count geslacht occurrences
    if (persona.geslacht) {
      acc[name].geslacht[persona.geslacht] = (acc[name].geslacht[persona.geslacht] || 0) + 1;
    }

    // Count prijs occurrences
    if (persona.prijs !== null && persona.prijs !== undefined) {
      const prijsKey = String(persona.prijs);
      acc[name].prijs[prijsKey] = (acc[name].prijs[prijsKey] || 0) + 1;
    }

    // Count frequentie_frituurbezoek occurrences
    if (persona.frequentie_frituurbezoek) {
      acc[name].frequentie_frituurbezoek[persona.frequentie_frituurbezoek] = 
        (acc[name].frequentie_frituurbezoek[persona.frequentie_frituurbezoek] || 0) + 1;
    }

    // Count consumptie_situatie occurrences
    if (persona.consumptie_situatie) {
      acc[name].consumptie_situatie[persona.consumptie_situatie] = 
        (acc[name].consumptie_situatie[persona.consumptie_situatie] || 0) + 1;
    }

    // Count motivatie_kiezen_proteine_snack occurrences
    if (persona.motivatie_kiezen_proteine_snack) {
      acc[name].motivatie_kiezen_proteine_snack[persona.motivatie_kiezen_proteine_snack] = 
        (acc[name].motivatie_kiezen_proteine_snack[persona.motivatie_kiezen_proteine_snack] || 0) + 1;
    }

    // Count marketing occurrences
    if (persona.marketing) {
      acc[name].marketing[persona.marketing] = (acc[name].marketing[persona.marketing] || 0) + 1;
    }

    // Count openheid_nieuwe_snack
    if (persona.openheid_nieuwe_snack !== null && persona.openheid_nieuwe_snack !== undefined) {
      if (persona.openheid_nieuwe_snack) {
        acc[name].openheid_nieuwe_snack.ja++;
      } else {
        acc[name].openheid_nieuwe_snack.nee++;
      }
      acc[name].openheid_nieuwe_snack.total++;
    }

    return acc;
  }, {});

  // Convert the grouped object to an array for rendering
  return Object.values(groupedMap);
};
