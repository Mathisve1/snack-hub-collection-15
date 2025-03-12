
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
      
      // Simple string comparison instead of deep object comparison to avoid type issues
      return frituur["Business Name"].toLowerCase().trim() === normalizedName;
    });
  }, [frituren, currentValues["Business Name"]]);

  const checkBusinessNameExists = async (businessName: string) => {
    const { data, error } = await supabase
      .from('frituren')
      .select('"Business Name"')
      .eq('"Business Name"', businessName);

    if (error) {
      console.error("Error checking for duplicate business name:", error);
      toast.error("Failed to check for duplicate business name. Please try again.");
      return true; // Return true to prevent submission on error
    }

    if (data && data.length > 0) {
      toast.error(`A frituur with the name "${businessName}" is already in our list. Please use a different name.`);
      return true;
    }

    return false;
  };

  const checkPhoneNumberExists = async (phoneNumber: string) => {
    if (!phoneNumber || phoneNumber.trim() === "") {
      return false;
    }

    const { data, error } = await supabase
      .from('frituren')
      .select('"Business Name", Number')
      .eq('Number', phoneNumber);

    if (error) {
      console.error("Error checking for duplicate phone number:", error);
      toast.error("Failed to check for duplicate phone number. Please try again.");
      return true;
    }

    if (data && data.length > 0) {
      toast.error(`This phone number is already used by "${data[0]["Business Name"]}". You cannot add a frituur with the same phone number.`);
      return true;
    }

    return false;
  };

  const checkAddressExists = async (
    straat: string, 
    number: string, 
    gemeente: string, 
    postcode: string | number | null
  ) => {
    const { data, error } = await supabase
      .from('frituren')
      .select('"Business Name"')
      .eq('Straat', straat)
      .eq('Number', number || "")
      .eq('Gemeente', gemeente)
      .eq('Postcode', postcode === null ? null : Number(postcode));

    if (error) {
      console.error("Error checking for duplicate address:", error);
      toast.error("Failed to check for duplicate address. Please try again.");
      return true;
    }

    if (data && data.length > 0) {
      toast.error(`A frituur at this address already exists: "${data[0]["Business Name"]}". You cannot add two frituren at the same location.`);
      return true;
    }

    return false;
  };

  return {
    isDuplicate,
    checkBusinessNameExists,
    checkPhoneNumberExists,
    checkAddressExists
  };
};
