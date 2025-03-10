
import { Plus, X } from "lucide-react";

interface FolderHeaderProps {
  folderName: string;
  showAddFrituurMenu: boolean;
  setShowAddFrituurMenu: (show: boolean) => void;
  movingItem: { businessName: string; sourceFolderId: string } | null;
  setMovingItem: (item: { businessName: string; sourceFolderId: string } | null) => void;
}

const FolderHeader = ({
  folderName,
  showAddFrituurMenu,
  setShowAddFrituurMenu,
  movingItem,
  setMovingItem
}: FolderHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-medium text-gray-800">
        {folderName || "Folder"}
      </h3>
      
      <div className="flex items-center space-x-2">
        {movingItem ? (
          <button
            onClick={() => setMovingItem(null)}
            className="text-gray-600 hover:text-gray-800 text-sm flex items-center"
          >
            <X size={14} className="mr-1" />
            Cancel Move
          </button>
        ) : (
          <button
            onClick={() => setShowAddFrituurMenu(!showAddFrituurMenu)}
            className="text-primary hover:text-primary/80 text-sm flex items-center"
          >
            <Plus size={14} className="mr-1" />
            Add Frituur
          </button>
        )}
      </div>
    </div>
  );
};

export default FolderHeader;
