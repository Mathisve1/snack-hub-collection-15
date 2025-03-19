
import { Button } from "@/components/ui/button";
import { ArrowLeft, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FrituurHeaderProps {
  businessName: string;
  team: string;
  rating?: number | null;
}

const FrituurHeader = ({ businessName, team, rating }: FrituurHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(`/frituren/${team}`)}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold truncate">{businessName}</h1>
          </div>
          
          <div className="flex items-center gap-2">
            {team === "OV-38" && (
              <Button 
                variant="outline"
                onClick={() => navigate('/team-38-results')}
                className="flex items-center gap-2"
              >
                <Database className="h-4 w-4" />
                <span>Team 38 Research Data</span>
              </Button>
            )}
            
            {rating && (
              <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-md flex items-center">
                <span className="font-medium">{rating}</span>
                <span className="ml-1">★</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrituurHeader;
