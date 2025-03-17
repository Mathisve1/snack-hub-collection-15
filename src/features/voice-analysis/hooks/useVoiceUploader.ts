
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

  // Get the correct bucket ID based on team
  const getBucketId = () => {
    // Extract just the team number without the "OV-" prefix
    const teamNumber = team.replace('OV-', '');
    
    // Map team number to the correct bucket - only using existing buckets
    let bucketName;
    
    if (teamNumber === "3" || teamNumber === "03") {
      bucketName = "Interviews Bucket Team 03";
    } else if (teamNumber === "13") {
      bucketName = "Interviews Bucket Team 13";
    } else if (teamNumber === "14") {
      bucketName = "Interviews Bucket Team 14";
    } else if (teamNumber === "38") {
      bucketName = "Interviews Bucket Team 38";
    } else {
      // Default to team 03 bucket if team not found
      bucketName = "Interviews Bucket Team 03";
      console.warn(`Team ${teamNumber} doesn't have a designated bucket, using Team 03's bucket`);
    }
    
    console.log(`Using bucket: ${bucketName}`);
    return bucketName;
  };

  const uploadRecording = async (recordingBlob: Blob, recordingDuration: number) => {
    setIsUploading(true);
    try {
      // Create a unique file name for the recording
      const fileName = `${uuidv4()}-${type}-recording.webm`;
      
      // Get the correct bucket ID
      const bucketId = getBucketId();
      
      console.log(`Uploading to bucket: ${bucketId}`);
      
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
        throw uploadError;
      }
      
      // Get public URL for the uploaded file
      const { data: publicUrlData } = supabase
        .storage
        .from(bucketId)
        .getPublicUrl(fileName);
        
      const publicUrl = publicUrlData.publicUrl;
      
      // Use the correct table name based on the type
      const tableName = type === 'frituren' ? 'frituren_interviews' : 'street_interviews';
      
      // Common record properties for both tables
      const recordData = {
        team,
        file_name: fileName,
        bucket_id: bucketId, // Store the bucket ID in the database
        recording_url: publicUrl, // Add this for backward compatibility
        status: 'pending',
        created_at: new Date().toISOString(),
        duration_seconds: recordingDuration
      };
      
      // Insert the record into the appropriate table
      const { error: insertError } = await supabase
        .from(tableName)
        .insert(recordData);
        
      if (insertError) throw insertError;
      
      toast.success("Recording uploaded for analysis");
      onUploadComplete();
      return true;
    } catch (error) {
      console.error("Error uploading recording:", error);
      toast.error(`Failed to upload recording: ${error.message || 'Unknown error'}`);
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  return { isUploading, uploadRecording };
};
