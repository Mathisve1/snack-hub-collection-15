
import { motion } from "framer-motion";

const FriturenFooter = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-gray-50 border-t border-gray-200 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Frituren Selector. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default FriturenFooter;
