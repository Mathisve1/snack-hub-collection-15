
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BuyingPersona, Frituur, StreetInterview } from "../types";

// Define strict table names to match Supabase typings
type PersonasTable = "Team3buyingpersonasforwebsite";
type FriturenTable = "Team3friturenforwebsite";
type InterviewsTable = "Team3streetinterviewsforwebsite";

export function useTeam3BuyingPersonas() {
  const [data, setData] = useState<BuyingPersona[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        console.log("Fetching Team 3 buying personas data...");
        
        // Focus only on Team 3 data table
        const tableName: PersonasTable = "Team3buyingpersonasforwebsite";
        
        console.log(`Trying to fetch data from table: ${tableName}`);
        const result = await supabase
          .from(tableName)
          .select("*");
        
        if (result.error) {
          throw result.error;
        }
        
        if (result.data && result.data.length > 0) {
          console.log(`Successfully found data in table: ${tableName}`, result.data);
          setData(result.data as BuyingPersona[]);
        } else {
          console.log(`No data found in table: ${tableName}`);
          setData([]);
        }
        
      } catch (err) {
        console.error("Error fetching Team 3 buying personas:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

export function useTeam3Frituren() {
  const [data, setData] = useState<Frituur[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        console.log("Fetching Team 3 frituren data...");
        
        // Focus only on Team 3 data table
        const tableName: FriturenTable = "Team3friturenforwebsite";
        
        console.log(`Trying to fetch frituren data from table: ${tableName}`);
        const result = await supabase
          .from(tableName)
          .select("*");
        
        if (result.error) {
          throw result.error;
        }
        
        if (result.data && result.data.length > 0) {
          console.log(`Successfully found frituren data in table: ${tableName}`, result.data);
          setData(result.data as Frituur[]);
        } else {
          console.log(`No frituren data found in table: ${tableName}`);
          setData([]);
        }
        
      } catch (err) {
        console.error("Error fetching Team 3 frituren data:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

export function useTeam3StreetInterviews() {
  const [data, setData] = useState<StreetInterview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        console.log("Fetching Team 3 street interviews data...");
        
        // Focus only on Team 3 data table
        const tableName: InterviewsTable = "Team3streetinterviewsforwebsite";
        
        console.log(`Trying to fetch street interviews data from table: ${tableName}`);
        const result = await supabase
          .from(tableName)
          .select("*");
        
        if (result.error) {
          throw result.error;
        }
        
        if (result.data && result.data.length > 0) {
          console.log(`Successfully found street interviews data in table: ${tableName}`, result.data);
          setData(result.data as StreetInterview[]);
        } else {
          console.log(`No street interviews data found in table: ${tableName}`);
          setData([]);
        }
        
      } catch (err) {
        console.error("Error fetching Team 3 street interviews:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}
