
import { Check as CheckIcon, X as XIcon, FolderIcon, FolderOpenIcon, PencilIcon, TrashIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Folder } from "@/types/folders";

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
  setSelectedFolder: (id: string) => void;
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

  if (isRenamingFolder === folder.id) {
    return (
      <div className="flex items-center p-2 bg-white border rounded">
        <input
          type="text"
          value={newFolderName}
          onChange={e => setNewFolderName(e.target.value)}
          className="flex-1 border-none focus:outline-none text-sm"
          autoFocus
          onKeyDown={e => 
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
          className="text-green-600 p-1 hover:bg-green-50 rounded"
        >
          <CheckIcon size={16} />
        </button>
        <button
          onClick={() => {
            setIsRenamingFolder(null);
            setNewFolderName("");
          }}
          className="text-red-600 p-1 hover:bg-red-50 rounded"
        >
          <XIcon size={16} />
        </button>
      </div>
    );
  } 
  
  if (movingItem) {
    return (
      <div
        className="flex items-center p-2 cursor-pointer"
        onClick={() => handleMoveConfirm(folder.id)}
      >
        <FolderIcon 
          size={16} 
          className={isSelected ? "text-white" : "text-gray-500"} 
        />
        <span className="ml-2">{folder.name}</span>
        <span className="ml-auto text-xs opacity-70">
          {folder.items?.length || 0}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-2">
      <div 
        className="flex items-center flex-grow cursor-pointer"
        onClick={() => {
          setSelectedFolder(folder.id);
          setShowTeamSelections(false);
        }}
      >
        {isSelected ? (
          <FolderOpenIcon size={16} className="text-white" />
        ) : (
          <FolderIcon size={16} className="text-gray-500" />
        )}
        <span className="ml-2 truncate">{folder.name}</span>
        <span className="ml-auto text-xs opacity-70">
          {folder.items?.length || 0}
        </span>
      </div>
      
      <div 
        className={`
          opacity-0 group-hover:opacity-100 flex items-center space-x-1
          ${isSelected ? "opacity-100" : ""}
        `}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={e => {
                  e.stopPropagation();
                  setIsRenamingFolder(folder.id);
                  setNewFolderName(folder.name);
                }}
                className={`
                  p-1 rounded-full
                  ${isSelected
                    ? "text-white hover:bg-primary-dark"
                    : "text-gray-500 hover:bg-gray-200"
                  }
                `}
              >
                <PencilIcon size={14} />
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
                onClick={e => {
                  e.stopPropagation();
                  handleDeleteFolderConfirm(folder.id);
                }}
                className={`
                  p-1 rounded-full
                  ${isSelected
                    ? "text-white hover:bg-primary-dark"
                    : "text-gray-500 hover:bg-gray-200"
                  }
                `}
              >
                <TrashIcon size={14} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete folder</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default FolderListItem;
