
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BasicInfoFields } from "./components/BasicInfoFields";
import { AddressFields } from "./components/AddressFields";
import { ContactFields } from "./components/ContactFields";
import { SocialMediaFields } from "./components/SocialMediaFields";
import { useFrituurForm } from "./hooks/useFrituurForm";

interface AddFrituurFormProps {
  team: string;
}

const AddFrituurForm = ({ team }: AddFrituurFormProps) => {
  const { form, isSubmitting, onSubmit, handlePhoneNumberChange } = useFrituurForm(team);

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
              <BasicInfoFields form={form} handlePhoneNumberChange={handlePhoneNumberChange} />
              <AddressFields form={form} />
              <ContactFields form={form} />
              <SocialMediaFields form={form} />
              
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
            </div>
            
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
