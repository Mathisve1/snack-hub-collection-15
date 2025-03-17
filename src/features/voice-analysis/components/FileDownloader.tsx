
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FileDownloaderProps {
  fileName: string;
  bucketId: string;
}

const FileDownloader = ({ fileName, bucketId }: FileDownloaderProps) => {
  const downloadOriginalFile = async () => {
    try {
      console.log(`Attempting to download file: ${fileName} from bucket: ${bucketId}`);
      
      // List available buckets for debugging
      const { data: buckets, error: bucketsError } = await supabase
        .storage
        .listBuckets();
        
      if (bucketsError) {
        console.error("Error listing buckets:", bucketsError);
      } else {
        console.log("Available buckets:", buckets?.map(b => b.id));
        console.log("Looking for bucket:", bucketId);
        
        // Check if the bucket exists
        const bucketExists = buckets?.some(b => b.id === bucketId);
        if (!bucketExists) {
          console.error(`Bucket ${bucketId} not found in available buckets`);
          toast.error(`Bucket ${bucketId} not found. Please contact support.`);
          return;
        }
      }
      
      // Check if we can access bucket contents
      const { data: files, error: listError } = await supabase
        .storage
        .from(bucketId)
        .list();
        
      if (listError) {
        console.error(`Error listing files in bucket ${bucketId}:`, listError);
        console.log("This may indicate a permissions issue with the bucket");
      } else {
        console.log(`Files in bucket ${bucketId}:`, files?.map(f => f.name));
      }
      
      // Get the file directly from storage using the bucket ID
      const { data, error } = await supabase
        .storage
        .from(bucketId)
        .download(fileName);
      
      if (error) {
        console.error("Download error details:", error);
        toast.error(`Failed to download: ${error.message || 'Unknown error'}`);
        return;
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
      
    } catch (error) {
      console.error("Error in downloadOriginalFile:", error);
      toast.error("Failed to download original recording");
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={downloadOriginalFile}
      className="flex items-center text-xs"
    >
      <Download className="h-3 w-3 mr-1" /> Download Original Recording
    </Button>
  );
};

export default FileDownloader;
