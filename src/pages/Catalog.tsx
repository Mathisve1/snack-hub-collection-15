
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Team } from "@/types";
import { getSnacksByTeam } from "@/lib/mockData";
import SnackCard from "@/components/SnackCard";
import { ChevronLeft } from "lucide-react";

const Catalog = () => {
  const { team = "" } = useParams<{ team: string }>();
  const navigate = useNavigate();
  const [isValidTeam, setIsValidTeam] = useState(false);
  
  useEffect(() => {
    // Validate team param
    const validTeams: Team[] = ["OV-3", "OV-14", "OV-38", "OV-13"];
    if (!validTeams.includes(team as Team)) {
      navigate("/");
      return;
    }
    
    setIsValidTeam(true);
  }, [team, navigate]);
  
  const snacks = getSnacksByTeam(team as Team);
  
  const goHome = () => {
    navigate("/");
  };

  if (!isValidTeam) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
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
                ProteinSnacks
              </span>
            </div>
            <button
              onClick={goHome}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft size={20} className="mr-1" />
              Change Team
            </button>
          </div>
        </div>
      </motion.header>

      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Team {team}
            </span>
            <h1 className="text-4xl font-bold mb-4">Protein-Rich Fried Snacks</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our collection of healthy, delicious protein-rich fried snacks 
              specially curated for Team {team}.
            </p>
          </motion.div>
          
          <div className="snack-grid">
            {snacks.map((snack, index) => (
              <SnackCard 
                key={snack.id} 
                snack={snack} 
                delay={index * 0.1}
              />
            ))}
          </div>
          
          {snacks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No snacks found for this team. Please check back later.</p>
            </div>
          )}
        </div>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gray-50 border-t border-gray-200 py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ProteinSnacks. All rights reserved.
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Catalog;
