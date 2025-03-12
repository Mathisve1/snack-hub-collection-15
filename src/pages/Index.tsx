import { motion } from "framer-motion";
import TeamSelection from "@/components/TeamSelection";
import { useEffect } from "react";
import { toast } from "sonner";

const Index = () => {
  // Clear all team access verifications when landing on the home page
  useEffect(() => {
    const teams = ["OV-3", "OV-13", "OV-14", "OV-38"];
    teams.forEach(team => {
      sessionStorage.removeItem(`team_access_${team}`);
    });
  }, []);

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
              <span className="text-2xl font-bold text-primary">ProteinSnacks</span>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="flex-grow">
        <div className="min-h-[90vh] flex items-center justify-center">
          <TeamSelection />
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

export default Index;
