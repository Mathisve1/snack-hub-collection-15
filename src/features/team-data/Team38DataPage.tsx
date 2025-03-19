
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Team38DataDisplay from "./components/Team38DataDisplay";

export const Team38DataPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold">Team 38 Data Overview</h1>
      
      <Team38DataDisplay />
    </div>
  );
};

export default Team38DataPage;
