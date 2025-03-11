
import React from "react";
import { Construction } from "lucide-react";

interface ComingSoonBannerProps {
  message: string;
  imageUrl: string;
}

const ComingSoonBanner: React.FC<ComingSoonBannerProps> = ({ message, imageUrl }) => {
  return (
    <div className="mb-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4 shadow-sm">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-full md:w-1/4 flex justify-center">
          <img 
            src={imageUrl} 
            alt="Coming Soon" 
            className="h-auto w-full max-w-xs rounded-md object-cover shadow-sm" 
          />
        </div>
        <div className="w-full md:w-3/4 flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <Construction className="h-5 w-5 text-yellow-600" />
            <h3 className="text-lg font-medium text-yellow-800">Coming Soon!</h3>
          </div>
          <p className="text-yellow-700 whitespace-pre-line">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonBanner;
