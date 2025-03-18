
import { useRecordings } from "../hooks/useRecordings";
import { VoiceAnalysisType } from "../types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { AudioLines, ListFilter } from "lucide-react";
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

      <div className="grid grid-cols-1 gap-4">
        {filteredRecordings.map((recording) => (
          <Card key={recording.id} className="p-4 border rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recording.transcript ? (
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="text-sm font-semibold mb-2 text-gray-700">Transcript</h4>
                  <div className="max-h-60 overflow-y-auto pr-2 text-sm whitespace-pre-wrap">
                    {recording.transcript}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg border flex items-center justify-center text-gray-500 italic">
                  No transcript available
                </div>
              )}
              
              {recording.analysis ? (
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="text-sm font-semibold mb-2 text-gray-700">Analysis</h4>
                  <div className="max-h-60 overflow-y-auto pr-2 text-sm whitespace-pre-wrap">
                    {recording.analysis}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg border flex items-center justify-center text-gray-500 italic">
                  No analysis available
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnalysisResults;
