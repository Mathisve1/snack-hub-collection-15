
import { Snack } from "@/types";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface SnackCardProps {
  snack: Snack;
  delay?: number;
}

const SnackCard = ({ snack, delay = 0 }: SnackCardProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/snack/${snack.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      className="glass-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
      onClick={handleClick}
      whileHover={{ y: -5 }}
    >
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={snack.imageUrl} 
          alt={snack.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold tracking-tight">{snack.name}</h3>
          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
            {snack.team}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{snack.description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Protein</span>
            <span className="font-medium">{snack.protein}g</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-nutrition-protein h-1.5 rounded-full" 
              style={{ width: `${(snack.protein / 20) * 100}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-600">Calories</span>
            <span className="font-medium">{snack.calories}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-4">
          {snack.isVegetarian && (
            <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full">Vegetarian</span>
          )}
          {snack.isVegan && (
            <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full">Vegan</span>
          )}
          {snack.isGlutenFree && (
            <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded-full">Gluten-Free</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SnackCard;
