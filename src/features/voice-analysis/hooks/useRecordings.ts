
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { VoiceAnalysis, VoiceAnalysisType } from "../types";

export const useRecordings = (team: string, type: VoiceAnalysisType) => {
  const [recordings, setRecordings] = useState<VoiceAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [audioUrls, setAudioUrls] = useState<Record<string, string>>({});

  const getTableName = (teamName: string, recordingType: VoiceAnalysisType) => {
    const teamNumber = teamName.replace('OV-', '');
    
    if (recordingType === 'frituren') {
      switch(teamNumber) {
        case '3':
          return 'Team_3_frituren_analysis' as const;
        case '13':
          return 'Team_13_frituren_analysis' as const;
        case '14':
          return 'Team_14_frituren_analysis' as const;
        case '38':
          return 'Team_38_frituren_analysis' as const;
        default:
          console.error('Invalid team number:', teamNumber);
          return null;
      }
    }
    
    return 'street_interviews' as const;
  };

  const fetchRecordings = async () => {
    try {
      setLoading(true);
      const tableName = getTableName(team, type);
      
      if (!tableName) {
        console.error(`No table found for team ${team} and type ${type}`);
        setRecordings([]);
        setLoading(false);
        return;
      }
      
      console.log(`Fetching ${type} recordings for team ${team} from table ${tableName}`);
      
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('team', team)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Database query error:", error);
        toast.error(`Failed to load recordings: ${error.message || 'Unknown error'}`);
        setLoading(false);
        return;
      }

      if (!data) {
        setRecordings([]);
        return;
      }

      const mappedData: VoiceAnalysis[] = data.map(item => ({
        id: item.id,
        team: item.team,
        bucket_id: item.bucket_id || '',
        file_path: item.file_name || '',
        transcript: item.transcript || null,
        analysis: item.analysis || null,
        status: mapDatabaseStatus(item.status),
        created_at: item.created_at,
        duration_seconds: item.duration_seconds || 0,
        file_name: item.file_name
      }));
      
      setRecordings(mappedData);
      
      const urls: Record<string, string> = {};
      for (const recording of mappedData) {
        if (recording.file_path && recording.bucket_id) {
          try {
            console.log(`Getting signed URL for file: ${recording.file_path} from bucket: ${recording.bucket_id}`);
            
            const { data: signedUrlData, error: signedUrlError } = await supabase
              .storage
              .from(recording.bucket_id)
              .createSignedUrl(recording.file_path, 3600);
              
            if (signedUrlError) {
              console.error(`Error getting signed URL for ${recording.file_path}:`, signedUrlError);
              continue;
            }
              
            if (signedUrlData?.signedUrl) {
              urls[recording.id] = signedUrlData.signedUrl;
              console.log(`Got signed URL successfully for: ${recording.file_path}`);
            }
          } catch (e) {
            console.error('Error getting signed URL:', e);
          }
        }
      }
      setAudioUrls(urls);
      
    } catch (error) {
      console.error("Error fetching recordings:", error);
      toast.error("Failed to load analyzed recordings");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to map database status to VoiceAnalysis status
  const mapDatabaseStatus = (status: string): VoiceAnalysis['status'] => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'pending';
      case 'analyzing':
        return 'analyzing';
      case 'completed':
        return 'completed';
      case 'failed':
        return 'failed';
      default:
        console.warn(`Unknown status: ${status}, defaulting to pending`);
        return 'pending';
    }
  };

  useEffect(() => {
    fetchRecordings();
  }, [team, type]);

  return { recordings, loading, audioUrls, fetchRecordings };
};

