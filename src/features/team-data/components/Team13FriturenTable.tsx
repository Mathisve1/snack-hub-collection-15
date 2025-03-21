
import { useState } from "react";
import { EditableTable } from "@/components/ui/editable-table";
import { useTeam13Frituren } from "../hooks/useTeam13Data";
import { Loader2, LayoutGrid, Table as TableIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import FriturenSummary from "./frituren/FriturenSummary";
import { Frituur } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Team13FriturenTableProps {
  frituren?: Frituur[];
}

const Team13FriturenTable = ({ frituren }: Team13FriturenTableProps) => {
  // Use the team13 hook
  const team13Data = useTeam13Frituren();
  
  // Use passed frituren if available, otherwise use the data from hooks
  const data = frituren || team13Data.data;
  const loading = !frituren && team13Data.loading;
  const error = !frituren && team13Data.error;
  
  // View mode state
  const [viewMode, setViewMode] = useState<"summary" | "table">("summary");
  
  const handleSaveData = async (updatedData: Frituur[]) => {
    try {
      // Update each row individually
      for (const frituur of updatedData) {
        // Convert string numeric values to numbers
        const updateData = {
          ...frituur,
          gemiddlede_marges: typeof frituur.gemiddlede_marges === 'string' ? parseFloat(frituur.gemiddlede_marges) : frituur.gemiddlede_marges,
          absolute_marges: typeof frituur.absolute_marges === 'string' ? parseFloat(frituur.absolute_marges) : frituur.absolute_marges,
          aankoopprijs: typeof frituur.aankoopprijs === 'string' ? parseFloat(frituur.aankoopprijs) : frituur.aankoopprijs,
          aankoopprijs_proteine_snacks: typeof frituur.aankoopprijs_proteine_snacks === 'string' ? parseFloat(frituur.aankoopprijs_proteine_snacks) : frituur.aankoopprijs_proteine_snacks
        };

        const { error } = await supabase
          .from('Team13friturenforwebsite')
          .update(updateData)
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
        Error loading frituren data: {error}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-gray-500 p-4 text-center">
        No frituren data available.
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <div className="bg-gray-100 rounded-md p-1 inline-flex">
          <Button
            variant={viewMode === "summary" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("summary")}
            className="rounded-md"
          >
            <LayoutGrid className="h-4 w-4 mr-1" />
            Samenvatting
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("table")}
            className="rounded-md"
          >
            <TableIcon className="h-4 w-4 mr-1" />
            Tabel
          </Button>
        </div>
      </div>

      {viewMode === "summary" ? (
        <FriturenSummary data={data} />
      ) : (
        <EditableTable 
          data={data} 
          caption="Team 13 Frituren Data"
          onSave={handleSaveData}
        />
      )}
    </>
  );
};

export default Team13FriturenTable;
