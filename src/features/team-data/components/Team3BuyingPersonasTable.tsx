
import { EditableTable } from "@/components/ui/editable-table";
import { BuyingPersona } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface BuyingPersonasTableProps {
  personas: BuyingPersona[];
}

const Team3BuyingPersonasTable = ({ personas }: BuyingPersonasTableProps) => {
  if (!personas || personas.length === 0) {
    return <div className="text-center p-6">No buying personas data available</div>;
  }

  const handleSaveData = async (updatedData: BuyingPersona[]) => {
    try {
      // Update each row individually
      for (const persona of updatedData) {
        const { error } = await supabase
          .from('Team3buyingpersonasforwebsite')
          .update({
            buying_persona: persona.buying_persona,
            leeftijd: persona.leeftijd,
            geslacht: persona.geslacht,
            prijs: persona.prijs,
            consumptie_situatie: persona.consumptie_situatie,
            frequentie_frituurbezoek: persona.frequentie_frituurbezoek,
            motivatie_kiezen_proteine_snack: persona.motivatie_kiezen_proteine_snack,
            marketing: persona.marketing,
            openheid_nieuwe_snack: persona.openheid_nieuwe_snack
          })
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

  return (
    <EditableTable 
      data={personas} 
      caption="Team 3 Buying Personas Data"
      onSave={handleSaveData}
    />
  );
};

export default Team3BuyingPersonasTable;
