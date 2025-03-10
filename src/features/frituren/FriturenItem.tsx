
import { motion } from "framer-motion";
import { Check, Heart, Bookmark, Info } from "lucide-react";
import { Frituur } from "@/types";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface FriturenItemProps {
  frituur: Frituur;
  index: number;
  isSelectedByCurrentTeam: boolean;
  isSelectedByOtherTeam: boolean;
  selectedByTeam: string | null;
  handleSelect: (frituur: Frituur) => void;
  isSaved: boolean;
  isLiked: boolean;
  onSave: (businessName: string) => void;
  onLike: (businessName: string) => void;
  team: string;
}

const FriturenItem = ({ 
  frituur, 
  index, 
  isSelectedByCurrentTeam, 
  isSelectedByOtherTeam, 
  selectedByTeam,
  handleSelect,
  isSaved,
  isLiked,
  onSave,
  onLike,
  team
}: FriturenItemProps) => {
  const businessName = frituur["Business Name"];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index % 10 * 0.05 }}
      className={`bg-white rounded-lg shadow-sm overflow-hidden border ${
        isSelectedByCurrentTeam 
          ? 'border-primary' 
          : isSelectedByOtherTeam 
            ? 'border-gray-300 opacity-60' 
            : 'border-transparent hover:border-gray-300'
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{businessName}</h3>
          {frituur.Rating && (
            <span className="flex items-center text-amber-500">
              {frituur.Rating} <span className="ml-1">★</span>
            </span>
          )}
        </div>
        
        <div className="space-y-2 mb-4">
          {frituur.Gemeente && (
            <p className="text-gray-600 text-sm">
              {frituur.Straat && `${frituur.Straat}, `}
              {frituur.Gemeente}
              {frituur.Postcode && ` - ${frituur.Postcode}`}
            </p>
          )}
          {frituur.Provincie && (
            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              {frituur.Provincie}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-2">
          {isSelectedByOtherTeam ? (
            <span className="text-sm text-gray-500">
              Selected by {selectedByTeam}
            </span>
          ) : (
            <button
              onClick={() => handleSelect(frituur)}
              className={`px-4 py-2 rounded-md flex items-center text-sm ${
                isSelectedByCurrentTeam
                  ? 'bg-primary/10 text-primary hover:bg-primary/20'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isSelectedByCurrentTeam ? (
                <>
                  <Check size={16} className="mr-1" />
                  Selected
                </>
              ) : (
                'Select'
              )}
            </button>
          )}
          
          <Link to={`/frituur/${team}/${encodeURIComponent(businessName)}`}>
            <Button variant="outline" size="sm">
              <Info className="h-4 w-4 mr-1" />
              Details
            </Button>
          </Link>
        </div>

        {/* Website link */}
        {frituur.Website && (
          <div className="mt-2 mb-2">
            <a
              href={frituur.Website.startsWith('http') ? frituur.Website : `https://${frituur.Website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 text-sm"
            >
              Visit Website
            </a>
          </div>
        )}

        {/* Save and Like buttons */}
        <div className="flex items-center space-x-2 mt-2">
          <button
            onClick={() => onSave(businessName)}
            className={`flex items-center space-x-1 px-3 py-1 rounded-md text-xs ${
              isSaved 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Bookmark size={14} className={isSaved ? "fill-blue-600" : ""} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
          
          <button
            onClick={() => onLike(businessName)}
            className={`flex items-center space-x-1 px-3 py-1 rounded-md text-xs ${
              isLiked 
                ? 'bg-red-100 text-red-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Heart size={14} className={isLiked ? "fill-red-500" : ""} />
            <span>{isLiked ? 'Liked' : 'Like'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FriturenItem;
