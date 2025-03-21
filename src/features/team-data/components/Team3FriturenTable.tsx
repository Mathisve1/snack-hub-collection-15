
import { EditableTable } from "@/components/ui/editable-table";
import { Frituur } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FriturenTableProps {
  frituren: Frituur[];
}

const Team3FriturenTable = ({ frituren }: FriturenTableProps) => {
  if (!frituren || frituren.length === 0) {
    return <div className="text-center p-6">No frituren data available</div>;
  }
  
  const handleSaveData = async (updatedData: Frituur[]) => {
    try {
      // Update each row individually
      for (const frituur of updatedData) {
        const { error } = await supabase
          .from('Team3friturenforwebsite')
          .update(frituur)
          .eq('id', frituur.id);
          
        if (error) {
          console.error("Error updating frituur:", error);
          toast.error(`Failed to update frituur: ${error.message}`);
          return;
        }
      }
      
      toast.success("Frituren data updated successfully!");
    } catch (error) {
      console.error("Error in handleSaveData:", error);
      toast.error("Failed to save changes");
    }
  };

  return (
    <EditableTable 
      data={frituren} 
      caption="Team 3 Frituren Data"
      onSave={handleSaveData}
    />
  );
};

export default Team3FriturenTable;
