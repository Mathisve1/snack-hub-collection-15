
import { useState } from "react";
import { useRecordings } from "../hooks/useRecordings";
import { VoiceAnalysisType } from "../types";
import { Card } from "@/components/ui/card";
import { AudioLines, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnalysisResultsProps {
  team: string;
  type: VoiceAnalysisType;
}

const AnalysisResults = ({ team, type }: AnalysisResultsProps) => {
  const { recordings, loading } = useRecordings(team, type);
  const [view, setView] = useState<'transcripts' | 'analyses' | null>(null);
  
  // Filter recordings to only show those for the current team
  const teamRecordings = recordings.filter(recording => recording.team === team);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
        <span className="ml-3 text-gray-600">Loading recordings...</span>
      </div>
    );
  }

  if (teamRecordings.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
        <AudioLines className="h-12 w-12 mx-auto text-gray-400 mb-3" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">No recordings available</h3>
        <p className="text-gray-500">
          Upload a voice recording for {type} analysis to see the results here.
        </p>
      </div>
    );
  }

  if (view === 'transcripts') {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Transcripts</h3>
          <Button variant="outline" size="sm" onClick={() => setView(null)}>
            Back
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {teamRecordings.map((recording) => (
            <Card key={recording.id} className="p-4 border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h4 className="text-sm font-semibold mb-2 text-gray-700">
                  Recording {new Date(recording.created_at).toLocaleString()}
                </h4>
                <div className="max-h-none overflow-y-auto pr-2 text-sm whitespace-pre-wrap">
                  {recording.transcript || "No transcript available"}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'analyses') {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Analyses</h3>
          <Button variant="outline" size="sm" onClick={() => setView(null)}>
            Back
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {teamRecordings.map((recording) => (
            <Card key={recording.id} className="p-4 border rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h4 className="text-sm font-semibold mb-2 text-gray-700">
                  Recording {new Date(recording.created_at).toLocaleString()}
                </h4>
                <div className="max-h-none overflow-y-auto pr-2 text-sm whitespace-pre-wrap">
                  {recording.analysis || "No analysis available"}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div 
        className="p-8 border rounded-lg overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer flex flex-col items-center justify-center text-center"
        onClick={() => setView('transcripts')}
      >
        <h3 className="text-xl font-semibold mb-2">Transcripts</h3>
        <p className="text-gray-500">
          View all transcriptions of your {type} recordings
        </p>
      </div>

      <div 
        className="p-8 border rounded-lg overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer flex flex-col items-center justify-center text-center"
        onClick={() => setView('analyses')}
      >
        <h3 className="text-xl font-semibold mb-2">Analysis</h3>
        <p className="text-gray-500">
          View all AI analyses of your {type} recordings
        </p>
      </div>
    </div>
  );
};

export default AnalysisResults;
