
import { useState } from "react";
import { useRecordings } from "../hooks/useRecordings";
import { VoiceAnalysisType, VoiceAnalysis } from "../types";
import { TranscriptsView } from "./views/TranscriptsView";
import { AnalysesView } from "./views/AnalysesView";
import { RecordingDetailsDialog } from "./dialogs/RecordingDetailsDialog";
import { RecordingsLoadingState } from "./shared/RecordingsLoadingState";
import { EmptyRecordingsState } from "./shared/EmptyRecordingsState";

interface AnalysisResultsProps {
  team: string;
  type: VoiceAnalysisType;
  viewMode?: 'transcripts' | 'analyses';
}

const AnalysisResults = ({ team, type, viewMode }: AnalysisResultsProps) => {
  const { recordings, loading, audioUrls } = useRecordings(team, type);
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

  // Render the appropriate view based on the viewMode prop
  if (viewMode === 'transcripts') {
    return (
      <>
        <TranscriptsView 
          recordings={teamRecordings}
          audioUrls={audioUrls}
          onShowDetails={handleShowDetails}
        />
        <RecordingDetailsDialog
          recording={selectedRecording}
          audioUrl={selectedRecording ? audioUrls[selectedRecording.id] : undefined}
          view="transcripts"
          open={showDetailsDialog}
          onOpenChange={setShowDetailsDialog}
        />
      </>
    );
  }

  if (viewMode === 'analyses') {
    return (
      <>
        <AnalysesView 
          recordings={teamRecordings}
          audioUrls={audioUrls}
          onShowDetails={handleShowDetails}
        />
        <RecordingDetailsDialog
          recording={selectedRecording}
          audioUrl={selectedRecording ? audioUrls[selectedRecording.id] : undefined}
          view="analyses"
          open={showDetailsDialog}
          onOpenChange={setShowDetailsDialog}
        />
      </>
    );
  }

  // If no viewMode is provided, show a simple list of recordings
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Recent Recordings</h3>
      <div className="grid grid-cols-1 gap-4">
        {teamRecordings.slice(0, 5).map((recording) => (
          <div 
            key={recording.id} 
            className="p-4 border rounded-lg overflow-hidden cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => handleShowDetails(recording)}
          >
            <p className="text-sm font-medium">
              {new Date(recording.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <RecordingDetailsDialog
        recording={selectedRecording}
        audioUrl={selectedRecording ? audioUrls[selectedRecording.id] : undefined}
        view={null}
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
      />
    </div>
  );
};

export default AnalysisResults;
