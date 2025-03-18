
import { useRecordings } from "../hooks/useRecordings";
import { VoiceAnalysisType } from "../types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AudioLines, ListFilter } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { formatDuration } from "../utils/formatUtils";
import StatusBadge from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AnalysisResultsProps {
  team: string;
  type: VoiceAnalysisType;
}

const AnalysisResults = ({ team, type }: AnalysisResultsProps) => {
  const { recordings, loading } = useRecordings(team, type);
  const [filter, setFilter] = useState<'all' | 'completed'>('all');
  
  const filteredRecordings = filter === 'all' 
    ? recordings 
    : recordings.filter(r => r.status === 'completed');
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
        <span className="ml-3 text-gray-600">Loading recordings...</span>
      </div>
    );
  }

  if (filteredRecordings.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
        <AudioLines className="h-12 w-12 mx-auto text-gray-400 mb-3" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">No recordings available</h3>
        <p className="text-gray-500">
          {filter === 'all' 
            ? `Upload a voice recording for ${type} analysis to see the results here.` 
            : "No completed analyses found. Try switching to 'All recordings'."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">
          {filteredRecordings.length} recording{filteredRecordings.length !== 1 ? 's' : ''}
        </h3>
        <div className="flex items-center space-x-2">
          <ListFilter className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-500">Filter:</span>
          <div className="flex space-x-1">
            <Button 
              variant={filter === 'all' ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button 
              variant={filter === 'completed' ? "default" : "outline"} 
              size="sm"
              onClick={() => setFilter('completed')}
            >
              Completed
            </Button>
          </div>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-3">
        {filteredRecordings.map((recording) => (
          <AccordionItem key={recording.id} value={recording.id} className="border rounded-lg">
            <AccordionTrigger className="px-4 hover:no-underline hover:bg-gray-50 rounded-t-lg">
              <div className="flex flex-col items-start text-left">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    Recording from {formatDistanceToNow(new Date(recording.created_at), { addSuffix: true })}
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
            <AccordionContent className="px-4 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                {recording.transcript && (
                  <Card className="p-4 bg-gray-50 border">
                    <h4 className="text-sm font-semibold mb-2 text-gray-700">Transcript</h4>
                    <div className="max-h-60 overflow-y-auto pr-2 text-sm whitespace-pre-wrap">
                      {recording.transcript}
                    </div>
                  </Card>
                )}
                
                {recording.analysis && (
                  <Card className="p-4 bg-gray-50 border">
                    <h4 className="text-sm font-semibold mb-2 text-gray-700">Analysis</h4>
                    <div className="max-h-60 overflow-y-auto pr-2 text-sm whitespace-pre-wrap">
                      {recording.analysis}
                    </div>
                  </Card>
                )}
                
                {!recording.transcript && !recording.analysis && (
                  <div className="col-span-2 py-6 text-center text-gray-500 italic">
                    Analysis in progress. Results will appear here when processing is complete.
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default AnalysisResults;
