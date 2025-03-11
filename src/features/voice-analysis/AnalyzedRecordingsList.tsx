
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AudioLines, FileText, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface VoiceAnalysis {
  id: string;
  team: string;
  recording_url: string;
  transcript: string | null;
  analysis: string | null;
  status: 'pending' | 'analyzing' | 'completed' | 'failed';
  created_at: string;
  duration_seconds: number;
  file_name: string;
}

interface AnalyzedRecordingsListProps {
  team: string;
  type: 'frituren' | 'interviews';
}

const AnalyzedRecordingsList = ({ team, type }: AnalyzedRecordingsListProps) => {
  const [recordings, setRecordings] = useState<VoiceAnalysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecordings();
  }, [team, type]);

  const fetchRecordings = async () => {
    try {
      setLoading(true);
      const tableName = type === 'frituren' ? 'voice_analysis' : 'street_interviews';
      
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('team', team)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setRecordings(data as VoiceAnalysis[]);
    } catch (error) {
      console.error("Error fetching recordings:", error);
      toast.error("Failed to load analyzed recordings");
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    if (!seconds) return "Unknown";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (recordings.length === 0) {
    return (
      <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
        <AudioLines className="h-10 w-10 mx-auto text-gray-400 mb-2" />
        <p className="text-gray-500">No voice recordings have been analyzed yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recordings.map((recording) => (
        <div key={recording.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-3">
              <AudioLines className="h-5 w-5 text-indigo-500 mt-1" />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">
                    Recording {formatDistanceToNow(new Date(recording.created_at), { addSuffix: true })}
                  </p>
                  {recording.status === 'pending' && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                      Pending
                    </span>
                  )}
                  {recording.status === 'analyzing' && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full flex items-center">
                      <Loader2 className="h-3 w-3 mr-1 animate-spin" /> Analyzing
                    </span>
                  )}
                  {recording.status === 'completed' && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      Completed
                    </span>
                  )}
                  {recording.status === 'failed' && (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" /> Failed
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">Duration: {formatDuration(recording.duration_seconds)}</p>
                
                {recording.transcript && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Transcript:</p>
                    <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{recording.transcript}</p>
                  </div>
                )}
                
                {recording.analysis && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Analysis:</p>
                    <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded whitespace-pre-wrap">{recording.analysis}</p>
                  </div>
                )}
                
                {recording.recording_url && (
                  <div className="mt-3">
                    <audio 
                      src={recording.recording_url} 
                      controls 
                      className="w-full max-w-md"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnalyzedRecordingsList;
