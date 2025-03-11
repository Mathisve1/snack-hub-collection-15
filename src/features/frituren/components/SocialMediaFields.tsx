
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { FrituurFormValues } from "../utils/formConstants";

interface SocialMediaFieldsProps {
  form: UseFormReturn<FrituurFormValues>;
}

export const SocialMediaFields = ({ form }: SocialMediaFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="Facebook Link"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Facebook</FormLabel>
            <FormControl>
              <Input placeholder="https://facebook.com/example" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="Instagram link"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Instagram</FormLabel>
            <FormControl>
              <Input placeholder="https://instagram.com/example" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="Linkedin Link"
        render={({ field }) => (
          <FormItem>
            <FormLabel>LinkedIn</FormLabel>
            <FormControl>
              <Input placeholder="https://linkedin.com/in/example" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
