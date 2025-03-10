
import { Frituur } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FolderItem } from "@/types/folders";

export const useFolderItems = (team: string) => {
  // Add frituur to folder
  const addFrituurToFolder = async (folderId: string, frituur: Frituur) => {
    try {
      const businessName = frituur["Business Name"];
      
      const { error } = await supabase
        .from("frituren_folder_items")
        .insert({
          folder_id: folderId,
          business_name: businessName,
          team
        });
        
      if (error) {
        // Check if it's a unique constraint error
        if (error.code === "23505") {
          toast.info(`"${businessName}" is already in this folder`);
          return { success: false, duplicate: true };
        }
        throw error;
      }
      
      toast.success(`Added "${businessName}" to folder`);
      return { success: true, duplicate: false };
    } catch (error) {
      console.error("Error adding frituur to folder:", error);
      toast.error("Failed to add frituur to folder. Please try again.");
      return { success: false, duplicate: false };
    }
  };

  // Remove frituur from folder
  const removeFrituurFromFolder = async (folderId: string, businessName: string) => {
    try {
      const { error } = await supabase
        .from("frituren_folder_items")
        .delete()
        .eq("folder_id", folderId)
        .eq("business_name", businessName)
        .eq("team", team);
        
      if (error) {
        throw error;
      }
      
      toast.success(`Removed "${businessName}" from folder`);
      return true;
    } catch (error) {
      console.error("Error removing frituur from folder:", error);
      toast.error("Failed to remove frituur from folder. Please try again.");
      return false;
    }
  };

  // Move frituur to another folder
  const moveFrituurToFolder = async (
    sourceFolderId: string,
    targetFolderId: string,
    businessName: string
  ) => {
    try {
      // First, check if the item already exists in the target folder
      const { data, error: checkError } = await supabase
        .from("frituren_folder_items")
        .select("*")
        .eq("folder_id", targetFolderId)
        .eq("business_name", businessName)
        .eq("team", team);
      
      if (checkError) {
        throw checkError;
      }
      
      if (data && data.length > 0) {
        // Item already exists in target folder, just remove from source
        await removeFrituurFromFolder(sourceFolderId, businessName);
        toast.info(`"${businessName}" already exists in target folder`);
        return true;
      }
      
      // Create a new entry in the target folder
      const { error: insertError } = await supabase
        .from("frituren_folder_items")
        .insert({
          folder_id: targetFolderId,
          business_name: businessName,
          team
        });
        
      if (insertError) {
        throw insertError;
      }
      
      // Remove from the source folder
      const { error: deleteError } = await supabase
        .from("frituren_folder_items")
        .delete()
        .eq("folder_id", sourceFolderId)
        .eq("business_name", businessName)
        .eq("team", team);
        
      if (deleteError) {
        throw deleteError;
      }
      
      toast.success(`Moved "${businessName}" to new folder`);
      return true;
    } catch (error) {
      console.error("Error moving frituur between folders:", error);
      toast.error("Failed to move frituur. Please try again.");
      return false;
    }
  };

  // Check if a frituur is in any folder
  const isFrituurInAnyFolder = (folders: { items?: FolderItem[] }[], businessName: string) => {
    return folders.some(folder => 
      folder.items?.some(item => item.business_name === businessName)
    );
  };

  return {
    addFrituurToFolder,
    removeFrituurFromFolder,
    moveFrituurToFolder,
    isFrituurInAnyFolder
  };
};
