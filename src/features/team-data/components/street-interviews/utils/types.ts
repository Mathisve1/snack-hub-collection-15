
import { CommonValueInfo, TopValue } from "../types";

export interface GroupedStreetInterviewData {
  count: number;
  eerste_reacties: Record<string, number>;
  verkoopskanalen: Record<string, number>;
  motivatie_frituur: Record<string, number>;
  populaire_snacks: Record<string, number>;
  eiwitgehalte: Record<string, number>;
  prijzen: Record<string, number>;
  branding: Record<string, number>;
  marketing: Record<string, number>;
  smaakvoorkeuren: Record<string, number>;
  coating: Record<string, number>;
  bereidingsvoorkeur: Record<string, number>;
  hogere_prijs_factoren: Record<string, number>;
  aankoopbarrieres: Record<string, number>;
  frituurbezoek_frequentie: Record<string, number>;
  innovatie_ruimte: number[];
  hogere_prijs_bereidheid: number[];
  vervangen_traditionele_snack: number[];
  belang_krokantheid: Record<string, number>;
}
