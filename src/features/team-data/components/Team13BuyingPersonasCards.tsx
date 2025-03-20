
import { useTeam13BuyingPersonas } from "../hooks/useTeam13Data";
import { PersonaCardItem } from "./buying-personas/PersonaCardItem";
import { EmptyPersonasState } from "./buying-personas/EmptyPersonasState";
import { PersonasErrorState } from "./buying-personas/PersonasErrorState";
import { PersonasLoadingState } from "./buying-personas/PersonasLoadingState";
import { BuyingPersona } from "../types";

interface Team13BuyingPersonasCardsProps {
  personas?: BuyingPersona[];
}

const Team13BuyingPersonasCards = ({ personas }: Team13BuyingPersonasCardsProps) => {
  // Use the team13 hook
  const team13Data = useTeam13BuyingPersonas();
  
  // Use passed personas if available, otherwise use the data from hooks
  const data = personas || team13Data.data;
  const loading = !personas && team13Data.loading;
  const error = !personas && team13Data.error;

  // Always log the current state for debugging
  console.log("Team13BuyingPersonasCards state:", { 
    data, 
    loading, 
    error, 
    dataSource: personas ? "props" : "team13Data",
    team13DataLength: team13Data.data?.length,
    personasLength: personas?.length,
    firstRecord: data && data.length > 0 ? data[0] : null
  });

  if (loading) {
    return <PersonasLoadingState />;
  }

  if (error) {
    return <PersonasErrorState error={error} />;
  }

  // Extra check to ensure we truly have no data
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <EmptyPersonasState 
        debug={{
          dataLength: data?.length,
          dataExists: !!data && Array.isArray(data) && data.length > 0,
          isLoading: loading,
          error: error,
          team13DataLength: team13Data.data?.length,
          personasLength: personas?.length
        }}
      />
    );
  }

  // Log what we're about to render
  console.log("Rendering Team 13 personas data:", data);
  
  // Create a mapping of persona types to arrays of personas
  const personasByType: Record<string, BuyingPersona[]> = {};
  
  // Group personas by type, handling case insensitivity
  data.forEach(persona => {
    if (!persona.buying_persona) return;
    
    const personaType = persona.buying_persona.toLowerCase();
    if (!personasByType[personaType]) {
      personasByType[personaType] = [];
    }
    personasByType[personaType].push(persona);
  });
  
  // Convert to array for rendering
  const personaTypes = Object.keys(personasByType);
  
  // Ensure we actually have personas to display
  if (personaTypes.length === 0) {
    return (
      <EmptyPersonasState 
        debug={{
          dataLength: data?.length,
          dataExists: true,
          isLoading: false,
          error: "No valid persona types found in data",
        }}
      />
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {personaTypes.map((personaType, index) => {
        const personasOfThisType = personasByType[personaType];
        
        return (
          <PersonaCardItem 
            key={personaType} 
            personaType={personaType.charAt(0).toUpperCase() + personaType.slice(1)}
            personaCount={personasOfThisType.length}
            personas={personasOfThisType}
            index={index} 
          />
        );
      })}
    </div>
  );
};

export default Team13BuyingPersonasCards;
