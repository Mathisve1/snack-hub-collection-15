
import React from "react";
import { Frituur } from "@/types";
import FriturenFolders from "./FriturenFolders";

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
        <button
          onClick={() => setShowFolders(!showFolders)}
          className="text-primary hover:text-primary/80 text-sm font-medium flex items-center"
        >
          {showFolders ? "Hide Folders" : "Manage Folders"}
        </button>
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
