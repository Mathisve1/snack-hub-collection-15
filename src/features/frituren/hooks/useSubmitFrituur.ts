
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FrituurFormValues } from "../utils/formConstants";
import { useDuplicateValidation } from "./useDuplicateValidation";

export const useSubmitFrituur = (team: string) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { 
    checkBusinessNameExists, 
    checkPhoneNumberExists, 
    checkAddressExists 
  } = useDuplicateValidation();

  const submitFrituur = async (values: FrituurFormValues) => {
    try {
      setIsSubmitting(true);

      const hasNameDuplicate = await checkBusinessNameExists(values["Business Name"]);
      if (hasNameDuplicate) {
        setIsSubmitting(false);
        return;
      }

      const hasPhoneDuplicate = await checkPhoneNumberExists(values.PhoneNumber || "");
      if (hasPhoneDuplicate) {
        setIsSubmitting(false);
        return;
      }

      const hasAddressDuplicate = await checkAddressExists(
        values.Straat,
        values.Number || "",
        values.Gemeente,
        values.Postcode ? Number(values.Postcode) : null
      );
      if (hasAddressDuplicate) {
        setIsSubmitting(false);
        return;
      }

      // Prepare data for insertion ensuring required fields
      const processedValues = {
        ...values,
        Postcode: values.Postcode ? Number(values.Postcode) : null,
        Land: "België",
        Rating: values.Rating ? Number(values.Rating) : null,
        Number: values.PhoneNumber || values.Number || "",
        Review: values.Review || ""
      };

      // Remove PhoneNumber from processedValues as it's not in the table
      const { PhoneNumber, ...dataToInsert } = processedValues;

      // Explicitly ensure Business Name is included
      const { error: insertError } = await supabase
        .from('frituren')
        .insert({
          ...dataToInsert,
          "Business Name": values["Business Name"] // Explicitly include the business name as required
        });

      if (insertError) {
        console.error("Error adding frituur:", insertError);
        toast.error(`Failed to add frituur: ${insertError.message}`);
        return;
      }

      const { error: selectionError } = await supabase
        .from('team_selections')
        .insert({
          business_name: values["Business Name"],
          team: team
        });

      if (selectionError) {
        console.error("Error adding to team selections:", selectionError);
      }

      toast.success("Frituur added successfully!");

      setTimeout(() => {
        navigate(`/frituur/${team}/${encodeURIComponent(values["Business Name"])}`);
      }, 1500);

    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitFrituur
  };
};
