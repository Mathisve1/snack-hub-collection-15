
import { Snack } from "@/types";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SnackDetailProps {
  snack: Snack;
}

const NutrientBar = ({ 
  value, 
  maxValue, 
  color, 
  label 
}: { 
  value: number; 
  maxValue: number; 
  color: string; 
  label: string;
}) => {
  const percentage = Math.min((value / maxValue) * 100, 100);
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-sm">
        <span>{label}</span>
        <span className="font-medium">{value}g</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`${color} h-2 rounded-full`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const SnackDetail = ({ snack }: SnackDetailProps) => {
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <button 
        onClick={goBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to catalog
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-2xl"
        >
          <img 
            src={snack.imageUrl} 
            alt={snack.name} 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {snack.team}
            </span>
            
            {snack.rating && (
              <div className="flex items-center">
                <span className="text-amber-500">★</span>
                <span className="ml-1 text-sm font-medium">{snack.rating}</span>
              </div>
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{snack.name}</h1>
          <p className="text-gray-700 mb-8">{snack.description}</p>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Nutrition Facts</h3>
              <div className="space-y-3 mb-4">
                <NutrientBar 
                  value={snack.protein} 
                  maxValue={20} 
                  color="bg-nutrition-protein" 
                  label="Protein" 
                />
                <NutrientBar 
                  value={snack.carbs} 
                  maxValue={30} 
                  color="bg-nutrition-carbs" 
                  label="Carbs" 
                />
                <NutrientBar 
                  value={snack.fats} 
                  maxValue={20} 
                  color="bg-nutrition-fats" 
                  label="Fats" 
                />
                <NutrientBar 
                  value={snack.fiber} 
                  maxValue={10} 
                  color="bg-nutrition-fiber" 
                  label="Fiber" 
                />
              </div>
              
              <div className="flex items-center">
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <span className="text-sm text-gray-600">Calories</span>
                  <div className="text-xl font-bold">{snack.calories}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Ingredients</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {snack.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            
            {snack.allergens && snack.allergens.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">Allergens</h3>
                <div className="flex flex-wrap gap-2">
                  {snack.allergens.map((allergen, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm"
                    >
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {snack.isVegetarian && (
                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">Vegetarian</span>
              )}
              {snack.isVegan && (
                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">Vegan</span>
              )}
              {snack.isGlutenFree && (
                <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm">Gluten-Free</span>
              )}
            </div>
            
            {snack.preparationTime && (
              <div className="flex items-center">
                <span className="text-gray-700">Preparation time: </span>
                <span className="ml-2 font-medium">{snack.preparationTime} minutes</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SnackDetail;
