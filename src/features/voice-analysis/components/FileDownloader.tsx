
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FileDownloaderProps {
  fileName: string;
}

const FileDownloader = ({ fileName }: FileDownloaderProps) => {
  const downloadOriginalFile = async () => {
    try {
      // Get the file directly from storage
      const { data, error } = await supabase
        .storage
        .from('frituur-attachments')
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
