
import { CheckIcon, XIcon } from "lucide-react";

interface CreateFolderFormProps {
  newFolderName: string;
  setNewFolderName: (name: string) => void;
  handleCreateFolder: () => void;
  handleCancel: () => void;
  handleKeyDown: (e: React.KeyboardEvent, action: () => void, cancelAction: () => void) => void;
}

const CreateFolderForm = ({
  newFolderName,
  setNewFolderName,
  handleCreateFolder,
  handleCancel,
  handleKeyDown
}: CreateFolderFormProps) => {
  return (
    <div className="mb-4 flex items-center space-x-2 bg-white p-2 rounded border">
      <input
        type="text"
        value={newFolderName}
        onChange={e => setNewFolderName(e.target.value)}
        placeholder="New folder name"
        className="flex-1 p-1 text-sm border-none focus:outline-none"
        autoFocus
        onKeyDown={e => handleKeyDown(e, handleCreateFolder, handleCancel)}
      />
      <button
        onClick={handleCreateFolder}
        className="text-green-600 p-1 hover:bg-green-50 rounded"
      >
        <CheckIcon size={16} />
      </button>
      <button
        onClick={handleCancel}
        className="text-red-600 p-1 hover:bg-red-50 rounded"
      >
        <XIcon size={16} />
      </button>
    </div>
  );
};

export default CreateFolderForm;
