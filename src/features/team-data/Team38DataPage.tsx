
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BuyingPersonasTable from "./components/BuyingPersonasTable";
import FriturenTable from "./components/FriturenTable";
import StreetInterviewsTable from "./components/StreetInterviewsTable";

export const Team38DataPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold">Team 38 Data Overview</h1>
      
      <Tabs defaultValue="buyingPersonas" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-lg mb-4">
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

export default Team38DataPage;
