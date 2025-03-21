
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChartBarIcon } from "lucide-react";

interface VoiceAnalysisSectionProps {
  team: string;
}

const VoiceAnalysisSection = ({ team }: VoiceAnalysisSectionProps) => {
  const navigate = useNavigate();
  
  const handleViewResults = () => {
    // Redirect to the appropriate results page based on team
    if (team === "OV-3") {
      navigate("/team-3-results");
    } else if (team === "OV-13") {
      navigate("/team-13-results");
    } else if (team === "OV-14") {
      navigate("/team-38-results-triplicate");
    } else if (team === "OV-38") {
      navigate("/team-38-results");
    } else {
      // Default fallback
      navigate("/team-38-results");
    }
  };

  return (
    <div className="my-8 text-center">
      <Button 
        onClick={handleViewResults} 
        size="lg" 
        className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-6 h-auto text-lg"
      >
        <ChartBarIcon className="mr-2 h-5 w-5" /> Bekijk hier je resultaten
      </Button>
    </div>
  );
};

export default VoiceAnalysisSection;
