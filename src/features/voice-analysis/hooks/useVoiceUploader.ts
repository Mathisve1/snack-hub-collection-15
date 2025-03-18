
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { VoiceAnalysisType } from "../types";

export const useVoiceUploader = (
  team: string, 
  type: VoiceAnalysisType, 
  onUploadComplete: () => void
) => {
  const [isUploading, setIsUploading] = useState(false);

  // Get the correct bucket ID based on team
  const getBucketId = () => {
    // Extract just the team number without the "OV-" prefix
    const teamNumber = team.replace('OV-', '');
    
    // Format the team number for consistent naming
    let teamFormatted = teamNumber;
    
    // Pad with leading zero if needed for consistent formatting
    if (teamNumber.length === 1) {
      teamFormatted = `0${teamNumber}`;
    }
    
    // Create the bucket ID string
    const bucketId = `team-${teamFormatted}-${type}`;
    
    console.log(`Selected bucket ID for upload: ${bucketId}`);
    return bucketId;
  };

  const uploadRecording = async (recordingBlob: Blob, recordingDuration: number) => {
    setIsUploading(true);
    try {
      // Create a unique file name for the recording
      const fileName = `${uuidv4()}-${type}-recording.webm`;
      
      // Get the correct bucket ID
      const bucketId = getBucketId();
      
      console.log(`Uploading to bucket: ${bucketId}, file: ${fileName}`);
      
      // Upload the actual file to Supabase Storage
      const { data: fileData, error: uploadError } = await supabase
        .storage
        .from(bucketId)
        .upload(fileName, recordingBlob, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (uploadError) {
        console.error("Error uploading to bucket:", uploadError);
        toast.error(`Upload failed: ${uploadError.message || 'Unknown error'}`);
        return false;
      }
      
      console.log(`File uploaded successfully: ${fileName}`);
      
      // Determine the correct table name based on the type
      let tableName: string;
      if (type === 'frituren') {
        tableName = 'frituren_interviews';
      } else if (type === 'interviews') {
        tableName = 'street_interviews';
      } else if (type === 'buyer') {
        // For buyer analysis, we need to select the specific table based on team
        const teamNumber = team.replace('OV-', '');
        tableName = `Team_${teamNumber}_buyer_analysis`;
      } else {
        tableName = 'street_interviews'; // Default fallback
      }
      
      // Common record properties for all tables
      const recordData = {
        team,
        file_name: fileName,
        bucket_id: bucketId,
        status: 'pending',
        created_at: new Date().toISOString(),
        duration_seconds: recordingDuration
      };
      
      // Insert the record into the appropriate table
      const { error: insertError } = await supabase
        .from(tableName)
        .insert(recordData);
        
      if (insertError) {
        console.error("Database insert error:", insertError);
        toast.error(`Failed to save recording info: ${insertError.message || 'Unknown error'}`);
        return false;
      }
      
      toast.success("Recording uploaded for analysis");
      onUploadComplete();
      return true;
    } catch (error) {
      console.error("Error uploading recording:", error);
      toast.error(`Upload error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  return { isUploading, uploadRecording };
};
