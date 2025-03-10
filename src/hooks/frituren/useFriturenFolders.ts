
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Frituur } from "@/types";

export interface FolderItem {
  id: string;
  folder_id: string;
  business_name: string;
  team: string;
  added_at: string;
}

export interface Folder {
  id: string;
  team: string;
  name: string;
  created_at: string;
  items?: FolderItem[];
}

export const useFriturenFolders = (team: string) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isRenamingFolder, setIsRenamingFolder] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [teamSelections, setTeamSelections] = useState<string[]>([]);

  // Fetch folders and their items
  const fetchFolders = async () => {
    try {
      setIsLoading(true);
      
      const { data: foldersData, error: foldersError } = await supabase
        .from("frituren_folders")
        .select("*")
        .eq("team", team)
        .order("created_at", { ascending: false });
      
      if (foldersError) {
        throw foldersError;
      }
      
      const { data: folderItemsData, error: folderItemsError } = await supabase
        .from("frituren_folder_items")
        .select("*")
        .eq("team", team);
        
      if (folderItemsError) {
        throw folderItemsError;
      }
      
      // Group items by folder
      const foldersWithItems = (foldersData as Folder[]).map(folder => {
        const items = (folderItemsData as FolderItem[]).filter(
          item => item.folder_id === folder.id
        );
        return { ...folder, items };
      });
      
      setFolders(foldersWithItems);
      
      // Select the first folder by default if none is selected
      if (!selectedFolder && foldersWithItems.length > 0) {
        setSelectedFolder(foldersWithItems[0].id);
      }
      
      // Fetch team selections
      await fetchTeamSelections();
      
    } catch (error) {
      console.error("Error fetching folders:", error);
      toast.error("Failed to load folders. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch team selections
  const fetchTeamSelections = async () => {
    try {
      const { data, error } = await supabase
        .from("team_selections")
        .select("business_name")
        .eq("team", team);
        
      if (error) {
        throw error;
      }
      
      setTeamSelections(data.map(item => item.business_name));
    } catch (error) {
      console.error("Error fetching team selections:", error);
    }
  };

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
      
      setFolders(prev => [data as Folder, ...prev]);
      setSelectedFolder(data.id);
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
      
      setFolders(prev => prev.map(folder => 
        folder.id === folderId ? { ...folder, name: newName } : folder
      ));
      
      toast.success(`Folder renamed to "${newName}"`);
    } catch (error) {
      console.error("Error renaming folder:", error);
      toast.error("Failed to rename folder. Please try again.");
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
      
      setFolders(prev => prev.filter(folder => folder.id !== folderId));
      
      if (selectedFolder === folderId) {
        setSelectedFolder(folders.length > 1 ? folders.find(f => f.id !== folderId)?.id || null : null);
      }
      
      toast.success("Folder deleted");
    } catch (error) {
      console.error("Error deleting folder:", error);
      toast.error("Failed to delete folder. Please try again.");
    }
  };

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
          return;
        }
        throw error;
      }
      
      // Update local state
      setFolders(prev => prev.map(folder => {
        if (folder.id === folderId) {
          const newItem: FolderItem = {
            id: Math.random().toString(), // Temporary ID, will be updated on next fetch
            folder_id: folderId,
            business_name: businessName,
            team,
            added_at: new Date().toISOString()
          };
          
          return {
            ...folder,
            items: [...(folder.items || []), newItem]
          };
        }
        return folder;
      }));
      
      toast.success(`Added "${businessName}" to folder`);
    } catch (error) {
      console.error("Error adding frituur to folder:", error);
      toast.error("Failed to add frituur to folder. Please try again.");
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
      
      // Update local state
      setFolders(prev => prev.map(folder => {
        if (folder.id === folderId) {
          return {
            ...folder,
            items: (folder.items || []).filter(item => item.business_name !== businessName)
          };
        }
        return folder;
      }));
      
      toast.success(`Removed "${businessName}" from folder`);
    } catch (error) {
      console.error("Error removing frituur from folder:", error);
      toast.error("Failed to remove frituur from folder. Please try again.");
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
        return;
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
      
      // Update local state
      setFolders(prev => {
        return prev.map(folder => {
          if (folder.id === sourceFolderId) {
            return {
              ...folder,
              items: (folder.items || []).filter(item => item.business_name !== businessName)
            };
          }
          if (folder.id === targetFolderId) {
            const newItem: FolderItem = {
              id: Math.random().toString(), // Temporary ID, will be updated on next fetch
              folder_id: targetFolderId,
              business_name: businessName,
              team,
              added_at: new Date().toISOString()
            };
            
            return {
              ...folder,
              items: [...(folder.items || []), newItem]
            };
          }
          return folder;
        });
      });
      
      toast.success(`Moved "${businessName}" to new folder`);
    } catch (error) {
      console.error("Error moving frituur between folders:", error);
      toast.error("Failed to move frituur. Please try again.");
    }
  };

  // Check if a frituur is in any folder
  const isFrituurInAnyFolder = (businessName: string) => {
    return folders.some(folder => 
      folder.items?.some(item => item.business_name === businessName)
    );
  };

  useEffect(() => {
    if (team) {
      fetchFolders();
    }
  }, [team]);

  return {
    folders,
    isLoading,
    selectedFolder,
    setSelectedFolder,
    createFolder,
    renameFolder,
    deleteFolder,
    addFrituurToFolder,
    removeFrituurFromFolder,
    moveFrituurToFolder,
    isCreatingFolder,
    setIsCreatingFolder,
    isRenamingFolder,
    setIsRenamingFolder,
    newFolderName,
    setNewFolderName,
    refreshFolders: fetchFolders,
    teamSelections,
    isFrituurInAnyFolder
  };
};
