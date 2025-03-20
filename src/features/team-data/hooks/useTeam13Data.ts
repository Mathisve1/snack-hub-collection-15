
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
        console.log("Fetching Team 13 buying personas data from Supabase...");
        
        // Get data from the Team 13 table
        const { data: personasData, error } = await supabase
          .from("Team13buyingpersonasforwebsite")
          .select("*");

        if (error) {
          console.error("Error fetching Team 13 buying personas:", error);
          throw error;
        }
        
        console.log(`Team 13 buying personas data fetched: ${personasData?.length || 0} records`);
        console.log("Sample team 13 data:", personasData?.[0]);
        
        // Map the data to ensure correct types
        const typedData = personasData?.map((item: any) => ({
          id: item.id,
          buying_persona: item.buying_persona,
          motivatie_kiezen_proteine_snack: item.motivatie_kiezen_proteine_snack,
          frequentie_frituurbezoek: item.frequentie_frituurbezoek,
          consumptie_situatie: item.consumptie_situatie,
          openheid_nieuwe_snack: item.openheid_nieuwe_snack,
          marketing: item.marketing,
          leeftijd: item.leeftijd,
          geslacht: item.geslacht,
          prijs: item.prijs
        })) as BuyingPersona[];
        
        setData(typedData || []);
      } catch (err) {
        console.error("Error in useTeam13BuyingPersonas:", err);
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
        console.log("Fetching Team 13 frituren data from Supabase...");
        
        // Get data from the Team 13 frituren table
        const { data: friturenData, error } = await supabase
          .from("Team13friturenforwebsite")
          .select("*");

        if (error) {
          console.error("Error fetching Team 13 frituren:", error);
          throw error;
        }
        
        console.log(`Team 13 frituren data fetched: ${friturenData?.length || 0} records`);
        console.log("Sample team 13 frituren data:", friturenData?.[0]);
        
        // Ensure the data is typed correctly
        setData(friturenData as Frituur[] || []);
      } catch (err) {
        console.error("Error in useTeam13Frituren:", err);
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
        console.log("Fetching Team 13 street interviews data from Supabase...");
        
        // Get data from the Team 13 street interviews table
        const { data: interviewsData, error } = await supabase
          .from("Team13streetinterviewsforwebsite")
          .select("*");

        if (error) {
          console.error("Error fetching Team 13 street interviews:", error);
          throw error;
        }
        
        console.log(`Team 13 street interviews data fetched: ${interviewsData?.length || 0} records`);
        console.log("Sample team 13 street interview data:", interviewsData?.[0]);
        
        // Ensure the data is typed correctly
        setData(interviewsData as StreetInterview[] || []);
      } catch (err) {
        console.error("Error in useTeam13StreetInterviews:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}
