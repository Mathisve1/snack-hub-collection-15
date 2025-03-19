
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
          // Extract team number to use in table name
          const teamNumber = team.replace('OV-', '');
          tableName = `Team_${teamNumber}_buyer_analysis`;
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

        // Type assertion to ensure the data conforms to VoiceAnalysis[]
        setRecordings((data || []) as unknown as VoiceAnalysis[]);
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
