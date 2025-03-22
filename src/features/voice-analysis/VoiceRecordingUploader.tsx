
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, File, Mic } from "lucide-react";
import { toast } from "sonner";
import { useVoiceRecorder } from "./hooks/useVoiceRecorder";
import { useVoiceUploader } from "./hooks/useVoiceUploader";
import { RecordingInterface } from "./components/RecordingInterface";
import { VoiceAnalysisType } from "./types";

interface VoiceRecordingUploaderProps {
  team: string;
  onUploadComplete: () => void;
  type: VoiceAnalysisType;
}

const VoiceRecordingUploader = ({ team, onUploadComplete, type }: VoiceRecordingUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const {
    isRecording,
    recordingBlob,
    recordingDuration,
    startRecording,
    stopRecording,
    setRecordingBlob
  } = useVoiceRecorder();
  
  const { isUploading, uploadRecording } = useVoiceUploader(team, type, onUploadComplete);
  
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };
  
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setRecordingBlob(file);
        setSelectedFileName(file.name);
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
      setSelectedFileName(null);
    }
  };
  
  const cancelRecording = () => {
    setRecordingBlob(null);
    setSelectedFileName(null);
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
                <p className="text-gray-500 mb-4">
                  {type === 'frituren' 
                    ? 'Record voice or upload audio file about your frituur visit'
                    : type === 'interviews'
                      ? 'Record voice or upload audio file of street interviews'
                      : 'Record voice or upload audio file for buyer analysis'
                  }
                </p>
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
          <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-md">
            {selectedFileName ? (
              <File className="h-8 w-8 text-blue-500" />
            ) : (
              <Mic className="h-8 w-8 text-red-500" />
            )}
            <div className="flex-1">
              <p className="font-medium">
                {selectedFileName || "Voice Recording"}
              </p>
              <div className="flex gap-4 text-sm text-gray-500">
                {recordingDuration > 0 && (
                  <span>Duration: {formatDuration(recordingDuration)}</span>
                )}
                {recordingBlob && (
                  <span>Size: {formatFileSize(recordingBlob.size)}</span>
                )}
              </div>
            </div>
          </div>
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
        <p>
          {type === 'frituren' 
            ? 'Voice recordings will be automatically analyzed for key points about frituren.'
            : type === 'interviews'
              ? 'Voice recordings will be automatically analyzed for street interview insights.'
              : 'Voice recordings will be automatically analyzed for buyer personas.'
          }
        </p>
      </div>
    </div>
  );
};

export default VoiceRecordingUploader;
