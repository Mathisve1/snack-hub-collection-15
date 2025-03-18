
import { VoiceAnalysis } from "../../types";
import { Card } from "@/components/ui/card";
import { AudioPlayerButton } from "../shared/AudioPlayerButton";
import { formatDistanceToNow } from "date-fns";

interface TranscriptsViewProps {
  recordings: VoiceAnalysis[];
  audioUrls: Record<string, string>;
  onShowDetails: (recording: VoiceAnalysis) => void;
}

export const TranscriptsView = ({
  recordings,
  audioUrls,
  onShowDetails,
}: TranscriptsViewProps) => {
  if (recordings.length === 0) {
    return (
      <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
        <p className="text-gray-500">No transcript recordings available yet</p>
      </div>
    );
  }

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
                  <span className="ml-2 text-xs text-gray-500">
                    ({formatDistanceToNow(new Date(recording.created_at), { addSuffix: true })})
                  </span>
                </h4>
                {audioUrls[recording.id] && (
                  <AudioPlayerButton 
                    audioUrl={audioUrls[recording.id]} 
                    className="ml-2"
                  />
                )}
              </div>
              <div className="max-h-24 overflow-y-hidden pr-2 text-sm whitespace-pre-wrap line-clamp-3">
                {recording.transcript || "No transcript available"}
              </div>
              <p className="text-xs text-blue-600 mt-2">Click to view full transcript</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
