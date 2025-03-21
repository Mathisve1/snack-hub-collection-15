
import { Helmet } from "react-helmet";
import { 
  useTeam3BuyingPersonas, 
  useTeam3Frituren, 
  useTeam3StreetInterviews 
} from "@/features/team-data/hooks/useTeam3Data";
import Team3Header from "@/features/team-data/components/team3/Team3Header";
import DataLoadingState from "@/features/team-data/components/common/DataLoadingState";
import DataErrorState from "@/features/team-data/components/common/DataErrorState";
import EmptyDataState from "@/features/team-data/components/common/EmptyDataState";
import Team3TabsContainer from "@/features/team-data/components/team3/Team3TabsContainer";

const Team3Results = () => {
  const { data: personas, loading: personasLoading, error: personasError } = useTeam3BuyingPersonas();
  const { data: frituren, loading: friturenLoading, error: friturenError } = useTeam3Frituren();
  const { data: interviews, loading: interviewsLoading, error: interviewsError } = useTeam3StreetInterviews();
  
  const isLoading = personasLoading || friturenLoading || interviewsLoading;
  const hasErrors = personasError || friturenError || interviewsError;

  console.log("Team3Results page - data stats:", {
    personasCount: personas?.length || 0,
    friturenCount: frituren?.length || 0,
    interviewsCount: interviews?.length || 0,
    isLoading,
    hasErrors
  });

  const hasData = 
    (personas && personas.length > 0) || 
    (frituren && frituren.length > 0) || 
    (interviews && interviews.length > 0);

  const showPlaceholderData = !isLoading && !hasErrors && !hasData;

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
        <Team3Header />
        
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
                <DataLoadingState />
              ) : hasErrors ? (
                <DataErrorState 
                  personasError={personasError} 
                  friturenError={friturenError} 
                  interviewsError={interviewsError} 
                />
              ) : showPlaceholderData ? (
                <EmptyDataState />
              ) : (
                <Team3TabsContainer 
                  personas={personas || []} 
                  frituren={frituren || []} 
                  interviews={interviews || []} 
                  groupedPersonas={groupedPersonas} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team3Results;
