
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecordingsList from "./components/RecordingsList";
import { VoiceAnalysisType } from "./types";

interface AnalyzedRecordingsListProps {
  team: string;
  refreshCounter: number;
  type: VoiceAnalysisType;
}

const AnalyzedRecordingsList = ({ team, refreshCounter, type }: AnalyzedRecordingsListProps) => {
  return (
    <div className="mt-6">
      <RecordingsList key={`${type}-${refreshCounter}`} team={team} type={type} />
    </div>
  );
};

export default AnalyzedRecordingsList;
