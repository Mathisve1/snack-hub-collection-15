
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Team } from "@/types";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AccessCodeModal from "./AccessCodeModal";

interface TeamCardProps {
  team: Team;
  onClick: (team: Team) => void;
  isSelected: boolean;
}

const TeamCard = ({ team, onClick, isSelected }: TeamCardProps) => {
  const teamColors: Record<Team, string> = {
    "OV-3": "bg-team-ov-3/10 border-team-ov-3/30 hover:bg-team-ov-3/20",
    "OV-14": "bg-team-ov-14/10 border-team-ov-14/30 hover:bg-team-ov-14/20",
    "OV-38": "bg-team-ov-38/10 border-team-ov-38/30 hover:bg-team-ov-38/20",
    "OV-13": "bg-team-ov-40/10 border-team-ov-40/30 hover:bg-team-ov-40/20",
  };

  const teamTextColors: Record<Team, string> = {
    "OV-3": "text-team-ov-3",
    "OV-14": "text-team-ov-14",
    "OV-38": "text-team-ov-38",
    "OV-13": "text-team-ov-40",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`team-card border ${teamColors[team]} ${
        isSelected ? "ring-2 ring-offset-2 ring-primary" : ""
      }`}
      onClick={() => onClick(team)}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className={`text-2xl font-bold ${teamTextColors[team]}`}>{team}</div>
        <p className="text-gray-600 text-center">
          Select frituren for your team
        </p>
      </div>
    </motion.div>
  );
};

const TeamSelection = () => {
  const navigate = useNavigate();
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [accessTeam, setAccessTeam] = useState<Team | null>(null);
  const teams: Team[] = ["OV-3", "OV-14", "OV-38", "OV-13"];

  const checkTeamAccess = (team: Team) => {
    const isVerified = sessionStorage.getItem(`team_access_${team}`);
    return isVerified === "verified";
  };

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
    
    // Check if team access is already verified
    if (checkTeamAccess(team)) {
      navigateToTeam(team);
    } else {
      setAccessTeam(team);
      setShowAccessModal(true);
    }
  };
  
  const navigateToTeam = (team: Team) => {
    // Add a small delay for better UX
    setTimeout(() => {
      navigate(`/frituren/${team}`);
    }, 300);
  };

  const handleVerificationSuccess = () => {
    setShowAccessModal(false);
    if (accessTeam) {
      navigateToTeam(accessTeam);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            <span className="inline-block">Frituren</span>{" "}
            <span className="inline-block">Selection</span>{" "}
            <span className="inline-block text-primary">Tool</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select your team to view and choose frituren for your area.
            Once a frituur is selected by a team, it cannot be selected by another team.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {teams.map((team) => (
          <TeamCard
            key={team}
            team={team}
            onClick={handleTeamSelect}
            isSelected={selectedTeam === team}
          />
        ))}
      </motion.div>
      
      {/* Access Code Verification Modal */}
      {showAccessModal && accessTeam && (
        <AccessCodeModal
          team={accessTeam}
          isOpen={showAccessModal}
          onClose={() => {
            setShowAccessModal(false);
            setSelectedTeam(null);
          }}
          onSuccess={handleVerificationSuccess}
        />
      )}
    </div>
  );
};

export default TeamSelection;
