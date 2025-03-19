
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { VoiceAnalysis, VoiceAnalysisType } from "../types";

export const useRecordings = (team: string, type: VoiceAnalysisType) => {
  const [recordings, setRecordings] = useState<VoiceAnalysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecordings = async () => {
      setLoading(true);
      try {
        let tableName: string;
        
        // Determine the correct table name based on type
        if (type === 'frituren') {
          tableName = 'frituren_interviews';
        } else if (type === 'interviews') {
          tableName = 'street_interviews';
        } else if (type === 'buyer') {
          // Use the appropriate table for buyer analysis
          tableName = `Team_${team.replace('OV-', '')}_buyer_analysis`;
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

        setRecordings(data || []);
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
