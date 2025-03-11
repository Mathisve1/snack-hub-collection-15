
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
    // Only allow numeric input and automatically add "32" prefix
    let value = e.target.value.replace(/\D/g, '');
    
    if (!value) {
      field.onChange('');
      return;
    }
    
    // Ensure it starts with "32"
    if (!value.startsWith('32')) {
      value = '32' + value;
    }
    
    // Limit to 10 digits (32 + 8 digits)
    value = value.slice(0, 10);
    field.onChange(value);
  };

  const onSubmit = async (values: FrituurFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Check if business name already exists
      const { data: existingFrituurName } = await supabase
        .from('frituren')
        .select('*')
        .eq('Business Name', values["Business Name"])
        .maybeSingle();
        
      if (existingFrituurName) {
        toast.error(`A frituur with the name "${values["Business Name"]}" already exists.`);
        setIsSubmitting(false);
        return;
      }
      
      // Only check phone number if one is provided
      if (values.PhoneNumber && values.PhoneNumber.trim() !== "") {
        const { data: existingPhoneNumber, error: phoneQueryError } = await supabase
          .from('frituren')
          .select('*')
          .eq('PhoneNumber', values.PhoneNumber)
          .maybeSingle();
          
        if (phoneQueryError) {
          console.error("Error checking phone number:", phoneQueryError);
        }
          
        if (existingPhoneNumber) {
          toast.error(`A frituur with this phone number already exists.`);
          setIsSubmitting(false);
          return;
        }
      }
      
      // Check if address already exists
      const { data: existingFrituurAddress } = await supabase
        .from('frituren')
        .select('*')
        .eq('Straat', values.Straat)
        .eq('Number', values.Number || "")
        .eq('Gemeente', values.Gemeente)
        .eq('Postcode', values.Postcode || null)
        .maybeSingle();
        
      if (existingFrituurAddress) {
        toast.error(`A frituur at this address already exists.`);
        setIsSubmitting(false);
        return;
      }

      // Process values for insertion
      const processedValues = {
        ...values,
        "Business Name": values["Business Name"],
        Postcode: values.Postcode ? Number(values.Postcode) : null,
        Land: "België",
        Rating: values.Rating ? Number(values.Rating) : null
      };
      
      // Insert into frituren table
      const { error } = await supabase
        .from('frituren')
        .insert(processedValues);
        
      if (error) {
        console.error("Error adding frituur:", error);
        toast.error("Failed to add frituur. Please try again.");
        return;
      }
      
      // Insert into team_selections table
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
      
      // Navigate to the frituur details page after successful submission
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
