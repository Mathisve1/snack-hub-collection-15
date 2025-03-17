
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FileDownloaderProps {
  fileName: string;
}

const FileDownloader = ({ fileName }: FileDownloaderProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      
      // Create a signed URL with long expiry for download
      const { data, error } = await supabase
        .storage
        .from('frituur-attachments')
        .createSignedUrl(fileName, 3600); // 1 hour expiry
      
      if (error) {
        throw error;
      }
      
      if (!data.signedUrl) {
        throw new Error("Failed to generate download URL");
      }
      
      // Create an anchor element and trigger download
      const link = document.createElement('a');
      link.href = data.signedUrl;
      link.download = fileName.split('/').pop() || 'recording.webm';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Failed to download recording");
    } finally {
      setIsDownloading(false);
    }
  };
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleDownload}
      disabled={isDownloading}
    >
      <FileDown className="h-4 w-4 mr-1" />
      {isDownloading ? "Downloading..." : "Download Recording"}
    </Button>
  );
};

export default FileDownloader;
