
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { VoiceAnalysisType } from "../types";

export const useVoiceUploader = (
  team: string, 
  type: VoiceAnalysisType, 
  onUploadComplete: () => void
) => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadRecording = async (blob: Blob, durationSeconds: number): Promise<boolean> => {
    try {
      setIsUploading(true);
      
      // Create a unique file name with appropriate extension
      const fileName = `${uuidv4()}-voice-recording.webm`;
      
      // 1. Upload the actual audio file to storage bucket
      const { data: fileData, error: uploadError } = await supabase
        .storage
        .from('frituur-attachments')
        .upload(fileName, blob, {
          contentType: blob.type || 'audio/webm',
          cacheControl: '3600'
        });
        
      if (uploadError) {
        console.error("Error uploading audio file:", uploadError);
        toast.error("Failed to upload audio recording");
        return false;
      }
      
      // Get the public URL for the uploaded file
      const { data: urlData } = supabase
        .storage
        .from('frituur-attachments')
        .getPublicUrl(fileName);
      
      const publicUrl = urlData.publicUrl;
      
      // Determine which table to use based on the interview type
      const tableName = type === 'frituren' ? 'frituren_interviews' : 'street_interviews';
      
      // 2. Save the record in the appropriate database table
      const { error: insertError } = await supabase
        .from(tableName)
        .insert({
          team,
          recording_url: publicUrl,
          file_name: fileName,
          duration_seconds: durationSeconds,
          status: 'pending'
        });
        
      if (insertError) {
        console.error(`Error saving to ${tableName}:`, insertError);
        toast.error("Failed to save recording information");
        return false;
      }
      
      toast.success("Recording uploaded successfully! Analysis will begin shortly.");
      onUploadComplete();
      return true;
    } catch (error) {
      console.error("Unexpected error in uploadRecording:", error);
      toast.error("An unexpected error occurred during upload");
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    uploadRecording
  };
};
