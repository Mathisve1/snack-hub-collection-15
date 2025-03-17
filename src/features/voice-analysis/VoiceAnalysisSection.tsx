
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import VoiceRecordingUploader from "./VoiceRecordingUploader";
import AnalyzedRecordingsList from "./AnalyzedRecordingsList";
import FriturenInterviewsList from "./FriturenInterviewsList";
import { useState } from "react";

interface VoiceAnalysisSectionProps {
  team: string;
}

const VoiceAnalysisSection = ({ team }: VoiceAnalysisSectionProps) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const handleUploadComplete = () => {
    setRefreshTrigger(prev => prev + 1);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Voice Analysis</CardTitle>
          <CardDescription>
            Record or upload voice memos for automatic transcription and analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="interviews">
            <TabsList className="mb-4">
              <TabsTrigger value="interviews">Street Interviews</TabsTrigger>
              <TabsTrigger value="frituren">Frituur Recordings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="interviews">
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Record Street Interview</h3>
                  <VoiceRecordingUploader 
                    team={team}
                    onUploadComplete={handleUploadComplete}
                    type="interviews"
                  />
                </div>
                
                <AnalyzedRecordingsList 
                  key={`interviews-${refreshTrigger}`}
                  team={team} 
                />
              </div>
            </TabsContent>
            
            <TabsContent value="frituren">
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Record Frituur Visit</h3>
                  <VoiceRecordingUploader 
                    team={team}
                    onUploadComplete={handleUploadComplete}
                    type="frituren"
                  />
                </div>
                
                <FriturenInterviewsList 
                  key={`frituren-${refreshTrigger}`}
                  team={team} 
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceAnalysisSection;
