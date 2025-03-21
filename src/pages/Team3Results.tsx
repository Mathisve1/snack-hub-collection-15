
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Table as TableIcon, LayoutGrid, Copy, Loader2, AlertTriangle, Database } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  useTeam3BuyingPersonas, 
  useTeam3Frituren, 
  useTeam3StreetInterviews 
} from "@/features/team-data/hooks/useTeam3Data";
import { useState } from "react";
import { toast } from "sonner";
import Team3BuyingPersonasTable from "@/features/team-data/components/Team3BuyingPersonasTable";
import Team3BuyingPersonasCards from "@/features/team-data/components/Team3BuyingPersonasCards";
import Team3FriturenTable from "@/features/team-data/components/Team3FriturenTable";
import Team3StreetInterviewsTable from "@/features/team-data/components/Team3StreetInterviewsTable";
import Team3StreetInterviewsSummary from "@/features/team-data/components/Team3StreetInterviewsSummary";
import { PersonaCardList } from "@/features/team-data/components/buying-personas/PersonaCardList";
import FriturenSummary from "@/features/team-data/components/frituren/FriturenSummary";
import FriturenCardView from "@/features/team-data/components/frituren/FriturenCardView";

const Team3Results = () => {
  const navigate = useNavigate();
  const { data: personas, loading: personasLoading, error: personasError } = useTeam3BuyingPersonas();
  const { data: frituren, loading: friturenLoading, error: friturenError } = useTeam3Frituren();
  const { data: interviews, loading: interviewsLoading, error: interviewsError } = useTeam3StreetInterviews();
  
  // State to toggle between table and card view for buying personas
  const [personasViewMode, setPersonasViewMode] = useState<"table" | "cards">("cards");
  const [friturenViewMode, setFriturenViewMode] = useState<"table" | "cards">("cards");
  const [interviewsViewMode, setInterviewsViewMode] = useState<"table" | "summary">("summary");

  // Check if any data is loading or has errors
  const isLoading = personasLoading || friturenLoading || interviewsLoading;
  const hasErrors = personasError || friturenError || interviewsError;

  // Log data statistics for debugging
  console.log("Team3Results page - data stats:", {
    personasCount: personas?.length || 0,
    friturenCount: frituren?.length || 0,
    interviewsCount: interviews?.length || 0,
    isLoading,
    hasErrors
  });

  // Check if we actually have data or not
  const hasData = 
    (personas && personas.length > 0) || 
    (frituren && frituren.length > 0) || 
    (interviews && interviews.length > 0);

  // Define a placeholder message for when we have no data
  const showPlaceholderData = !isLoading && !hasErrors && !hasData;

  // Create grouped personas for card view
  const groupedPersonas = personas 
    ? Object.entries(
        personas.reduce((groups, persona) => {
          const type = persona.buying_persona || 'Unknown';
          if (!groups[type]) groups[type] = [];
          groups[type].push(persona);
          return groups;
        }, {} as Record<string, typeof personas>)
      ).map(([personaType, personas]) => ({
        personaType,
        personas
      }))
    : [];

  return (
    <>
      <Helmet>
        <title>Team 3 Research Results | Snack Innovation</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate(-1)}
                className="mr-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold">Team 3 Research Results</h1>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Team 3 Market Research Data</h2>
              
              <p className="text-gray-600 mb-8">
                This page presents the complete market research findings from Team 3's research on 
                protein-based snack innovation in frituren. Use these insights to inform your 
                product development and marketing strategies.
              </p>
              
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="h-10 w-10 animate-spin text-blue-500 mb-4" />
                  <p className="text-gray-600 font-medium">Loading research data...</p>
                  <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
                </div>
              ) : hasErrors ? (
                <div className="bg-red-50 border border-red-200 rounded-md p-6 text-center">
                  <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-red-800 mb-2">Error Loading Data</h3>
                  <p className="text-red-700 mb-4">
                    There was a problem loading the research data. Please try refreshing the page.
                  </p>
                  <div className="bg-white rounded p-4 text-left max-w-lg mx-auto border border-red-100">
                    <p className="text-sm font-medium text-red-800">Error details:</p>
                    {personasError && <p className="text-xs text-red-700 mt-1">Personas: {personasError}</p>}
                    {friturenError && <p className="text-xs text-red-700 mt-1">Frituren: {friturenError}</p>}
                    {interviewsError && <p className="text-xs text-red-700 mt-1">Interviews: {interviewsError}</p>}
                  </div>
                </div>
              ) : showPlaceholderData ? (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-6 text-center">
                  <Database className="h-10 w-10 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-blue-800 mb-2">No Data Available</h3>
                  <p className="text-blue-700 mb-4">
                    There appears to be no data in the Team 3 tables. Please check the Supabase database 
                    to ensure data has been properly uploaded.
                  </p>
                  <div className="bg-white rounded p-4 text-left max-w-lg mx-auto border border-blue-100">
                    <p className="text-sm font-medium text-blue-800">Expected tables:</p>
                    <ul className="list-disc pl-5 text-sm text-blue-600">
                      <li><code>Team3buyingpersonasforwebsite</code></li>
                      <li><code>Team3friturenforwebsite</code></li>
                      <li><code>Team3streetinterviewsforwebsite</code></li>
                    </ul>
                  </div>
                </div>
              ) : (
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
                    <div className="flex justify-end mb-4">
                      <div className="bg-gray-100 rounded-md p-1 inline-flex">
                        <Button
                          variant={personasViewMode === "cards" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setPersonasViewMode("cards")}
                          className="rounded-md"
                        >
                          <LayoutGrid className="h-4 w-4 mr-1" />
                          Cards
                        </Button>
                        <Button
                          variant={personasViewMode === "table" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setPersonasViewMode("table")}
                          className="rounded-md"
                        >
                          <TableIcon className="h-4 w-4 mr-1" />
                          Table
                        </Button>
                      </div>
                    </div>
                    
                    {personasViewMode === "table" ? (
                      <Team3BuyingPersonasTable personas={personas} />
                    ) : (
                      <>
                        <Team3BuyingPersonasCards personas={personas} />
                        <h3 className="text-xl font-bold mt-10 mb-4">Persona Profiles</h3>
                        <PersonaCardList groupedPersonas={groupedPersonas} />
                      </>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="frituren">
                    <div className="flex justify-end mb-4">
                      <div className="bg-gray-100 rounded-md p-1 inline-flex">
                        <Button
                          variant={friturenViewMode === "cards" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setFriturenViewMode("cards")}
                          className="rounded-md"
                        >
                          <LayoutGrid className="h-4 w-4 mr-1" />
                          Cards
                        </Button>
                        <Button
                          variant={friturenViewMode === "table" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setFriturenViewMode("table")}
                          className="rounded-md"
                        >
                          <TableIcon className="h-4 w-4 mr-1" />
                          Table
                        </Button>
                      </div>
                    </div>
                    
                    {friturenViewMode === "table" ? (
                      <Team3FriturenTable frituren={frituren} />
                    ) : (
                      <>
                        <h3 className="text-xl font-bold mb-6">Key Insights from Frituren</h3>
                        <FriturenSummary data={frituren} />
                        <h3 className="text-xl font-bold mt-10 mb-6">Detailed Frituren Analytics</h3>
                        <FriturenCardView frituren={frituren} />
                      </>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="streetInterviews">
                    <div className="flex justify-end mb-4">
                      <div className="bg-gray-100 rounded-md p-1 inline-flex">
                        <Button
                          variant={interviewsViewMode === "summary" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setInterviewsViewMode("summary")}
                          className="rounded-md"
                        >
                          <LayoutGrid className="h-4 w-4 mr-1" />
                          Summary
                        </Button>
                        <Button
                          variant={interviewsViewMode === "table" ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setInterviewsViewMode("table")}
                          className="rounded-md"
                        >
                          <TableIcon className="h-4 w-4 mr-1" />
                          Table
                        </Button>
                      </div>
                    </div>
                    
                    {interviewsViewMode === "table" ? (
                      <Team3StreetInterviewsTable interviews={interviews} />
                    ) : (
                      <>
                        <h3 className="text-xl font-bold mb-6">Street Interview Insights</h3>
                        <Team3StreetInterviewsSummary data={interviews} />
                      </>
                    )}
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team3Results;
