
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { VoiceAnalysis, VoiceAnalysisType } from "../types";

export const useRecordings = (team: string, type: VoiceAnalysisType) => {
  const [recordings, setRecordings] = useState<VoiceAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [audioUrls, setAudioUrls] = useState<Record<string, string>>({});

  const getBucketId = (recordingType: VoiceAnalysisType, teamName: string) => {
    // Extract just the team number without the "OV-" prefix
    const teamNumber = teamName.replace('OV-', '');
    
    // Map team numbers to their correct bucket IDs
    if (recordingType === 'interviews') {
      // Only handle specific team numbers with known bucket names
      switch (teamNumber) {
        case '3':
          return 'Interviews Bucket Team 03';
        case '13':
          return 'Interviews Bucket Team 13';
        case '14':
          return 'Interviews Bucket Team 14';
        case '38':
          return 'Interviews Bucket Team 38';
        default:
          // Fallback to a default bucket if team not found
          console.warn(`No specific bucket found for team ${teamNumber}, using Team 03 bucket as fallback`);
          return 'Interviews Bucket Team 03';
      }
    } else {
      // For frituren, fall back to using the Team 03 bucket 
      return 'Interviews Bucket Team 03';
    }
  };

  const fetchRecordings = async () => {
    try {
      setLoading(true);
      // Use the correct table name based on the type
      const tableName = type === 'frituren' ? 'frituren_interviews' : 'street_interviews';
      
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('team', team)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Map data with explicit type casting and default values
      const mappedData = data.map(item => {
        // Get the correct team-specific bucket ID from the record or generate it if missing
        const bucketId = item.bucket_id || getBucketId(type, team);
        // Use the file_name as the file_path since that's what we store in the DB
        const filePath = item.file_name || '';
        
        const record: VoiceAnalysis = {
          id: item.id,
          team: item.team,
          bucket_id: bucketId,
          file_path: filePath,
          transcript: item.transcript,
          analysis: item.analysis,
          status: (item.status || 'pending') as 'pending' | 'analyzing' | 'completed' | 'failed',
          created_at: item.created_at || new Date().toISOString(),
          duration_seconds: item.duration_seconds || 0,
          file_name: item.file_name // Keep for backward compatibility
        };
        return record;
      });
      
      setRecordings(mappedData);
      
      // Create temporary URLs for audio playback
      const urls: Record<string, string> = {};
      for (const recording of mappedData) {
        if (recording.file_path && recording.bucket_id) {
          try {
            const { data: signedUrlData } = await supabase
              .storage
              .from(recording.bucket_id)
              .createSignedUrl(recording.file_path, 3600); // 1 hour expiry
              
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
