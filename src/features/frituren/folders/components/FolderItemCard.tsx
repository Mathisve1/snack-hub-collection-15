
import { useState } from "react";
import { motion } from "framer-motion";
import { Move, Trash, CheckCircle, CircleCheck, Info, XCircle } from "lucide-react";
import { Frituur } from "@/types";
import { FolderItem } from "@/types/folders";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface FolderItemCardProps {
  item: FolderItem;
  frituur: Frituur | undefined;
  selectedFolder: string;
  setMovingItem: (item: { businessName: string; sourceFolderId: string } | null) => void;
  removeFrituurFromFolder: (folderId: string, businessName: string) => Promise<boolean>;
  team: string;
}

const FolderItemCard = ({
  item,
  frituur,
  selectedFolder,
  setMovingItem,
  removeFrituurFromFolder,
  team
}: FolderItemCardProps) => {
  const [isDone, setIsDone] = useState(false);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const handleMarkAsDone = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDone(!isDone);
  };

  const handleRemoveItem = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasError(false);
    
    try {
      const success = await removeFrituurFromFolder(selectedFolder, item.business_name);
      if (!success) {
        setHasError(true);
      }
    } catch (error) {
      setHasError(true);
    }
  };

  const goToFrituurDetail = () => {
    if (frituur && team) {
      navigate(`/frituur/${team}/${encodeURIComponent(frituur["Business Name"])}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-3 border rounded-md hover:bg-gray-50 cursor-pointer ${
        isDone ? 'border-green-500 bg-green-50 hover:bg-green-100' : 
        hasError ? 'border-red-300 bg-red-50' : ''
      }`}
      onClick={goToFrituurDetail}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className={`font-medium ${
            isDone ? 'text-green-700' : 
            hasError ? 'text-red-700' : 'text-gray-800'
          }`}>
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
          {hasError && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-red-600 gap-1">
                    <XCircle size={16} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Error occurred</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleMarkAsDone}
                  className={`p-1 rounded ${isDone ? 'text-green-600 hover:text-green-800' : 'text-gray-500 hover:text-gray-700'} hover:bg-gray-100`}
                >
                  {isDone ? <CheckCircle size={16} className="fill-green-100" /> : <CircleCheck size={16} />}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isDone ? 'Mark as not done' : 'Mark as done'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
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
                  onClick={handleRemoveItem}
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

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={goToFrituurDetail}
                  className="p-1 text-primary hover:text-primary/80 hover:bg-primary/10 rounded"
                >
                  <Info size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </motion.div>
  );
};

export default FolderItemCard;
