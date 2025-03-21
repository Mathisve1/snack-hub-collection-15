
import { EditableTable } from "@/components/ui/editable-table";
import { StreetInterview } from "../types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface StreetInterviewsTableProps {
  interviews: StreetInterview[];
}

const Team3StreetInterviewsTable = ({ interviews }: StreetInterviewsTableProps) => {
  if (!interviews || interviews.length === 0) {
    return <div className="text-center p-6">No street interviews data available</div>;
  }
  
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
          .from('Team3streetinterviewsforwebsite')
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
      caption="Team 3 Street Interviews Data"
      onSave={handleSaveData}
    />
  );
};

export default Team3StreetInterviewsTable;
