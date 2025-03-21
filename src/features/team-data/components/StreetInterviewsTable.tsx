
import { useState } from "react";
import { EditableTable } from "@/components/ui/editable-table";
import { useTeam38StreetInterviews } from "../hooks/useTeam38Data";
import { useTeam3StreetInterviews } from "../hooks/useTeam3Data";
import { Loader2, LayoutGrid, Table as TableIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import StreetInterviewsSummary from "./street-interviews/StreetInterviewsSummary";
import { useLocation } from "react-router-dom";
import { StreetInterview } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface StreetInterviewsTableProps {
  interviews?: StreetInterview[];
}

const StreetInterviewsTable = ({ interviews }: StreetInterviewsTableProps) => {
  const location = useLocation();
  // Check if the current path includes team-3
  const isTeam3Data = location.pathname === "/team-3-results";
  const isTeam13Data = location.pathname === "/team-13-results";
  
  // Log the current path and which team was detected
  console.log(`StreetInterviewsTable - Current path: ${location.pathname}, isTeam3Data: ${isTeam3Data}, isTeam13Data: ${isTeam13Data}`);
  
  // Use the appropriate hook based on the current path
  const team38Data = useTeam38StreetInterviews();
  const team3Data = useTeam3StreetInterviews();
  
  // Use passed interviews if available, otherwise use the data from hooks
  const data = interviews || (isTeam3Data ? team3Data.data : team38Data.data);
  const loading = !interviews && (isTeam3Data ? team3Data.loading : team38Data.loading);
  const error = !interviews && (isTeam3Data ? team3Data.error : team38Data.error);
  
  const [viewMode, setViewMode] = useState<"summary" | "table">("summary");

  // Determine which table to update based on path
  const getTableName = () => {
    if (location.pathname.includes("team-3")) {
      return "Team3streetinterviewsforwebsite";
    } else if (location.pathname.includes("team-13")) {
      return "Team13streetinterviewsforwebsite";
    } else if (location.pathname.includes("team-14")) {
      return "Team14streetinterviewsforwebsite";
    } else {
      return "Team38streetinterviewsforwebsite";
    }
  };

  const handleSaveData = async (updatedData: StreetInterview[]) => {
    try {
      const tableName = getTableName();
      
      // Update each row individually
      for (const interview of updatedData) {
        const { error } = await supabase
          .from(tableName)
          .update(interview)
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
        <StreetInterviewsSummary data={data} />
      ) : (
        <EditableTable 
          data={data} 
          caption="Street Interviews Data"
          onSave={handleSaveData}
        />
      )}
    </>
  );
};

export default StreetInterviewsTable;
