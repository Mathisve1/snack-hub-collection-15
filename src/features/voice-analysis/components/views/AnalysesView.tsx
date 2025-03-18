
import { VoiceAnalysis } from "../../types";
import { Card } from "@/components/ui/card";
import { AudioPlayerButton } from "../shared/AudioPlayerButton";

interface AnalysesViewProps {
  recordings: VoiceAnalysis[];
  audioUrls: Record<string, string>;
  onShowDetails: (recording: VoiceAnalysis) => void;
}

export const AnalysesView = ({
  recordings,
  audioUrls,
  onShowDetails,
}: AnalysesViewProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {recordings.map((recording) => (
          <Card 
            key={recording.id} 
            className="p-4 border rounded-lg overflow-hidden cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => onShowDetails(recording)}
          >
            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-semibold text-gray-700">
                  {new Date(recording.created_at).toLocaleString()}
                </h4>
                {audioUrls[recording.id] && (
                  <AudioPlayerButton 
                    audioUrl={audioUrls[recording.id]} 
                  />
                )}
              </div>
              <div className="max-h-20 overflow-y-hidden pr-2 text-sm whitespace-pre-wrap line-clamp-3">
                {recording.analysis || "No analysis available"}
              </div>
              <p className="text-xs text-blue-600 mt-2">Click to view full analysis</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
