
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BuyingPersonasTable from "@/features/team-data/components/BuyingPersonasTable";
import FriturenTable from "@/features/team-data/components/FriturenTable";
import StreetInterviewsTable from "@/features/team-data/components/StreetInterviewsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Team38Results = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Team 38 Research Results | Snack Innovation</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Team 38 Research Results</h1>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Team 38 Market Research Data</h2>
              
              <p className="text-gray-600 mb-8">
                This page presents the complete market research findings from Team 38's research on 
                protein-based snack innovation in frituren. Use these insights to inform your 
                product development and marketing strategies.
              </p>
              
              <Tabs defaultValue="buyingPersonas" className="w-full">
                <TabsList className="mb-6 w-full max-w-lg">
                  <TabsTrigger value="buyingPersonas">Buying Personas</TabsTrigger>
                  <TabsTrigger value="frituren">Frituren</TabsTrigger>
                  <TabsTrigger value="streetInterviews">Street Interviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="buyingPersonas">
                  <BuyingPersonasTable />
                </TabsContent>
                
                <TabsContent value="frituren">
                  <FriturenTable />
                </TabsContent>
                
                <TabsContent value="streetInterviews">
                  <StreetInterviewsTable />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team38Results;
