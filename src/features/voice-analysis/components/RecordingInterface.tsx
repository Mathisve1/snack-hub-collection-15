
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useVoiceRecorder } from "../hooks/useVoiceRecorder";
import { useVoiceUploader } from "../hooks/useVoiceUploader";
import { VoiceAnalysisType } from "../types";
import { formatDuration } from "../utils/formatUtils";

// Define props interface for the RecordingInterface component
export interface RecordingInterfaceProps {
  team: string;
  type: VoiceAnalysisType;
}

export const RecordingInterface = ({ team, type }: RecordingInterfaceProps) => {
  const [showFileUpload, setShowFileUpload] = useState(false);
  const {
    isRecording,
    recordingBlob,
    recordingDuration,
    startRecording,
    stopRecording,
    setRecordingBlob
  } = useVoiceRecorder();
  
  const { isUploading, uploadRecording } = useVoiceUploader(team, type, () => {
    setRecordingBlob(null);
    setShowFileUpload(false);
  });
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setRecordingBlob(file);
      } else {
        toast.error("Please select an audio file");
      }
    }
  };
  
  const handleUpload = async () => {
    if (!recordingBlob) return;
    await uploadRecording(recordingBlob, recordingDuration);
  };
  
  const cancelRecording = () => {
    setRecordingBlob(null);
  };

  if (isRecording) {
    return (
      <div className="flex flex-col items-center p-8 border-2 border-dashed border-gray-200 rounded-lg">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4 animate-pulse">
          <Mic className="h-8 w-8 text-red-500" />
        </div>
        <p className="text-lg font-medium mb-2">Recording... {formatDuration(recordingDuration)}</p>
        <Button 
          variant="destructive" 
          onClick={stopRecording}
        >
          Stop Recording
        </Button>
      </div>
    );
  }

  if (recordingBlob) {
    return (
      <div className="border rounded-lg p-4">
        <p className="mb-4">Recording ready for upload {recordingDuration > 0 && `(${formatDuration(recordingDuration)})`}</p>
        <div className="flex gap-2">
          <Button 
            onClick={handleUpload} 
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" /> Upload for Analysis
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            onClick={cancelRecording}
            disabled={isUploading}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-lg">
      <p className="text-gray-500 mb-4">
        {type === 'frituren' 
          ? 'Record voice or upload audio file about your frituur visit'
          : 'Record voice or upload audio file of street interviews'
        }
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button 
          onClick={startRecording} 
          className="min-w-32"
        >
          <Mic className="mr-2 h-4 w-4" /> Record Audio
        </Button>
        
        <div className="relative">
          <Button 
            variant="outline" 
            onClick={() => setShowFileUpload(true)}
            className="min-w-32"
          >
            <Upload className="mr-2 h-4 w-4" /> Upload File
          </Button>
          {showFileUpload && (
            <input 
              type="file" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              accept="audio/*"
              onChange={handleFileSelect}
              onBlur={() => setShowFileUpload(false)}
            />
          )}
        </div>
      </div>
      
      <div className="text-sm text-gray-500 mt-2">
        <p>
          {type === 'frituren' 
            ? 'Voice recordings will be automatically analyzed for key points about frituren.'
            : 'Voice recordings will be automatically analyzed for street interview insights.'
          }
        </p>
      </div>
    </div>
  );
};
