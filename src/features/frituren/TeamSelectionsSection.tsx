
import React from "react";
import { Frituur } from "@/types";
import FriturenItem from "./FriturenItem";

interface TeamSelectionsSectionProps {
  teamFrituren: Frituur[];
  team: string;
  getSelectedBy: (businessName: string) => string | null;
  handleSelect: (frituur: Frituur) => void;
  isFrituurSaved: (businessName: string) => boolean;
  isFrituurLiked: (businessName: string) => boolean;
  handleSaveFrituur: (businessName: string) => void;
  handleLikeFrituur: (businessName: string) => void;
}

const TeamSelectionsSection = ({
  teamFrituren,
  team,
  getSelectedBy,
  handleSelect,
  isFrituurSaved,
  isFrituurLiked,
  handleSaveFrituur,
  handleLikeFrituur,
}: TeamSelectionsSectionProps) => {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Selected Frituren</h2>
      
      {teamFrituren.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamFrituren.map((frituur, index) => {
            const businessName = frituur["Business Name"];
            const selectedByTeam = getSelectedBy(businessName);
            const isSelectedByCurrentTeam = selectedByTeam === team;
            const isSelectedByOtherTeam = selectedByTeam && selectedByTeam !== team;
            
            return (
              <FriturenItem
                key={`team-${businessName}`}
                frituur={frituur}
                index={index}
                isSelectedByCurrentTeam={isSelectedByCurrentTeam}
                isSelectedByOtherTeam={isSelectedByOtherTeam}
                selectedByTeam={selectedByTeam}
                handleSelect={handleSelect}
                isSaved={isFrituurSaved(businessName)}
                isLiked={isFrituurLiked(businessName)}
                onSave={handleSaveFrituur}
                onLike={handleLikeFrituur}
                team={team}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-600">You haven't selected any frituren yet.</p>
          <p className="text-gray-500 mt-2">Browse the list above and start selecting!</p>
        </div>
      )}
    </div>
  );
};

export default TeamSelectionsSection;
