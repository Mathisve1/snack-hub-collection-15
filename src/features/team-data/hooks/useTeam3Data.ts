
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BuyingPersona, Frituur, StreetInterview } from "../types";

export function useTeam3BuyingPersonas() {
  const [data, setData] = useState<BuyingPersona[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        console.log("Fetching Team 3 buying personas data...");
        
        const tableName = "Team3buyingpersonasforwebsite";
        
        console.log(`Trying to fetch data from table: ${tableName}`);
        const result = await supabase
          .from(tableName)
          .select("*");
        
        if (result.error) {
          throw result.error;
        }
        
        console.log(`Data from Team 3 buying personas:`, result.data);
        setData(result.data as BuyingPersona[] || []);
        
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
        
        const tableName = "Team3friturenforwebsite";
        
        console.log(`Trying to fetch frituren data from table: ${tableName}`);
        const result = await supabase
          .from(tableName)
          .select("*");
        
        if (result.error) {
          throw result.error;
        }
        
        console.log(`Data from Team 3 frituren:`, result.data);
        setData(result.data as Frituur[] || []);
        
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
        
        const tableName = "Team3streetinterviewsforwebsite";
        
        console.log(`Trying to fetch street interviews data from table: ${tableName}`);
        const result = await supabase
          .from(tableName)
          .select("*");
        
        if (result.error) {
          throw result.error;
        }
        
        console.log(`Data from Team 3 street interviews:`, result.data);
        setData(result.data as StreetInterview[] || []);
        
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
