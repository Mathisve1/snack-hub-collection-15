
import { useParams } from "react-router-dom";
import BuyingPersonasTable from "./components/BuyingPersonasTable";
import FriturenTable from "./components/FriturenTable";
import StreetInterviewsTable from "./components/StreetInterviewsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Team38DataContainer = () => {
  const { teamId } = useParams();
  
  // Check if the current team is team 38
  if (teamId !== "OV-38") {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Access Restricted</h2>
        <p>This data is only available for Team 38.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Team 38 Data Tables</h1>
      
      <Tabs defaultValue="buyingPersonas" className="w-full">
        <TabsList className="mb-4">
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
  );
};

export default Team38DataContainer;
