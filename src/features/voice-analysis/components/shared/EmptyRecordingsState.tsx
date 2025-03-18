
import { AudioLines } from "lucide-react";
import { VoiceAnalysisType } from "../../types";

interface EmptyRecordingsStateProps {
  type: VoiceAnalysisType;
}

export const EmptyRecordingsState = ({ type }: EmptyRecordingsStateProps) => {
  return (
    <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
      <AudioLines className="h-12 w-12 mx-auto text-gray-400 mb-3" />
      <h3 className="text-lg font-medium text-gray-900 mb-1">No recordings available</h3>
      <p className="text-gray-500">
        Upload a voice recording for {type} analysis to see the results here.
      </p>
    </div>
  );
};
