
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { frituurFormSchema, type FrituurFormValues } from "../utils/formConstants";
import { Frituur } from "@/types";

// Define simple types for our database results
interface FrituurName {
  "Business Name": string;
}

interface FrituurNameAndNumber {
  "Business Name": string;
  Number: string | null;
}

export const useFrituurForm = (team: string) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FrituurFormValues>({
    resolver: zodResolver(frituurFormSchema),
    defaultValues: {
      "Business Name": "",
      Provincie: "",
      Gemeente: "",
      Straat: "",
      Number: "",
      Postcode: "",
      PhoneNumber: "",
      Website: "",
      Email: "",
      "Facebook Link": "",
      "Instagram link": "",
      "Linkedin Link": "",
      "Open & Close Time": "",
      Rating: "",
      Category: "",
      Review: "",
    },
  });

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (!value) {
      field.onChange('');
      return;
    }
    
    if (!value.startsWith('32')) {
      value = '32' + value;
    }
    
    value = value.slice(0, 10);
    field.onChange(value);
  };

  const onSubmit = async (values: FrituurFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Check if business name already exists
      const { data: existingFrituurName, error: nameCheckError } = await supabase
        .from('frituren')
        .select('"Business Name"')
        .eq('"Business Name"', values["Business Name"])
        .maybeSingle();

      if (nameCheckError) {
        console.error("Error checking for duplicate business name:", nameCheckError);
        toast.error("Failed to check for duplicate business name. Please try again.");
        setIsSubmitting(false);
        return;
      }
        
      if (existingFrituurName) {
        toast.error(`A frituur with the name "${values["Business Name"]}" is already in our list. Please use a different name.`);
        setIsSubmitting(false);
        return;
      }
      
      // Check if phone number already exists
      if (values.PhoneNumber && values.PhoneNumber.trim() !== "") {
        const { data: existingPhoneNumber, error: phoneCheckError } = await supabase
          .from('frituren')
          .select('"Business Name", Number')
          .eq('Number', values.PhoneNumber)
          .single();
          
        if (phoneCheckError && phoneCheckError.code !== 'PGRST116') {
          // PGRST116 is the error code for no rows returned
          console.error("Error checking for duplicate phone number:", phoneCheckError);
          toast.error("Failed to check for duplicate phone number. Please try again.");
          setIsSubmitting(false);
          return;
        }
          
        if (existingPhoneNumber) {
          toast.error(`This phone number is already used by "${existingPhoneNumber["Business Name"]}". You cannot add a frituur with the same phone number.`);
          setIsSubmitting(false);
          return;
        }
      }
      
      // Also check if the Number field has a value and it's not being used yet (for backward compatibility)
      if (values.Number && values.Number.trim() !== "" && values.Number !== values.PhoneNumber) {
        const { data: existingNumber, error: numberCheckError } = await supabase
          .from('frituren')
          .select('"Business Name", Number')
          .eq('Number', values.Number)
          .single();
          
        if (numberCheckError && numberCheckError.code !== 'PGRST116') {
          console.error("Error checking for duplicate number:", numberCheckError);
          toast.error("Failed to check for duplicate number. Please try again.");
          setIsSubmitting(false);
          return;
        }
          
        if (existingNumber) {
          toast.error(`This number is already used by "${existingNumber["Business Name"]}". You cannot add a frituur with the same number.`);
          setIsSubmitting(false);
          return;
        }
      }
      
      // Check if address already exists
      const { data: existingFrituurAddress, error: addressCheckError } = await supabase
        .from('frituren')
        .select('"Business Name"')
        .eq('Straat', values.Straat)
        .eq('Number', values.Number || "")
        .eq('Gemeente', values.Gemeente)
        .eq('Postcode', values.Postcode ? Number(values.Postcode) : null)
        .single();
        
      if (addressCheckError && addressCheckError.code !== 'PGRST116') {
        console.error("Error checking for duplicate address:", addressCheckError);
        toast.error("Failed to check for duplicate address. Please try again.");
        setIsSubmitting(false);
        return;
      }
        
      if (existingFrituurAddress) {
        toast.error(`A frituur at this address already exists: "${existingFrituurAddress["Business Name"]}". You cannot add two frituren at the same location.`);
        setIsSubmitting(false);
        return;
      }

      // Prepare data for insertion
      // Use PhoneNumber as the Number field in Supabase if it exists
      const processedValues = {
        ...values,
        "Business Name": values["Business Name"],
        Postcode: values.Postcode ? Number(values.Postcode) : null,
        Land: "België",
        Rating: values.Rating ? Number(values.Rating) : null,
        Number: values.PhoneNumber || values.Number || "",  // PhoneNumber takes priority for the Number field
        Review: values.Review || ""
      };
      
      // Remove PhoneNumber from the values to insert as it doesn't exist in the database
      const { PhoneNumber, ...dataToInsert } = processedValues;
      
      console.log("Inserting frituur data:", dataToInsert);
      
      const { error: insertError } = await supabase
        .from('frituren')
        .insert(dataToInsert);
        
      if (insertError) {
        console.error("Error adding frituur:", insertError);
        toast.error(`Failed to add frituur: ${insertError.message}`);
        setIsSubmitting(false);
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
    form,
    isSubmitting,
    onSubmit,
    handlePhoneNumberChange
  };
};
