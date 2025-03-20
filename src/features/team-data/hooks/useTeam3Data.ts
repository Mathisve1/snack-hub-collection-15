
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
        
        // Try both possible table names for Team 3 data
        const tables = ["Team3buyingpersonasforwebsite", "Team38buyingpersonasforwebsite"];
        let personasData = null;
        let fetchError = null;
        
        // Try each table until we find data
        for (const tableName of tables) {
          console.log(`Trying to fetch data from table: ${tableName}`);
          const result = await supabase
            .from(tableName)
            .select("*");
          
          if (!result.error && result.data && result.data.length > 0) {
            personasData = result.data;
            console.log(`Successfully found data in table: ${tableName}`, personasData);
            break;
          } else {
            fetchError = result.error;
            console.log(`No data found in table: ${tableName} or error:`, fetchError);
          }
        }

        if (personasData) {
          console.log("Fetched Team 3 buying personas data:", personasData);
          setData(personasData as BuyingPersona[]);
        } else {
          // If we still don't have data, try a fallback solution - use Team 38 data
          console.log("Fallback: Using Team 38 data for the quadruplicate view since no Team 3 data was found");
          const { data: fallbackData, error: fallbackError } = await supabase
            .from("Team38buyingpersonasforwebsite")
            .select("*");
            
          if (fallbackError) {
            throw fallbackError;
          }
          
          setData(fallbackData as BuyingPersona[]);
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
        
        // Try both possible table names for Team 3 data
        const tables = ["Team3friturenforwebsite", "Team38friturenforwebsite"];
        let friturenData = null;
        let fetchError = null;
        
        // Try each table until we find data
        for (const tableName of tables) {
          console.log(`Trying to fetch frituren data from table: ${tableName}`);
          const result = await supabase
            .from(tableName)
            .select("*");
          
          if (!result.error && result.data && result.data.length > 0) {
            friturenData = result.data;
            console.log(`Successfully found frituren data in table: ${tableName}`, friturenData);
            break;
          } else {
            fetchError = result.error;
            console.log(`No frituren data found in table: ${tableName} or error:`, fetchError);
          }
        }

        if (friturenData) {
          console.log("Fetched Team 3 frituren data:", friturenData);
          setData(friturenData as Frituur[]);
        } else {
          // If we still don't have data, try a fallback solution - use Team 38 data
          console.log("Fallback: Using Team 38 frituren data for the quadruplicate view");
          const { data: fallbackData, error: fallbackError } = await supabase
            .from("Team38friturenforwebsite")
            .select("*");
            
          if (fallbackError) {
            throw fallbackError;
          }
          
          setData(fallbackData as Frituur[]);
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
        
        // Try both possible table names for Team 3 data
        const tables = ["Team3streetinterviewsforwebsite", "Team38streetinterviewsforwebsite"];
        let interviewsData = null;
        let fetchError = null;
        
        // Try each table until we find data
        for (const tableName of tables) {
          console.log(`Trying to fetch street interviews data from table: ${tableName}`);
          const result = await supabase
            .from(tableName)
            .select("*");
          
          if (!result.error && result.data && result.data.length > 0) {
            interviewsData = result.data;
            console.log(`Successfully found street interviews data in table: ${tableName}`, interviewsData);
            break;
          } else {
            fetchError = result.error;
            console.log(`No street interviews data found in table: ${tableName} or error:`, fetchError);
          }
        }

        if (interviewsData) {
          console.log("Fetched Team 3 street interviews data:", interviewsData);
          setData(interviewsData as StreetInterview[]);
        } else {
          // If we still don't have data, try a fallback solution - use Team 38 data
          console.log("Fallback: Using Team 38 street interviews data for the quadruplicate view");
          const { data: fallbackData, error: fallbackError } = await supabase
            .from("Team38streetinterviewsforwebsite")
            .select("*");
            
          if (fallbackError) {
            throw fallbackError;
          }
          
          setData(fallbackData as StreetInterview[]);
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
