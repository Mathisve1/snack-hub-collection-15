
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VoiceRecordingUploader from "./VoiceRecordingUploader";

interface VoiceAnalysisSectionProps {
  team: string;
}

const VoiceAnalysisSection = ({ team }: VoiceAnalysisSectionProps) => {
  const [refreshFrituren, setRefreshFrituren] = useState(0);
  const [refreshInterviews, setRefreshInterviews] = useState(0);
  
  const handleFriturenUploadComplete = () => {
    setRefreshFrituren(prev => prev + 1);
  };

  const handleInterviewsUploadComplete = () => {
    setRefreshInterviews(prev => prev + 1);
  };

  return (
    <Card className="mb-8 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Voice Analysis Tool</CardTitle>
        <CardDescription>
          Upload voice recordings of frituren visits or street interviews for automatic analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="frituren" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="frituren">Frituren</TabsTrigger>
            <TabsTrigger value="interviews">Street Interviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="frituren">
            <VoiceRecordingUploader 
              team={team} 
              onUploadComplete={handleFriturenUploadComplete}
              type="frituren"
            />
          </TabsContent>
          
          <TabsContent value="interviews">
            <VoiceRecordingUploader 
              team={team} 
              onUploadComplete={handleInterviewsUploadComplete}
              type="interviews"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VoiceAnalysisSection;
