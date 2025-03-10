
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { File, Image, Mic, FileText, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface FrituurAttachment {
  id: string;
  team: string;
  business_name: string;
  note: string | null;
  attachment_type: string | null;
  attachment_url: string | null;
  attachment_name: string | null;
  created_at: string;
}

interface FrituurAttachmentsProps {
  team: string;
  businessName: string;
}

const FrituurAttachments = ({ team, businessName }: FrituurAttachmentsProps) => {
  const [attachments, setAttachments] = useState<FrituurAttachment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAttachments = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('frituur_attachments')
        .select('*')
        .eq('team', team)
        .eq('business_name', businessName)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching attachments:", error);
        toast.error("Failed to load notes and attachments");
        return;
      }

      setAttachments(data as FrituurAttachment[]);
    } catch (error) {
      console.error("Error in fetchAttachments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttachments();
  }, [team, businessName]);

  const handleDeleteAttachment = async (id: string) => {
    try {
      // Find the attachment to delete
      const attachment = attachments.find(a => a.id === id);
      
      // If it has an attachment_url, delete the file from storage first
      if (attachment?.attachment_url) {
        const filePathParts = attachment.attachment_url.split('/');
        const fileName = filePathParts[filePathParts.length - 1];
        
        const { error: storageError } = await supabase
          .storage
          .from('frituur-attachments')
          .remove([fileName]);
          
        if (storageError) {
          console.error("Error deleting file from storage:", storageError);
          toast.error("Failed to delete the file");
          return;
        }
      }
      
      // Delete the attachment record from the database
      const { error } = await supabase
        .from('frituur_attachments')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Error deleting attachment:", error);
        toast.error("Failed to delete the attachment");
        return;
      }

      // Update the UI
      setAttachments(attachments.filter(a => a.id !== id));
      toast.success("Attachment deleted successfully");
    } catch (error) {
      console.error("Error in handleDeleteAttachment:", error);
      toast.error("An error occurred while deleting the attachment");
    }
  };

  const getAttachmentIcon = (type: string | null) => {
    switch (type) {
      case 'photo':
        return <Image className="h-5 w-5 text-blue-500" />;
      case 'voice':
        return <Mic className="h-5 w-5 text-orange-500" />;
      case 'document':
        return <File className="h-5 w-5 text-green-500" />;
      case 'note':
        return <FileText className="h-5 w-5 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-gray-500">Loading attachments...</p>
      </div>
    );
  }

  if (attachments.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <p className="text-gray-500">No notes or attachments yet</p>
        <p className="text-sm text-gray-400 mt-1">
          Add notes, photos, voice memos, or documents to keep track of this frituur
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {attachments.map((attachment) => (
        <div 
          key={attachment.id} 
          className="bg-gray-50 rounded-lg p-4 border border-gray-200"
        >
          <div className="flex justify-between">
            <div className="flex items-start gap-3">
              {getAttachmentIcon(attachment.attachment_type)}
              
              <div className="flex-1">
                {attachment.note && (
                  <p className="text-gray-700 whitespace-pre-wrap">{attachment.note}</p>
                )}
                
                {attachment.attachment_url && (
                  <div className="mt-2">
                    {attachment.attachment_type === 'photo' ? (
                      <img 
                        src={attachment.attachment_url} 
                        alt={attachment.attachment_name || "Photo"} 
                        className="rounded-md max-h-64 object-contain"
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm font-medium truncate">
                          {attachment.attachment_name || "Attachment"}
                        </span>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          asChild
                        >
                          <a 
                            href={attachment.attachment_url} 
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                )}
                
                <p className="text-xs text-gray-500 mt-2">
                  {formatDistanceToNow(new Date(attachment.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteAttachment(attachment.id)}
              title="Delete"
            >
              <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FrituurAttachments;
