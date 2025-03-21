
import { GroupedStreetInterviewData } from "./types";
import { extractNumericValues, getTopNValues } from "./responseUtils";
import { categorizeNumericValues } from "./dataUtils";

/**
 * Extracts and calculates key metrics from the grouped street interview data
 */
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
