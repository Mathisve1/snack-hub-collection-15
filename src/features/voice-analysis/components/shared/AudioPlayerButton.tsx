
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AudioPlayerButtonProps {
  audioUrl: string;
}

export const AudioPlayerButton = ({ audioUrl }: AudioPlayerButtonProps) => {
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
    >
      Play Audio
    </Button>
  );
};
