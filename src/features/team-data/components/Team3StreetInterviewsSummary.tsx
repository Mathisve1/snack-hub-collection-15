
import { StreetInterview } from "../types";
import { 
  processStreetInterviewsData
} from "./street-interviews/utils";
import { 
  getMostCommon, 
  calculateBooleanPercentage, 
  formatBreakdown,
  calculateAverageResponse,
  calculateAverageFromRecord
} from "./street-interviews/utils/responseUtils";

// Import the card components
import ReactionsChannelsCard from "./street-interviews/cards/ReactionsChannelsCard";
import MotivationSnacksCard from "./street-interviews/cards/MotivationSnacksCard";
import ProteinPriceCard from "./street-interviews/cards/ProteinPriceCard";
import TasteCoatingCard from "./street-interviews/cards/TasteCoatingCard";
import PreparationCrunchCard from "./street-interviews/cards/PreparationCrunchCard";
import BarriersFrequencyCard from "./street-interviews/cards/BarriersFrequencyCard";
import AverageResponseCard from "./street-interviews/cards/AverageResponseCard";
import InnovationPriceCard from "./street-interviews/cards/InnovationPriceCard";

type Team3StreetInterviewsSummaryProps = {
  data: StreetInterview[];
};

const Team3StreetInterviewsSummary = ({ data }: Team3StreetInterviewsSummaryProps) => {
  console.log("Rendering Team3StreetInterviewsSummary with data:", data);
  
  const processedData = processStreetInterviewsData(data);
  console.log("Processed data:", processedData);
  
  const eersteReactieInfo = getMostCommon(processedData.eerste_reacties);
  const verkoopskanalenInfo = getMostCommon(processedData.verkoopskanalen);
  const motivatieInfo = getMostCommon(processedData.motivatie_frituur);
  const populaireSnackInfo = getMostCommon(processedData.populaire_snacks);
  const eiwitgehalteInfo = getMostCommon(processedData.eiwitgehalte);
  const prijsInfo = getMostCommon(processedData.prijzen);
  const smaakvoorkeurenInfo = getMostCommon(processedData.smaakvoorkeuren);
  const coatingInfo = getMostCommon(processedData.coating);
  const bereidingsvoorkeurInfo = getMostCommon(processedData.bereidingsvoorkeur);
  const belangKrokantheidInfo = getMostCommon(processedData.belang_krokantheid);
  const aankoopbarriereInfo = getMostCommon(processedData.aankoopbarrieres);
  const frequentieInfo = getMostCommon(processedData.frituurbezoek_frequentie);
  
  const innovatieRuimtePercentage = calculateBooleanPercentage(processedData.innovatie_ruimte);
  const hogerePrijsPercentage = calculateBooleanPercentage(processedData.hogere_prijs_bereidheid);
  const vervangenTraditionalPercentage = calculateBooleanPercentage(processedData.vervangen_traditionele_snack);
  
  const gemiddeldePositiefResponse = calculateAverageResponse(data);
  
  const gemiddeldeEiwitgehalte = calculateAverageFromRecord(processedData.eiwitgehalte);
  const gemiddeldePrijs = calculateAverageFromRecord(processedData.prijzen);
  
  // Convert top info to format expected by card components
  const topFirstReactions = eersteReactieInfo.map(info => ({
    name: info.value, 
    count: info.count, 
    percentage: info.percentage
  }));
  
  const topSalesChannels = verkoopskanalenInfo.map(info => ({
    name: info.value, 
    count: info.count, 
    percentage: info.percentage
  }));
  
  const topMotivations = motivatieInfo.map(info => ({
    name: info.value, 
    count: info.count, 
    percentage: info.percentage
  }));
  
  const topSnacks = populaireSnackInfo.map(info => ({
    name: info.value, 
    count: info.count, 
    percentage: info.percentage
  }));
  
  const topTastes = smaakvoorkeurenInfo.map(info => ({
    name: info.value, 
    count: info.count, 
    percentage: info.percentage
  }));
  
  const topCoatings = coatingInfo.map(info => ({
    name: info.value, 
    count: info.count, 
    percentage: info.percentage
  }));
  
  const topPreparations = bereidingsvoorkeurInfo.map(info => ({
    name: info.value, 
    count: info.count, 
    percentage: info.percentage
  }));
  
  const topImportanceCrunch = belangKrokantheidInfo.map(info => ({
    name: info.value, 
    count: info.count, 
    percentage: info.percentage
  }));
  
  const topBarriers = aankoopbarriereInfo.map(info => ({
    name: info.value, 
    count: info.count, 
    percentage: info.percentage
  }));
  
  const topFrequencies = frequentieInfo.map(info => ({
    name: info.value, 
    count: info.count, 
    percentage: info.percentage
  }));
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <ReactionsChannelsCard 
        topFirstReactions={topFirstReactions}
        topSalesChannels={topSalesChannels}
        eersteReactiesTotal={Object.values(processedData.eerste_reacties).reduce((sum, val) => sum + val, 0)}
        verkoopskanalenTotal={Object.values(processedData.verkoopskanalen).reduce((sum, val) => sum + val, 0)}
      />

      <MotivationSnacksCard 
        topMotivations={topMotivations}
        topSnacks={topSnacks}
        motivationTotal={Object.values(processedData.motivatie_frituur).reduce((sum, val) => sum + val, 0)}
        snacksTotal={Object.values(processedData.populaire_snacks).reduce((sum, val) => sum + val, 0)}
      />

      <ProteinPriceCard 
        avgProtein={Number(gemiddeldeEiwitgehalte) || 0}
        avgPrice={Number(gemiddeldePrijs) || 0}
        proteinRanges={processedData.eiwitgehalte}
        priceRanges={processedData.prijzen}
      />

      <TasteCoatingCard 
        topTastes={topTastes}
        topCoatings={topCoatings}
        tastesTotal={Object.values(processedData.smaakvoorkeuren).reduce((sum, val) => sum + val, 0)}
        coatingsTotal={Object.values(processedData.coating).reduce((sum, val) => sum + val, 0)}
      />

      <PreparationCrunchCard 
        topPreparations={topPreparations}
        topImportanceCrunch={topImportanceCrunch}
        preparationsTotal={Object.values(processedData.bereidingsvoorkeur).reduce((sum, val) => sum + val, 0)}
        crunchImportanceTotal={Object.values(processedData.belang_krokantheid).reduce((sum, val) => sum + val, 0)}
      />

      <BarriersFrequencyCard 
        topBarriers={topBarriers}
        topFrequencies={topFrequencies}
        barriersTotal={Object.values(processedData.aankoopbarrieres).reduce((sum, val) => sum + val, 0)}
        frequenciesTotal={Object.values(processedData.frituurbezoek_frequentie).reduce((sum, val) => sum + val, 0)}
      />

      <AverageResponseCard 
        gemiddeldePositiefResponse={gemiddeldePositiefResponse}
        gemiddeldeEiwitgehalte={gemiddeldeEiwitgehalte}
        gemiddeldePrijs={gemiddeldePrijs}
      />

      <InnovationPriceCard 
        innovationPercentage={innovatieRuimtePercentage}
        higherPricePercentage={hogerePrijsPercentage}
        replaceTradSnackPercentage={vervangenTraditionalPercentage}
      />
    </div>
  );
};

export default Team3StreetInterviewsSummary;
