
import { useState } from "react";
import VoiceAnalysisTabs from "./components/VoiceAnalysisTabs";

interface VoiceAnalysisSectionProps {
  team: string;
}

const VoiceAnalysisSection = ({ team }: VoiceAnalysisSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
      <h2 className="text-xl font-semibold mb-4">Voice Analysis</h2>
      <p className="mb-4 text-gray-500">
        Record and analyze interviews from customers or team discussions about frituren.
      </p>
      
      <VoiceAnalysisTabs team={team} />
    </div>
  );
};

export default VoiceAnalysisSection;
