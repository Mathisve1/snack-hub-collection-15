
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Table as TableIcon, LayoutGrid, Copy, AlertTriangle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import BuyingPersonasTable from "@/features/team-data/components/BuyingPersonasTable";
import BuyingPersonasCards from "@/features/team-data/components/BuyingPersonasCards";
import FriturenTable from "@/features/team-data/components/FriturenTable";
import StreetInterviewsTable from "@/features/team-data/components/StreetInterviewsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  useTeam3BuyingPersonas, 
  useTeam3Frituren, 
  useTeam3StreetInterviews 
} from "@/features/team-data/hooks/useTeam3Data";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Team38ResultsQuadruplicate = () => {
  const navigate = useNavigate();
  const { data: personas, loading: personasLoading, error: personasError } = useTeam3BuyingPersonas();
  const { data: frituren, loading: friturenLoading, error: friturenError } = useTeam3Frituren();
  const { data: interviews, loading: interviewsLoading, error: interviewsError } = useTeam3StreetInterviews();
  
  // State to toggle between table and card view for buying personas
  const [personasViewMode, setPersonasViewMode] = useState<"table" | "cards">("cards");

  // Check if any data is loading or has errors
  const isLoading = personasLoading || friturenLoading || interviewsLoading;
  const hasErrors = personasError || friturenError || interviewsError;

  // Log data for debugging
  useEffect(() => {
    console.log("Team38ResultsQuadruplicate - Data state:", {
      personas: {
        length: personas?.length || 0,
        loading: personasLoading,
        error: personasError
      },
      frituren: {
        length: frituren?.length || 0,
        loading: friturenLoading,
        error: friturenError
      },
      interviews: {
        length: interviews?.length || 0,
        loading: interviewsLoading,
        error: interviewsError
      }
    });
    
    // Notify user when data is loaded
    if (!isLoading && !hasErrors) {
      if ((personas?.length || 0) > 0) {
        toast.success(`Loaded ${personas?.length} buying personas`);
      } else if (!personasLoading && (personas?.length || 0) === 0) {
        toast.warning("No Team 3 buying personas data found");
      }
    }
  }, [personas, frituren, interviews, isLoading, hasErrors, personasLoading, friturenLoading, interviewsLoading, personasError, friturenError, interviewsError]);

  return (
    <>
      <Helmet>
        <title>Team 38 Research Results (Quadruplicate) | Snack Innovation</title>
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
              <h1 className="text-xl font-semibold">Team 38 Research Results (Quadruplicate - Team 3 Data)</h1>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to="/team-38-results">
                  <Copy className="h-4 w-4 mr-2" />
                  View Original
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/team-38-results-triplicate">
                  <Copy className="h-4 w-4 mr-2" />
                  View Triplicate
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Team 38 Market Research Data (Team 3 Data)</h2>
              
              <p className="text-gray-600 mb-8">
                This page presents the complete market research findings from Team 3's research on 
                protein-based snack innovation in frituren. Use these insights to inform your 
                product development and marketing strategies.
              </p>
              
              {!isLoading && !hasErrors && 
               personas.length === 0 && frituren.length === 0 && interviews.length === 0 && (
                <Alert className="mb-6" variant="warning">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    No data found in Team 3 tables. We're showing Team 38 data as a fallback.
                    Please check that the Team 3 tables exist and contain data.
                  </AlertDescription>
                </Alert>
              )}
              
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
                      <BuyingPersonasTable />
                    ) : (
                      <BuyingPersonasCards />
                    )}
                  </TabsContent>
                  
                  <TabsContent value="frituren">
                    <FriturenTable />
                  </TabsContent>
                  
                  <TabsContent value="streetInterviews">
                    <StreetInterviewsTable />
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

export default Team38ResultsQuadruplicate;
