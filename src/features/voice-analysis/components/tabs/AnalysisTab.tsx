
import { VoiceAnalysisType } from "../../types";
import VoiceRecordingUploader from "../../VoiceRecordingUploader";

interface AnalysisTabProps {
  team: string;
  type: VoiceAnalysisType;
  onUploadComplete: () => void;
}

const AnalysisTab = ({ team, type, onUploadComplete }: AnalysisTabProps) => {
  return (
    <VoiceRecordingUploader 
      team={team} 
      onUploadComplete={onUploadComplete}
      type={type}
    />
  );
};

export default AnalysisTab;
