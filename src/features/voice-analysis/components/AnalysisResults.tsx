
import { useState } from "react";
import { useRecordings } from "../hooks/useRecordings";
import { TranscriptsView } from "./views/TranscriptsView";
import { AnalysesView } from "./views/AnalysesView";
import { VoiceAnalysis, VoiceAnalysisType } from "../types";
import { RecordingDetailsDialog } from "./dialogs/RecordingDetailsDialog";
import LoadingState from "./LoadingState";

interface AnalysisResultsProps {
  team: string;
  type: VoiceAnalysisType;
  viewMode: 'transcripts' | 'analyses';
}

const AnalysisResults = ({ team, type, viewMode }: AnalysisResultsProps) => {
  const { recordings, loading, audioUrls } = useRecordings(team, type);
  const [selectedRecording, setSelectedRecording] = useState<VoiceAnalysis | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  console.log(`AnalysisResults - Team: ${team}, Type: ${type}, ViewMode: ${viewMode}`);
  console.log(`AnalysisResults - Recordings count: ${recordings.length}`);

  if (loading) {
    return <LoadingState />;
  }

  const handleShowDetails = (recording: VoiceAnalysis) => {
    setSelectedRecording(recording);
    setDialogOpen(true);
  };

  return (
    <div>
      {viewMode === 'transcripts' ? (
        <TranscriptsView 
          recordings={recordings}
          audioUrls={audioUrls}
          onShowDetails={handleShowDetails}
        />
      ) : (
        <AnalysesView 
          recordings={recordings}
          audioUrls={audioUrls}
          onShowDetails={handleShowDetails}
        />
      )}

      <RecordingDetailsDialog
        recording={selectedRecording}
        audioUrl={selectedRecording ? audioUrls[selectedRecording.id] : undefined}
        view={viewMode}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default AnalysisResults;
