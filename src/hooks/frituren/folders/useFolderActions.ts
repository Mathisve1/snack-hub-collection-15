
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Folder } from "@/types/folders";

export const useFolderActions = (team: string) => {
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isRenamingFolder, setIsRenamingFolder] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState("");

  // Create a new folder
  const createFolder = async (name: string) => {
    try {
      const { data, error } = await supabase
        .from("frituren_folders")
        .insert({
          name,
          team
        })
        .select()
        .single();
        
      if (error) {
        throw error;
      }
      
      toast.success(`Folder "${name}" created`);
      return data.id;
    } catch (error) {
      console.error("Error creating folder:", error);
      toast.error("Failed to create folder. Please try again.");
      return null;
    }
  };

  // Rename folder
  const renameFolder = async (folderId: string, newName: string) => {
    try {
      const { error } = await supabase
        .from("frituren_folders")
        .update({ name: newName })
        .eq("id", folderId)
        .eq("team", team);
        
      if (error) {
        throw error;
      }
      
      toast.success(`Folder renamed to "${newName}"`);
      return true;
    } catch (error) {
      console.error("Error renaming folder:", error);
      toast.error("Failed to rename folder. Please try again.");
      return false;
    }
  };

  // Delete folder
  const deleteFolder = async (folderId: string) => {
    try {
      const { error } = await supabase
        .from("frituren_folders")
        .delete()
        .eq("id", folderId)
        .eq("team", team);
        
      if (error) {
        throw error;
      }
      
      toast.success("Folder deleted");
      return true;
    } catch (error) {
      console.error("Error deleting folder:", error);
      toast.error("Failed to delete folder. Please try again.");
      return false;
    }
  };

  return {
    isCreatingFolder,
    setIsCreatingFolder,
    isRenamingFolder,
    setIsRenamingFolder,
    newFolderName,
    setNewFolderName,
    createFolder,
    renameFolder,
    deleteFolder
  };
};
