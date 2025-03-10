
import { Folder } from "@/types/folders";
import { Edit, Trash, FolderIcon, Check, X } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface FolderListItemProps {
  folder: Folder;
  selectedFolder: string | null;
  isRenamingFolder: string | null;
  movingItem: { businessName: string; sourceFolderId: string } | null;
  newFolderName: string;
  setNewFolderName: (name: string) => void;
  setIsRenamingFolder: (id: string | null) => void;
  handleRenameFolder: (id: string) => void;
  handleDeleteFolderConfirm: (id: string) => void;
  handleMoveConfirm: (targetFolderId: string) => void;
  setSelectedFolder: (id: string | null) => void;
  setShowTeamSelections: (show: boolean) => void;
  handleKeyDown: (e: React.KeyboardEvent, action: () => void, cancelAction: () => void) => void;
}

const FolderListItem = ({
  folder,
  selectedFolder,
  isRenamingFolder,
  movingItem,
  newFolderName,
  setNewFolderName,
  setIsRenamingFolder,
  handleRenameFolder,
  handleDeleteFolderConfirm,
  handleMoveConfirm,
  setSelectedFolder,
  setShowTeamSelections,
  handleKeyDown
}: FolderListItemProps) => {
  const isSelected = selectedFolder === folder.id;

  return (
    <>
      {isRenamingFolder === folder.id ? (
        <div className="p-2">
          <div className="flex items-center">
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="w-full px-2 py-1 text-sm border rounded mr-2 text-gray-800"
              autoFocus
              onKeyDown={(e) => 
                handleKeyDown(
                  e,
                  () => handleRenameFolder(folder.id),
                  () => {
                    setIsRenamingFolder(null);
                    setNewFolderName("");
                  }
                )
              }
            />
            <button
              onClick={() => handleRenameFolder(folder.id)}
              className="p-1 text-green-600 hover:text-green-800"
            >
              <Check size={16} />
            </button>
            <button
              onClick={() => {
                setIsRenamingFolder(null);
                setNewFolderName("");
              }}
              className="p-1 text-red-600 hover:text-red-800"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div
          className="flex items-center justify-between p-2"
          onClick={() => {
            if (movingItem) {
              handleMoveConfirm(folder.id);
            } else {
              setSelectedFolder(folder.id);
              setShowTeamSelections(false);
            }
          }}
        >
          <div className="flex items-center">
            <FolderIcon 
              size={16} 
              className={`mr-2 ${isSelected ? "text-white" : "text-gray-500"}`} 
            />
            <span className="truncate">
              {folder.name}
            </span>
          </div>
          
          {!movingItem && (
            <div className="flex items-center">
              <span className="text-xs mr-2">
                {folder.items?.length || 0}
              </span>
              
              {!isSelected && (
                <div className="opacity-0 group-hover:opacity-100 flex">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsRenamingFolder(folder.id);
                            setNewFolderName(folder.name);
                          }}
                          className={`p-1 text-gray-500 hover:text-gray-700`}
                        >
                          <Edit size={14} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Rename folder</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteFolderConfirm(folder.id);
                          }}
                          className={`p-1 text-gray-500 hover:text-red-600`}
                        >
                          <Trash size={14} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete folder</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FolderListItem;
