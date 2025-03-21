
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BuyingPersona, Frituur, StreetInterview } from "../../types";
import Team3PersonasTab from "./Team3PersonasTab";
import Team3FriturenTab from "./Team3FriturenTab";
import Team3InterviewsTab from "./Team3InterviewsTab";

interface Team3TabsContainerProps {
  personas: BuyingPersona[];
  frituren: Frituur[];
  interviews: StreetInterview[];
  groupedPersonas: {
    personaType: string;
    personas: BuyingPersona[];
  }[];
}

const Team3TabsContainer = ({ 
  personas, 
  frituren, 
  interviews, 
  groupedPersonas 
}: Team3TabsContainerProps) => {
  return (
    <Tabs defaultValue="buyingPersonas" className="w-full">
      <TabsList className="mb-6 w-full max-w-lg">
        <TabsTrigger value="buyingPersonas">
          Buying Personas ({personas?.length || 0})
        </TabsTrigger>
        <TabsTrigger value="frituren">
          Frituren ({frituren?.length || 0})
        </TabsTrigger>
        <TabsTrigger value="streetInterviews">
          Street Interviews ({interviews?.length || 0})
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="buyingPersonas">
        <Team3PersonasTab personas={personas} groupedPersonas={groupedPersonas} />
      </TabsContent>
      
      <TabsContent value="frituren">
        <Team3FriturenTab frituren={frituren} />
      </TabsContent>
      
      <TabsContent value="streetInterviews">
        <Team3InterviewsTab interviews={interviews} />
      </TabsContent>
    </Tabs>
  );
};

export default Team3TabsContainer;
