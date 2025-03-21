
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BuyingPersona, Frituur, StreetInterview } from "../types";
import { toast } from "sonner";

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
        
        const result = await supabase
          .from(tableName)
          .select("*");
        
        if (result.error) {
          console.error("Error from Supabase:", result.error);
          throw result.error;
        }
        
        console.log(`Successfully fetched data from ${tableName}:`, result.data);
        console.log(`Data length: ${result.data?.length || 0}`);
        
        // Log column names if data exists
        if (result.data && result.data.length > 0) {
          console.log(`Table columns:`, Object.keys(result.data[0]));
        } else {
          console.log(`No data returned from the table.`);
        }
        
        // Transform data to ensure correct types
        const transformedData = result.data?.map(item => ({
          ...item,
          // Ensure leeftijd is treated as a number
          leeftijd: typeof item.leeftijd === 'string' ? parseFloat(item.leeftijd) : item.leeftijd,
          // Ensure prijs is treated as a number
          prijs: typeof item.prijs === 'string' ? parseFloat(item.prijs) : item.prijs,
          // Ensure openheid_nieuwe_snack is treated as a boolean
          openheid_nieuwe_snack: !!item.openheid_nieuwe_snack
        })) || [];
        
        console.log(`Transformed data:`, transformedData);
        setData(transformedData as BuyingPersona[]);
        
      } catch (err) {
        console.error("Error fetching Team 13 buying personas:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        toast.error(`Error loading Team 13 buying personas: ${err instanceof Error ? err.message : "Unknown error"}`);
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
        
        const result = await supabase
          .from(tableName)
          .select("*");
        
        if (result.error) {
          console.error("Error from Supabase:", result.error);
          throw result.error;
        }
        
        console.log(`Successfully fetched data from ${tableName}:`, result.data);
        console.log(`Data length: ${result.data?.length || 0}`);
        
        // Log column names if data exists
        if (result.data && result.data.length > 0) {
          console.log(`Table columns:`, Object.keys(result.data[0]));
        } else {
          console.log(`No data returned from the table.`);
        }
        
        // Transform data to ensure correct types
        const transformedData = result.data?.map(item => ({
          ...item,
          // Ensure numeric fields are treated as numbers
          gemiddlede_marges: typeof item.gemiddlede_marges === 'string' ? parseFloat(item.gemiddlede_marges) : item.gemiddlede_marges,
          absolute_marges: typeof item.absolute_marges === 'string' ? parseFloat(item.absolute_marges) : item.absolute_marges,
          aankoopprijs: typeof item.aankoopprijs === 'string' ? parseFloat(item.aankoopprijs) : item.aankoopprijs,
          aankoopprijs_proteine_snacks: typeof item.aankoopprijs_proteine_snacks === 'string' ? 
            parseFloat(item.aankoopprijs_proteine_snacks) : item.aankoopprijs_proteine_snacks
        })) || [];
        
        console.log(`Transformed data:`, transformedData);
        setData(transformedData as Frituur[]);
        
      } catch (err) {
        console.error("Error fetching Team 13 frituren data:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        toast.error(`Error loading Team 13 frituren data: ${err instanceof Error ? err.message : "Unknown error"}`);
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
        
        const result = await supabase
          .from(tableName)
          .select("*");
        
        if (result.error) {
          console.error("Error from Supabase:", result.error);
          throw result.error;
        }
        
        console.log(`Successfully fetched data from ${tableName}:`, result.data);
        console.log(`Data length: ${result.data?.length || 0}`);
        
        // Log column names if data exists
        if (result.data && result.data.length > 0) {
          console.log(`Table columns:`, Object.keys(result.data[0]));
        } else {
          console.log(`No data returned from the table.`);
        }
        
        // Transform data to ensure correct types
        const transformedData = result.data?.map(item => ({
          ...item,
          // Ensure eiwitgehalte is treated correctly
          eiwitgehalte: typeof item.eiwitgehalte === 'string' ? parseFloat(item.eiwitgehalte) : item.eiwitgehalte,
          // Ensure prijs is treated correctly
          prijs: typeof item.prijs === 'string' ? parseFloat(item.prijs) : item.prijs,
          // Ensure boolean fields are treated as booleans
          ruimte_voor_innovatie: !!item.ruimte_voor_innovatie,
          hogere_prijs: !!item.hogere_prijs,
          vervangen_traditionele_snack: !!item.vervangen_traditionele_snack
        })) || [];
        
        console.log(`Transformed data:`, transformedData);
        setData(transformedData as StreetInterview[]);
        
      } catch (err) {
        console.error("Error fetching Team 13 street interviews:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        toast.error(`Error loading Team 13 street interviews: ${err instanceof Error ? err.message : "Unknown error"}`);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}
