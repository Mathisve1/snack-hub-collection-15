
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

interface RecordingInterfaceProps {
  isRecording: boolean;
  recordingDuration: number;
  onStartRecording: () => void;
  onStopRecording: () => void;
  formatDuration: (seconds: number) => string;
}

export const RecordingInterface = ({
  isRecording,
  recordingDuration,
  onStartRecording,
  onStopRecording,
  formatDuration
}: RecordingInterfaceProps) => {
  if (!isRecording) {
    return (
      <Button 
        onClick={onStartRecording} 
        className="min-w-32"
      >
        <Mic className="mr-2 h-4 w-4" /> Record Audio
      </Button>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4 animate-pulse">
        <Mic className="h-8 w-8 text-red-500" />
      </div>
      <p className="text-lg font-medium mb-2">Recording... {formatDuration(recordingDuration)}</p>
      <Button 
        variant="destructive" 
        onClick={onStopRecording}
      >
        Stop Recording
      </Button>
    </div>
  );
};
