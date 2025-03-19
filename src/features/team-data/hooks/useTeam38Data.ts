
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BuyingPersona, Frituur, StreetInterview } from "../types";

export function useTeam38BuyingPersonas() {
  const [data, setData] = useState<BuyingPersona[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data: personasData, error } = await supabase
          .from("Team38buyingpersonasforwebsite")
          .select("*");

        if (error) throw error;
        setData(personasData as BuyingPersona[]);
      } catch (err) {
        console.error("Error fetching Team 38 buying personas:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

export function useTeam38Frituren() {
  const [data, setData] = useState<Frituur[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data: friturenData, error } = await supabase
          .from("Team38friturenforwebsite")
          .select("*");

        if (error) throw error;
        setData(friturenData as Frituur[]);
      } catch (err) {
        console.error("Error fetching Team 38 frituren data:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

export function useTeam38StreetInterviews() {
  const [data, setData] = useState<StreetInterview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data: interviewsData, error } = await supabase
          .from("Team38streetinterviewsforwebsite")
          .select("*");

        if (error) throw error;
        setData(interviewsData as StreetInterview[]);
      } catch (err) {
        console.error("Error fetching Team 38 street interviews:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}
