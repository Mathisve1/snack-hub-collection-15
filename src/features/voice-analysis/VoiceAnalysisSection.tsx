
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import VoiceRecordingUploader from "./VoiceRecordingUploader";
import AnalyzedRecordingsList from "./AnalyzedRecordingsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface VoiceAnalysisSectionProps {
  team: string;
}

const VoiceAnalysisSection = ({ team }: VoiceAnalysisSectionProps) => {
  const [refreshList, setRefreshList] = useState(0);
  
  const handleUploadComplete = () => {
    setRefreshList(prev => prev + 1);
  };

  return (
    <Card className="mb-8 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Voice Analysis Tool</CardTitle>
        <CardDescription>
          Upload voice recordings for automatic analysis or browse previous analyses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="upload">Upload Recording</TabsTrigger>
            <TabsTrigger value="analyzed">Analyzed Recordings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <VoiceRecordingUploader 
              team={team} 
              onUploadComplete={handleUploadComplete} 
            />
          </TabsContent>
          
          <TabsContent value="analyzed">
            <AnalyzedRecordingsList 
              key={refreshList}
              team={team} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VoiceAnalysisSection;
