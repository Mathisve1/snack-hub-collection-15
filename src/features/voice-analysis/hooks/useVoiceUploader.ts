
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

export const useVoiceUploader = (
  team: string, 
  type: 'frituren' | 'interviews', 
  onUploadComplete: () => void
) => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadRecording = async (recordingBlob: Blob, recordingDuration: number) => {
    setIsUploading(true);
    try {
      // Create a unique file name for the recording
      const fileName = `${uuidv4()}-${type}-recording.webm`;
      
      // Upload the actual file to Supabase Storage
      const { data: fileData, error: uploadError } = await supabase
        .storage
        .from('frituur-attachments')
        .upload(fileName, recordingBlob, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (uploadError) throw uploadError;
      
      // Use the correct table name based on the type
      const tableName = type === 'frituren' ? 'frituren_interviews' : 'street_interviews';
      
      // Insert a record in the database that references the file in storage by filename
      const { error: insertError } = await supabase
        .from(tableName)
        .insert({
          team,
          recording_url: null, // No longer storing the URL directly
          status: 'pending',
          created_at: new Date().toISOString(),
          duration_seconds: recordingDuration,
          file_name: fileName, // Save the filename to reference the file in storage
        });
      
      if (insertError) throw insertError;
      
      toast.success("Recording uploaded for analysis");
      onUploadComplete();
      return true;
      
    } catch (error) {
      console.error("Error uploading recording:", error);
      toast.error("Failed to upload recording");
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  return { isUploading, uploadRecording };
};
