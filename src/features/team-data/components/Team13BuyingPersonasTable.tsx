
import { EditableTable } from "@/components/ui/editable-table";
import { useTeam13BuyingPersonas } from "../hooks/useTeam13Data";
import { Loader2 } from "lucide-react";
import { BuyingPersona } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Team13BuyingPersonasTableProps {
  personas?: BuyingPersona[];
}

const Team13BuyingPersonasTable = ({ personas }: Team13BuyingPersonasTableProps) => {
  // Use the hook if no personas are provided directly
  const team13Data = useTeam13BuyingPersonas();
  
  // Use passed personas if available, otherwise use the data from hooks
  const data = personas || team13Data.data;
  const loading = !personas && team13Data.loading;
  const error = !personas && team13Data.error;
  
  const handleSaveData = async (updatedData: BuyingPersona[]) => {
    try {
      // Update each row individually
      for (const persona of updatedData) {
        // Convert string numeric values to numbers
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
          .from('Team13buyingpersonasforwebsite')
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
      caption="Team 13 Buying Personas Data"
      onSave={handleSaveData}
    />
  );
};

export default Team13BuyingPersonasTable;
