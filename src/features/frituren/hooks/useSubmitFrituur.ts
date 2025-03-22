
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FrituurFormValues } from "../utils/formConstants";

export const useSubmitFrituur = (team: string) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const submitFrituur = async (values: FrituurFormValues) => {
    try {
      setIsSubmitting(true);

      // Skip duplicate check entirely
      
      // Prepare data for insertion ensuring minimal required fields
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

      // Insert frituur without additional validations
      const { error: insertError } = await supabase
        .from('frituren')
        .insert({
          ...dataToInsert,
          "Business Name": values["Business Name"] // Essential field
        });

      if (insertError) {
        console.error("Error adding frituur:", insertError);
        toast.error(`Failed to add frituur: ${insertError.message}`);
        return;
      }

      // Automatically select the frituur for the team
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
