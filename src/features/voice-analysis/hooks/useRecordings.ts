
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
      switch (teamNumber) {
        case '3':
          return 'Team_3_frituren_analysis' as const;
        case '13':
          return 'Team_13_frituren_analysis' as const;
        case '14':
          return 'Team_14_frituren_analysis' as const;
        case '38':
          return 'Team_38_frituren_analysis' as const;
        default:
          throw new Error(`Invalid team number: ${teamNumber}`);
      }
    } else if (recordingType === 'buyer') {
      switch (teamNumber) {
        case '3':
          return 'Team_3_buyer_analysis' as const;
        case '13':
          return 'Team_13_buyer_analysis' as const;
        case '14':
          return 'Team_14_buyer_analysis' as const;
        case '38':
          return 'Team_38_buyer_analysis' as const;
        default:
          throw new Error(`Invalid team number: ${teamNumber}`);
      }
    }
    
    return 'street_interviews' as const;
  };

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

  const fetchRecordings = async () => {
    try {
      setLoading(true);
      const tableName = getTableName(team, type);
      
      console.log(`Fetching ${type} recordings for team ${team} from table ${tableName}`);
      
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Database query error:", error);
        toast.error(`Failed to load recordings: ${error.message || 'Unknown error'}`);
        return;
      }

      if (!data) {
        setRecordings([]);
        return;
      }

      const mappedData: VoiceAnalysis[] = data.map(record => ({
        id: record.id,
        team: record.team,
        bucket_id: record.bucket_id || '',
        file_path: record.file_name || '',
        transcript: record.transcript || null,
        analysis: record.analysis || null,
        status: mapDatabaseStatus(record.status || 'pending'),
        created_at: record.created_at || new Date().toISOString(),
        duration_seconds: record.duration_seconds || 0,
        file_name: record.file_name
      }));
      
      console.log(`Found ${mappedData.length} recordings`);
      setRecordings(mappedData);
      
      const urls: Record<string, string> = {};
      for (const recording of mappedData) {
        if (recording.file_path && recording.bucket_id) {
          try {
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

  useEffect(() => {
    fetchRecordings();
  }, [team, type]);

  return { recordings, loading, audioUrls, fetchRecordings };
};
