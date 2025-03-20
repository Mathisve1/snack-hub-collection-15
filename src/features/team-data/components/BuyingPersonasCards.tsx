
import { useTeam38BuyingPersonas } from "../hooks/useTeam38Data";
import { useLocation } from "react-router-dom";
import { PersonaCardItem } from "./buying-personas/PersonaCardItem";
import { EmptyPersonasState } from "./buying-personas/EmptyPersonasState";
import { PersonasErrorState } from "./buying-personas/PersonasErrorState";
import { PersonasLoadingState } from "./buying-personas/PersonasLoadingState";
import { BuyingPersona } from "../types";

interface BuyingPersonasCardsProps {
  personas?: BuyingPersona[];
}

const BuyingPersonasCards = ({ personas }: BuyingPersonasCardsProps) => {
  const location = useLocation();
  // Check if we're on a team-38 path
  const isTeam38Path = location.pathname.includes("team-38");
  
  // Log the current path
  console.log(`Current path: ${location.pathname}, isTeam38Path: ${isTeam38Path}`);
  
  // Use the team38 hook
  const team38Data = useTeam38BuyingPersonas();
  
  // Use passed personas if available, otherwise use the data from hooks
  const data = personas || team38Data.data;
  const loading = !personas && team38Data.loading;
  const error = !personas && team38Data.error;

  // Always log the current state for debugging
  console.log("BuyingPersonasCards state:", { 
    data, 
    loading, 
    error, 
    path: location.pathname,
    dataSource: personas ? "props" : "team38Data",
    team38DataLength: team38Data.data?.length,
    personasLength: personas?.length
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
          currentPath: location.pathname,
          team38DataLength: team38Data.data?.length,
          personasLength: personas?.length
        }}
      />
    );
  }

  // Log what we're about to render
  console.log("Rendering personas data:", data);
  
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
          currentPath: location.pathname
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

export default BuyingPersonasCards;
