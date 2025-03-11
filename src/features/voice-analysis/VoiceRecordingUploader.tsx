import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Upload, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

interface VoiceRecordingUploaderProps {
  team: string;
  onUploadComplete: () => void;
}

const VoiceRecordingUploader = ({ team, onUploadComplete }: VoiceRecordingUploaderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setRecordingBlob(blob);
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingDuration(0);
      
      // Start a timer to update duration
      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Could not access microphone. Please check permissions.");
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };
  
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
  
  const uploadRecording = async () => {
    if (!recordingBlob) return;
    
    setIsUploading(true);
    try {
      // Generate unique filename
      const fileName = `${uuidv4()}-voice-recording.webm`;
      
      // Upload to Storage
      const { data: fileData, error: uploadError } = await supabase
        .storage
        .from('frituur-attachments')
        .upload(fileName, recordingBlob);
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Get the public URL
      const { data: publicUrlData } = supabase
        .storage
        .from('frituur-attachments')
        .getPublicUrl(fileName);
      
      const publicUrl = publicUrlData.publicUrl;
      
      // Insert record into database
      const { error: insertError } = await supabase
        .from('voice_analysis')
        .insert({
          team,
          recording_url: publicUrl,
          status: 'pending',
          created_at: new Date().toISOString(),
          duration_seconds: recordingDuration,
          file_name: fileName,
        });
      
      if (insertError) {
        throw insertError;
      }
      
      toast.success("Recording uploaded for analysis");
      setRecordingBlob(null);
      onUploadComplete();
      
    } catch (error) {
      console.error("Error uploading recording:", error);
      toast.error("Failed to upload recording");
    } finally {
      setIsUploading(false);
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
                  <Button 
                    onClick={startRecording} 
                    className="min-w-32"
                  >
                    <Mic className="mr-2 h-4 w-4" /> Record Audio
                  </Button>
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
            <div className="flex flex-col items-center">
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
          )}
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <p className="mb-4">Recording ready for upload {recordingDuration > 0 && `(${formatDuration(recordingDuration)})`}</p>
          <div className="flex gap-2">
            <Button 
              onClick={uploadRecording} 
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
