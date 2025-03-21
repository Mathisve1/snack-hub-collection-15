import { StreetInterview } from "../../../types";
import { GroupedStreetInterviewData } from "./types";
import { extractNumericValues, getTopNValues } from "./responseUtils";

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

    // Process boolean fields - convert booleans to numeric array (0/1)
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
  if (!value) return;
  
  const normalizedValue = value.trim();
  if (normalizedValue) {
    counter[normalizedValue] = (counter[normalizedValue] || 0) + 1;
  }
};

// Extract key metrics for display
export const extractStreetInterviewMetrics = (data: GroupedStreetInterviewData) => {
  // Get top values for each category
  const topFirstReactions = getTopNValues(data.eerste_reacties);
  const topSalesChannels = getTopNValues(data.verkoopskanalen);
  const topMotivations = getTopNValues(data.motivatie_frituur);
  const topSnacks = getTopNValues(data.populaire_snacks);
  const topTastes = getTopNValues(data.smaakvoorkeuren);
  const topCoatings = getTopNValues(data.coating);
  const topPreparations = getTopNValues(data.bereidingsvoorkeur);
  const topCrunchImportance = getTopNValues(data.belang_krokantheid);
  const topBarriers = getTopNValues(data.aankoopbarrieres);
  const topFrequencies = getTopNValues(data.frituurbezoek_frequentie);
  const topPriceFactors = getTopNValues(data.hogere_prijs_factoren);

  // Calculate totals
  const eersteReactiesTotal = Object.values(data.eerste_reacties).reduce((sum, count) => sum + count, 0);
  const verkoopskanalenTotal = Object.values(data.verkoopskanalen).reduce((sum, count) => sum + count, 0);
  const motivationTotal = Object.values(data.motivatie_frituur).reduce((sum, count) => sum + count, 0);
  const snacksTotal = Object.values(data.populaire_snacks).reduce((sum, count) => sum + count, 0);
  const tastesTotal = Object.values(data.smaakvoorkeuren).reduce((sum, count) => sum + count, 0);
  const coatingsTotal = Object.values(data.coating).reduce((sum, count) => sum + count, 0);
  const preparationsTotal = Object.values(data.bereidingsvoorkeur).reduce((sum, count) => sum + count, 0);
  const crunchImportanceTotal = Object.values(data.belang_krokantheid).reduce((sum, count) => sum + count, 0);
  const barriersTotal = Object.values(data.aankoopbarrieres).reduce((sum, count) => sum + count, 0);
  const frequenciesTotal = Object.values(data.frituurbezoek_frequentie).reduce((sum, count) => sum + count, 0);

  // Calculate percentages for boolean fields
  const innovationPercentage = data.innovatie_ruimte.length > 0 
    ? Math.round((data.innovatie_ruimte.reduce((sum, val) => sum + val, 0) / data.innovatie_ruimte.length) * 100)
    : 0;
    
  const higherPricePercentage = data.hogere_prijs_bereidheid.length > 0
    ? Math.round((data.hogere_prijs_bereidheid.reduce((sum, val) => sum + val, 0) / data.hogere_prijs_bereidheid.length) * 100)
    : 0;
    
  const replaceTradSnackPercentage = data.vervangen_traditionele_snack.length > 0
    ? Math.round((data.vervangen_traditionele_snack.reduce((sum, val) => sum + val, 0) / data.vervangen_traditionele_snack.length) * 100)
    : 0;

  // Calculate averages for numeric fields
  const proteinValues = extractNumericValues(data.eiwitgehalte);
  const priceValues = extractNumericValues(data.prijzen);
  
  const avgProtein = proteinValues.length > 0
    ? parseFloat((proteinValues.reduce((sum, val) => sum + val, 0) / proteinValues.length).toFixed(1))
    : 0;
    
  const avgPrice = priceValues.length > 0
    ? parseFloat((priceValues.reduce((sum, val) => sum + val, 0) / priceValues.length).toFixed(1))
    : 0;

  return {
    topFirstReactions,
    topSalesChannels,
    topMotivations,
    topSnacks,
    topTastes,
    topCoatings,
    topPreparations,
    topCrunchImportance,
    topBarriers,
    topFrequencies,
    topPriceFactors,
    eersteReactiesTotal,
    verkoopskanalenTotal,
    motivationTotal,
    snacksTotal,
    tastesTotal,
    coatingsTotal,
    preparationsTotal,
    crunchImportanceTotal,
    barriersTotal,
    frequenciesTotal,
    innovationPercentage,
    higherPricePercentage,
    replaceTradSnackPercentage,
    avgProtein,
    avgPrice,
    proteinRanges: categorizeNumericValues(data.eiwitgehalte),
    priceRanges: categorizeNumericValues(data.prijzen)
  };
};

// Helper function to categorize numeric values
const categorizeNumericValues = (record: Record<string, number>): Record<string, number> => {
  const categories: Record<string, number> = {};
  
  for (const [valueStr, count] of Object.entries(record)) {
    const value = parseFloat(valueStr);
    if (isNaN(value)) continue;
    
    let category: string;
    // Categorize based on value ranges (adjust for your data)
    if (value < 5) category = "< 5";
    else if (value < 10) category = "5-10";
    else if (value < 15) category = "10-15";
    else if (value < 20) category = "15-20";
    else category = "20+";
    
    categories[category] = (categories[category] || 0) + count;
  }
  
  return categories;
};

