
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
    <div className="my-12 max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-md p-6 border border-indigo-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Organize Your {team} Selections
          </h2>
          
          <div 
            onClick={() => setShowFolders(!showFolders)}
            className="flex items-center gap-2 p-2 bg-white rounded-md border border-indigo-200 cursor-pointer hover:bg-indigo-50 transition-colors"
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
        
        {!showFolders && (
          <p className="text-gray-600 mb-4 text-center">
            Create custom folders to organize your selected frituren for easier management and collaboration.
          </p>
        )}
        
        {showFolders && (
          <div className="mb-4">
            <FriturenFolders 
              team={team}
              frituren={frituren}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderManagementSection;
