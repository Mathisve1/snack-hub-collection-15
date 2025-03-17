
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
      
      // Get the file directly from storage using the team-specific bucket ID
      const { data, error } = await supabase
        .storage
        .from(bucketId)
        .download(fileName);
      
      if (error) throw error;
      
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
      console.error("Error downloading file:", error);
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
