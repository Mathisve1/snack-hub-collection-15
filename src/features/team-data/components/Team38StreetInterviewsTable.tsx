
import { EditableTable } from "@/components/ui/editable-table";
import { StreetInterview } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface StreetInterviewsTableProps {
  interviews: StreetInterview[];
}

const Team38StreetInterviewsTable = ({ interviews }: StreetInterviewsTableProps) => {
  if (!interviews || interviews.length === 0) {
    return <div className="text-center p-6">No street interviews data available</div>;
  }
  
  const handleSaveData = async (updatedData: StreetInterview[]) => {
    try {
      // Update each row individually
      for (const interview of updatedData) {
        // Prepare data for update, ensuring numeric fields are stored as numbers
        const updateData = {
          ...interview,
          // Convert string values to numbers if needed
          eiwitgehalte: typeof interview.eiwitgehalte === 'string' 
            ? parseFloat(interview.eiwitgehalte) 
            : interview.eiwitgehalte,
          prijs: typeof interview.prijs === 'string' 
            ? parseFloat(interview.prijs) 
            : interview.prijs
        };

        const { error } = await supabase
          .from('Team38streetinterviewsforwebsite')
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

  return (
    <EditableTable 
      data={interviews} 
      caption="Team 38 Street Interviews Data"
      onSave={handleSaveData}
    />
  );
};

export default Team38StreetInterviewsTable;
