import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import VoiceRecordingUploader from "./VoiceRecordingUploader";
import { VoiceAnalysisType } from "./types";
interface VoiceAnalysisSectionProps {
  team: string;
}
const VoiceAnalysisSection = ({
  team
}: VoiceAnalysisSectionProps) => {
  const [refreshFrituren, setRefreshFrituren] = useState(0);
  const [refreshInterviews, setRefreshInterviews] = useState(0);
  const navigate = useNavigate();
  const handleFriturenUploadComplete = () => {
    setRefreshFrituren(prev => prev + 1);
  };
  const handleInterviewsUploadComplete = () => {
    setRefreshInterviews(prev => prev + 1);
  };
  const handleViewResults = () => {
    if (team === "OV-3") {
      navigate("/team-3-results");
    } else if (team === "OV-13") {
      navigate("/team-13-results");
    } else if (team === "OV-14") {
      navigate("/team-14-results");
    } else if (team === "OV-38") {
      navigate("/team-38-results");
    }
  };
  return <div className="space-y-8">
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Voice Analysis Tool</CardTitle>
          <CardDescription>Upload één opname per keer voor een ai gegenereerde anlyse.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="frituren" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="frituren">Frituren</TabsTrigger>
              <TabsTrigger value="interviews">Street Interviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="frituren">
              <VoiceRecordingUploader team={team} onUploadComplete={handleFriturenUploadComplete} type="frituren" />
            </TabsContent>
            
            <TabsContent value="interviews">
              <VoiceRecordingUploader team={team} onUploadComplete={handleInterviewsUploadComplete} type="interviews" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Results</CardTitle>
          <CardDescription>
            View your team's analysis results
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button size="lg" onClick={handleViewResults} className="w-full md:w-auto py-6 text-lg font-medium">
            Bekijk hier je resultaten
          </Button>
        </CardContent>
      </Card>
    </div>;
};
export default VoiceAnalysisSection;