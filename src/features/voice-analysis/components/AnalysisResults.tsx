
import { useState } from "react";
import { useRecordings } from "../hooks/useRecordings";
import { VoiceAnalysisType, VoiceAnalysis } from "../types";
import { MainMenuView } from "./views/MainMenuView";
import { TranscriptsView } from "./views/TranscriptsView";
import { AnalysesView } from "./views/AnalysesView";
import { RecordingDetailsDialog } from "./dialogs/RecordingDetailsDialog";
import { RecordingsLoadingState } from "./shared/RecordingsLoadingState";
import { EmptyRecordingsState } from "./shared/EmptyRecordingsState";

interface AnalysisResultsProps {
  team: string;
  type: VoiceAnalysisType;
}

const AnalysisResults = ({ team, type }: AnalysisResultsProps) => {
  const { recordings, loading, audioUrls } = useRecordings(team, type);
  const [view, setView] = useState<'transcripts' | 'analyses' | null>(null);
  const [selectedRecording, setSelectedRecording] = useState<VoiceAnalysis | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  
  // Filter recordings to only show those for the current team
  const teamRecordings = recordings.filter(recording => recording.team === team);
  
  if (loading) {
    return <RecordingsLoadingState />;
  }

  if (teamRecordings.length === 0) {
    return <EmptyRecordingsState type={type} />;
  }

  const handleShowDetails = (recording: VoiceAnalysis) => {
    setSelectedRecording(recording);
    setShowDetailsDialog(true);
  };

  const handleBackToMenu = () => {
    setView(null);
  };

  // Render the appropriate view based on the current state
  if (view === 'transcripts') {
    return (
      <TranscriptsView 
        recordings={teamRecordings}
        audioUrls={audioUrls}
        onBack={handleBackToMenu}
        onShowDetails={handleShowDetails}
      />
    );
  }

  if (view === 'analyses') {
    return (
      <AnalysesView 
        recordings={teamRecordings}
        audioUrls={audioUrls}
        onBack={handleBackToMenu}
        onShowDetails={handleShowDetails}
      />
    );
  }

  return (
    <>
      <MainMenuView 
        onSelectView={setView} 
        type={type} 
      />

      <RecordingDetailsDialog
        recording={selectedRecording}
        audioUrl={selectedRecording ? audioUrls[selectedRecording.id] : undefined}
        view={view}
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
      />
    </>
  );
};

export default AnalysisResults;
