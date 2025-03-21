
import { useState } from "react";
import { EditableTable } from "@/components/ui/editable-table";
import { useTeam13StreetInterviews } from "../hooks/useTeam13Data";
import { Loader2, LayoutGrid, Table as TableIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Team13StreetInterviewsSummary from "./Team13StreetInterviewsSummary";
import { StreetInterview } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Team13StreetInterviewsTableProps {
  interviews?: StreetInterview[];
}

const Team13StreetInterviewsTable = ({ interviews }: Team13StreetInterviewsTableProps) => {
  // Use the team13 hook
  const team13Data = useTeam13StreetInterviews();
  
  // Use passed interviews if available, otherwise use the data from hooks
  const data = interviews || team13Data.data;
  const loading = !interviews && team13Data.loading;
  const error = !interviews && team13Data.error;
  
  // View mode state
  const [viewMode, setViewMode] = useState<"summary" | "table">("summary");
  
  const handleSaveData = async (updatedData: StreetInterview[]) => {
    try {
      // Update each row individually
      for (const interview of updatedData) {
        // Convert string numeric values to numbers
        const updateData = {
          ...interview,
          eiwitgehalte: typeof interview.eiwitgehalte === 'string' ? parseFloat(interview.eiwitgehalte) : interview.eiwitgehalte,
          prijs: typeof interview.prijs === 'string' ? parseFloat(interview.prijs) : interview.prijs
        };

        const { error } = await supabase
          .from('Team13streetinterviewsforwebsite')
          .update(updateData)
          .eq('id', interview.id);
          
        if (error) {
          console.error("Error updating interview:", error);
          toast.error(`Failed to update interview: ${error.message}`);
          return;
        }
      }
      
      toast.success("Street interviews data updated successfully!");
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
        Error loading street interviews data: {error}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-gray-500 p-4 text-center">
        No street interviews data available.
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
        <Team13StreetInterviewsSummary data={data} />
      ) : (
        <EditableTable 
          data={data} 
          caption="Team 13 Street Interviews Data"
          onSave={handleSaveData}
        />
      )}
    </>
  );
};

export default Team13StreetInterviewsTable;
