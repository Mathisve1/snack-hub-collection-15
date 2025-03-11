
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

      // Remove PhoneNumber from the values to insert as it doesn't exist in the database
      const { PhoneNumber, ...dataToInsert } = values;
      
      const processedValues = {
        ...dataToInsert,
        "Business Name": values["Business Name"],
        Postcode: values.Postcode ? Number(values.Postcode) : null,
        Land: "België",
        Rating: values.Rating ? Number(values.Rating) : null
      };
      
      const { error } = await supabase
        .from('frituren')
        .insert(processedValues);
        
      if (error) {
        console.error("Error adding frituur:", error);
        toast.error("Failed to add frituur. Please try again.");
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
