
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { FrituurFormValues } from "../utils/formConstants";

interface AddressFieldsProps {
  form: UseFormReturn<FrituurFormValues>;
}

export const AddressFields = ({ form }: AddressFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="Gemeente"
        render={({ field }) => (
          <FormItem>
            <FormLabel>City*</FormLabel>
            <FormControl>
              <Input placeholder="Gent" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="Straat"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Street*</FormLabel>
            <FormControl>
              <Input placeholder="Vrijdagmarkt" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="Number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number</FormLabel>
            <FormControl>
              <Input placeholder="10" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="Postcode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Postal Code*</FormLabel>
            <FormControl>
              <Input placeholder="9000" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
