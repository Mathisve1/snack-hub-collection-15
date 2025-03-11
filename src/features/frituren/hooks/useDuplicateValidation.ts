
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Define simple interface for the query results to avoid deep type instantiation
interface BusinessNameResult {
  "Business Name": string;
}

interface PhoneNumberResult {
  "Business Name": string;
  Number: string;
}

export const useDuplicateValidation = () => {
  const checkBusinessNameExists = async (businessName: string) => {
    // Use explicit type annotation to avoid deep type instantiation
    const { data, error } = await supabase
      .from('frituren')
      .select('"Business Name"')
      .eq('"Business Name"', businessName) as { data: BusinessNameResult[] | null, error: any };

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

    // Use explicit type annotation to avoid deep type instantiation
    const { data, error } = await supabase
      .from('frituren')
      .select('"Business Name", Number')
      .eq('Number', phoneNumber) as { data: PhoneNumberResult[] | null, error: any };

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
    // Use explicit type annotation to avoid deep type instantiation
    const { data, error } = await supabase
      .from('frituren')
      .select('"Business Name"')
      .eq('Straat', straat)
      .eq('Number', number || "")
      .eq('Gemeente', gemeente)
      .eq('Postcode', postcode === null ? null : Number(postcode)) as { data: BusinessNameResult[] | null, error: any };

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
    checkBusinessNameExists,
    checkPhoneNumberExists,
    checkAddressExists
  };
};
