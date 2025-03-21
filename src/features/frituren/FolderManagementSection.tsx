
import React from "react";
import { Frituur } from "@/types";
import FriturenFolders from "./FriturenFolders";
import { FolderIcon, ChevronRightIcon, ChevronDownIcon } from "lucide-react";

interface FolderManagementSectionProps {
  showFolders: boolean;
  setShowFolders: (show: boolean) => void;
  team: string;
  frituren: Frituur[];
}

const FolderManagementSection = ({
  showFolders,
  setShowFolders,
  team,
  frituren,
}: FolderManagementSectionProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Your {team} Selections</h2>
        
        <div 
          onClick={() => setShowFolders(!showFolders)}
          className="flex items-center gap-2 p-2 bg-gray-50 rounded-md border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <FolderIcon size={18} className="text-primary" />
          <span className="text-sm font-medium text-gray-700">
            {showFolders ? "Hide Folders" : "Manage Folders"}
          </span>
          {showFolders ? (
            <ChevronDownIcon size={16} className="text-gray-500" />
          ) : (
            <ChevronRightIcon size={16} className="text-gray-500" />
          )}
        </div>
      </div>
      
      {showFolders && (
        <div className="mb-8">
          <FriturenFolders 
            team={team}
            frituren={frituren}
          />
        </div>
      )}
    </div>
  );
};

export default FolderManagementSection;
