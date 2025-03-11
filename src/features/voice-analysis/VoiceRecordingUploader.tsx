
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useVoiceRecorder } from "./hooks/useVoiceRecorder";
import { useVoiceUploader } from "./hooks/useVoiceUploader";
import { RecordingInterface } from "./components/RecordingInterface";

interface VoiceRecordingUploaderProps {
  team: string;
  onUploadComplete: () => void;
}

const VoiceRecordingUploader = ({ team, onUploadComplete }: VoiceRecordingUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    isRecording,
    recordingBlob,
    recordingDuration,
    startRecording,
    stopRecording,
    setRecordingBlob
  } = useVoiceRecorder();
  
  const { isUploading, uploadRecording } = useVoiceUploader(team, onUploadComplete);
  
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const success = await uploadRecording(recordingBlob, recordingDuration);
    if (success) {
      setRecordingBlob(null);
    }
  };
  
  const cancelRecording = () => {
    setRecordingBlob(null);
  };

  return (
    <div className="space-y-4">
      <input 
        type="file" 
        ref={fileInputRef}
        className="hidden" 
        accept="audio/*"
        onChange={handleFileChange}
      />

      {!recordingBlob ? (
        <div className="flex flex-col gap-4 items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-lg">
          {!isRecording ? (
            <>
              <div className="mb-2 text-center">
                <p className="text-gray-500 mb-4">Record voice or upload audio file for analysis</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <RecordingInterface
                    isRecording={isRecording}
                    recordingDuration={recordingDuration}
                    onStartRecording={startRecording}
                    onStopRecording={stopRecording}
                    formatDuration={formatDuration}
                  />
                  <Button 
                    variant="outline" 
                    onClick={handleFileSelect}
                    className="min-w-32"
                  >
                    <Upload className="mr-2 h-4 w-4" /> Upload File
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <RecordingInterface
              isRecording={isRecording}
              recordingDuration={recordingDuration}
              onStartRecording={startRecording}
              onStopRecording={stopRecording}
              formatDuration={formatDuration}
            />
          )}
        </div>
      ) : (
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
      )}
      
      <div className="text-sm text-gray-500 mt-2">
        <p>Voice recordings will be automatically analyzed for key points about frituren.</p>
      </div>
    </div>
  );
};

export default VoiceRecordingUploader;
