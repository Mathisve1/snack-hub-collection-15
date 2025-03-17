
import { useMemo } from 'react';
import { Frituur } from '@/types';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useDuplicateValidation = (
  frituren: Frituur[] = [],
  currentValues: Partial<Frituur> = {}
) => {
  const isDuplicate = useMemo(() => {
    if (!frituren || !currentValues["Business Name"]) {
      return false;
    }

    const normalizedName = currentValues["Business Name"].toLowerCase().trim();
    
    return frituren.some((frituur) => {
      // Only check for duplicates if there's a business name
      if (!frituur["Business Name"]) return false;
      
      // Simple string comparison without recursion
      return frituur["Business Name"].toLowerCase().trim() === normalizedName;
    });
  }, [frituren, currentValues["Business Name"]]);

  // Simplified check for business name without deep type instantiation
  const checkBusinessNameExists = async (businessName: string): Promise<boolean> => {
    try {
      // Use count instead of select to avoid type depth issues
      const { count, error } = await supabase
        .from('frituren')
        .select('*', { count: 'exact', head: true })
        .eq('Business Name', businessName);

      if (error) {
        console.error("Error checking for duplicate business name:", error);
        toast.error("Failed to check for duplicate business name. Please try again.");
        return false; // Don't block submission on error
      }

      if (count && count > 0) {
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
    isDuplicate,
    checkBusinessNameExists
  };
};
