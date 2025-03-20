
import React from "react";
import { useTeam13StreetInterviews } from "../hooks/useTeam13Data";
import { Loader2 } from "lucide-react";
import { processStreetInterviewsData } from "./street-interviews/utils";
import ReactionsChannelsCard from "./street-interviews/cards/ReactionsChannelsCard";
import MotivationSnacksCard from "./street-interviews/cards/MotivationSnacksCard";
import ProteinPriceCard from "./street-interviews/cards/ProteinPriceCard";
import TasteCoatingCard from "./street-interviews/cards/TasteCoatingCard";
import PreparationCrunchCard from "./street-interviews/cards/PreparationCrunchCard";
import InnovationPriceCard from "./street-interviews/cards/InnovationPriceCard";
import BarriersFrequencyCard from "./street-interviews/cards/BarriersFrequencyCard";

const Team13StreetInterviewsSummary = () => {
  const { data: interviews, loading, error } = useTeam13StreetInterviews();
  
  console.log("Team13StreetInterviewsSummary rendering with data:", interviews?.length);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading street interviews data: {error}
      </div>
    );
  }

  if (!interviews || interviews.length === 0) {
    return (
      <div className="p-4 text-gray-500 text-center">
        No street interviews data available.
      </div>
    );
  }

  // Process the raw data for visualization
  const processedData = processStreetInterviewsData(interviews);
  
  console.log("Processed street interview data:", processedData);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Street Interview Analysis Summary</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* First reactions and channels */}
        <ReactionsChannelsCard data={processedData} />
        
        {/* Motivation and popular snacks */}
        <MotivationSnacksCard data={processedData} />
        
        {/* Protein content and price */}
        <ProteinPriceCard data={processedData} />
        
        {/* Taste preferences and coating */}
        <TasteCoatingCard data={processedData} />
        
        {/* Preparation and crunchiness */}
        <PreparationCrunchCard data={processedData} />
        
        {/* Innovation and price willingness */}
        <InnovationPriceCard data={processedData} />
        
        {/* Purchase barriers and frequency */}
        <BarriersFrequencyCard data={processedData} />
      </div>
    </div>
  );
};

export default Team13StreetInterviewsSummary;
