
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
    
    console.log(`Getting bucket ID for team ${teamNumber} and type ${type}`);
    
    // Map team number to the correct bucket - using actual bucket names as they exist in Supabase
    let bucketId;
    
    if (type === 'frituren') {
      bucketId = "frituur-attachments"; // Default bucket for frituren recordings
    } else {
      // For interviews, use team-specific buckets if they exist
      if (teamNumber === "3" || teamNumber === "03") {
        bucketId = "team-03-interviews";
      } else if (teamNumber === "13") {
        bucketId = "team-13-interviews";
      } else if (teamNumber === "14") {
        bucketId = "team-14-interviews";
      } else if (teamNumber === "38") {
        bucketId = "team-38-interviews";
      } else {
        // Default bucket if team not found
        bucketId = "team-03-interviews";
        console.warn(`Team ${teamNumber} doesn't have a designated bucket, using default bucket`);
      }
    }
    
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
      
      console.log(`Attempting upload to bucket: ${bucketId}, file: ${fileName}`);
      
      // List available buckets for debugging
      const { data: buckets, error: bucketsError } = await supabase
        .storage
        .listBuckets();
        
      if (bucketsError) {
        console.error("Error listing buckets:", bucketsError);
      } else {
        console.log("Available buckets:", buckets?.map(b => b.id));
        
        // Check if the bucket exists
        const bucketExists = buckets?.some(b => b.id === bucketId);
        if (!bucketExists) {
          console.error(`Bucket ${bucketId} not found in available buckets`);
          toast.error(`Upload failed: Bucket ${bucketId} not found. Please contact support.`);
          return false;
        }
      }
      
      // List existing files in bucket to check access
      const { data: existingFiles, error: listError } = await supabase
        .storage
        .from(bucketId)
        .list();
        
      if (listError) {
        console.error(`Error listing files in bucket ${bucketId}:`, listError);
        console.log("This may indicate a permissions issue with the bucket");
      } else {
        console.log(`Files in bucket ${bucketId}:`, existingFiles?.map(f => f.name));
      }
      
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
      
      // Use the correct table name based on the type
      const tableName = type === 'frituren' ? 'frituren_interviews' : 'street_interviews';
      
      // Common record properties for both tables
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
