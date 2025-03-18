
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { toast } from "sonner";

interface AudioPlayerButtonProps {
  audioUrl: string;
  className?: string;
}

export const AudioPlayerButton = ({ audioUrl, className }: AudioPlayerButtonProps) => {
  const handlePlayAudio = (event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (!audioUrl) {
      toast.error("Audio file not available");
      return;
    }
    
    const audio = new Audio(audioUrl);
    audio.play().catch(error => {
      console.error("Error playing audio:", error);
      toast.error("Failed to play audio");
    });
  };

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handlePlayAudio}
      className={className}
    >
      <Play className="h-4 w-4 mr-2" />
      Play Audio
    </Button>
  );
};
