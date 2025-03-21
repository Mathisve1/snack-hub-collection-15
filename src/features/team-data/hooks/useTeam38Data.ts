
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BuyingPersona, Frituur, StreetInterview } from "../types";
import { toast } from "sonner";

export function useTeam38BuyingPersonas() {
  const [data, setData] = useState<BuyingPersona[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        console.log("Fetching buying personas data...");
        
        // Get all data without any filtering
        const { data: personasData, error } = await supabase
          .from("Team38buyingpersonasforwebsite")
          .select("*");

        if (error) {
          console.error("Error fetching data:", error);
          throw error;
        }
        
        console.log("Fetched buying personas data:", personasData);
        
        // Process the data to ensure numeric values are properly handled
        const processedData = personasData.map(item => ({
          ...item,
          leeftijd: typeof item.leeftijd === 'string' ? parseFloat(item.leeftijd) : item.leeftijd,
          prijs: typeof item.prijs === 'string' ? parseFloat(item.prijs) : item.prijs,
          openheid_nieuwe_snack: !!item.openheid_nieuwe_snack
        }));
        
        setData(processedData as BuyingPersona[]);
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
        console.log("Fetching frituren data...");
        
        // Get all data without any filtering
        const { data: friturenData, error } = await supabase
          .from("Team38friturenforwebsite")
          .select("*");

        if (error) {
          console.error("Error fetching data:", error);
          throw error;
        }
        
        console.log("Fetched frituren data:", friturenData);
        
        // Process the data to ensure numeric values are properly handled
        const processedData = friturenData.map(item => ({
          ...item,
          gemiddlede_marges: typeof item.gemiddlede_marges === 'string' ? parseFloat(item.gemiddlede_marges) : item.gemiddlede_marges,
          absolute_marges: typeof item.absolute_marges === 'string' ? parseFloat(item.absolute_marges) : item.absolute_marges,
          aankoopprijs: typeof item.aankoopprijs === 'string' ? parseFloat(item.aankoopprijs) : item.aankoopprijs,
          aankoopprijs_proteine_snacks: typeof item.aankoopprijs_proteine_snacks === 'string' ? 
            parseFloat(item.aankoopprijs_proteine_snacks) : item.aankoopprijs_proteine_snacks
        }));
        
        setData(processedData as Frituur[]);
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
        console.log("Fetching street interviews data...");
        
        // Get all data without any filtering
        const { data: interviewsData, error } = await supabase
          .from("Team38streetinterviewsforwebsite")
          .select("*");

        if (error) {
          console.error("Error fetching data:", error);
          throw error;
        }
        
        console.log("Fetched street interviews data:", interviewsData);
        
        // Process the data to ensure numeric values are properly handled
        const processedData = interviewsData.map(interview => {
          return {
            ...interview,
            // Convert to proper numeric types if they're strings
            eiwitgehalte: typeof interview.eiwitgehalte === 'string' ? 
              parseFloat(interview.eiwitgehalte) : interview.eiwitgehalte,
            prijs: typeof interview.prijs === 'string' ? 
              parseFloat(interview.prijs) : interview.prijs,
            // Ensure boolean values are properly handled
            ruimte_voor_innovatie: !!interview.ruimte_voor_innovatie,
            hogere_prijs: !!interview.hogere_prijs,
            vervangen_traditionele_snack: !!interview.vervangen_traditionele_snack
          };
        });
        
        setData(processedData as StreetInterview[]);
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
