
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Team } from "@/types";
import { motion } from "framer-motion";

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
    "OV-40": "bg-team-ov-40/10 border-team-ov-40/30 hover:bg-team-ov-40/20",
  };

  const teamTextColors: Record<Team, string> = {
    "OV-3": "text-team-ov-3",
    "OV-14": "text-team-ov-14",
    "OV-38": "text-team-ov-38",
    "OV-40": "text-team-ov-40",
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
          Healthy protein snacks tailored for your team
        </p>
      </div>
    </motion.div>
  );
};

const TeamSelection = () => {
  const navigate = useNavigate();
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const teams: Team[] = ["OV-3", "OV-14", "OV-38", "OV-40"];

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
    
    // Add a small delay for better UX
    setTimeout(() => {
      navigate(`/catalog/${team}`);
    }, 300);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: A0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            <span className="inline-block">Healthy</span>{" "}
            <span className="inline-block">Protein-Rich</span>{" "}
            <span className="inline-block text-primary">Snacks</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover delicious, nutritious fried snacks tailored specifically for your team.
            Select your team below to get started.
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
    </div>
  );
};

export default TeamSelection;
