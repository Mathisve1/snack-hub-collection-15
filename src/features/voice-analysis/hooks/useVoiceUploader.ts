
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
      
      // Common record properties for all tables
      const recordData = {
        team,
        file_name: fileName,
        bucket_id: bucketId,
        status: 'pending',
        created_at: new Date().toISOString(),
        duration_seconds: recordingDuration
      };
      
      // Insert the record into the appropriate table based on type
      let insertError;
      
      if (type === 'frituren') {
        const { error } = await supabase
          .from('frituren_interviews')
          .insert(recordData);
        insertError = error;
      } else if (type === 'interviews') {
        const { error } = await supabase
          .from('street_interviews')
          .insert(recordData);
        insertError = error;
      } else if (type === 'buyer') {
        // For buyer analysis, we need to handle team-specific tables
        const teamNumber = team.replace('OV-', '');
        
        // Check which team-specific table exists
        // We'll try a pattern of Team_X_buyer_analysis where X is the team number
        const buyerTableName = `Team_${teamNumber}_buyer_analysis`;
        
        // Using type assertion to handle the dynamic table name
        // This is needed because Supabase types are strict about table names
        const { error } = await supabase
          .from(buyerTableName as any)
          .insert(recordData);
        insertError = error;
      }
        
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
