
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalysisTab from "../tabs/AnalysisTab";

interface VoiceRecordingCardProps {
  team: string;
  onFriturenUploadComplete: () => void;
  onInterviewsUploadComplete: () => void;
  onBuyerUploadComplete: () => void;
}

const VoiceRecordingCard = ({ 
  team, 
  onFriturenUploadComplete, 
  onInterviewsUploadComplete, 
  onBuyerUploadComplete 
}: VoiceRecordingCardProps) => {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Voice Analysis Tool</CardTitle>
        <CardDescription>
          Upload voice recordings for automatic analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="frituren" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="frituren">Frituren</TabsTrigger>
            <TabsTrigger value="interviews">Street Interviews</TabsTrigger>
            <TabsTrigger value="buyer">Buyer Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="frituren">
            <AnalysisTab 
              team={team} 
              onUploadComplete={onFriturenUploadComplete}
              type="frituren"
            />
          </TabsContent>
          
          <TabsContent value="interviews">
            <AnalysisTab 
              team={team} 
              onUploadComplete={onInterviewsUploadComplete}
              type="interviews"
            />
          </TabsContent>

          <TabsContent value="buyer">
            <AnalysisTab 
              team={team} 
              onUploadComplete={onBuyerUploadComplete}
              type="buyer"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VoiceRecordingCard;
