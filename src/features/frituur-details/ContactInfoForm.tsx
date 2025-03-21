
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ContactInfoFormProps {
  businessName: string;
  team: string;
}

export default function ContactInfoForm({
  businessName,
  team
}: ContactInfoFormProps) {
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [existingInfo, setExistingInfo] = useState<boolean>(false);
  
  useEffect(() => {
    fetchExistingContactInfo();
  }, [businessName]);
  
  async function fetchExistingContactInfo() {
    try {
      const { data, error } = await supabase
        .from('frituren_contact_info_indien_interesse')
        .select('email, phone_number')
        .eq('business_name', businessName)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        console.error("Error fetching contact info:", error);
        return;
      }
      
      if (data) {
        setEmail(data.email || "");
        setPhoneNumber(data.phone_number || "");
        setExistingInfo(true);
      }
    } catch (error) {
      console.error("Error in fetchExistingContactInfo:", error);
    }
  }
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    
    try {
      let query;
      
      if (existingInfo) {
        query = supabase
          .from('frituren_contact_info_indien_interesse')
          .update({
            email,
            phone_number: phoneNumber,
            team
          })
          .eq('business_name', businessName);
      } else {
        query = supabase
          .from('frituren_contact_info_indien_interesse')
          .insert({
            business_name: businessName,
            email,
            phone_number: phoneNumber,
            team
          });
      }
      
      const { error } = await query;
      
      if (error) {
        console.error("Error saving contact info:", error);
        toast.error("Could not save contact information");
        return;
      }
      
      toast.success("Contact information saved successfully");
      setExistingInfo(true);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error("An error occurred while saving");
    } finally {
      setLoading(false);
    }
  }
  
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    setPhoneNumber(numericValue);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h3 className="text-lg font-semibold mb-4">Contact Information indien interesse in de proteine snack</h3>
      <p className="text-sm text-gray-600 mb-4">
        Voeg hier het telefoonnummer en e-mailadres toe waarop we de friturist kunnen bereiken
        indien ze interesse hadden in de proteïne snack.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email van de friturist" />
        </div>
        
        <div>
          <Label htmlFor="phoneNumber">Telefoonnummer</Label>
          <Input 
            id="phoneNumber" 
            type="tel" 
            value={phoneNumber} 
            onChange={handlePhoneNumberChange} 
            placeholder="Telefoonnummer van de friturist" 
            inputMode="numeric" 
            pattern="[0-9]*" 
          />
        </div>
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Opslaan...' : existingInfo ? 'Bijwerken' : 'Opslaan'}
        </Button>
      </form>
    </div>
  );
}
