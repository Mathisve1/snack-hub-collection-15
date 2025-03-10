
import { useState } from "react";
import { motion } from "framer-motion";
import { useFriturenFolders, Folder, FolderItem } from "@/hooks/frituren/useFriturenFolders";
import { 
  Folder as FolderIcon, 
  FolderPlus, 
  Plus, 
  Pencil, 
  Trash, 
  X, 
  Check, 
  Move,
  FolderOpen,
  ArrowRight
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Frituur } from "@/types";

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
    isFrituurInAnyFolder
  } = useFriturenFolders(team);

  const [movingItem, setMovingItem] = useState<{
    businessName: string;
    sourceFolderId: string;
  } | null>(null);
  
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

  const getCurrentFolderItems = () => {
    if (!selectedFolder) return [];
    const folder = folders.find(f => f.id === selectedFolder);
    return folder?.items || [];
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

  const getTeamSelectionsFrituren = () => {
    return teamSelections
      .map(businessName => getFrituurByName(businessName))
      .filter((frituur): frituur is Frituur => frituur !== undefined);
  };

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
        <div className="p-4 bg-gray-50 border-r">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-700">Your Folders</h3>
            {!isCreatingFolder && (
              <button
                onClick={() => setIsCreatingFolder(true)}
                className="text-primary hover:text-primary/80 p-1 rounded-full"
              >
                <FolderPlus size={18} />
              </button>
            )}
          </div>

          {isCreatingFolder && (
            <div className="mb-4 flex items-center space-x-2 bg-white p-2 rounded border">
              <input
                type="text"
                value={newFolderName}
                onChange={e => setNewFolderName(e.target.value)}
                placeholder="New folder name"
                className="flex-1 p-1 text-sm border-none focus:outline-none"
                autoFocus
                onKeyDown={e => 
                  handleKeyDown(
                    e, 
                    handleCreateFolder, 
                    () => {
                      setIsCreatingFolder(false);
                      setNewFolderName("");
                    }
                  )
                }
              />
              <button
                onClick={handleCreateFolder}
                className="text-green-600 p-1 hover:bg-green-50 rounded"
              >
                <Check size={16} />
              </button>
              <button
                onClick={() => {
                  setIsCreatingFolder(false);
                  setNewFolderName("");
                }}
                className="text-red-600 p-1 hover:bg-red-50 rounded"
              >
                <X size={16} />
              </button>
            </div>
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
                  {isRenamingFolder === folder.id ? (
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
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setIsRenamingFolder(null);
                          setNewFolderName("");
                        }}
                        className="text-red-600 p-1 hover:bg-red-50 rounded"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : movingItem ? (
                    <div
                      className="flex items-center p-2"
                      onClick={() => handleMoveConfirm(folder.id)}
                    >
                      <FolderIcon 
                        size={16} 
                        className={selectedFolder === folder.id 
                          ? "text-white" 
                          : "text-gray-500"
                        } 
                      />
                      <span className="ml-2">{folder.name}</span>
                      <span className="ml-auto text-xs opacity-70">
                        {folder.items?.length || 0}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-2">
                      <div 
                        className="flex items-center flex-grow"
                        onClick={() => {
                          setSelectedFolder(folder.id);
                          setShowTeamSelections(false);
                        }}
                      >
                        {selectedFolder === folder.id ? (
                          <FolderOpen 
                            size={16} 
                            className="text-white" 
                          />
                        ) : (
                          <FolderIcon 
                            size={16} 
                            className="text-gray-500" 
                          />
                        )}
                        <span className="ml-2 truncate">{folder.name}</span>
                        <span className="ml-auto text-xs opacity-70">
                          {folder.items?.length || 0}
                        </span>
                      </div>
                      
                      <div 
                        className={`
                          opacity-0 group-hover:opacity-100 flex items-center space-x-1
                          ${selectedFolder === folder.id ? "opacity-100" : ""}
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
                                  ${selectedFolder === folder.id
                                    ? "text-white hover:bg-primary-dark"
                                    : "text-gray-500 hover:bg-gray-200"
                                  }
                                `}
                              >
                                <Pencil size={14} />
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
                                  ${selectedFolder === folder.id
                                    ? "text-white hover:bg-primary-dark"
                                    : "text-gray-500 hover:bg-gray-200"
                                  }
                                `}
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
                    </div>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Content area */}
        <div className="col-span-2 p-4">
          {/* Show team selections */}
          {showTeamSelections && !selectedFolder ? (
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
                    <FolderPlus size={14} className="mr-1" />
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
                                    <ArrowRight size={16} />
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
          ) : selectedFolder ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-800">
                  {folders.find(f => f.id === selectedFolder)?.name || "Folder"}
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
          ) : (
            <div className="text-center py-12 text-gray-500">
              <FolderIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <p className="text-lg">No folder selected</p>
              <p className="text-sm mt-1">
                Select a folder from the sidebar or create a new one
              </p>
              {folders.length === 0 && (
                <button
                  onClick={() => setIsCreatingFolder(true)}
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 inline-flex items-center"
                >
                  <FolderPlus className="mr-2 h-4 w-4" />
                  Create your first folder
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriturenFolders;
