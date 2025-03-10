
import { Frituur } from "@/types";
import { Folder, FolderItem } from "@/types/folders";
import FolderHeader from "./components/FolderHeader";
import AddFrituurMenu from "./components/AddFrituurMenu";
import EmptyFolderContent from "./components/EmptyFolderContent";
import FolderItemCard from "./components/FolderItemCard";

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
  team: string;
  teamSelections: string[];
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
  movingItem,
  team,
  teamSelections
}: FolderContentViewProps) => {
  const getCurrentFolderItems = () => {
    if (!selectedFolder) return [];
    const folder = folders.find(f => f.id === selectedFolder);
    // Filter to only show folder items that are also in team selections
    return (folder?.items || []).filter(item => 
      teamSelections.includes(item.business_name)
    );
  };

  const currentFolder = folders.find(f => f.id === selectedFolder);
  const folderItems = getCurrentFolderItems();
  
  return (
    <>
      <FolderHeader
        folderName={currentFolder?.name || ""}
        showAddFrituurMenu={showAddFrituurMenu}
        setShowAddFrituurMenu={setShowAddFrituurMenu}
        movingItem={movingItem}
        setMovingItem={setMovingItem}
      />
      
      <AddFrituurMenu
        showAddFrituurMenu={showAddFrituurMenu}
        setShowAddFrituurMenu={setShowAddFrituurMenu}
        selectedFrituurForFolder={selectedFrituurForFolder}
        setSelectedFrituurForFolder={setSelectedFrituurForFolder}
        frituren={frituren}
        handleAddFrituurToFolder={handleAddFrituurToFolder}
        teamSelections={teamSelections}
      />
      
      <div className="space-y-2">
        {folderItems.length > 0 ? (
          folderItems.map((item: FolderItem) => {
            const frituur = getFrituurByName(item.business_name);
            return (
              <FolderItemCard
                key={item.id}
                item={item}
                frituur={frituur}
                selectedFolder={selectedFolder as string}
                setMovingItem={setMovingItem}
                removeFrituurFromFolder={removeFrituurFromFolder}
              />
            );
          })
        ) : (
          <EmptyFolderContent />
        )}
      </div>
    </>
  );
};

export default FolderContentView;
