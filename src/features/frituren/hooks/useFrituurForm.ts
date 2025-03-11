
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { frituurFormSchema, type FrituurFormValues } from "../utils/formConstants";

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
      const { data: existingFrituurName } = await supabase
        .from('frituren')
        .select('Business Name')
        .eq('Business Name', values["Business Name"])
        .maybeSingle();
        
      if (existingFrituurName) {
        toast.error(`A frituur with the name "${values["Business Name"]}" already exists.`);
        setIsSubmitting(false);
        return;
      }
      
      // Check if phone number already exists - phone numbers are stored in the Number field in Supabase
      if (values.PhoneNumber && values.PhoneNumber.trim() !== "") {
        const { data: existingPhoneNumber, error: phoneCheckError } = await supabase
          .from('frituren')
          .select('Business Name')
          .eq('Number', values.PhoneNumber)
          .maybeSingle();
          
        if (phoneCheckError) {
          console.error("Error checking for duplicate phone number:", phoneCheckError);
        }
          
        if (existingPhoneNumber) {
          toast.error(`A frituur with this phone number already exists (${existingPhoneNumber["Business Name"]}).`);
          setIsSubmitting(false);
          return;
        }
      }
      
      // Also check if the Number field has a value and it's not being used yet (for backward compatibility)
      if (values.Number && values.Number.trim() !== "" && values.Number !== values.PhoneNumber) {
        const { data: existingNumber } = await supabase
          .from('frituren')
          .select('Business Name')
          .eq('Number', values.Number)
          .maybeSingle();
          
        if (existingNumber) {
          toast.error(`A frituur with this number already exists.`);
          setIsSubmitting(false);
          return;
        }
      }
      
      // Check if address already exists
      const { data: existingFrituurAddress } = await supabase
        .from('frituren')
        .select('Business Name')
        .eq('Straat', values.Straat)
        .eq('Number', values.Number || "")
        .eq('Gemeente', values.Gemeente)
        .eq('Postcode', values.Postcode ? Number(values.Postcode) : null)
        .maybeSingle();
        
      if (existingFrituurAddress) {
        toast.error(`A frituur at this address already exists.`);
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
      
      const { error } = await supabase
        .from('frituren')
        .insert(dataToInsert);
        
      if (error) {
        console.error("Error adding frituur:", error);
        toast.error(`Failed to add frituur: ${error.message}`);
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
