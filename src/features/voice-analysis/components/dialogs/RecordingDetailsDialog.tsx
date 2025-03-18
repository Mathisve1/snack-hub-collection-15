
import { VoiceAnalysis } from "../../types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface RecordingDetailsDialogProps {
  recording: VoiceAnalysis | null;
  audioUrl?: string;
  view: 'transcripts' | 'analyses' | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RecordingDetailsDialog = ({
  recording,
  audioUrl,
  view,
  open,
  onOpenChange,
}: RecordingDetailsDialogProps) => {
  const handlePlayAudio = () => {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {view === 'transcripts' ? 'Transcript Details' : 'Analysis Details'}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">
            Recorded {recording && new Date(recording.created_at).toLocaleString()}
          </h3>
          {recording && audioUrl && (
            <div className="mb-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePlayAudio}
              >
                Play Recording
              </Button>
            </div>
          )}
          <div className="bg-gray-50 p-4 rounded-lg border overflow-y-auto max-h-96">
            <p className="whitespace-pre-wrap text-sm">
              {view === 'transcripts' 
                ? (recording?.transcript || "No transcript available") 
                : (recording?.analysis || "No analysis available")}
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
