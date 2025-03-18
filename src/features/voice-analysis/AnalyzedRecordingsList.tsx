
import { useRecordings } from "./hooks/useRecordings";
import RecordingItem from "./components/RecordingItem";
import EmptyRecordingsList from "./components/EmptyRecordingsList";
import LoadingState from "./components/LoadingState";
import { VoiceAnalysisType } from "./types";
import TeamFriturenAnalysis from "./components/TeamFriturenAnalysis";

interface AnalyzedRecordingsListProps {
  team: string;
  type: VoiceAnalysisType;
}

const AnalyzedRecordingsList = ({ team, type }: AnalyzedRecordingsListProps) => {
  const { recordings, loading, audioUrls } = useRecordings(team, type);

  if (loading) {
    return <LoadingState />;
  }

  if (recordings.length === 0) {
    return <EmptyRecordingsList />;
  }

  if (type === 'frituren') {
    return <TeamFriturenAnalysis recordings={recordings} />;
  }

  return (
    <div className="space-y-4">
      {recordings.map((recording) => (
        <RecordingItem 
          key={recording.id} 
          recording={recording}
          audioUrl={audioUrls[recording.id]}
        />
      ))}
    </div>
  );
};

export default AnalyzedRecordingsList;
