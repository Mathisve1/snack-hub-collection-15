
// Types for Team 38 buying personas
export interface BuyingPersona {
  id: string;
  buying_persona: string;
  leeftijd?: number;
  geslacht?: string;
  prijs?: number;
  marketing?: string;
  consumptie_situatie?: string;
  frequentie_frituurbezoek?: string;
  openheid_nieuwe_snack?: boolean;
  motivatie_kiezen_proteine_snack?: string;
}

// Types for Team 38 frituren
export interface Frituur {
  id: string;
  bestseller_1: string;
  bestseller_2?: string;
  bestseller_3?: string;
  trends_1?: string;
  trends_2?: string;
  groothandel?: string;
  extra_groothandel?: string;
  gemiddlede_marges?: number;
  absolute_marges?: number;
  aankoopprijs?: number;
  aankoopprijs_proteine_snacks?: number;
  belangrijke_factor_1?: string;
  belangrijke_factor_2?: string;
  marketing_1?: string;
  marketing_2?: string;
  bereidheid_aanbieden?: string;
  waarom_niet_verkopen?: string;
  waarom_niet_verkopen_2?: string;
}

// Types for Team 38 street interviews
export interface StreetInterview {
  id: string;
  eerste_reactie?: string;
  verkoopskanalen?: string;
  motivatie_frituur?: string;
  populaire_snack_1?: string;
  populaire_snack_2?: string;
  eiwitgehalte?: number | string; // Accept both for input handling
  prijs?: number | string; // Accept both for input handling
  branding?: string;
  marketing_1?: string;
  marketing_2?: string;
  smaakvoorkeuren?: string;
  welke_coating?: string;
  ruimte_voor_innovatie?: boolean;
  hogere_prijs?: boolean;
  vervangen_traditionele_snack?: boolean;
  belang_van_krokantheid?: string;
  bereidingsvoorkeur?: string;
  hogere_prijs_factoren?: string;
  belangrijkst_aankoopbariere?: string;
  frituurbezoek_frequentie?: string;
}
