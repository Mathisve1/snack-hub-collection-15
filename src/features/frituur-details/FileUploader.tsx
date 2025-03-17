
import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

interface FileUploaderProps {
  team: string;
  businessName: string;
  fileType: 'photo' | 'voice' | 'document';
  onUploadComplete: () => void;
  children: React.ReactNode;
}

const FileUploader = ({ 
  team, 
  businessName, 
  fileType, 
  onUploadComplete,
  children 
}: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  
  const getAcceptedTypes = () => {
    switch (fileType) {
      case 'photo':
        return "image/*";
      case 'voice':
        return "audio/*";
      case 'document':
        return ".pdf,.doc,.docx,.txt,.xls,.xlsx";
      default:
        return "";
    }
  };
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setUploading(true);
      
      // Determine file type and create appropriate file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}-${fileType}.${fileExt}`;
      
      // Use 'frituur-attachments' bucket for general attachments
      // Voice recordings go to team-specific buckets via VoiceRecordingUploader
      const bucketId = 'frituur-attachments';
      
      // Upload file to Supabase Storage
      const { data: fileData, error: uploadError } = await supabase
        .storage
        .from(bucketId)
        .upload(fileName, file);
        
      if (uploadError) {
        console.error("Error uploading file:", uploadError);
        toast.error("Failed to upload file");
        return;
      }
      
      // Get public URL for the uploaded file
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
          attachment_type: fileType,
          attachment_url: publicUrl,
          attachment_name: file.name,
        });
        
      if (insertError) {
        console.error("Error saving attachment record:", insertError);
        toast.error("Failed to save attachment information");
        return;
      }
      
      toast.success("File uploaded successfully");
      onUploadComplete();
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error in handleFileChange:", error);
      toast.error("An error occurred during upload");
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        accept={getAcceptedTypes()}
        onChange={handleFileChange}
        disabled={uploading}
        className="hidden"
      />
      <div onClick={() => fileInputRef.current?.click()}>
        {children}
      </div>
    </>
  );
};

export default FileUploader;
