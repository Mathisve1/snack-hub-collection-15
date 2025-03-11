
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { FrituurFormValues } from "../utils/formConstants";

interface ContactFieldsProps {
  form: UseFormReturn<FrituurFormValues>;
}

export const ContactFields = ({ form }: ContactFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="Website"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Website</FormLabel>
            <FormControl>
              <Input placeholder="https://www.example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="Email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="info@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="Open & Close Time"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Opening Hours</FormLabel>
            <FormControl>
              <Input placeholder="Mon-Fri: 11:00-22:00" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
