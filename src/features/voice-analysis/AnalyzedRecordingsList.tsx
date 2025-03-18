
import RecordingsList from "./components/RecordingsList";
import { VoiceAnalysisType } from "./types";

interface AnalyzedRecordingsListProps {
  team: string;
  type: VoiceAnalysisType;
}

const AnalyzedRecordingsList = ({ team, type }: AnalyzedRecordingsListProps) => {
  return <RecordingsList team={team} type={type} />;
};

export default AnalyzedRecordingsList;
