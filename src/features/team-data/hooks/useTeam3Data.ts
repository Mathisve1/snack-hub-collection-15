
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
        
        // Get all data without any filtering - use the correct table name
        const { data: personasData, error } = await supabase
          .from("Team3buyingpersonasforwebsite")
          .select("*");

        if (error) {
          console.error("Error fetching data:", error);
          throw error;
        }
        
        console.log("Fetched Team 3 buying personas data:", personasData);
        setData(personasData as BuyingPersona[]);
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
        
        // Get all data without any filtering - use the correct table name
        const { data: friturenData, error } = await supabase
          .from("Team3friturenforwebsite")
          .select("*");

        if (error) {
          console.error("Error fetching data:", error);
          throw error;
        }
        
        console.log("Fetched Team 3 frituren data:", friturenData);
        setData(friturenData as Frituur[]);
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
        
        // Get all data without any filtering - use the correct table name
        const { data: interviewsData, error } = await supabase
          .from("Team3streetinterviewsforwebsite")
          .select("*");

        if (error) {
          console.error("Error fetching data:", error);
          throw error;
        }
        
        console.log("Fetched Team 3 street interviews data:", interviewsData);
        setData(interviewsData as StreetInterview[]);
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
