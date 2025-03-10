
import { Frituur } from "@/types";

interface AddFrituurMenuProps {
  showAddFrituurMenu: boolean;
  setShowAddFrituurMenu: (show: boolean) => void;
  selectedFrituurForFolder: string | null;
  setSelectedFrituurForFolder: (name: string | null) => void;
  frituren: Frituur[];
  handleAddFrituurToFolder: (businessName: string) => void;
  teamSelections: string[];
}

const AddFrituurMenu = ({
  showAddFrituurMenu,
  setShowAddFrituurMenu,
  selectedFrituurForFolder,
  setSelectedFrituurForFolder,
  frituren,
  handleAddFrituurToFolder,
  teamSelections
}: AddFrituurMenuProps) => {
  if (!showAddFrituurMenu) return null;

  // Filter the frituren dropdown to only show team selections
  const teamFrituren = frituren.filter(frituur => 
    teamSelections.includes(frituur["Business Name"])
  );

  return (
    <div className="mb-4 p-3 border rounded-md bg-gray-50">
      <h4 className="text-sm font-medium mb-2">Select a frituur to add:</h4>
      <div className="relative">
        <select
          className="w-full p-2 border rounded bg-white pr-8"
          value={selectedFrituurForFolder || ""}
          onChange={e => setSelectedFrituurForFolder(e.target.value)}
        >
          <option value="">-- Select a frituur --</option>
          {teamFrituren.map(frituur => (
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
  );
};

export default AddFrituurMenu;
