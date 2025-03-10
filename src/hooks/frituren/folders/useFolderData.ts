
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Folder, FolderItem } from "@/types/folders";

export const useFolderData = (team: string) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
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

  // Update the folders state after actions
  const updateFolderState = (updatedFolder: Folder) => {
    setFolders(prev => prev.map(folder => 
      folder.id === updatedFolder.id ? updatedFolder : folder
    ));
  };

  // Add a new folder to state
  const addFolderToState = (folder: Folder) => {
    setFolders(prev => [folder, ...prev]);
    setSelectedFolder(folder.id);
  };

  // Remove a folder from state
  const removeFolderFromState = (folderId: string) => {
    setFolders(prev => prev.filter(folder => folder.id !== folderId));
    
    if (selectedFolder === folderId) {
      setSelectedFolder(folders.length > 1 ? folders.find(f => f.id !== folderId)?.id || null : null);
    }
  };

  useEffect(() => {
    if (team) {
      fetchFolders();
    }
  }, [team]);

  return {
    folders,
    setFolders,
    isLoading,
    selectedFolder,
    setSelectedFolder,
    teamSelections,
    refreshFolders: fetchFolders,
    updateFolderState,
    addFolderToState,
    removeFolderFromState
  };
};
