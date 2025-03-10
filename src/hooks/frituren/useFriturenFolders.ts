
import { useState } from "react";
import { Frituur } from "@/types";
import { useFolderData } from "./folders/useFolderData";
import { useFolderActions } from "./folders/useFolderActions";
import { useFolderItems } from "./folders/useFolderItems";
import { Folder, FolderItem } from "@/types/folders";

export type { Folder, FolderItem };

export const useFriturenFolders = (team: string) => {
  const {
    folders,
    setFolders,
    isLoading,
    selectedFolder,
    setSelectedFolder,
    teamSelections,
    refreshFolders,
    updateFolderState,
    addFolderToState,
    removeFolderFromState
  } = useFolderData(team);

  const {
    isCreatingFolder,
    setIsCreatingFolder,
    isRenamingFolder,
    setIsRenamingFolder,
    newFolderName,
    setNewFolderName,
    createFolder: createFolderAction,
    renameFolder: renameFolderAction,
    deleteFolder: deleteFolderAction
  } = useFolderActions(team);

  const {
    addFrituurToFolder: addFrituurToFolderAction,
    removeFrituurFromFolder: removeFrituurFromFolderAction,
    moveFrituurToFolder: moveFrituurToFolderAction,
    isFrituurInAnyFolder: checkFrituurInAnyFolder
  } = useFolderItems(team);

  const [movingItem, setMovingItem] = useState<{
    businessName: string;
    sourceFolderId: string;
  } | null>(null);

  // Create folder with state update
  const createFolder = async (name: string) => {
    const folderId = await createFolderAction(name);
    if (folderId) {
      const newFolder: Folder = {
        id: folderId,
        name,
        team,
        created_at: new Date().toISOString(),
        items: []
      };
      addFolderToState(newFolder);
      return folderId;
    }
    return null;
  };

  // Rename folder with state update
  const renameFolder = async (folderId: string, newName: string) => {
    const success = await renameFolderAction(folderId, newName);
    if (success) {
      setFolders(prev => prev.map(folder => 
        folder.id === folderId ? { ...folder, name: newName } : folder
      ));
    }
    return success;
  };

  // Delete folder with state update
  const deleteFolder = async (folderId: string) => {
    const success = await deleteFolderAction(folderId);
    if (success) {
      removeFolderFromState(folderId);
    }
    return success;
  };

  // Add frituur to folder with state update
  const addFrituurToFolder = async (folderId: string, frituur: Frituur) => {
    const result = await addFrituurToFolderAction(folderId, frituur);
    if (result.success) {
      // Update local state
      setFolders(prev => prev.map(folder => {
        if (folder.id === folderId) {
          const businessName = frituur["Business Name"];
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
    }
    return result;
  };

  // Remove frituur from folder with state update
  const removeFrituurFromFolder = async (folderId: string, businessName: string) => {
    const success = await removeFrituurFromFolderAction(folderId, businessName);
    if (success) {
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
    }
    return success;
  };

  // Move frituur to another folder with state update
  const moveFrituurToFolder = async (
    sourceFolderId: string,
    targetFolderId: string,
    businessName: string
  ) => {
    const success = await moveFrituurToFolderAction(sourceFolderId, targetFolderId, businessName);
    if (success) {
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
    }
    return success;
  };

  // Check if a frituur is in any folder
  const isFrituurInAnyFolder = (businessName: string) => {
    return checkFrituurInAnyFolder(folders, businessName);
  };

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
    refreshFolders,
    teamSelections,
    isFrituurInAnyFolder,
    movingItem,
    setMovingItem
  };
};
