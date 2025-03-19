
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { VoiceAnalysis, VoiceAnalysisType } from "../types";

// Define a type for the allowed table names
type TableName = 'frituren_interviews' | 'street_interviews' | 'Team_38_buyer_analysis';

export const useRecordings = (team: string, type: VoiceAnalysisType) => {
  const [recordings, setRecordings] = useState<VoiceAnalysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecordings = async () => {
      setLoading(true);
      try {
        // Determine the correct table name based on type
        let tableName: TableName;
        
        if (type === 'frituren') {
          tableName = 'frituren_interviews';
        } else if (type === 'interviews') {
          tableName = 'street_interviews';
        } else if (type === 'buyer') {
          // For buyer analysis, use the team-specific table
          tableName = 'Team_38_buyer_analysis' as TableName;
        } else {
          throw new Error(`Invalid recording type: ${type}`);
        }

        // Fetch the recordings from the appropriate table
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .eq('team', team)
          .order('created_at', { ascending: false });

        if (error) {
          console.error(`Error fetching ${type} recordings:`, error);
          throw error;
        }

        // Safely transform the data to match VoiceAnalysis type
        const typedData: VoiceAnalysis[] = (data || []).map(item => ({
          id: item.id,
          team: item.team,
          recording_url: item.recording_url || '',
          transcript: item.transcript || '',
          analysis: item.analysis || '',
          status: item.status as VoiceAnalysis['status'],
          created_at: item.created_at || '',
          duration_seconds: item.duration_seconds || 0,
          file_path: item.file_name || '', // Map file_name to file_path
          bucket_id: item.bucket_id || ''
        }));

        setRecordings(typedData);
      } catch (error) {
        console.error("Error in useRecordings:", error);
        setRecordings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecordings();
  }, [team, type]);

  return { recordings, loading };
};
