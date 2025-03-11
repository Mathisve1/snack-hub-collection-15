
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const provinces = [
  "Antwerpen",
  "Oost-Vlaanderen",
  "West-Vlaanderen",
  "Vlaams-Brabant",
  "Limburg",
  "Brussel",
  "Waals-Brabant",
  "Henegouwen",
  "Luik",
  "Luxemburg",
  "Namen",
];

// Define the form schema with validation
const frituurFormSchema = z.object({
  "Business Name": z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  Provincie: z.string().min(1, {
    message: "Please select a province.",
  }),
  Gemeente: z.string().min(1, {
    message: "City name is required.",
  }),
  Straat: z.string().min(1, {
    message: "Street name is required.",
  }),
  Number: z.string().optional(),
  Postcode: z.string()
    .min(4, { message: "Postal code must be at least 4 digits." })
    .refine((val) => !isNaN(Number(val)), {
      message: "Postal code must be a number.",
    }),
  Website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  Email: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal("")),
  "Facebook Link": z.string().url({ message: "Please enter a valid Facebook URL." }).optional().or(z.literal("")),
  "Instagram link": z.string().url({ message: "Please enter a valid Instagram URL." }).optional().or(z.literal("")),
  "Linkedin Link": z.string().url({ message: "Please enter a valid LinkedIn URL." }).optional().or(z.literal("")),
  "Open & Close Time": z.string().optional(),
  Rating: z.string()
    .refine((val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 5), {
      message: "Rating must be a number between 0 and 5.",
    })
    .optional()
    .transform(val => val === "" ? null : Number(val)),
  Category: z.string().optional(),
  Review: z.string().optional(),
});

type FrituurFormValues = z.infer<typeof frituurFormSchema>;

interface AddFrituurFormProps {
  team: string;
}

const AddFrituurForm = ({ team }: AddFrituurFormProps) => {
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

  const onSubmit = async (values: FrituurFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Check if frituur with same name already exists
      const { data: existingFrituurName, error: nameError } = await supabase
        .from('frituren')
        .select('*')
        .eq('Business Name', values["Business Name"])
        .single();
        
      if (existingFrituurName) {
        toast.error(`A frituur with the name "${values["Business Name"]}" already exists.`);
        setIsSubmitting(false);
        return;
      }
      
      // Check if a frituur at the same address exists
      const { data: existingFrituurAddress, error: addressError } = await supabase
        .from('frituren')
        .select('*')
        .eq('Straat', values.Straat)
        .eq('Number', values.Number || "")
        .eq('Gemeente', values.Gemeente)
        .eq('Postcode', values.Postcode)
        .single();
        
      if (existingFrituurAddress) {
        toast.error(`A frituur at this address already exists.`);
        setIsSubmitting(false);
        return;
      }

      // Convert Rating to number if provided
      const processedValues = {
        ...values,
        Postcode: values.Postcode ? parseInt(values.Postcode) : null,
        Rating: values.Rating,
        Land: "België" // Default value for Land
      };
      
      // Add the new frituur to the database
      const { data, error } = await supabase
        .from('frituren')
        .insert([processedValues]);
        
      if (error) {
        console.error("Error adding frituur:", error);
        toast.error("Failed to add frituur. Please try again.");
        setIsSubmitting(false);
        return;
      }
      
      // Also add it to team selections
      const { error: selectionError } = await supabase
        .from('team_selections')
        .insert([
          { 
            business_name: values["Business Name"],
            team: team
          }
        ]);
        
      if (selectionError) {
        console.error("Error adding to team selections:", selectionError);
        // Continue anyway, this is not critical
      }
      
      toast.success("Frituur added successfully!");
      
      // Wait a bit before navigating to give toast time to show
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

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Frituur</CardTitle>
        <CardDescription>
          Fill in the details to add a new frituur to the database.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Business Name */}
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
              
              {/* Category */}
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
              
              {/* Province */}
              <FormField
                control={form.control}
                name="Provincie"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
              
              {/* City/Gemeente */}
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
              
              {/* Street */}
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
              
              {/* Number */}
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
              
              {/* Postal code */}
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
              
              {/* Rating */}
              <FormField
                control={form.control}
                name="Rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating (0-5)</FormLabel>
                    <FormControl>
                      <Input placeholder="4.5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Website */}
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
              
              {/* Email */}
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
              
              {/* Open & Close Time */}
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
              
              {/* Facebook Link */}
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
              
              {/* Instagram link */}
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
              
              {/* LinkedIn Link */}
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
            </div>
            
            {/* Review */}
            <FormField
              control={form.control}
              name="Review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comments</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add any additional comments or notes about this frituur"
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <CardFooter className="flex justify-end px-0">
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Add Frituur"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddFrituurForm;
