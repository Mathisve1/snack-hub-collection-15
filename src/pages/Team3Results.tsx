
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Table as TableIcon, LayoutGrid, Copy } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  useTeam3BuyingPersonas, 
  useTeam3Frituren, 
  useTeam3StreetInterviews 
} from "@/features/team-data/hooks/useTeam3Data";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import Team3BuyingPersonasTable from "@/features/team-data/components/Team3BuyingPersonasTable";
import Team3BuyingPersonasCards from "@/features/team-data/components/Team3BuyingPersonasCards";
import Team3FriturenTable from "@/features/team-data/components/Team3FriturenTable";
import Team3StreetInterviewsTable from "@/features/team-data/components/Team3StreetInterviewsTable";
import Team3StreetInterviewsSummary from "@/features/team-data/components/Team3StreetInterviewsSummary";
import { toast } from "sonner";

const Team3Results = () => {
  const navigate = useNavigate();
  const { data: personas, loading: personasLoading, error: personasError } = useTeam3BuyingPersonas();
  const { data: frituren, loading: friturenLoading, error: friturenError } = useTeam3Frituren();
  const { data: interviews, loading: interviewsLoading, error: interviewsError } = useTeam3StreetInterviews();
  
  // State to toggle between table and card view for buying personas
  const [personasViewMode, setPersonasViewMode] = useState<"table" | "cards">("cards");
  const [showSummary, setShowSummary] = useState<boolean>(true);

  // Check if any data is loading or has errors
  const isLoading = personasLoading || friturenLoading || interviewsLoading;
  const hasErrors = personasError || friturenError || interviewsError;

  // Debug useEffect to log data status on each render
  useEffect(() => {
    console.log("Team3 Data Status:", {
      personas: { count: personas?.length || 0, loading: personasLoading, error: personasError },
      frituren: { count: frituren?.length || 0, loading: friturenLoading, error: friturenError },
      interviews: { count: interviews?.length || 0, loading: interviewsLoading, error: interviewsError }
    });

    // If data is loaded but empty for all categories, show a toast message
    if (!isLoading && !hasErrors && 
        (!personas || personas.length === 0) && 
        (!frituren || frituren.length === 0) && 
        (!interviews || interviews.length === 0)) {
      toast.info("No data available for Team 3 yet. Please check back later.");
    }
  }, [personas, frituren, interviews, isLoading, hasErrors, personasError, friturenError, interviewsError]);

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
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to="/team-38-results">
                  <Copy className="h-4 w-4 mr-2" />
                  View Team 38
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/team-13-results">
                  <Copy className="h-4 w-4 mr-2" />
                  View Team 13
                </Link>
              </Button>
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
                  <Loader2 className="h-10 w-10 animate-spin text-gray-500 mb-4" />
                  <p className="text-gray-500">Loading research data...</p>
                </div>
              ) : hasErrors ? (
                <div className="text-red-500 p-6 text-center">
                  <p>There was a problem loading the research data. Please try again later.</p>
                  {personasError && <p className="mt-2">Personas error: {personasError}</p>}
                  {friturenError && <p className="mt-2">Frituren error: {friturenError}</p>}
                  {interviewsError && <p className="mt-2">Interviews error: {interviewsError}</p>}
                </div>
              ) : (!personas || personas.length === 0) && 
                 (!frituren || frituren.length === 0) && 
                 (!interviews || interviews.length === 0) ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-6 text-center">
                  <h3 className="text-xl font-medium text-yellow-800 mb-2">No Data Available</h3>
                  <p className="text-yellow-700">
                    The Team 3 data tables appear to be empty. Data will display here as soon as it's available.
                  </p>
                  <p className="text-sm text-yellow-600 mt-4">
                    Make sure data has been uploaded to the Team3buyingpersonasforwebsite, Team3friturenforwebsite, 
                    and Team3streetinterviewsforwebsite tables.
                  </p>
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
                      <Team3BuyingPersonasCards personas={personas} />
                    )}
                  </TabsContent>
                  
                  <TabsContent value="frituren">
                    <Team3FriturenTable frituren={frituren} />
                  </TabsContent>
                  
                  <TabsContent value="streetInterviews">
                    <div className="mb-6 flex justify-between items-center">
                      <h3 className="text-xl font-semibold">Street Interviews Data</h3>
                      <div className="bg-gray-100 rounded-md p-1 inline-flex">
                        <Button
                          variant={showSummary ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setShowSummary(true)}
                          className="rounded-md"
                        >
                          <LayoutGrid className="h-4 w-4 mr-1" />
                          Summary
                        </Button>
                        <Button
                          variant={!showSummary ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setShowSummary(false)}
                          className="rounded-md"
                        >
                          <TableIcon className="h-4 w-4 mr-1" />
                          Raw Data
                        </Button>
                      </div>
                    </div>
                    
                    {showSummary ? (
                      <Team3StreetInterviewsSummary data={interviews} />
                    ) : (
                      <Team3StreetInterviewsTable interviews={interviews} />
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
