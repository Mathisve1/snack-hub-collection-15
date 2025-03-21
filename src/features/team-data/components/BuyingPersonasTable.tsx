
import { useState } from "react";
import { EditableTable } from "@/components/ui/editable-table";
import { useTeam38BuyingPersonas } from "../hooks/useTeam38Data";
import { Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { BuyingPersona } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface BuyingPersonasTableProps {
  personas?: BuyingPersona[];
}

const BuyingPersonasTable = ({ personas }: BuyingPersonasTableProps) => {
  const location = useLocation();
  // Check for team-38 path
  const isTeam38Path = location.pathname.includes("team-38");
  
  // Log the current path
  console.log(`BuyingPersonasTable - Current path: ${location.pathname}, isTeam38Path: ${isTeam38Path}`);
  
  // Use the team38Data hook
  const team38Data = useTeam38BuyingPersonas();

  // Use passed personas if available, otherwise use the data from hooks
  const data = personas || team38Data.data;
  const loading = !personas && team38Data.loading;
  const error = !personas && team38Data.error;
  
  // Log the data we're actually using
  console.log("BuyingPersonasTable using data:", { 
    teamSource: personas ? "passed directly" : "team38",
    dataLength: data?.length || 0,
    isLoading: loading
  });

  // Determine which table to update based on path
  const getTableName = () => {
    if (location.pathname.includes("team-3")) {
      return "Team3buyingpersonasforwebsite";
    } else if (location.pathname.includes("team-13")) {
      return "Team13buyingpersonasforwebsite";
    } else if (location.pathname.includes("team-14")) {
      return "Team14buyingpersonasforwebsite";
    } else {
      return "Team38buyingpersonasforwebsite";
    }
  };

  const handleSaveData = async (updatedData: BuyingPersona[]) => {
    try {
      const tableName = getTableName();
      
      // Update each row individually
      for (const persona of updatedData) {
        // Create an object with numeric fields converted to numbers
        const updateData = {
          buying_persona: persona.buying_persona,
          leeftijd: typeof persona.leeftijd === 'string' ? parseFloat(persona.leeftijd) : persona.leeftijd,
          geslacht: persona.geslacht,
          prijs: typeof persona.prijs === 'string' ? parseFloat(persona.prijs) : persona.prijs,
          consumptie_situatie: persona.consumptie_situatie,
          frequentie_frituurbezoek: persona.frequentie_frituurbezoek,
          motivatie_kiezen_proteine_snack: persona.motivatie_kiezen_proteine_snack,
          marketing: persona.marketing,
          openheid_nieuwe_snack: persona.openheid_nieuwe_snack
        };
          
        const { error } = await supabase
          .from(tableName)
          .update(updateData)
          .eq('id', persona.id);
          
        if (error) {
          console.error("Error updating persona:", error);
          toast.error(`Failed to update persona: ${error.message}`);
          return;
        }
      }
      
      toast.success("Personas updated successfully!");
    } catch (error) {
      console.error("Error in handleSaveData:", error);
      toast.error("Failed to save changes");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error loading buying personas data: {error}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-gray-500 p-4 text-center">
        No buying personas data available.
      </div>
    );
  }

  return (
    <EditableTable 
      data={data} 
      caption="Buying Personas Data"
      onSave={handleSaveData}
    />
  );
};

export default BuyingPersonasTable;
