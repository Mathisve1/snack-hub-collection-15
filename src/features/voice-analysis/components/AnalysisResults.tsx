
import { useState } from "react";
import { useRecordings } from "../hooks/useRecordings";
import { VoiceAnalysisType, VoiceAnalysis } from "../types";
import { Card } from "@/components/ui/card";
import { AudioLines, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

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
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
        <span className="ml-3 text-gray-600">Loading recordings...</span>
      </div>
    );
  }

  if (teamRecordings.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
        <AudioLines className="h-12 w-12 mx-auto text-gray-400 mb-3" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">No recordings available</h3>
        <p className="text-gray-500">
          Upload a voice recording for {type} analysis to see the results here.
        </p>
      </div>
    );
  }

  const handleShowDetails = (recording: VoiceAnalysis) => {
    setSelectedRecording(recording);
    setShowDetailsDialog(true);
  };

  const handlePlayAudio = (recordingId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const audioUrl = audioUrls[recordingId];
    
    if (!audioUrl) {
      toast.error("Audio file not available");
      return;
    }
    
    const audio = new Audio(audioUrl);
    audio.play().catch(error => {
      console.error("Error playing audio:", error);
      toast.error("Failed to play audio");
    });
  };

  if (view === 'transcripts') {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Transcripts</h3>
          <Button variant="outline" size="sm" onClick={() => setView(null)}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {teamRecordings.map((recording) => (
            <Card 
              key={recording.id} 
              className="p-4 border rounded-lg overflow-hidden cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => handleShowDetails(recording)}
            >
              <div className="bg-gray-50 p-4 rounded-lg border">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-semibold text-gray-700">
                    {new Date(recording.created_at).toLocaleString()}
                  </h4>
                  {audioUrls[recording.id] && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => handlePlayAudio(recording.id, e)}
                    >
                      Play Audio
                    </Button>
                  )}
                </div>
                <div className="max-h-20 overflow-y-hidden pr-2 text-sm whitespace-pre-wrap line-clamp-3">
                  {recording.transcript || "No transcript available"}
                </div>
                <p className="text-xs text-blue-600 mt-2">Click to view full transcript</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'analyses') {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Analyses</h3>
          <Button variant="outline" size="sm" onClick={() => setView(null)}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {teamRecordings.map((recording) => (
            <Card 
              key={recording.id} 
              className="p-4 border rounded-lg overflow-hidden cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => handleShowDetails(recording)}
            >
              <div className="bg-gray-50 p-4 rounded-lg border">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-semibold text-gray-700">
                    {new Date(recording.created_at).toLocaleString()}
                  </h4>
                  {audioUrls[recording.id] && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => handlePlayAudio(recording.id, e)}
                    >
                      Play Audio
                    </Button>
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
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          className="p-8 border rounded-lg overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer flex flex-col items-center justify-center text-center"
          onClick={() => setView('transcripts')}
        >
          <h3 className="text-xl font-semibold mb-2">Transcripts</h3>
          <p className="text-gray-500">
            View all transcriptions of your {type} recordings
          </p>
        </div>

        <div 
          className="p-8 border rounded-lg overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer flex flex-col items-center justify-center text-center"
          onClick={() => setView('analyses')}
        >
          <h3 className="text-xl font-semibold mb-2">Analysis</h3>
          <p className="text-gray-500">
            View all AI analyses of your {type} recordings
          </p>
        </div>
      </div>

      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {view === 'transcripts' ? 'Transcript Details' : 'Analysis Details'}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">
              Recorded {selectedRecording && new Date(selectedRecording.created_at).toLocaleString()}
            </h3>
            {selectedRecording && audioUrls[selectedRecording.id] && (
              <div className="mb-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    const audio = new Audio(audioUrls[selectedRecording.id]);
                    audio.play().catch(error => {
                      console.error("Error playing audio:", error);
                      toast.error("Failed to play audio");
                    });
                  }}
                >
                  Play Recording
                </Button>
              </div>
            )}
            <div className="bg-gray-50 p-4 rounded-lg border overflow-y-auto max-h-96">
              <p className="whitespace-pre-wrap text-sm">
                {view === 'transcripts' 
                  ? (selectedRecording?.transcript || "No transcript available") 
                  : (selectedRecording?.analysis || "No analysis available")}
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AnalysisResults;
