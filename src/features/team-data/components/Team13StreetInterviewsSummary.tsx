
import React from "react";
import { StreetInterview } from "../types";
import { processStreetInterviewsData } from "./street-interviews/utils/dataProcessing";
import { GroupedStreetInterviewData } from "./street-interviews/utils/types";
import ReactionsChannelsCard from "./street-interviews/cards/ReactionsChannelsCard";
import MotivationSnacksCard from "./street-interviews/cards/MotivationSnacksCard";
import ProteinPriceCard from "./street-interviews/cards/ProteinPriceCard";
import TasteCoatingCard from "./street-interviews/cards/TasteCoatingCard";
import PreparationCrunchCard from "./street-interviews/cards/PreparationCrunchCard";
import InnovationPriceCard from "./street-interviews/cards/InnovationPriceCard";
import BarriersFrequencyCard from "./street-interviews/cards/BarriersFrequencyCard";
import SummaryCard from "./street-interviews/cards/SummaryCard";
import { calculateBooleanPercentage } from "./street-interviews/utils/calculationUtils";

interface Team13StreetInterviewsSummaryProps {
  interviews: StreetInterview[];
}

const Team13StreetInterviewsSummary: React.FC<Team13StreetInterviewsSummaryProps> = ({ interviews }) => {
  // Process the data into a grouped format
  const groupedData: GroupedStreetInterviewData = processStreetInterviewsData(interviews);

  // Calculate key metrics for the summary card
  const interviewCount = groupedData.count;
  const innovationPercentage = calculateBooleanPercentage(groupedData.innovatie_ruimte);
  const higherPricePercentage = calculateBooleanPercentage(groupedData.hogere_prijs_bereidheid);
  const replaceTraditionalPercentage = calculateBooleanPercentage(groupedData.vervangen_traditionele_snack);

  return (
    <div className="space-y-6">
      {/* Summary Card - Top Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Aantal Interviews"
          value={interviewCount.toString()}
          icon="clipboard-list"
        />
        <SummaryCard
          title="Ruimte voor Innovatie"
          value={`${innovationPercentage}%`}
          icon="lightbulb"
        />
        <SummaryCard
          title="Bereid Hogere Prijs te Betalen"
          value={`${higherPricePercentage}%`}
          icon="euro"
        />
        <SummaryCard
          title="Kan Traditionele Snack Vervangen"
          value={`${replaceTraditionalPercentage}%`}
          icon="refresh-cw"
        />
      </div>

      {/* First Row of Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReactionsChannelsCard groupedData={groupedData} />
        <MotivationSnacksCard groupedData={groupedData} />
      </div>

      {/* Second Row of Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProteinPriceCard groupedData={groupedData} />
        <TasteCoatingCard groupedData={groupedData} />
      </div>

      {/* Third Row of Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PreparationCrunchCard groupedData={groupedData} />
        <InnovationPriceCard groupedData={groupedData} />
      </div>

      {/* Fourth Row - Single Full Width Card */}
      <div className="grid grid-cols-1 gap-6">
        <BarriersFrequencyCard groupedData={groupedData} />
      </div>
    </div>
  );
};

export default Team13StreetInterviewsSummary;
