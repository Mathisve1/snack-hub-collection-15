
import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";

interface FrituurFileUploaderProps {
  team: string;
  businessName: string;
  onUploadComplete: () => void;
}

const FrituurFileUploader = ({ 
  team, 
  businessName, 
  onUploadComplete 
}: FrituurFileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  
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
    const bucketId = `team-${teamFormatted}-frituren`;
    
    console.log(`Selected bucket ID for upload: ${bucketId}`);
    return bucketId;
  };
  
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setIsUploading(true);
      setFileName(file.name);
      
      // Create a unique file name for the recording
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}-${businessName.replace(/\s+/g, '-')}.${fileExt}`;
      
      // Get the correct bucket ID
      const bucketId = getBucketId();
      
      console.log(`Uploading to bucket: ${bucketId}, file: ${fileName}`);
      
      // Upload the file to Supabase Storage
      const { data: fileData, error: uploadError } = await supabase
        .storage
        .from(bucketId)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (uploadError) {
        console.error("Error uploading to bucket:", uploadError);
        toast.error(`Upload failed: ${uploadError.message || 'Unknown error'}`);
        return;
      }
      
      console.log(`File uploaded successfully: ${fileName}`);
      
      // Get the public URL for the uploaded file
      const { data: publicUrlData } = supabase
        .storage
        .from(bucketId)
        .getPublicUrl(fileName);
        
      const publicUrl = publicUrlData.publicUrl;
      
      // Save attachment record in the database
      const { error: insertError } = await supabase
        .from('frituur_attachments')
        .insert({
          team,
          business_name: businessName,
          attachment_type: 'document',
          attachment_url: publicUrl,
          attachment_name: file.name,
        });
        
      if (insertError) {
        console.error("Error saving attachment record:", insertError);
        toast.error("Failed to save attachment information");
        return;
      }
      
      toast.success("File uploaded successfully");
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
      onUploadComplete();
    } catch (error) {
      console.error("Error in handleFileChange:", error);
      toast.error("An error occurred during upload");
    } finally {
      setIsUploading(false);
      setFileName("");
    }
  };
  
  return (
    <div>
      <input 
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.jpg,.jpeg,.png,.mp3,.mp4,.wav"
      />
      
      <Button
        onClick={handleFileSelect}
        disabled={isUploading}
        variant="outline"
      >
        {isUploading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" /> 
            Uploading {fileName}...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4 mr-2" /> 
            Upload Frituur Document
          </>
        )}
      </Button>
    </div>
  );
};

export default FrituurFileUploader;
