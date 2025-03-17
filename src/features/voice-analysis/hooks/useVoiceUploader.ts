
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
      const fileName = `${uuidv4()}-${type}-recording.webm`;
      
      const { data: fileData, error: uploadError } = await supabase
        .storage
        .from('frituur-attachments')
        .upload(fileName, recordingBlob);
      
      if (uploadError) throw uploadError;
      
      const { data: publicUrlData } = supabase
        .storage
        .from('frituur-attachments')
        .getPublicUrl(fileName);
      
      const publicUrl = publicUrlData.publicUrl;
      
      // Use the appropriate table based on type
      const tableName = type === 'frituren' ? 'frituren_interviews' : 'street_interviews';
      
      const { error: insertError } = await supabase
        .from(tableName)
        .insert({
          team,
          recording_url: publicUrl,
          status: 'pending',
          created_at: new Date().toISOString(),
          duration_seconds: recordingDuration,
          file_name: fileName,
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
