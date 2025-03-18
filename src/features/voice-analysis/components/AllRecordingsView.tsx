
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { VoiceAnalysis, VoiceAnalysisType } from "../types";
import { useRecordings } from "../hooks/useRecordings";
import { formatDuration } from "../utils/formatUtils";
import StatusBadge from "./StatusBadge";

interface AllRecordingsViewProps {
  team: string;
}

const AllRecordingsView = ({ team }: AllRecordingsViewProps) => {
  const [expanded, setExpanded] = useState(false);
  
  // Fetch recordings for all types
  const { recordings: friturenRecordings, loading: friturenLoading } = useRecordings(team, 'frituren');
  const { recordings: interviewsRecordings, loading: interviewsLoading } = useRecordings(team, 'interviews');
  const { recordings: buyerRecordings, loading: buyerLoading } = useRecordings(team, 'buyer');
  
  // Combine all recordings
  const allRecordings = [...friturenRecordings, ...interviewsRecordings, ...buyerRecordings]
    .filter(recording => recording.team === team)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  
  // Filter only completed recordings with transcript or analysis
  const completedRecordings = allRecordings.filter(
    recording => recording.status === 'completed' && (recording.transcript || recording.analysis)
  );
  
  const loading = friturenLoading || interviewsLoading || buyerLoading;
  
  const getRecordingTypeLabel = (recording: VoiceAnalysis): string => {
    const bucketId = recording.bucket_id;
    if (bucketId.includes('frituren')) return 'Frituren';
    if (bucketId.includes('interviews')) return 'Street Interview';
    if (bucketId.includes('buyer')) return 'Buyer Analysis';
    return 'Unknown';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
        <span className="ml-3 text-gray-600">Loading all recordings...</span>
      </div>
    );
  }

  if (completedRecordings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No completed recordings with transcripts or analyses found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">All Recordings ({completedRecordings.length})</h3>
        <Button 
          variant="outline" 
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Collapse All" : "Expand All"}
        </Button>
      </div>
      
      <Accordion 
        type="multiple" 
        defaultValue={expanded ? completedRecordings.map(r => r.id) : []} 
        className="w-full space-y-4"
      >
        {completedRecordings.map((recording) => (
          <AccordionItem key={recording.id} value={recording.id} className="border rounded-lg">
            <AccordionTrigger className="px-4 hover:no-underline hover:bg-gray-50 rounded-lg">
              <div className="flex flex-col items-start text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {getRecordingTypeLabel(recording)} - {formatDistanceToNow(new Date(recording.created_at), { addSuffix: true })}
                  </span>
                  <StatusBadge status={recording.status} />
                </div>
                {recording.duration_seconds > 0 && (
                  <span className="text-xs text-gray-500">
                    Duration: {formatDuration(recording.duration_seconds)}
                  </span>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recording.transcript && (
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Transcript:</h4>
                    <p className="text-sm whitespace-pre-wrap">{recording.transcript}</p>
                  </Card>
                )}
                
                {recording.analysis && (
                  <Card className="p-4">
                    <h4 className="font-medium mb-2">Analysis:</h4>
                    <p className="text-sm whitespace-pre-wrap">{recording.analysis}</p>
                  </Card>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default AllRecordingsView;
