
import { motion } from "framer-motion";
import { Frituur } from "@/types";
import { ArrowRightIcon, FolderIcon, FolderPlusIcon } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Folder } from "@/types/folders";

interface TeamSelectionsListProps {
  teamSelections: string[];
  getFrituurByName: (name: string) => Frituur | undefined;
  isFrituurInAnyFolder: (name: string) => boolean;
  folders: Folder[];
  setIsCreatingFolder: (isCreating: boolean) => void;
  selectedFrituurForFolder: string | null;
  setSelectedFrituurForFolder: (name: string | null) => void;
  showAddFrituurMenu: boolean;
  setShowAddFrituurMenu: (show: boolean) => void;
  handleAddFrituurToFolder: (name: string) => void;
  setSelectedFolder: (id: string) => void;
  setShowTeamSelections: (show: boolean) => void;
}

const TeamSelectionsList = ({
  teamSelections,
  getFrituurByName,
  isFrituurInAnyFolder,
  folders,
  setIsCreatingFolder,
  selectedFrituurForFolder,
  setSelectedFrituurForFolder,
  showAddFrituurMenu,
  setShowAddFrituurMenu,
  handleAddFrituurToFolder,
  setSelectedFolder,
  setShowTeamSelections
}: TeamSelectionsListProps) => {
  const getTeamSelectionsFrituren = () => {
    return teamSelections
      .map(businessName => getFrituurByName(businessName))
      .filter((frituur): frituur is Frituur => frituur !== undefined);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-800">
          Your Team Selections
        </h3>

        {folders.length === 0 && (
          <button
            onClick={() => setIsCreatingFolder(true)}
            className="text-primary hover:text-primary/80 text-sm flex items-center"
          >
            <FolderPlusIcon size={14} className="mr-1" />
            Create a Folder
          </button>
        )}
      </div>

      <div className="space-y-2 mb-4">
        {teamSelections.length > 0 ? (
          getTeamSelectionsFrituren().map((frituur) => {
            const isInFolder = isFrituurInAnyFolder(frituur["Business Name"]);
            return (
              <motion.div
                key={frituur["Business Name"]}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 border rounded-md hover:bg-gray-50 flex justify-between items-start"
              >
                <div>
                  <h4 className="font-medium text-gray-800">
                    {frituur["Business Name"]}
                  </h4>
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
                  {isInFolder && (
                    <div className="mt-1 text-xs text-blue-600 italic">
                      Already organized in a folder
                    </div>
                  )}
                </div>

                {folders.length > 0 && (
                  <div className="relative group">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button 
                            className="p-1.5 text-primary hover:text-primary/80 hover:bg-primary/10 rounded-md flex items-center"
                            onClick={() => {
                              setSelectedFrituurForFolder(frituur["Business Name"]);
                              setShowAddFrituurMenu(true);
                            }}
                          >
                            <ArrowRightIcon size={16} />
                            <span className="ml-1.5 text-xs font-medium">Add to Folder</span>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Add to a folder</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    {showAddFrituurMenu && selectedFrituurForFolder === frituur["Business Name"] && (
                      <div className="absolute z-10 right-0 mt-1 w-48 bg-white border rounded-md shadow-lg">
                        <div className="p-2 border-b text-xs font-medium text-gray-500">
                          Select a folder:
                        </div>
                        <div className="max-h-48 overflow-y-auto">
                          {folders.map(folder => (
                            <button
                              key={folder.id}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center"
                              onClick={() => {
                                handleAddFrituurToFolder(frituur["Business Name"]);
                                setSelectedFolder(folder.id);
                                setShowTeamSelections(false);
                              }}
                            >
                              <FolderIcon size={14} className="mr-2 text-gray-500" />
                              {folder.name}
                            </button>
                          ))}
                        </div>
                        <div className="p-2 border-t">
                          <button
                            className="w-full text-xs text-gray-500 hover:text-gray-700"
                            onClick={() => {
                              setShowAddFrituurMenu(false);
                              setSelectedFrituurForFolder(null);
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No selections for this team yet</p>
            <p className="text-sm mt-1">
              Start selecting frituren to see them here
            </p>
          </div>
        )}
      </div>

      {folders.length > 0 && teamSelections.length > 0 && (
        <div className="mt-8 p-4 border rounded-md bg-gray-50">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Organize Your Selections</h4>
          <p className="text-xs text-gray-600">
            Click "Add to Folder" next to a frituur to organize it, or select a folder from the sidebar to view its contents.
          </p>
        </div>
      )}
    </>
  );
};

export default TeamSelectionsList;
