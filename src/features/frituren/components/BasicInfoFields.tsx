
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { provinces } from "../utils/formConstants";
import type { UseFormReturn } from "react-hook-form";
import type { FrituurFormValues } from "../utils/formConstants";

interface BasicInfoFieldsProps {
  form: UseFormReturn<FrituurFormValues>;
  handlePhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>, field: any) => void;
}

export const BasicInfoFields = ({ form, handlePhoneNumberChange }: BasicInfoFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="Business Name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Name*</FormLabel>
            <FormControl>
              <Input placeholder="Frituur De Bosrand" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="Category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <Input placeholder="Snack bar" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="Provincie"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Province*</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a province" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {provinces.map((province) => (
                  <SelectItem key={province} value={province}>
                    {province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="PhoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number (32 + 9 digits)</FormLabel>
            <FormControl>
              <Input 
                placeholder="32XXXXXXXXX" 
                {...field}
                onChange={(e) => handlePhoneNumberChange(e, field)}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={11}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
