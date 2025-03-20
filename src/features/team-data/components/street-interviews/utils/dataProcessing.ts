
import { StreetInterview } from "../../../types";
import { GroupedStreetInterviewData } from "./types";

/**
 * Processes raw street interview data and groups it into a structured format
 */
export const processStreetInterviewsData = (data: StreetInterview[]): GroupedStreetInterviewData => {
  console.log("Processing street interviews data:", data);
  
  const result: GroupedStreetInterviewData = {
    count: data.length,
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

  data.forEach((interview) => {
    // Process eerste_reactie
    if (interview.eerste_reactie) {
      result.eerste_reacties[interview.eerste_reactie] = (result.eerste_reacties[interview.eerste_reactie] || 0) + 1;
    }

    // Process verkoopskanalen
    if (interview.verkoopskanalen) {
      result.verkoopskanalen[interview.verkoopskanalen] = (result.verkoopskanalen[interview.verkoopskanalen] || 0) + 1;
    }

    // Process motivatie_frituur
    if (interview.motivatie_frituur) {
      result.motivatie_frituur[interview.motivatie_frituur] = (result.motivatie_frituur[interview.motivatie_frituur] || 0) + 1;
    }

    // Process populaire snacks
    if (interview.populaire_snack_1) {
      result.populaire_snacks[interview.populaire_snack_1] = (result.populaire_snacks[interview.populaire_snack_1] || 0) + 1;
    }
    if (interview.populaire_snack_2) {
      result.populaire_snacks[interview.populaire_snack_2] = (result.populaire_snacks[interview.populaire_snack_2] || 0) + 1;
    }

    // Process eiwitgehalte
    if (interview.eiwitgehalte !== undefined && interview.eiwitgehalte !== null) {
      const key = String(interview.eiwitgehalte);
      result.eiwitgehalte[key] = (result.eiwitgehalte[key] || 0) + 1;
    }

    // Process prijs
    if (interview.prijs !== undefined && interview.prijs !== null) {
      const key = String(interview.prijs);
      result.prijzen[key] = (result.prijzen[key] || 0) + 1;
    }

    // Process branding
    if (interview.branding) {
      result.branding[interview.branding] = (result.branding[interview.branding] || 0) + 1;
    }

    // Process marketing
    if (interview.marketing_1) {
      result.marketing[interview.marketing_1] = (result.marketing[interview.marketing_1] || 0) + 1;
    }
    if (interview.marketing_2) {
      result.marketing[interview.marketing_2] = (result.marketing[interview.marketing_2] || 0) + 1;
    }

    // Process smaakvoorkeuren
    if (interview.smaakvoorkeuren) {
      result.smaakvoorkeuren[interview.smaakvoorkeuren] = (result.smaakvoorkeuren[interview.smaakvoorkeuren] || 0) + 1;
    }

    // Process coating
    if (interview.welke_coating) {
      result.coating[interview.welke_coating] = (result.coating[interview.welke_coating] || 0) + 1;
    }

    // Process bereidingsvoorkeur
    if (interview.bereidingsvoorkeur) {
      result.bereidingsvoorkeur[interview.bereidingsvoorkeur] = (result.bereidingsvoorkeur[interview.bereidingsvoorkeur] || 0) + 1;
    }

    // Process hogere_prijs_factoren
    if (interview.hogere_prijs_factoren) {
      result.hogere_prijs_factoren[interview.hogere_prijs_factoren] = (result.hogere_prijs_factoren[interview.hogere_prijs_factoren] || 0) + 1;
    }

    // Process aankoopbarrieres
    if (interview.belangrijkst_aankoopbariere) {
      result.aankoopbarrieres[interview.belangrijkst_aankoopbariere] = (result.aankoopbarrieres[interview.belangrijkst_aankoopbariere] || 0) + 1;
    }

    // Process frituurbezoek_frequentie
    if (interview.frituurbezoek_frequentie) {
      result.frituurbezoek_frequentie[interview.frituurbezoek_frequentie] = (result.frituurbezoek_frequentie[interview.frituurbezoek_frequentie] || 0) + 1;
    }

    // Process belang_krokantheid
    if (interview.belang_van_krokantheid) {
      result.belang_krokantheid[interview.belang_van_krokantheid] = (result.belang_krokantheid[interview.belang_van_krokantheid] || 0) + 1;
    }

    // Process boolean values - ensure we're checking for correct boolean values
    if (interview.ruimte_voor_innovatie !== undefined) {
      result.innovatie_ruimte.push(interview.ruimte_voor_innovatie ? 1 : 0);
    }
    if (interview.hogere_prijs !== undefined) {
      result.hogere_prijs_bereidheid.push(interview.hogere_prijs ? 1 : 0);
    }
    if (interview.vervangen_traditionele_snack !== undefined) {
      result.vervangen_traditionele_snack.push(interview.vervangen_traditionele_snack ? 1 : 0);
    }
  });

  console.log("Processed result:", result);
  return result;
};
