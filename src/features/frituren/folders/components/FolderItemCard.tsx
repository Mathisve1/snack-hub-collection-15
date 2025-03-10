
import { motion } from "framer-motion";
import { Move, Trash } from "lucide-react";
import { Frituur } from "@/types";
import { FolderItem } from "@/types/folders";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface FolderItemCardProps {
  item: FolderItem;
  frituur: Frituur | undefined;
  selectedFolder: string;
  setMovingItem: (item: { businessName: string; sourceFolderId: string } | null) => void;
  removeFrituurFromFolder: (folderId: string, businessName: string) => Promise<boolean>;
}

const FolderItemCard = ({
  item,
  frituur,
  selectedFolder,
  setMovingItem,
  removeFrituurFromFolder
}: FolderItemCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 border rounded-md hover:bg-gray-50"
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-gray-800">
            {item.business_name}
          </h4>
          {frituur && (
            <div className="text-sm text-gray-600">
              {frituur.Gemeente && (
                <span>
                  {frituur.Gemeente}
                  {frituur.Provincie && `, ${frituur.Provincie}`}
                </span>
              )}
              {frituur.Rating && (
                <span className="ml-2 text-amber-500">
                  {frituur.Rating} ★
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="flex space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => {
                    setMovingItem({
                      businessName: item.business_name,
                      sourceFolderId: selectedFolder
                    });
                  }}
                  className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                >
                  <Move size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Move to another folder</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => 
                    removeFrituurFromFolder(selectedFolder, item.business_name)
                  }
                  className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                >
                  <Trash size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove from folder</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </motion.div>
  );
};

export default FolderItemCard;
