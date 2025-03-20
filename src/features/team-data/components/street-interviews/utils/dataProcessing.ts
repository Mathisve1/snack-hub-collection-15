
import { StreetInterview } from "../../../types";
import { GroupedStreetInterviewData } from "./types";

export const processStreetInterviewsData = (interviews: StreetInterview[]): GroupedStreetInterviewData => {
  console.log("Processing street interviews data:", interviews);
  
  // Initialize the grouped data structure
  const groupedData: GroupedStreetInterviewData = {
    count: interviews.length,
    eerste_reacties: {},
    verkoopskanalen: {},
    motivatie_frituur: {},
    populaire_snacks: {},
    eiwitgehalte: {},
    prijzen: {},
    branding: {},
    marketing: {},
    smaakvoorkeuren: {},
    coating: {},
    bereidingsvoorkeur: {},
    hogere_prijs_factoren: {},
    aankoopbarrieres: {},
    frituurbezoek_frequentie: {},
    innovatie_ruimte: [],
    hogere_prijs_bereidheid: [],
    vervangen_traditionele_snack: [],
    belang_krokantheid: {},
  };

  // Process each interview
  interviews.forEach(interview => {
    // Process text fields with multiple responses
    if (interview.eerste_reactie) {
      addToCounter(groupedData.eerste_reacties, interview.eerste_reactie);
    }

    if (interview.verkoopskanalen) {
      addToCounter(groupedData.verkoopskanalen, interview.verkoopskanalen);
    }

    if (interview.motivatie_frituur) {
      addToCounter(groupedData.motivatie_frituur, interview.motivatie_frituur);
    }

    // Process multiple snack preferences
    if (interview.populaire_snack_1) {
      addToCounter(groupedData.populaire_snacks, interview.populaire_snack_1);
    }
    if (interview.populaire_snack_2) {
      addToCounter(groupedData.populaire_snacks, interview.populaire_snack_2);
    }

    // Process protein content
    if (interview.eiwitgehalte !== undefined && interview.eiwitgehalte !== null) {
      const value = String(interview.eiwitgehalte);
      addToCounter(groupedData.eiwitgehalte, value);
    }

    // Process price
    if (interview.prijs !== undefined && interview.prijs !== null) {
      const value = String(interview.prijs);
      addToCounter(groupedData.prijzen, value);
    }

    // Process branding
    if (interview.branding) {
      addToCounter(groupedData.branding, interview.branding);
    }

    // Process marketing methods
    if (interview.marketing_1) {
      addToCounter(groupedData.marketing, interview.marketing_1);
    }
    if (interview.marketing_2) {
      addToCounter(groupedData.marketing, interview.marketing_2);
    }

    // Process taste preferences
    if (interview.smaakvoorkeuren) {
      addToCounter(groupedData.smaakvoorkeuren, interview.smaakvoorkeuren);
    }

    // Process coating preferences
    if (interview.welke_coating) {
      addToCounter(groupedData.coating, interview.welke_coating);
    }

    // Process preparation preferences
    if (interview.bereidingsvoorkeur) {
      addToCounter(groupedData.bereidingsvoorkeur, interview.bereidingsvoorkeur);
    }

    // Process higher price factors
    if (interview.hogere_prijs_factoren) {
      addToCounter(groupedData.hogere_prijs_factoren, interview.hogere_prijs_factoren);
    }

    // Process purchase barriers
    if (interview.belangrijkst_aankoopbariere) {
      addToCounter(groupedData.aankoopbarrieres, interview.belangrijkst_aankoopbariere);
    }

    // Process frequency
    if (interview.frituurbezoek_frequentie) {
      addToCounter(groupedData.frituurbezoek_frequentie, interview.frituurbezoek_frequentie);
    }

    // Process importance of crunchiness
    if (interview.belang_van_krokantheid) {
      addToCounter(groupedData.belang_krokantheid, interview.belang_van_krokantheid);
    }

    // Process boolean fields
    if (interview.ruimte_voor_innovatie !== undefined) {
      groupedData.innovatie_ruimte.push(interview.ruimte_voor_innovatie ? 1 : 0);
    }

    if (interview.hogere_prijs !== undefined) {
      groupedData.hogere_prijs_bereidheid.push(interview.hogere_prijs ? 1 : 0);
    }

    if (interview.vervangen_traditionele_snack !== undefined) {
      groupedData.vervangen_traditionele_snack.push(interview.vervangen_traditionele_snack ? 1 : 0);
    }
  });

  console.log("Processed street interviews data:", groupedData);
  return groupedData;
};

// Helper function to add a value to a counter object
const addToCounter = (counter: Record<string, number>, value: string) => {
  const normalizedValue = value.trim().toLowerCase();
  counter[normalizedValue] = (counter[normalizedValue] || 0) + 1;
};
