
import { supabase } from "@/integrations/supabase/client";

export async function verifyAccessCode(team: string, accessCode: string) {
  try {
    const { data, error } = await supabase
      .from('team_access_codes')
      .select('access_code')
      .eq('team', team)
      .single();
    
    if (error) {
      console.error("Error fetching access code:", error);
      return { valid: false, error: "Failed to verify access code" };
    }
    
    const isValid = data && data.access_code === accessCode;
    return { valid: isValid, error: isValid ? null : "Invalid access code" };
    
  } catch (error) {
    console.error("Error in verifyAccessCode:", error);
    return { valid: false, error: "An unexpected error occurred" };
  }
}
