
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Play, FileAudio, FileText, FileSpreadsheet } from "lucide-react";

interface Recording {
  id: string;
  team: string;
  recording_url: string;
  status: string;
  created_at: string;
  duration_seconds: number | null;
  transcript: string | null;
  analysis: string | null;
  file_name: string | null;
}

interface FriturenInterviewsListProps {
  team: string;
}

const FriturenInterviewsList = ({ team }: FriturenInterviewsListProps) => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecordings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('frituren_interviews')
        .select('*')
        .eq('team', team)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching recordings:", error);
        toast.error("Failed to load recordings");
        return;
      }

      setRecordings(data as Recording[]);
    } catch (error) {
      console.error("Error in fetchRecordings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecordings();
    
    // Set up interval to refresh data
    const intervalId = setInterval(fetchRecordings, 30000); // Every 30 seconds
    
    return () => clearInterval(intervalId);
  }, [team]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "Unknown";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Loading recordings...</p>
      </div>
    );
  }

  if (recordings.length === 0) {
    return (
      <div className="text-center py-8">
        <FileAudio className="h-12 w-12 mx-auto text-gray-400 mb-2" />
        <p className="text-gray-500">No recordings found. Record your first frituur interview!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Frituur Voice Recordings</h2>
      
      {recordings.map((recording) => (
        <Card key={recording.id} className="overflow-hidden">
          <CardHeader className="bg-gray-50 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md font-medium">
                Recording {formatDate(recording.created_at)}
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  recording.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : recording.status === 'processing'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {recording.status.charAt(0).toUpperCase() + recording.status.slice(1)}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDuration(recording.duration_seconds)}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(recording.recording_url, '_blank')}
                >
                  <Play className="h-4 w-4 mr-2" /> Play Recording
                </Button>
              </div>
              
              {recording.transcript && (
                <div className="mt-2">
                  <div className="flex items-center gap-1 mb-1 text-sm font-medium text-gray-700">
                    <FileText className="h-4 w-4" /> 
                    <span>Transcript</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md text-sm max-h-32 overflow-y-auto">
                    {recording.transcript}
                  </div>
                </div>
              )}
              
              {recording.analysis && (
                <div className="mt-2">
                  <div className="flex items-center gap-1 mb-1 text-sm font-medium text-gray-700">
                    <FileSpreadsheet className="h-4 w-4" /> 
                    <span>Analysis</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md text-sm max-h-32 overflow-y-auto">
                    {recording.analysis}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FriturenInterviewsList;
