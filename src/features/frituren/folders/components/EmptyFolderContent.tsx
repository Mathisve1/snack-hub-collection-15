
import { FolderIcon } from "lucide-react";

const EmptyFolderContent = () => {
  return (
    <div className="text-center py-8 text-gray-500">
      <FolderIcon className="mx-auto h-12 w-12 text-gray-300 mb-2" />
      <p>This folder is empty</p>
      <p className="text-sm mt-1">
        Add frituren to organize them in this folder
      </p>
    </div>
  );
};

export default EmptyFolderContent;
