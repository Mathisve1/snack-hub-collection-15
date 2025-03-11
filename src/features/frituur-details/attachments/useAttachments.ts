
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { FrituurAttachment } from "./types";

export const useAttachments = (team: string, businessName: string) => {
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

  const deleteAttachment = async (id: string) => {
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
      console.error("Error in deleteAttachment:", error);
      toast.error("An error occurred while deleting the attachment");
    }
  };

  useEffect(() => {
    fetchAttachments();
  }, [team, businessName]);

  return {
    attachments,
    loading,
    fetchAttachments,
    deleteAttachment
  };
};
