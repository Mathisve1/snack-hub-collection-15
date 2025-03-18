
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { VoiceAnalysis, VoiceAnalysisType } from "../types";

export const useRecordings = (team: string, type: VoiceAnalysisType) => {
  const [recordings, setRecordings] = useState<VoiceAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [audioUrls, setAudioUrls] = useState<Record<string, string>>({});

  const getBucketId = (teamName: string, recordingType: VoiceAnalysisType) => {
    // Extract just the team number without the "OV-" prefix
    const teamNumber = teamName.replace('OV-', '');
    
    // Format the team number for consistent naming
    let teamFormatted = teamNumber;
    
    // Pad with leading zero if needed
    if (teamNumber.length === 1) {
      teamFormatted = `0${teamNumber}`;
    }
    
    // Generate the bucket ID using the new naming convention
    const bucketId = `team-${teamFormatted}-${recordingType}`;
    
    console.log(`Selected bucket ID: ${bucketId}`);
    return bucketId;
  };

  const getTableName = (teamName: string, recordingType: VoiceAnalysisType) => {
    const teamNumber = teamName.replace('OV-', '');
    
    // Define allowed team numbers
    const validTeams = ['3', '13', '14', '38'];
    
    if (!validTeams.includes(teamNumber)) {
      console.error('Invalid team number:', teamNumber);
      return 'street_interviews' as const;
    }
    
    if (recordingType === 'frituren') {
      // Use type assertion to specify the exact type
      return `Team_${teamNumber}_frituren_analysis` as 
        | 'Team_3_frituren_analysis'
        | 'Team_13_frituren_analysis'
        | 'Team_14_frituren_analysis'
        | 'Team_38_frituren_analysis';
    }
    
    return 'street_interviews' as const;
  };

  const fetchRecordings = async () => {
    try {
      setLoading(true);
      const tableName = getTableName(team, type);
      
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

      // Map data with explicit type assertion
      const mappedData = data.map(item => {
        const bucketId = item.bucket_id || getBucketId(team, type);
        
        console.log(`Recording: ${item.id}, Bucket: ${bucketId}, File: ${item.file_name}`);
        
        const record: VoiceAnalysis = {
          id: item.id,
          team: item.team,
          bucket_id: bucketId,
          file_path: item.file_name || '',
          transcript: item.transcript,
          analysis: item.analysis,
          status: (item.status || 'pending') as 'pending' | 'analyzing' | 'completed' | 'failed',
          created_at: item.created_at || new Date().toISOString(),
          duration_seconds: item.duration_seconds || 0,
          file_name: item.file_name
        };
        return record;
      });
      
      setRecordings(mappedData);
      
      // Create temporary URLs for audio playback
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

  useEffect(() => {
    fetchRecordings();
  }, [team, type]);

  return { recordings, loading, audioUrls, fetchRecordings };
};
