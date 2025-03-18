
import { useState } from "react";
import VoiceRecordingCard from "./components/cards/VoiceRecordingCard";
import AnalysisResultsCard from "./components/cards/AnalysisResultsCard";

interface VoiceAnalysisSectionProps {
  team: string;
}

const VoiceAnalysisSection = ({ team }: VoiceAnalysisSectionProps) => {
  const [refreshFrituren, setRefreshFrituren] = useState(0);
  const [refreshInterviews, setRefreshInterviews] = useState(0);
  const [refreshBuyer, setRefreshBuyer] = useState(0);
  
  const handleFriturenUploadComplete = () => {
    setRefreshFrituren(prev => prev + 1);
  };

  const handleInterviewsUploadComplete = () => {
    setRefreshInterviews(prev => prev + 1);
  };

  const handleBuyerUploadComplete = () => {
    setRefreshBuyer(prev => prev + 1);
  };

  return (
    <div className="space-y-8">
      <VoiceRecordingCard 
        team={team}
        onFriturenUploadComplete={handleFriturenUploadComplete}
        onInterviewsUploadComplete={handleInterviewsUploadComplete}
        onBuyerUploadComplete={handleBuyerUploadComplete}
      />

      <AnalysisResultsCard 
        team={team}
        refreshFrituren={refreshFrituren}
        refreshInterviews={refreshInterviews}
        refreshBuyer={refreshBuyer}
      />
    </div>
  );
};

export default VoiceAnalysisSection;
