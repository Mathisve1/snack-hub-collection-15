
import { StreetInterview } from "../../types";
import { 
  processStreetInterviewsData, 
  getMostCommon, 
  calculateBooleanPercentage, 
  formatBreakdown,
  calculateAverageResponse,
  calculateAverageFromRecord
} from "./utils";

// Import the card components
import ReactionsChannelsCard from "./cards/ReactionsChannelsCard";
import MotivationSnacksCard from "./cards/MotivationSnacksCard";
import ProteinPriceCard from "./cards/ProteinPriceCard";
import TasteCoatingCard from "./cards/TasteCoatingCard";
import PreparationCrunchCard from "./cards/PreparationCrunchCard";
import BarriersFrequencyCard from "./cards/BarriersFrequencyCard";
import AverageResponseCard from "./cards/AverageResponseCard";
import InnovationPriceCard from "./cards/InnovationPriceCard";

type StreetInterviewsSummaryProps = {
  data: StreetInterview[];
};

const StreetInterviewsSummary = ({ data }: StreetInterviewsSummaryProps) => {
  console.log("Rendering StreetInterviewsSummary with data:", data);
  
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
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <ReactionsChannelsCard 
        eersteReactieInfo={eersteReactieInfo}
        verkoopskanalenInfo={verkoopskanalenInfo}
        eerste_reacties={processedData.eerste_reacties}
        verkoopskanalen={processedData.verkoopskanalen}
        formatBreakdown={formatBreakdown}
      />

      <MotivationSnacksCard 
        motivatieInfo={motivatieInfo}
        populaireSnackInfo={populaireSnackInfo}
        motivatie_frituur={processedData.motivatie_frituur}
        populaire_snacks={processedData.populaire_snacks}
        formatBreakdown={formatBreakdown}
      />

      <ProteinPriceCard 
        eiwitgehalteInfo={eiwitgehalteInfo}
        prijsInfo={prijsInfo}
        gemiddeldeEiwitgehalte={gemiddeldeEiwitgehalte}
        gemiddeldePrijs={gemiddeldePrijs}
        eiwitgehalte={processedData.eiwitgehalte}
        prijzen={processedData.prijzen}
        formatBreakdown={formatBreakdown}
      />

      <TasteCoatingCard 
        smaakvoorkeurenInfo={smaakvoorkeurenInfo}
        coatingInfo={coatingInfo}
        smaakvoorkeuren={processedData.smaakvoorkeuren}
        coating={processedData.coating}
        formatBreakdown={formatBreakdown}
      />

      <PreparationCrunchCard 
        bereidingsvoorkeurInfo={bereidingsvoorkeurInfo}
        belangKrokantheidInfo={belangKrokantheidInfo}
        bereidingsvoorkeur={processedData.bereidingsvoorkeur}
        belang_krokantheid={processedData.belang_krokantheid}
        formatBreakdown={formatBreakdown}
      />

      <BarriersFrequencyCard 
        aankoopbarriereInfo={aankoopbarriereInfo}
        frequentieInfo={frequentieInfo}
        aankoopbarrieres={processedData.aankoopbarrieres}
        frituurbezoek_frequentie={processedData.frituurbezoek_frequentie}
        formatBreakdown={formatBreakdown}
      />

      <AverageResponseCard 
        gemiddeldePositiefResponse={gemiddeldePositiefResponse}
        gemiddeldeEiwitgehalte={gemiddeldeEiwitgehalte}
        gemiddeldePrijs={gemiddeldePrijs}
      />

      <InnovationPriceCard 
        innovatieRuimtePercentage={innovatieRuimtePercentage}
        hogerePrijsPercentage={hogerePrijsPercentage}
        vervangenTraditionalPercentage={vervangenTraditionalPercentage}
      />
    </div>
  );
};

export default StreetInterviewsSummary;
