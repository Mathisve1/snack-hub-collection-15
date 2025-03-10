
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSnackById } from "@/lib/mockData";
import SnackDetail from "@/components/SnackDetail";
import { motion } from "framer-motion";

const SnackPage = () => {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const snack = getSnackById(id);
  
  useEffect(() => {
    if (!snack) {
      navigate("/");
    }
  }, [snack, navigate]);
  
  if (!snack) {
    return null;
  }
  
  const goHome = () => {
    navigate("/");
  };

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
          </div>
        </div>
      </motion.header>

      <main className="flex-grow bg-gray-50">
        <SnackDetail snack={snack} />
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

export default SnackPage;
