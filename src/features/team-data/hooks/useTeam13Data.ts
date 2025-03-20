
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BuyingPersona, Frituur, StreetInterview } from "../types";

export function useTeam13BuyingPersonas() {
  const [data, setData] = useState<BuyingPersona[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        console.log("Fetching Team 13 buying personas data...");
        
        const tableName = "Team13buyingpersonasforwebsite";
        
        console.log(`Trying to fetch data from table: ${tableName}`);
        const result = await supabase
          .from(tableName)
          .select("*");
        
        if (result.error) {
          throw result.error;
        }
        
        console.log(`Data from Team 13 buying personas:`, result.data);
        setData(result.data as BuyingPersona[] || []);
        
      } catch (err) {
        console.error("Error fetching Team 13 buying personas:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

export function useTeam13Frituren() {
  const [data, setData] = useState<Frituur[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        console.log("Fetching Team 13 frituren data...");
        
        const tableName = "Team13friturenforwebsite";
        
        console.log(`Trying to fetch frituren data from table: ${tableName}`);
        const result = await supabase
          .from(tableName)
          .select("*");
        
        if (result.error) {
          throw result.error;
        }
        
        console.log(`Data from Team 13 frituren:`, result.data);
        setData(result.data as Frituur[] || []);
        
      } catch (err) {
        console.error("Error fetching Team 13 frituren data:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

export function useTeam13StreetInterviews() {
  const [data, setData] = useState<StreetInterview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        console.log("Fetching Team 13 street interviews data...");
        
        const tableName = "Team13streetinterviewsforwebsite";
        
        console.log(`Trying to fetch street interviews data from table: ${tableName}`);
        const result = await supabase
          .from(tableName)
          .select("*");
        
        if (result.error) {
          throw result.error;
        }
        
        console.log(`Data from Team 13 street interviews:`, result.data);
        // Convert the result to the expected type with type assertion
        const transformedData = result.data?.map(item => ({
          ...item,
          // Ensure eiwitgehalte is treated as a string in our app
          eiwitgehalte: item.eiwitgehalte?.toString() || "",
          // Ensure prijs is treated as a string in our app
          prijs: item.prijs?.toString() || ""
        })) || [];
        
        setData(transformedData as unknown as StreetInterview[]);
        
      } catch (err) {
        console.error("Error fetching Team 13 street interviews:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}
