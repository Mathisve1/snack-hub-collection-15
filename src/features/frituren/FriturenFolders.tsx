
import { useState } from "react";
import { useFriturenFolders } from "@/hooks/frituren/useFriturenFolders";
import { Frituur } from "@/types";
import { FolderIcon } from "lucide-react";
import FolderSidebar from "./folders/FolderSidebar";
import TeamSelectionsList from "./folders/TeamSelectionsList";
import FolderContentView from "./folders/FolderContentView";
import EmptyFolderState from "./folders/EmptyFolderState";

interface FriturenFoldersProps {
  team: string;
  frituren: Frituur[];
}

const FriturenFolders = ({ team, frituren }: FriturenFoldersProps) => {
  const {
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
    teamSelections,
    isFrituurInAnyFolder,
    movingItem,
    setMovingItem
  } = useFriturenFolders(team);

  const [showAddFrituurMenu, setShowAddFrituurMenu] = useState(false);
  const [selectedFrituurForFolder, setSelectedFrituurForFolder] = useState<string | null>(null);
  const [showTeamSelections, setShowTeamSelections] = useState(true);

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    await createFolder(newFolderName);
    setNewFolderName("");
    setIsCreatingFolder(false);
  };

  const handleRenameFolder = async (folderId: string) => {
    if (!newFolderName.trim()) return;
    await renameFolder(folderId, newFolderName);
    setNewFolderName("");
    setIsRenamingFolder(null);
  };

  const handleDeleteFolderConfirm = async (folderId: string) => {
    if (confirm("Are you sure you want to delete this folder? This will remove all frituren from this folder.")) {
      await deleteFolder(folderId);
    }
  };

  const getFrituurByName = (businessName: string) => {
    return frituren.find(f => f["Business Name"] === businessName);
  };

  const handleAddFrituurToFolder = async (businessName: string) => {
    if (selectedFolder && businessName) {
      const frituur = getFrituurByName(businessName);
      if (frituur) {
        await addFrituurToFolder(selectedFolder, frituur);
        setShowAddFrituurMenu(false);
        setSelectedFrituurForFolder(null);
      }
    }
  };

  const handleMoveConfirm = async (targetFolderId: string) => {
    if (movingItem && movingItem.sourceFolderId !== targetFolderId) {
      await moveFrituurToFolder(
        movingItem.sourceFolderId,
        targetFolderId,
        movingItem.businessName
      );
    }
    setMovingItem(null);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    action: () => void,
    cancelAction: () => void
  ) => {
    if (e.key === "Enter") {
      action();
    } else if (e.key === "Escape") {
      cancelAction();
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 border rounded-lg bg-white shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <FolderIcon className="mr-2 h-5 w-5 text-gray-600" />
          Frituren Folders
        </h2>
      </div>

      <div className="grid md:grid-cols-3 divide-x">
        {/* Folders sidebar */}
        <FolderSidebar 
          folders={folders}
          selectedFolder={selectedFolder}
          isCreatingFolder={isCreatingFolder}
          isRenamingFolder={isRenamingFolder}
          movingItem={movingItem}
          showTeamSelections={showTeamSelections}
          teamSelections={teamSelections}
          newFolderName={newFolderName}
          setNewFolderName={setNewFolderName}
          setIsCreatingFolder={setIsCreatingFolder}
          setIsRenamingFolder={setIsRenamingFolder}
          setSelectedFolder={setSelectedFolder}
          setShowTeamSelections={setShowTeamSelections}
          handleCreateFolder={handleCreateFolder}
          handleRenameFolder={handleRenameFolder}
          handleDeleteFolderConfirm={handleDeleteFolderConfirm}
          handleMoveConfirm={handleMoveConfirm}
          handleKeyDown={handleKeyDown}
        />

        {/* Content area */}
        <div className="col-span-2 p-4">
          {/* Show team selections */}
          {showTeamSelections && !selectedFolder ? (
            <TeamSelectionsList 
              teamSelections={teamSelections}
              getFrituurByName={getFrituurByName}
              isFrituurInAnyFolder={isFrituurInAnyFolder}
              folders={folders}
              setIsCreatingFolder={setIsCreatingFolder}
              selectedFrituurForFolder={selectedFrituurForFolder}
              setSelectedFrituurForFolder={setSelectedFrituurForFolder}
              showAddFrituurMenu={showAddFrituurMenu}
              setShowAddFrituurMenu={setShowAddFrituurMenu}
              handleAddFrituurToFolder={handleAddFrituurToFolder}
              setSelectedFolder={setSelectedFolder}
              setShowTeamSelections={setShowTeamSelections}
            />
          ) : selectedFolder ? (
            <FolderContentView 
              selectedFolder={selectedFolder}
              folders={folders}
              getFrituurByName={getFrituurByName}
              showAddFrituurMenu={showAddFrituurMenu}
              setShowAddFrituurMenu={setShowAddFrituurMenu}
              selectedFrituurForFolder={selectedFrituurForFolder}
              setSelectedFrituurForFolder={setSelectedFrituurForFolder}
              frituren={frituren}
              handleAddFrituurToFolder={handleAddFrituurToFolder}
              removeFrituurFromFolder={removeFrituurFromFolder}
              setMovingItem={setMovingItem}
              movingItem={movingItem}
            />
          ) : (
            <EmptyFolderState 
              folders={folders}
              setIsCreatingFolder={setIsCreatingFolder}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FriturenFolders;
