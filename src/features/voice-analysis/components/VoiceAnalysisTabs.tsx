
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecordingInterface } from "./RecordingInterface";
import AnalyzedRecordingsList from "../AnalyzedRecordingsList";
import { VoiceAnalysisType } from "../types";

interface VoiceAnalysisTabsProps {
  team: string;
}

const VoiceAnalysisTabs = ({ team }: VoiceAnalysisTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>("frituren");
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <Tabs defaultValue="frituren" className="w-full" onValueChange={handleTabChange}>
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="frituren">Frituren Interviews</TabsTrigger>
          <TabsTrigger value="interviews">Street Interviews</TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="frituren" className="space-y-4">
        <RecordingInterface team={team} type="frituren" />
        <AnalyzedRecordingsList team={team} type="frituren" />
      </TabsContent>
      
      <TabsContent value="interviews" className="space-y-4">
        <RecordingInterface team={team} type="interviews" />
        <AnalyzedRecordingsList team={team} type="interviews" />
      </TabsContent>
    </Tabs>
  );
};

export default VoiceAnalysisTabs;
