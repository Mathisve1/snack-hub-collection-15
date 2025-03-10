
import { FolderPlusIcon } from "lucide-react";
import { Folder } from "@/types/folders";
import CreateFolderForm from "./CreateFolderForm";
import FolderListItem from "./FolderListItem";

interface FolderSidebarProps {
  folders: Folder[];
  selectedFolder: string | null;
  isCreatingFolder: boolean;
  isRenamingFolder: string | null;
  movingItem: { businessName: string; sourceFolderId: string } | null;
  showTeamSelections: boolean;
  teamSelections: string[];
  newFolderName: string;
  setNewFolderName: (name: string) => void;
  setIsCreatingFolder: (isCreating: boolean) => void;
  setIsRenamingFolder: (id: string | null) => void;
  setSelectedFolder: (id: string | null) => void;
  setShowTeamSelections: (show: boolean) => void;
  handleCreateFolder: () => void;
  handleRenameFolder: (id: string) => void;
  handleDeleteFolderConfirm: (id: string) => void;
  handleMoveConfirm: (targetFolderId: string) => void;
  handleKeyDown: (e: React.KeyboardEvent, action: () => void, cancelAction: () => void) => void;
}

const FolderSidebar = ({
  folders,
  selectedFolder,
  isCreatingFolder,
  isRenamingFolder,
  movingItem,
  showTeamSelections,
  teamSelections,
  newFolderName,
  setNewFolderName,
  setIsCreatingFolder,
  setIsRenamingFolder,
  setSelectedFolder,
  setShowTeamSelections,
  handleCreateFolder,
  handleRenameFolder,
  handleDeleteFolderConfirm,
  handleMoveConfirm,
  handleKeyDown
}: FolderSidebarProps) => {
  return (
    <div className="p-4 bg-gray-50 border-r">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-700">Your Folders</h3>
        {!isCreatingFolder && (
          <button
            onClick={() => setIsCreatingFolder(true)}
            className="text-primary hover:text-primary/80 p-1 rounded-full"
          >
            <FolderPlusIcon size={18} />
          </button>
        )}
      </div>

      {isCreatingFolder && (
        <CreateFolderForm
          newFolderName={newFolderName}
          setNewFolderName={setNewFolderName}
          handleCreateFolder={handleCreateFolder}
          handleCancel={() => {
            setIsCreatingFolder(false);
            setNewFolderName("");
          }}
          handleKeyDown={handleKeyDown}
        />
      )}

      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => {
            setShowTeamSelections(true);
            setSelectedFolder(null);
          }}
          className={`text-sm font-medium rounded-md px-3 py-1 ${
            showTeamSelections && !selectedFolder
              ? "bg-primary text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Team Selections
        </button>
        <span className="text-xs text-gray-500">{teamSelections.length}</span>
      </div>

      <ul className="space-y-1 max-h-72 overflow-y-auto">
        {folders.length === 0 ? (
          <li className="text-gray-500 text-sm p-2">
            No folders yet. Create one to organize your frituren.
          </li>
        ) : (
          folders.map(folder => (
            <li
              key={folder.id}
              className={`
                relative rounded-md cursor-pointer transition-colors
                ${selectedFolder === folder.id
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100 text-gray-800"
                }
                ${movingItem ? "hover:bg-blue-100" : ""}
              `}
            >
              <FolderListItem
                folder={folder}
                selectedFolder={selectedFolder}
                isRenamingFolder={isRenamingFolder}
                movingItem={movingItem}
                newFolderName={newFolderName}
                setNewFolderName={setNewFolderName}
                setIsRenamingFolder={setIsRenamingFolder}
                handleRenameFolder={handleRenameFolder}
                handleDeleteFolderConfirm={handleDeleteFolderConfirm}
                handleMoveConfirm={handleMoveConfirm}
                setSelectedFolder={setSelectedFolder}
                setShowTeamSelections={setShowTeamSelections}
                handleKeyDown={handleKeyDown}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default FolderSidebar;
