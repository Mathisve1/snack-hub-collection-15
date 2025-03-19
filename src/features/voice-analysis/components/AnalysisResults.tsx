
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecordingsList from "./RecordingsList";
import { VoiceAnalysisType } from "../types";

interface AnalysisResultsProps {
  team: string;
  type: VoiceAnalysisType;
  viewMode: "list" | "detail";
}

const AnalysisResults = ({ team, type, viewMode }: AnalysisResultsProps) => {
  const [view, setView] = useState<"list" | "detail">(viewMode);

  return (
    <div>
      <RecordingsList team={team} type={type} />
    </div>
  );
};

export default AnalysisResults;
