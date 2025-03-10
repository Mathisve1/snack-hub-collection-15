
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FriturenHeaderProps {
  team: string;
  selectedCount: number;
}

const FriturenHeader = ({ team, selectedCount }: FriturenHeaderProps) => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/70 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary cursor-pointer" onClick={goHome}>
              Frituren Selector
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
              Team {team}: {selectedCount} selected
            </span>
            <button
              onClick={goHome}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft size={20} className="mr-1" />
              Change Team
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default FriturenHeader;
