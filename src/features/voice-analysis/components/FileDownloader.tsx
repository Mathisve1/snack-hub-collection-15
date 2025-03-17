
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

interface FileDownloaderProps {
  fileName: string;
  bucketId: string;
}

const FileDownloader = ({ fileName, bucketId }: FileDownloaderProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadOriginalFile = async () => {
    try {
      setIsDownloading(true);
      console.log(`Attempting to download file: ${fileName} from bucket: ${bucketId}`);
      
      // List available buckets for debugging
      const { data: buckets, error: bucketsError } = await supabase
        .storage
        .listBuckets();
        
      if (bucketsError) {
        console.error("Error listing buckets:", bucketsError);
        throw new Error(`Failed to list buckets: ${bucketsError.message}`);
      } 
      
      console.log("Available buckets:", buckets?.map(b => b.id));
      console.log("Looking for bucket:", bucketId);
        
      // Check if the bucket exists
      const bucketExists = buckets?.some(b => b.id === bucketId);
      if (!bucketExists) {
        throw new Error(`Bucket ${bucketId} not found in available buckets. Please contact support.`);
      }
      
      // Get the file directly from storage using the bucket ID
      const { data, error } = await supabase
        .storage
        .from(bucketId)
        .download(fileName);
      
      if (error) {
        console.error("Download error details:", error);
        throw new Error(`Failed to download: ${error.message || 'Unknown error'}`);
      }
      
      console.log(`File download successful from bucket: ${bucketId}`);
      
      // Create a download link for the file
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success("File downloaded successfully");
      
    } catch (error) {
      console.error("Error in downloadOriginalFile:", error);
      toast.error(error instanceof Error ? error.message : "Failed to download original recording");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={downloadOriginalFile}
      disabled={isDownloading}
      className="flex items-center text-xs"
    >
      {isDownloading ? (
        <>
          <Loader2 className="h-3 w-3 mr-1 animate-spin" /> Downloading...
        </>
      ) : (
        <>
          <Download className="h-3 w-3 mr-1" /> Download Original Recording
        </>
      )}
    </Button>
  );
};

export default FileDownloader;
