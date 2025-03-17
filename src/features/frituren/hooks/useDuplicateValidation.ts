
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useDuplicateValidation = () => {
  const checkBusinessNameExists = async (businessName: string) => {
    try {
      const { data, error } = await supabase
        .from('frituren')
        .select('count')
        .eq('"Business Name"', businessName)
        .single();

      if (error) {
        console.error("Error checking for duplicate business name:", error);
        toast.error("Failed to check for duplicate business name. Please try again.");
        return false; // Don't block submission on error
      }

      if (data && data.count > 0) {
        toast.error(`A frituur with the name "${businessName}" already exists. Please use a different name.`);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Unexpected error checking business name:", error);
      return false; // Don't block submission on unexpected errors
    }
  };
  
  return {
    checkBusinessNameExists
  };
};
