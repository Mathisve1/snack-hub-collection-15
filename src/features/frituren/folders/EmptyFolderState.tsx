
import { FolderIcon, FolderPlusIcon } from "lucide-react";

interface EmptyFolderStateProps {
  folders: any[];
  setIsCreatingFolder: (isCreating: boolean) => void;
}

const EmptyFolderState = ({ folders, setIsCreatingFolder }: EmptyFolderStateProps) => {
  return (
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
          <FolderPlusIcon className="mr-2 h-4 w-4" />
          Create your first folder
        </button>
      )}
    </div>
  );
};

export default EmptyFolderState;
