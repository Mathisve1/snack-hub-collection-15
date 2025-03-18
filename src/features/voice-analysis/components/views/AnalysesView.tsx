
import { VoiceAnalysis } from "../../types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { AudioPlayerButton } from "../shared/AudioPlayerButton";

interface AnalysesViewProps {
  recordings: VoiceAnalysis[];
  audioUrls: Record<string, string>;
  onBack: () => void;
  onShowDetails: (recording: VoiceAnalysis) => void;
}

export const AnalysesView = ({
  recordings,
  audioUrls,
  onBack,
  onShowDetails,
}: AnalysesViewProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Analyses</h3>
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
      </div>
      
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
