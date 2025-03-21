
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Frituur } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoadingState from "@/features/frituren/LoadingState";
import FrituurHeader from "@/features/frituur-details/FrituurHeader";
import BusinessInfoSection from "@/features/frituur-details/BusinessInfoSection";
import NotesTabContent from "@/features/frituur-details/NotesTabContent";
import AdditionalInfoTab from "@/features/frituur-details/AdditionalInfoTab";
import ContactInfoForm from "@/features/frituur-details/ContactInfoForm";

const FrituurDetails = () => {
  const { team = "", businessName = "" } = useParams<{ team: string; businessName: string }>();
  const [frituur, setFrituur] = useState<Frituur | null>(null);
  const [loading, setLoading] = useState(true);
  
  const decodedBusinessName = decodeURIComponent(businessName);
  
  useEffect(() => {
    const fetchFrituurDetails = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('frituren')
          .select('*')
          .eq('Business Name', decodedBusinessName)
          .single();
          
        if (error) {
          console.error("Error fetching frituur details:", error);
          toast.error("Could not load frituur details");
          throw error;
        }
        
        setFrituur(data as Frituur);
      } catch (error) {
        console.error("Error in fetchFrituurDetails:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (team && decodedBusinessName) {
      fetchFrituurDetails();
    }
  }, [team, decodedBusinessName]);

  if (loading) {
    return <LoadingState loading={loading} message="Loading frituur details..." />;
  }
  
  if (!frituur) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">Frituur not found</h2>
        <p className="mt-2 text-gray-600">The frituur you're looking for could not be found.</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <FrituurHeader 
        businessName={frituur["Business Name"]} 
        team={team} 
        rating={frituur.Rating} 
      />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column: Location and contact info */}
          <div className="md:col-span-1 space-y-4">
            <BusinessInfoSection frituur={frituur} />
            {/* Add the contact info form */}
            <ContactInfoForm businessName={decodedBusinessName} team={team} />
          </div>
          
          {/* Right column: Notes and attachments */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-5">
              <Tabs defaultValue="attachments" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="attachments">Notes & Attachments</TabsTrigger>
                  <TabsTrigger value="info">Additional Info</TabsTrigger>
                </TabsList>
                
                <TabsContent value="attachments">
                  <NotesTabContent team={team} businessName={decodedBusinessName} />
                </TabsContent>
                
                <TabsContent value="info">
                  <AdditionalInfoTab frituur={frituur} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FrituurDetails;
