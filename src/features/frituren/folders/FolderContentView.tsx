
import { motion } from "framer-motion";
import { Frituur } from "@/types";
import { Plus, X, Move, Trash, FolderIcon } from "lucide-react";
import { Folder, FolderItem } from "@/types/folders";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface FolderContentViewProps {
  selectedFolder: string | null;
  folders: Folder[];
  getFrituurByName: (name: string) => Frituur | undefined;
  showAddFrituurMenu: boolean;
  setShowAddFrituurMenu: (show: boolean) => void;
  selectedFrituurForFolder: string | null;
  setSelectedFrituurForFolder: (name: string | null) => void;
  frituren: Frituur[];
  handleAddFrituurToFolder: (businessName: string) => void;
  removeFrituurFromFolder: (folderId: string, businessName: string) => Promise<boolean>;
  setMovingItem: (item: { businessName: string; sourceFolderId: string } | null) => void;
  movingItem: { businessName: string; sourceFolderId: string } | null;
}

const FolderContentView = ({
  selectedFolder,
  folders,
  getFrituurByName,
  showAddFrituurMenu,
  setShowAddFrituurMenu,
  selectedFrituurForFolder,
  setSelectedFrituurForFolder,
  frituren,
  handleAddFrituurToFolder,
  removeFrituurFromFolder,
  setMovingItem,
  movingItem
}: FolderContentViewProps) => {
  const getCurrentFolderItems = () => {
    if (!selectedFolder) return [];
    const folder = folders.find(f => f.id === selectedFolder);
    return folder?.items || [];
  };

  const currentFolder = folders.find(f => f.id === selectedFolder);
  
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-800">
          {currentFolder?.name || "Folder"}
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
      
      {showAddFrituurMenu && (
        <div className="mb-4 p-3 border rounded-md bg-gray-50">
          <h4 className="text-sm font-medium mb-2">Select a frituur to add:</h4>
          <div className="relative">
            <select
              className="w-full p-2 border rounded bg-white pr-8"
              value={selectedFrituurForFolder || ""}
              onChange={e => setSelectedFrituurForFolder(e.target.value)}
            >
              <option value="">-- Select a frituur --</option>
              {frituren.map(frituur => (
                <option 
                  key={frituur["Business Name"]} 
                  value={frituur["Business Name"]}
                >
                  {frituur["Business Name"]}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mt-3 flex justify-end space-x-2">
            <button
              onClick={() => setShowAddFrituurMenu(false)}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (selectedFrituurForFolder) {
                  handleAddFrituurToFolder(selectedFrituurForFolder);
                }
              }}
              disabled={!selectedFrituurForFolder}
              className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Folder
            </button>
          </div>
        </div>
      )}
      
      <div className="space-y-2">
        {getCurrentFolderItems().length > 0 ? (
          getCurrentFolderItems().map((item: FolderItem) => {
            const frituur = getFrituurByName(item.business_name);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 border rounded-md hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {item.business_name}
                    </h4>
                    {frituur && (
                      <div className="text-sm text-gray-600">
                        {frituur.Gemeente && (
                          <span>
                            {frituur.Gemeente}
                            {frituur.Provincie && `, ${frituur.Provincie}`}
                          </span>
                        )}
                        {frituur.Rating && (
                          <span className="ml-2 text-amber-500">
                            {frituur.Rating} ★
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => {
                              setMovingItem({
                                businessName: item.business_name,
                                sourceFolderId: selectedFolder
                              });
                            }}
                            className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                          >
                            <Move size={16} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Move to another folder</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => 
                              removeFrituurFromFolder(selectedFolder, item.business_name)
                            }
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                          >
                            <Trash size={16} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Remove from folder</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-8 text-gray-500">
            <FolderIcon className="mx-auto h-12 w-12 text-gray-300 mb-2" />
            <p>This folder is empty</p>
            <p className="text-sm mt-1">
              Add frituren to organize them in this folder
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default FolderContentView;
