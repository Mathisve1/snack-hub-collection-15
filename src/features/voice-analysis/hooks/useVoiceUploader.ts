
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

  // Get the correct bucket ID based on team and type
  const getBucketId = () => {
    // Extract just the team number without the "OV-" prefix
    const teamNumber = team.replace('OV-', '');
    
    // Map team numbers to their correct bucket IDs
    if (type === 'interviews') {
      // Only handle specific team numbers with known bucket names
      switch (teamNumber) {
        case '3':
          return 'Interviews Bucket Team 03';
        case '13':
          return 'Interviews Bucket Team 13';
        case '14':
          return 'Interviews Bucket Team 14';
        case '38':
          return 'Interviews Bucket Team 38';
        default:
          // Fallback to a default bucket if team not found
          console.warn(`No specific bucket found for team ${teamNumber}, using Team 03 bucket as fallback`);
          return 'Interviews Bucket Team 03';
      }
    } else {
      // For frituren, fall back to using the Team 03 bucket
      return 'Interviews Bucket Team 03';
    }
  };

  const uploadRecording = async (recordingBlob: Blob, recordingDuration: number) => {
    setIsUploading(true);
    try {
      // Create a unique file name for the recording
      const fileName = `${uuidv4()}-${type}-recording.webm`;
      
      // Get the correct team-specific bucket ID
      const bucketId = getBucketId();
      
      console.log(`Uploading to bucket: ${bucketId}`);
      
      // Use a try/catch block specifically for the upload operation
      try {
        // Upload the actual file to Supabase Storage
        const { data: fileData, error: uploadError } = await supabase
          .storage
          .from(bucketId)
          .upload(fileName, recordingBlob, {
            cacheControl: '3600',
            upsert: false
          });
        
        if (uploadError) throw uploadError;
        
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
      } catch (uploadSpecificError: any) {
        console.error("Bucket error:", uploadSpecificError);
        
        // If there's an issue with the bucket, try using 'Interviews Bucket Team 03' as a universal fallback
        if (uploadSpecificError.message && uploadSpecificError.message.includes("Bucket not found")) {
          toast.error("Primary bucket not found, trying fallback bucket...");
          
          // Retry with the fallback bucket
          const fallbackBucketId = 'Interviews Bucket Team 03';
          
          // Upload to fallback bucket
          const { data: fallbackFileData, error: fallbackUploadError } = await supabase
            .storage
            .from(fallbackBucketId)
            .upload(fileName, recordingBlob, {
              cacheControl: '3600',
              upsert: false
            });
          
          if (fallbackUploadError) throw fallbackUploadError;
          
          // Get public URL for the uploaded file
          const { data: fallbackPublicUrlData } = supabase
            .storage
            .from(fallbackBucketId)
            .getPublicUrl(fileName);
            
          const fallbackPublicUrl = fallbackPublicUrlData.publicUrl;
          
          // Use the correct table name based on the type
          const tableName = type === 'frituren' ? 'frituren_interviews' : 'street_interviews';
          
          // Common record properties for both tables
          const recordData = {
            team,
            file_name: fileName,
            bucket_id: fallbackBucketId, // Store the fallback bucket ID in the database
            recording_url: fallbackPublicUrl, // Add this for backward compatibility
            status: 'pending',
            created_at: new Date().toISOString(),
            duration_seconds: recordingDuration
          };
          
          // Insert the record into the appropriate table
          const { error: insertError } = await supabase
            .from(tableName)
            .insert(recordData);
            
          if (insertError) throw insertError;
          
          toast.success("Recording uploaded to fallback bucket for analysis");
          onUploadComplete();
          return true;
        } else {
          // If it's not a bucket-not-found error, re-throw it
          throw uploadSpecificError;
        }
      }
    } catch (error) {
      console.error("Error uploading recording:", error);
      toast.error("Failed to upload recording. Please try again later.");
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  return { isUploading, uploadRecording };
};
