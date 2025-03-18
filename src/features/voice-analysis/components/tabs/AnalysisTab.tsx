
import { useState } from "react";
import { VoiceAnalysisType } from "../../types";
import VoiceRecordingUploader from "../../VoiceRecordingUploader";
import AnalysisResults from "../AnalysisResults";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AnalysisTabProps {
  team: string;
  type: VoiceAnalysisType;
  onUploadComplete: () => void;
}

const AnalysisTab = ({ team, type, onUploadComplete }: AnalysisTabProps) => {
  const [activeTab, setActiveTab] = useState("transcripts");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-medium mb-4">Upload {type} Recording</h3>
        <VoiceRecordingUploader 
          team={team} 
          onUploadComplete={onUploadComplete}
          type={type}
        />
      </div>
      
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-medium mb-4">View Results</h3>
        <Tabs defaultValue="transcripts" onValueChange={handleTabChange} value={activeTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="transcripts">Transcripts</TabsTrigger>
            <TabsTrigger value="analyses">Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transcripts">
            <AnalysisResults
              team={team}
              type={type}
              viewMode="transcripts"
            />
          </TabsContent>
          
          <TabsContent value="analyses">
            <AnalysisResults
              team={team}
              type={type}
              viewMode="analyses"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalysisTab;
